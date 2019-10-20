let SetManager = (function()
{
    function SetManager()
    {
        //declare vars
        this.sets = {};
        this.keys = [];
        this.armorSlots = ['head', 'chest', 'hands', 'waist', 'legs', 'feet', 'wrists'];
    }
    SetManager.prototype.init = function()
    {
        this.sets = setBonusData;
        for(let i=0; i<this.sets.length; i++)
        {
            this.keys.push(this.sets[i].setId)
        }
    };
    SetManager.prototype.getEquippedNumberForSet = function(setId)
    {
        if(this.keys.indexOf(setId) === -1)
        {
            return 0;
        }
        let match = 0;
        for(let i=0; i<this.armorSlots.length; i++)
        {
            let item = SlotManager.getSlot(this.armorSlots[i]).getItem();
            if(item !== null  && item.setId === setId)
            {
                match++;
            }
        }
        return match;
    };
    SetManager.prototype.getDescriptionForSet = function(setId)
    {
        let idx = this.keys.indexOf(setId);
        if(idx === -1)
        {
            console.error('Attempted to get description for invalid set: "' + setId + '"');
            return '';
        }
        let count = this.getEquippedNumberForSet(setId);
        let set = this.sets[idx];
        let html = '';
        if(typeof set.bonus2Desc === 'string' && set.bonus2Desc.length !== 0)
        {
            html += '<span class="description-setbonus-2' + (count>=2?' description-setbonus-active':' description-setbonus-inactive') + '">' + set.bonus2Desc + '</span>';
        }
        if(typeof set.bonus4Desc === 'string' && set.bonus4Desc.length !== 0)
        {
            html += '<span class="description-setbonus-4' + (count>=4?' description-setbonus-active':' description-setbonus-inactive') + '">' + set.bonus4Desc + '</span>';
        }
        if(typeof set.bonus6Desc === 'string' && set.bonus6Desc.length !== 0)
        {
            html += '<span class="description-setbonus-6' + (count>=6?' description-setbonus-active':' description-setbonus-inactive') + '">' + set.bonus6Desc + '</span>';
        }
        html = '<span class="description-setbonus-count">(' + count + '/7)</span>' + html;
        return html;
    };
    SetManager.prototype.getStatBonus = function(stat)
    {
        let equippedSets = [];
        for(let i=0; i<this.armorSlots.length; i++)
        {
            let item = SlotManager.getSlot(this.armorSlots[i]).getItem();
            if(item !== null)
            {
                let setId = item.setId;
                if(setId && equippedSets.indexOf(setId) === -1)
                {
                    equippedSets.push(setId);
                }
            }
        }
        let statBonus = 0;
        for(let i=0; i<equippedSets.length; i++)
        {
            let set = this.sets[this.keys.indexOf(equippedSets[i])];
            let count = this.getEquippedNumberForSet(equippedSets[i]);
            if(count >= 2 && set.bonus2Stat === stat)
            {
                statBonus += set.bonus2Value;
            }
            if(count >= 4 && set.bonus4Stat === stat)
            {
                statBonus += set.bonus4Value;
            }
            if(count >= 6 && set.bonus6Stat === stat)
            {
                statBonus += set.bonus6Value;
            }
        }
        return statBonus;
    };
    return new SetManager();
})();
declareReady('SetManager.js', function(){SetManager.init()});