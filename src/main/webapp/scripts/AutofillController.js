let AutofillController = (function()
{
    function AutofillController()
    {
        //declare vars
    }

    AutofillController.prototype.populateRightSide = function()
    {
        try
        {
            let ratings = Settings.getItemRatings().sort();
            let maxRating = ratings[ratings.length-1];
            let spec = Settings.getSpec();
            let rsSlots = ['head', 'chest', 'hands', 'waist', 'legs', 'feet', 'mainhand', 'offhand', 'wrists'];
            let existing = false;
            //replace all the slot names with actual Slot objects, and also check whether any of them have items already
            for(let i=0; i<rsSlots.length; i++)
            {
                rsSlots[i] = SlotManager.getSlot(rsSlots[i]);
                if(rsSlots[i].getItem() !== null)
                {
                    existing = true;
                }
            }
            let overwrite = false;
            if(existing)
            {
                overwrite = window.confirm('It looks like you already have some gear in these slots.  OK to overwrite?');
            }
            for(let i=0; i<rsSlots.length; i++)
            {
                let slot = rsSlots[i];
                let items = ItemManager.getItemsForSpecAndSlot(spec, slot.getGenericName());
                items = items.filter(i=>(i.rating===maxRating));
                let recommended = items.filter(i=>(i.setId === this.getRecommendedSetBonusForSpec(spec)));
                let best = recommended.length > 0 ? recommended[0] : items[0];
                if(overwrite || slot.getItem() === null)
                {
                    slot.setItem(best);
                }
            }
        }
        catch(e)
        {
            console.error('Unable to populate right side gear!');
        }
    };
    AutofillController.prototype.getRecommendedSetBonusForSpec = function(spec)
    {
        switch(spec)
        {
            case 'sinTank':
                return 'efficient';
            case 'sinBurst':
            case 'sinSust':
                return 'dknell';
            case 'sorcHealer':
                return 'revitalized';
            case 'sorcBurst':
            case 'sorcSust':
                return 'gathering';
            case 'juggTank':
                return 'lordop';
            case 'juggBurst':
            case 'juggSust':
                return 'descent';
            case 'maraSust':
                return 'culling';
            case 'maraBurst':
            case 'maraHybrid':
                return 'pform';
            case 'mercHealer':
                return 'cfire';
            case 'mercBurst':
            case 'mercSust':
                return 'apex';
            case 'ptTank':
                return 'rprice';
            case 'ptBurst':
            case 'ptSust':
                return 'meteor';
            case 'opHealer':
            case 'opBurst':
                return 'tactician';
            case 'opSust':
                return 'authority';
            case 'sniperBurst':
                return 'foothold';
            case 'sniperSust':
            case 'sniperHybrid':
                return 'precise';
        }

        return 'amplified'; //all-class fallback in case something goes haywire
    };
    AutofillController.prototype.clearAll = function()
    {
        let slots = SlotManager.getAllCharSlots();
        for(let slotName in slots)
        {
            var slot = slots[slotName];
            slot.setItem(null);
            slot.setAugment(null);
        }
        DomController.hideItemPicker();
        let stimEls = document.getElementsByClassName('button-stim-selected');
        for(let i=0; i<stimEls.length; i++)
        {
            Settings.updateStim(stimEls[i]);
        }
    };
    return new AutofillController();
})();
declareReady('AutofillController.js', null);