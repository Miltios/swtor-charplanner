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
                let best = items.filter(i=>(i.rating===maxRating))[0];
                if(overwrite || slot.getItem() === null)
                {
                    slot.setItem(best);
                }
            }
        }
        catch(e)
        {
            console.error('Unable to populate right side gear!');
            console.error(e.stack);
        }
    };
    return new AutofillController();
})();
declareReady('AutofillController.js', null);