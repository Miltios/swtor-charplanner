let StatManager = (function()
{
    function StatManager()
    {
        //declare vars
        this.data = {};
    }
    StatManager.prototype.init = function()
    {
        this.data = ratingData;
    };
    StatManager.prototype.getArmorForItem = function(item)
    {
        if(item.type === 'armor'/* || (item.slot==='offhand' && item.type==='shield')*/) //fun fact: offhands with an "armoring" (e.g. shields) do not actually grant armor
        {
            return this.getArmorForRatingAndSlot(item.rating, item.slot);
        }
        return 0;
    };
    StatManager.prototype.getArmorForRatingAndSlot =  function(rating, slot)
    {
        let row = this.data[rating];
        if(!row)
        {
            console.error('No armor rating defined for rating "' + rating + '"!');
            return 0;
        }
        let isPrimary = (['head','chest','legs'].indexOf(slot) === -1)? false:true;
        let armorType;
        switch(Settings.getClass())
        {
            case 'jugg':
            case 'pt':
            case 'merc':
                armorType = 'heavy';
                break;
            case 'op':
            case 'sniper':
            case 'mara':
                armorType = 'medium';
                break;
            case 'sin':
            case 'sorc':
            default:
                armorType = 'light';
                break;
        }
        let armor = row[armorType + (isPrimary?'pri':'sec')];
        if(!armor)
        {
            console.error('No armor rating defined for rating "' + rating + ' ' + armorType + (isPrimary?'pri':'sec') + '"!');
            return 0;
        }
        return armor;
    }
    return new StatManager();
})();
declareReady('StatManager.js', function(){StatManager.init()});