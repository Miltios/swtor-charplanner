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
        //stats with no stim/buffs/datacrons/etc.  Base stats do not vary by class/spec, and we assume everyone is lvl 70.
        return {
            'mastery':850,
            'endurance':765,
            'power':0,
            'crit':0,
            'alacrity':0,
            'accuracy':0,
            'defense':0,
            'absorption':0,
            'shield':0,
            'presence':765
        };
    };
    StatController.prototype.getGearlessStats = function()
    {
        //TODO:get stats for character with no gear but everything else
        //TODO:make this actually dependent on the settings that are checked
        //note that augments are NOT considered "gear" for this purpose
        let stats = {
            'mastery':-17, //TODO:HACK: need this number to get 1050 mastery, but we don't know where it comes from
            'endurance':14, //TODO:HACK:need this number to get 828 endurance, but we don't know where it comes from
            'presence':100 //freebie from the Human legacy buff.  We just assume everyone has it.
        };
        /*let datacronStats = {
            'mastery':200, //TODO:unconfirmed
            'endurance':63, //TODO:49 or 59 endurance from datacrons, what about the rest?
            'presence':443 //honestly I have no idea where all this presence comes from but nobody cares
        };*/
        let datacronStats = {
            'mastery':0,
            'endurance':0,
            'presence':0
        };
        let datacrons = Settings.getDatacrons();
        for(let i=0; i<datacrons.length; i++)
        {
            switch(datacrons[i])
            {
                case 'Ossus':
                    datacronStats.mastery += 6;
                    datacronStats.endurance += 2;
                    datacronStats.presence += 5;
                    break;
                case 'Rishi':
                    datacronStats.mastery += 40;
                    break;
                case 'Makeb':
                    datacronStats.endurance += 10;
                    datacronStats.presence += 10;
                    break;
                case 'Fleet':
                    datacronStats.mastery += 10; //TODO:is this how fleet datacron works?
                    break;
                case 'Base':
                    datacronStats.mastery += 161; //TODO:this seems high
                    datacronStats.endurance += 37;
                    datacronStats.presence += 41;
                    break;
            }
        }
        stats = this.addStats(stats, datacronStats);
        let companionBuffs = Settings.getCompanionBuffs();
        let companionStats = {
            'presence':(companionBuffs.length*10)
        };
        stats =  this.addStats(stats, companionStats);
        return this.addStats(stats, this.getBaseStats());
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