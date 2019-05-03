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
        this.calcElDmgPri;
        this.calcElDmgSec;
        this.calcElDmgBonusMR;
        this.calcElAccuracy;
        this.calcElCritChance;
        this.calcElCritMult;
        this.calcElDmgBonusFT;
        this.calcElHealing;
        this.calcElAlacrity;
        this.calcElHealth;
        this.calcElArmor;
        this.calcElDmgReduction;
        this.calcElDefense;
        this.calcElShield;
        this.calcElAbsorb;
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

        this.calcElDmgPri = document.getElementById('calcStatDmgPri');
        this.calcElDmgSec = document.getElementById('calcStatDmgSec');
        this.calcElDmgBonusMR = document.getElementById('calcStatDmgBonusMR');
        this.calcElAccuracy = document.getElementById('calcStatAccuracy');
        this.calcElCritChance = document.getElementById('calcStatCritChance');
        this.calcElCritMult = document.getElementById('calcStatCritMult');
        this.calcElDmgBonusFT = document.getElementById('calcStatDmgBonusFT');
        this.calcElHealing = document.getElementById('calcStatHealing');
        this.calcElAlacrity = document.getElementById('calcStatAlacrity');
        this.calcElHealth = document.getElementById('calcStatHealth');
        this.calcElArmor = document.getElementById('calcStatArmor');
        this.calcElDmgReduction = document.getElementById('calcStatDmgReduction');
        this.calcElDefense = document.getElementById('calcStatDefense');
        this.calcElShield = document.getElementById('calcStatShield');
        this.calcElAbsorb = document.getElementById('calcStatAbsorb');

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
    StatController.prototype.roundStats = function(stats)
    {
        for(let statName in stats)
        {
            stats[statName] = Math.round(stats[statName]);
        }
        return stats;
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

        //increase Presence by 10 for each companion buff
        let companionBuffs = Settings.getCompanionBuffs();
        let companionStats = {
            'presence':(companionBuffs.length*10)
        };
        stats =  this.addStats(stats, companionStats);

        //add in the base stats
        stats = this.addStats(stats, this.getBaseStats())

        //apply combined multipliers
        stats.endurance = stats.endurance * StatManager.getMultiplierForStat('endurance');
        stats.mastery = stats.mastery * StatManager.getMultiplierForStat('mastery'); //TODO:is this factored in here or later?

        return stats;
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
        let stats = this.addStats(gearStats, this.getGearlessStats());
        return this.roundStats(stats);
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
        this.updateCalcStats(); //TODO:do we always want this here?
    };
    StatController.prototype.updateCalcStats = function()
    {
        this.updateCalcDmgPri();
        this.updateCalcDmgSec();
        this.updateCalcDmgBonusMR();
        this.updateCalcAccuracy();
        this.updateCalcCritChance();
        this.updateCalcCritMult();
        this.updateCalcDmgBonusFT();
        this.updateCalcHealing();
        this.updateCalcAlacrity();

        this.updateCalcHealth();
        this.updateCalcArmor();
        this.updateCalcDmgReduction();
        this.updateCalcDefense();
        this.updateCalcShield();
        this.updateCalcAbsorb();
    };
    StatController.prototype.updateCalcDmgPri = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcDmgSec = function()
    {
        //TODO
        //zero dmg unless offhand is of type "pistol" or "saber"
    };
    StatController.prototype.updateCalcDmgBonusMR = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcAccuracy = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcCritChance = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcCritMult = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcDmgBonusFT = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcHealing = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcAlacrity = function()
    {
        //TODO
        //note: Tier 1 Alacrity = 7.143%, Tier 2 = 15.385%.  Ideally find some way to convey this.
    };
    StatController.prototype.updateCalcHealth = function()
    {
        //Health formula: (Base Health+[Endurance×12×(1+x)])×(1+y)
        //x is the sum of any multiplicative increases to Endurance (e.g. Hunter's Boon buff or assassin training)
        //y is the sum of any multiplicative increases to Health (e.g. ranged tank companion bonus)
        //TODO:does this mean that endurance multipliers affect HP twice?

        let baseHealth = 23750; //base HP from being lvl 70
        let endurance = parseInt(this.csElEndurance.innerHTML);
        let multEndurance = StatManager.getMultiplierForStat('endurance');
        let multHp = 1;
        if(Settings.getCompanionBuffs().indexOf('RTank') !== -1)
        {
            multHp += 0.01;
        }
        let hp = (baseHealth + (endurance*12*multEndurance)) * multHp;
        this.calcElHealth.innerHTML = Math.round(hp);
    };
    StatController.prototype.updateCalcArmor = function()
    {
        let items = SlotManager.getEquippedItems();
        let armor = 0;
        for(let i=0; i<items.length; i++)
        {
            armor += StatManager.getArmorForItem(items[i]);
        }

        //apply any multiplicative armor bonuses ("gives +% armor")
        let multArmor = StatManager.getMultiplierForStat('armor');
        armor *= multArmor;

        this.calcElArmor.innerHTML = Math.round(armor);
    };
    StatController.prototype.updateCalcDmgReduction = function()
    {
        let armor = parseInt(this.calcElArmor.innerHTML);
        let armorReduc = armor / (armor + (240 * 70) + 800);
        let bonusReduc = StatManager.getMultiplierForStat('dmgReduc') - 1;
        let internalReduc = StatManager.getMultiplierForStat('dmgReducIE') - 1;
        internalReduc += bonusReduc; //any overall dmg reduction also counts as internal/elemental reduction

        //internal/elemental is not factored in the final displayed stat UNLESS it's greater than the value that would get displayed (thanks BioWare...)
        let totalReduc = (armorReduc + bonusReduc);
        if(internalReduc > totalReduc)
        {
            totalReduc = internalReduc;
        }

        this.calcElDmgReduction.innerHTML = (100*totalReduc).toFixed(2);
    };
    StatController.prototype.updateCalcDefense = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcShield = function()
    {
        //TODO
    };
    StatController.prototype.updateCalcAbsorb = function()
    {
        //TODO
    };
    return new StatController();
})();
declareReady('StatController.js', function(){StatController.init();});