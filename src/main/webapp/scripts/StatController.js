let StatController = (function()
{
    function StatController()
    {
        //declare vars
        this.statNames;
        this.csElMastery;
        this.csElEndurance;
        this.csElPower;
        this.csElCrit;
        this.csElAlacrity;
        this.csElAccuracy;
        this.csElDefense;
        this.csElAbsorb;
        this.csElShield;
        this.csElPresence;
        this.csEls = [];
    }
    StatController.prototype.init = function()
    {
        this.statNames = {
            mastery: 'Mastery',
            endurance: 'Endurance',
            power: 'Power',
            crit: 'Critical Rating',
            alacrity: 'Alacrity Rating',
            accuracy: 'Accuracy Rating',
            defense: 'Defense Rating',
            absorption: 'Absorption Rating',
            shield: 'Shield Rating',
            presence: 'Presence'
        };

        this.csElMastery = document.getElementById('charStatMastery');
        this.csElEndurance = document.getElementById('charStatEndurance');
        this.csElPower = document.getElementById('charStatPower');
        this.csElCrit = document.getElementById('charStatCrit');
        this.csElAlacrity = document.getElementById('charStatAlacrity');
        this.csElAccuracy = document.getElementById('charStatAccuracy');
        this.csElDefense = document.getElementById('charStatDefense');
        this.csElAbsorb = document.getElementById('charStatAbsorption');
        this.csElShield = document.getElementById('charStatShield');
        this.csElPresence = document.getElementById('charStatPresence');

        this.csEls.push(this.csElMastery);
        this.csEls.push(this.csElEndurance);
        this.csEls.push(this.csElPower);
        this.csEls.push(this.csElCrit);
        this.csEls.push(this.csElAlacrity);
        this.csEls.push(this.csElAccuracy);
        this.csEls.push(this.csElDefense);
        this.csEls.push(this.csElAbsorb);
        this.csEls.push(this.csElShield);
        this.csEls.push(this.csElPresence);

        log('StatController initialized.');
    };
    StatController.prototype.getStatName = function(stat)
    {
        if(!stat || !this.statNames.hasOwnProperty(stat))
        {
            return '';
        }
        return this.statNames[stat];
    };
    StatController.prototype.getStatChanges = function(item1, item2)
    {
        let changes = {};
        if(item1 === null || item2 === null)
        {
            return changes;
        }
        let stats1 = item1.getStats();
        let stats2 = item2.getStats();
        for(let statName in stats1)
        {
            if(stats1.hasOwnProperty(statName))
            {
                let diff;
                if(stats2.hasOwnProperty(statName))
                {
                    diff = stats2[statName] - stats1[statName];
                }
                else
                {
                    diff = 0 - stats1[statName];
                }
                changes[statName] = diff;
            }
        }
        for(let statName in stats2)
        {
            if(stats2.hasOwnProperty(statName) && !changes.hasOwnProperty(statName))
            {
                changes[statName] = stats2[statName];
            }
        }
        return changes;
    };
    StatController.prototype.addStats = function(stats1, stats2) //TODO:could probably stand to de-duplicate this
    {
        let combined = {}
        for(let statName in stats1)
        {
            if(stats1.hasOwnProperty(statName))
            {
                let sum;
                if(stats2.hasOwnProperty(statName))
                {
                    sum = stats1[statName] + stats2[statName];
                }
                else
                {
                    sum = stats1[statName];
                }
                combined[statName] = sum;
            }
        }
        for(let statName in stats2)
        {
            if(stats2.hasOwnProperty(statName) && !combined.hasOwnProperty(statName))
            {
                combined[statName] = stats2[statName];
            }
        }
        return combined;
    };
    StatController.prototype.getBaseStats = function()
    {
        //TODO:get stats for class/spec with no stim/buffs/datacrons/etc
        return {};
    };
    StatController.prototype.getGearlessStats = function()
    {
        //TODO:get stats for character with no gear but everything else
        //note that augments are NOT considered "gear" for this purpose
        let miscStats = {};
        return this.addStats(miscStats, this.getBaseStats());
    };
    StatController.prototype.getCharStats = function()
    {
        //get the calculated stats for everything, including gear/buffs/augs/etc
        let gearStats = {};
        let slots = SlotManager.getAllCharSlots();
        for(let i in slots)
        {
            if(slots.hasOwnProperty(i))
            {
                let item = slots[i].getItem();
                if(item !== null)
                {
                    gearStats = this.addStats(gearStats, item.getStats());
                }
            }
        }
        return this.addStats(gearStats, this.getGearlessStats());
    };
    StatController.prototype.updateCharStats = function()
    {
        let stats = this.getCharStats();
        for(let i=0; i<this.csEls.length; i++)
        {
            let el = this.csEls[i];
            let statName = el.id.toLowerCase();
            statName = statName.substring(8);
            if(stats.hasOwnProperty(statName))
            {
                el.innerHTML = stats[statName];
            }
            else
            {
                el.innerHTML = '0';
            }
        }
    }
    return new StatController();
})();
declareReady('StatController.js', function(){StatController.init();});