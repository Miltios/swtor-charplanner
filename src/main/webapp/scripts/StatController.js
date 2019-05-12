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
                StatManager.setStat(statName, stats[statName]);
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
        //this.updateCalcDmgBonusMR(); //must be handled in DmgPri
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
        this.updateCalcDmgBonusMR(); //must be updated first, as this calculation is used for mainhand dmg
        let weapon = SlotManager.getSlot('mainhand').getItem();
        let dmg = [1,5]; //dmg value for fists, only applies if unarmed
        if(weapon !== null)
        {
            dmg = StatManager.getDmgForItem(weapon);
        }
        let bonus = StatManager.getStat('dmgMR');
        dmg[0] += bonus;
        dmg[1] += bonus;
        this.calcElDmgPri.innerHTML = dmg[0] + ' - ' + dmg[1];
    };
    StatController.prototype.updateCalcDmgSec = function()
    {
        let weapon = SlotManager.getSlot('offhand').getItem();
        if(weapon === null)
        {
            //TODO:should probably base this by class instead
            this.calcElDmgSec.innerHTML = '0'
            this.calcElDmgSec.parentNode.style.display = 'none';
        }
        else if(['pistol', 'saber', 'knife', 'shotgun'].indexOf(weapon.type.toLowerCase()) !== -1)
        {
            let dmg = StatManager.getDmgForItem(weapon);
            dmg[0] *= 0.3;
            dmg[1] *= 0.3;
            this.calcElDmgSec.innerHTML = dmg[0].toFixed(0) + ' - ' + dmg[1].toFixed(0);
            this.calcElDmgSec.parentNode.style.display = '';
        }
        else
        {
            this.calcElDmgSec.innerHTML = '0'
            this.calcElDmgSec.parentNode.style.display = 'none';
        }
    };
    StatController.prototype.updateCalcDmgBonusMR = function()
    {
        //bonus dmg formula ((mastery*0.2*(1+x)) + (power*0.23*(1+y))) * (1+z)
        //x is the sum of multiplicative mastery bonuses (e.g. mark of power)
        //y is the sum of multiplicative power bonuses
        //z is the sum of multiplicative bonus dmg (e.g. unnatural might)
        let dmgMastery = StatManager.getStat('mastery') * 0.2;
        let bonusMastery = StatManager.getMultiplierForStat('mastery');
        if(Settings.getClassBuffs().indexOf('Mastery') !== -1)
        {
            bonusMastery += 0.05;
        }
        dmgMastery *= bonusMastery;

        let dmgPower = StatManager.getStat('power') * 0.23;
        dmgPower *= StatManager.getMultiplierForStat('power');

        let dmg = dmgMastery + dmgPower;
        let bonusDmg = 1;
        //bonusDmg += StatManager.getMultiplierForStat('dmgMR') - 1; //apparently doesn't get applied here
        //bonusDmg += StatManager.getMultiplierForStat('dmgAll') - 1; //apparently doesn't get applied here
        if(Settings.getClassBuffs().indexOf('Dmg') !== -1)
        {
            bonusDmg += 0.05;
        }
        dmg *= bonusDmg;
        StatManager.setStat('dmgMR', parseInt(dmg.toFixed(0))); //BW likes to do their rounding BEFORE using this stat for further calculations.  We don't judge...
        this.calcElDmgBonusMR.innerHTML = dmg.toFixed(1);
    };
    StatController.prototype.updateCalcAccuracy = function()
    {
        //Accuracy formula: 30*(1-((1-(.01/.3))^(accuracy/70))).  As a reminder, "^" is NOT the operator we want once we translate this to actual code.

        let accRating = StatManager.getStat('accuracy');
        let baseAcc = 30*(1-((1-(.01/.3))**(accRating/70))); //0-100, not 0-1
        let bonusAcc = StatManager.getMultiplierForStat('accuracy')-1; //this is additive, so we want a non-value to be 0 instead of 1
        if(Settings.getCompanionBuffs().indexOf('MTank') !== -1)
        {
            bonusAcc += 0.01;
        }
        let accuracy = (100 + baseAcc + (100 * bonusAcc)).toFixed(2);
        this.calcElAccuracy.innerHTML = accuracy;
    };
    StatController.prototype.updateCalcCritChance = function()
    {
        //TODO: the "ideal" crit rating is 1796-2235 (depending on MR vs FT attacks), after which points should be put into mastery instead.  Find a way to convey this?
        //formula from crit stat: 30*(1-(1-(.01/.3))^(crit/56))
        //formula from mastery stat: 20*(1-(1-(.01/.2))^(mastery/385))
        let crit = StatManager.getStat('crit');
        let mastery = StatManager.getStat('mastery');
        let bonusCrit = StatManager.getMultiplierForStat('critChance')-1; //additive
        if(Settings.getCompanionBuffs().indexOf('MDPS') !== -1)
        {
            bonusCrit += 0.01;
        }
        let critChance = 0.05; //base chance for all classes
        critChance += bonusCrit;
        critChance *= 100;
        let critFromCrit = 30*(1-(1-(.01/.3))**(crit/56));
        let critFromMastery = 20*(1-(1-(.01/.2))**(mastery/385));
        critChance += critFromCrit;
        critChance += critFromMastery;
        this.calcElCritChance.innerHTML = critChance.toFixed(2);
    };
    StatController.prototype.updateCalcCritMult = function()
    {
        //formula from crit is the same as above, while mastery is not factored here
        let crit = StatManager.getStat('crit');
        let bonusCrit = StatManager.getMultiplierForStat('critDmg')-1; //additive
        let critDmg = 0.50; //base multiplier for all classes
        critDmg += bonusCrit;
        critDmg *= 100;
        critDmg += 30*(1-(1-(.01/.3))**(crit/56));
        this.calcElCritMult.innerHTML = critDmg.toFixed(2);
    };
    StatController.prototype.updateCalcDmgBonusFT = function()
    {
        //bonus FT dmg formula ((mastery*0.2*(1+x)) + ((power+FTpower)*0.23*(1+y))) * (1+z)
        //x is the sum of multiplicative mastery bonuses (e.g. mark of power)
        //y is the sum of multiplicative power bonuses
        //z is the sum of multiplicative bonus dmg (e.g. unnatural might)
        let dmgMastery = StatManager.getStat('mastery') * 0.2;
        let bonusMastery = StatManager.getMultiplierForStat('mastery');
        if(Settings.getClassBuffs().indexOf('Mastery') !== -1)
        {
            bonusMastery += 0.05;
        }
        dmgMastery *= bonusMastery;

        let dmgPower = StatManager.getStat('power');
        let mainhand = SlotManager.getSlot('mainhand').getItem();
        let offhand = SlotManager.getSlot('mainhand').getItem();
        dmgPower += StatManager.getFTPowerForItem(mainhand);
        dmgPower += StatManager.getFTPowerForItem(offhand);
        dmgPower *= 0.23;
        dmgPower *= StatManager.getMultiplierForStat('power');

        let dmg = dmgMastery + dmgPower;
        let bonusDmg = 1;
        //bonusDmg += StatManager.getMultiplierForStat('dmgFT') - 1; //surprisingly, this does not get applied here
        //bonusDmg += StatManager.getMultiplierForStat('dmgAll') - 1; //probably doesn't get applied here
        if(Settings.getClassBuffs().indexOf('Dmg') !== -1)
        {
            bonusDmg += 0.05;
        }
        dmg *= bonusDmg;
        //StatManager.setStat('dmg', parseInt(dmg.toFixed(0)));
        this.calcElDmgBonusFT.innerHTML = dmg.toFixed(1);
    };
    StatController.prototype.updateCalcHealing = function()
    {
        //bonus healing formula ((mastery*0.14*(1+x)) + ((power+FTpower)*0.17*(1+y))) * (1+z)
        //x is the sum of multiplicative mastery bonuses (e.g. mark of power)
        //y is the sum of multiplicative power bonuses
        //z is the sum of multiplicative bonus healing (e.g. unnatural might)
        let healMastery = StatManager.getStat('mastery') * 0.14;
        let bonusMastery = StatManager.getMultiplierForStat('mastery');
        /*if(Settings.getClassBuffs().indexOf('Mastery') !== -1)
        {
            bonusMastery += 0.05; //already done in getMultiplierForStat
        }*/
        healMastery *= bonusMastery;

        let healPower = StatManager.getStat('power');
        let mainhand = SlotManager.getSlot('mainhand').getItem();
        let offhand = SlotManager.getSlot('mainhand').getItem();
        healPower += StatManager.getFTPowerForItem(mainhand);
        healPower += StatManager.getFTPowerForItem(offhand);
        healPower *= 0.17;
        healPower *= StatManager.getMultiplierForStat('power');

        let heal = healMastery + healPower;
        let bonusHeal = 1;
        //bonusDmg += StatManager.getMultiplierForStat('bonusHeal') - 1; //surprisingly, this does not get applied here
        //bonusDmg += StatManager.getMultiplierForStat('dmgFT') - 1; //probably doesn't get applied here
        //bonusDmg += StatManager.getMultiplierForStat('dmgAll') - 1; //probably doesn't get applied here
        if(Settings.getClassBuffs().indexOf('Dmg') !== -1)
        {
            bonusHeal += 0.05;
        }
        heal *= bonusHeal;
        //StatManager.setStat('healing', parseInt(heal.toFixed(0)));
        this.calcElHealing.innerHTML = heal.toFixed(1);
    };
    StatController.prototype.updateCalcAlacrity = function()
    {
        //TODO: Tier 1 Alacrity = 7.143%, Tier 2 = 15.385%.  Ideally find some way to convey this.
        //alacrity formula: 30*(1-(1-(.01/.3))^(alacrity/87.5))
        let alacrity = StatManager.getStat('alacrity');
        let bonusAlac = StatManager.getMultiplierForStat('alacrity')-1; //additive
        let alacPerc = 30*(1-(1-(.01/.3))**(alacrity/87.5));
        alacPerc += (100 * bonusAlac);
        this.calcElAlacrity.innerHTML = alacPerc.toFixed(2);
    };
    StatController.prototype.updateCalcHealth = function()
    {
        //Health formula: (Base Health+[Endurance×12×(1+x)])×(1+y)
        //x is the sum of any multiplicative increases to Endurance (e.g. Hunter's Boon buff or assassin training)
        //y is the sum of any multiplicative increases to Health (e.g. ranged tank companion bonus)
        //TODO:does this mean that endurance multipliers affect HP twice?

        let baseHealth = 23750; //base HP from being lvl 70
        let endurance = StatManager.getStat('endurance');
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
        armor = Math.round(armor);

        StatManager.setStat('armor', armor);
        this.calcElArmor.innerHTML = armor;
    };
    StatController.prototype.updateCalcDmgReduction = function()
    {
        let armor = StatManager.getStat('armor');
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
        //defense formula: 30*(1-(1-(.01/.3))^(defense/84))
        let defense = StatManager.getStat('defense');
        let bonusMR = StatManager.getMultiplierForStat('defMR')-1; //additive
        let bonusFT = StatManager.getMultiplierForStat('defFT')-1; //additive
        let bonusAll = StatManager.getMultiplierForStat('defAll')-1; //additive
        bonusMR += bonusAll;
        bonusFT += bonusAll;
        bonusMR += 0.05; //innate MR defense for all classes

        //from this point on we deal with 0-100 scale instead of 0-1
        bonusMR = bonusMR * 100;
        bonusFT = bonusFT * 100;
        let defChance = 30*(1-(1-(.01/.3))**(defense/84));
        defChance += bonusMR; //defense from gear ONLY affects MR, not FT

        //as with dmg reduction, FT defense is not factored unless it's greater than MR
        if(bonusFT >= defChance)
        {
            defChance = bonusFT;
        }
        this.calcElDefense.innerHTML = defChance.toFixed(2);
    };
    StatController.prototype.updateCalcShield = function()
    {
        //shield chance formula: 50*(1-(1-(.01/.5))^(shield/54.6))
        //can't shield anything without a shield equipped
        let shieldChance = 0;
        let item = SlotManager.getSlot('offhand').getItem();
        if(item && item.type === 'shield')
        {
            shieldChance += 0.05; //automatic bonus for having a shield equipped
            shieldChance += StatManager.getMultiplierForStat('shieldChance')-1; //additive
            let shield = StatManager.getStat('shield');
            shieldChance = shieldChance * 100; //from this point on we deal with 0-100 scale instead of 0-1
            shieldChance += 50*(1-(1-(.01/.5))**(shield/54.6));
        }
        this.calcElShield.innerHTML = shieldChance.toFixed(2);
    };
    StatController.prototype.updateCalcAbsorb = function()
    {
        //absorption formula: 50*(1-(1-(.01/.5))^(absorb/45.5))
        //can't shield anything without a shield equipped
        let absorbPerc = 0;
        let item = SlotManager.getSlot('offhand').getItem();
        if(item && item.type === 'shield')
        {
            absorbPerc += 0.20; //automatic bonus for having a shield equipped
            absorbPerc += StatManager.getMultiplierForStat('absorbPerc')-1; //additive
            let absorb = StatManager.getStat('absorption');
            absorbPerc = absorbPerc * 100; //from this point on we deal with 0-100 scale instead of 0-1
            absorbPerc += 50*(1-(1-(.01/.5))**(absorb/45.5));
        }
        this.calcElAbsorb.innerHTML = absorbPerc.toFixed(2);
    };
    return new StatController();
})();
declareReady('StatController.js', function(){StatController.init();});