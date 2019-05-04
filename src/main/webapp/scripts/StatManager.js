let StatManager = (function()
{
    function StatManager()
    {
        //declare vars
        this.ratings = {};
        this.specBuffs = [];
        this.rawStats = {
            'mastery':0,
            'endurance':0,
            'power':0,
            'crit':0,
            'alacrity':0,
            'accuracy':0,
            'defense':0,
            'absorption':0,
            'shield':0,
            'presence':0,
            'armor':0
        }
    }
    StatManager.prototype.init = function()
    {
        this.ratings = ratingData;
        this.specBuffs = specBuffData;
    };
    StatManager.prototype.getStat = function(stat)
    {
        if(this.rawStats.hasOwnProperty(stat))
        {
            return this.rawStats[stat];
        }
        console.error('Cannot getStat for invalid statName "' + stat + '"!');
        return 0;
    };
    StatManager.prototype.setStat = function(stat, value)
    {
        if(this.rawStats.hasOwnProperty(stat))
        {
            this.rawStats[stat] = value;
        }
        else
        {
            console.error('Cannot setStat for invalid statName "' + stat + '"!');
        }
    }
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
        let row = this.ratings[rating];
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
    };

    /*
    * Always returns a multiplier, which is >= 1 unless there are stat penalties.
    */
    StatManager.prototype.getMultiplierForSpecAndStat = function(spec, stat)
    {
        if(!spec || !stat)
        {
            console.error('Attempted to get spec buffs with invalid arguments: (' + spec + ', ' + stat + ')!');
            return 1;
        }
        let buffs = this.specBuffs.filter(b => (b.spec === spec && b.stat === stat));
        let mult = 1;
        for(let i=0; i<buffs.length; i++)
        {
            mult += buffs[i].statValue;
        }
        return mult;
    };
    StatManager.prototype.getMultiplierForStat = function(stat)
    {
        let mult = this.getMultiplierForSpecAndStat(Settings.getSpec(), stat);
        let classBuffs = Settings.getClassBuffs();
        for(let i=0; i<classBuffs.length; i++)
        {
            if(classBuffs[i].toLowerCase() === stat.toLowerCase())
            {
                mult += 0.05;
            }
        }
        return mult;
    }
    return new StatManager();
})();
declareReady('StatManager.js', function(){StatManager.init()});