let WarningsController = (function()
{
    function WarningsController()
    {
        //declare vars
        this.warnings = [];
        this.wrapper;
        this.content;
    }
    WarningsController.prototype.init = function()
    {
        //locate DOM elements
        this.wrapper = document.getElementById('warningsWrapper');
        this.content = document.getElementById('warningsContent');

        log('WarningsController initialized.');
    };
    WarningsController.prototype.show = function()
    {
        this.wrapper.style.display = '';
    };
    WarningsController.prototype.hide = function()
    {
        this.wrapper.style.display = 'none';
    };
    WarningsController.prototype.updateText = function() //TODO:sort by severity?
    {
        this.content.innerHTML = '';
        for(let i=0; i<this.warnings.length; i++)
        {
            let el = this.getElFromWarning(this.warnings[i]);
            this.content.appendChild(el);
        }
        if(this.warnings.length > 0)
        {
            this.show();
        }
        else
        {
            this.hide();
        }
    };
    WarningsController.prototype.getElFromWarning = function(warning)
    {
        let el = document.createElement('div');
        el.className = 'warnings-item warning-severity-' + warning.severity;

        let titleEl = document.createElement('div');
        titleEl.className = 'warning-title';
        titleEl.innerHTML = warning.title;
        el.appendChild(titleEl);

        let textEl = document.createElement('div');
        textEl.className = 'warning-text';
        textEl.innerHTML = warning.text;
        el.appendChild(textEl);

        return el;
    };
    WarningsController.prototype.updateWarnings = function()
    {
        this.warnings = [];

        this.checkAlacrity();
        this.checkAccuracy();
        this.checkDefense();
        this.checkShieldAbsorb();
        this.checkRelics();
        this.checkCrystals();

        this.updateText();
    };
    WarningsController.prototype.checkAlacrity = function()
    {
        //T1: 7.142
        //T2: 7.143-15.384
        //T3: 15.385
        //not done: check alacrity just below tier cutoff?
        let alacrity = StatManager.getStat('alacrityperc');
        let role = SpecManager.getRoleFromSpec(Settings.getSpec());
        if(alacrity > 15.7)
        {
            this.warnings.push({
                id:'highAlacrity',
                title:'High alacrity',
                severity:'high',
                text:'Your alacrity is significantly above tier 3 (15.385%).  This is the fastest possible GCD, so additional alacrity is mostly wasted.'
            });
        }
        if(role === 'tank' && alacrity > 0)
        {
            this.warnings.push({
                id:'tankAlacrity',
                title:'Alacrity on tank spec',
                severity:'low',
                text:'You have selected a tank spec, but your build includes some alacrity.  This is mostly wasted, unless you are deliberately using a skank build.'
            });
        }
    };
    WarningsController.prototype.checkAccuracy = function()
    {
        let accuracy = StatManager.getStat('accuracy');
        let spec = Settings.getSpec().toLowerCase();
        if(spec.indexOf('tank') !== -1)
        {
            if(accuracy > 0)
            {
                this.warnings.push({
                    id:'tankAccuracy',
                    title:'Accuracy on tank spec',
                    severity:'high',
                    text:'You have selected a tank spec, but your build includes some accuracy.  This is entirely wasted, as tanks never miss; try swapping for some shield/absorb/defense/endurance instead.'
                });
            }
        }
        else if(spec.indexOf('heal') !== -1)
        {
            if(accuracy > 0)
            {
                this.warnings.push({
                    id:'healAccuracy',
                    title:'Accuracy on healer spec',
                    severity:'medium',
                    text:'You have selected a healer spec, but your build includes some accuracy.  This is usually wasted, as healers never miss friendly targets.  Try swapping for other stats unless you are specifically aiming for a high-accuracy build.'
                });
            }
        }
        else
        {
            let calcAccuracy = parseFloat(StatController.calcElAccuracy.innerHTML);
            if(calcAccuracy < 109.99)
            {
                this.warnings.push({
                    id:'lowAccuracy',
                    title:'Low accuracy',
                    severity:'medium',
                    text:'Your accuracy is below the recommended level for raiding (110%).  You will lose a significant amount of DPS from missed attacks until this is fixed.'
                });
            }
            else if(calcAccuracy >= 111) //slightly more than one augment over the target
            {
                this.warnings.push({
                    id:'highAccuracy',
                    title:'High accuracy',
                    severity:'medium',
                    text:'Your accuracy is well above the recommended level for raiding (110%).  This extra is generally wasted; most DPS builds should try to get as close to the target as possible without going under.'
                });
            }
        }
    };
    WarningsController.prototype.checkDefense = function()
    {
        let defense = StatManager.getStat('defense');
        let role = SpecManager.getRoleFromSpec(Settings.getSpec());
        if(role === 'tank')
        {
            if(defense > 3500)
            {
                this.warnings.push({
                    id:'highDefense',
                    title:'High defense',
                    severity:'low',
                    text:'Your defense is above the recommended level for raiding.  Extra defense still helps, but it gives diminishing returns; you may want to spend this on other stats instead.'
                });
            }
            else if(defense < 2100)
            {
                this.warnings.push({
                    id:'lowDefense',
                    title:'Low defense',
                    severity:'low',
                    text:'Your defense is below the recommended level for raiding as a tank.  You may find yourself taking too much damage until you raise it further.'
                });
            }
        }
        else if(defense > 0)
        {
            this.warnings.push({
                id:'defenseClass',
                title:'Defense for non-tank',
                severity:'medium',
                text:'Your build includes defense, but you are not in a tank spec.'
            });
        }
    };
    WarningsController.prototype.checkShieldAbsorb = function()
    {
        let shield = StatManager.getStat('shieldchance');
        let absorb = StatManager.getStat('absorbperc');
        let role = SpecManager.getRoleFromSpec(Settings.getSpec());

        //check very large difference between shield/absorb
        if(shield/absorb > 2)
        {
            this.warnings.push({
                id:'shieldAbsorbGap',
                title:'Shield/Absorb imbalance',
                severity:'medium',
                text:'Your Shield chance is much higher than your Absorption.  Shield and Absorb are multiplied together to calculate damage reduction, so you will get the most overall damage reduction by having them about equal.'
            });
        }

        //check absorb higher than shield
        if(absorb > shield)
        {
            this.warnings.push({
                id:'absorbOverShield',
                title:'Absorb higher than Shield',
                severity:'low',
                text:'Your Absorb percentage is higher than your Shield chance.  You will get the most overall damage reduction by having them about equal, ' +
                    'or you can get more predictable damage by having shield higher than absorb.  Note that different classes can get different ' +
                    'shield/absorb boosts during normal rotation.'
            });
        }

        //check shield XOR absorb at zero
        if(!(shield === 0) != !(absorb === 0)) //HACK: logical XOR, because JS doesn't have one
        {
            this.warnings.push({
                id:'shieldAbsorbZero',
                title:'Shield or Absorb at zero',
                severity:'high',
                text:'The Shield and Absorb stats are multiplied together to calculate damage reduction.  If one of them is at zero, you will gain no benefit from the other!'
            });
        }

        //check shield/absorb on non-tank spec
        if(role !== 'tank' && (StatManager.getStat('shield') > 0 || StatManager.getStat('absorption') > 0))
        {
            this.warnings.push({
                id:'shieldClass',
                title:'Shield/Absorb for non-tank spec',
                severity:'medium',
                text:'Your build includes shield/absorb stats, but you are not in a tank spec.'
            });
        }

        //check offhand shield not equipped
        if(role === 'tank')
        {
            let offhand = SlotManager.getSlot('offhand').getItem();
            if(offhand !== null && offhand.type !== 'shield')
            {
                this.warnings.push({
                    id:'noShield',
                    title:'Shield not equipped',
                    severity:'high',
                    text:'Your build includes shield/absorb stats, but you do not have a shield equipped!  You gain no benefit from these stats without a shield.'
                });
            }
        }
    };
    WarningsController.prototype.checkRelics = function()
    {
        let relic1 = SlotManager.getSlot('relic1').getItem();
        let relic2 = SlotManager.getSlot('relic2').getItem();
        let type1 = null;
        let type2 = null;
        if(relic1 !== null)
        {
            type1 = relic1.name.toLowerCase().split('relic of ')[1];
            if(type1.indexOf('the') === 0)
            {
                type1 = type1.substring(4);
            }
        }
        if(relic2 !== null)
        {
            type2 = relic2.name.toLowerCase().split('relic of ')[1];
            if(type2.indexOf('the') === 0)
            {
                type2 = type2.substring(4);
            }
        }

        //check for duplicate relics
        if(relic1 !== null && relic2 !== null)
        {
            if(type1 === type2)
            {
                this.warnings.push({
                    id:'duplicateRelic',
                    title:'Duplicate relics',
                    severity:'high',
                    text:'You have selected two relics with the same effect.  These do not stack!'
                });
            }
        }

        //check for crappy relics
        if([type1, type2].indexOf('ephemeral mending') !== -1)
        {
            this.warnings.push({
                id:'relicEphemeral',
                title:'Bad relic: Ephemeral mending',
                severity:'medium',
                text:'The ephemeral mending relic gives objectively less healing output than a focused retribution or serendipitous assault.'
            });
        }
        if([type1, type2].indexOf('devastating vengeance') !== -1)
        {
            this.warnings.push({
                id:'relicDevastating',
                title:'Bad relic: Devastating vengeance',
                severity:'low',
                text:'The devastating vengeance relic is generally less useful for DPS/healing output than a focused retribution or serendipitous assault.'
            });
        }
        if([type1, type2].indexOf('fortunate redoubt') !== -1)
        {
            this.warnings.push({
                id:'relicRedoubt',
                title:'Bad relic: Fortunate redoubt',
                severity:'low',
                text:'The fortunate redoubt relic is generally not recommended, as it results in spiky/unpredictable damage and most tanks have plenty of defense already.'
            });
        }
        if([type1, type2].indexOf('imperiling serenity') !== -1)
        {
            this.warnings.push({
                id:'relicImperiling',
                title:'Bad relic: Imperiling serenity',
                severity:'low',
                text:'The imperiling serenity relic is generally not recommended, as it results in spiky/unpredictable damage and most tanks have plenty of defense already.'
            });
        }
        if([type1, type2].indexOf('reactive warding') !== -1)
        {
            this.warnings.push({
                id:'relicReactive',
                title:'Bad relic: Reactive warding',
                severity:'medium',
                text:'The reactive warding relic is considered buggy, as its shielding effect cannot stack with any other shielding (e.g. static barrier, force scream, etc).'
            });
        }

        //check for off-class relics
        //we don't use the standard spec mapping here because some relics (e.g. serendipitous/focused) are good for all roles
        let role = SpecManager.getRoleFromSpec(Settings.getSpec());
        switch(role)
        {
            case 'tank':
                if(Utilities.arrayMatch([type1, type2], ['ephemeral mending']))
                {
                    this.warnings.push({
                        id:'relicNonTank',
                        title:'Off-class relic',
                        severity:'medium',
                        text:'You have selected a relic that is useless for tanking.'
                    });
                }
                break;
            case 'dps':
                if(Utilities.arrayMatch([type1, type2], ['ephemeral mending', 'imperiling serenity', 'reactive warding', 'shield amplification', 'fortunate redoubt', 'shrouded crusader']))
                {
                    this.warnings.push({
                        id:'relicNonDps',
                        title:'Off-class relic',
                        severity:'medium',
                        text:'You have selected a relic that is useless for DPSing.'
                    });
                }
                break;
            case 'healer':
                if(Utilities.arrayMatch([type1, type2], ['imperiling serenity', 'reactive warding', 'shield amplification', 'fortunate redoubt', 'shrouded crusader']))
                {
                    this.warnings.push({
                        id:'relicNonHealer',
                        title:'Off-class relic',
                        severity:'medium',
                        text:'You have selected a relic that is useless for healing.'
                    });
                }
                break;
        }
    };
    WarningsController.prototype.checkCrystals = function()
    {
        let mainhand = SlotManager.getSlot('mainhand').getItem();
        let offhand = SlotManager.getSlot('offhand').getItem();
        let crystalWarning = {
            id:'noCrystal',
            title:'No color crystal',
            severity:'high',
            text:'Your mainhand or offhand is missing a color crystal.  Each crystal gives a free +41 to a relevant stat, and they are considered a basic necessity of gearing--' +
                'to fix this, select your weapon and click the empty crystal slot.'
        };
        let hasWarning = false;
        if(mainhand !== null)
        {
            let mods = mainhand.getItemMods();
            let hasCrystal = false;
            for(let i=0; i< mods.length; i++)
            {
                if(mods[i].slot === 'crystal')
                {
                    hasCrystal = true;
                    break;
                }
            }
            if(!hasCrystal)
            {
                this.warnings.push(crystalWarning);
                hasWarning = true;
            }
        }
        if(offhand !== null && !hasWarning)
        {
            let mods = offhand.getItemMods();
            let hasCrystal = false;
            for(let i=0; i< mods.length; i++)
            {
                if(mods[i].slot === 'crystal')
                {
                    hasCrystal = true;
                    break;
                }
            }
            if(!hasCrystal)
            {
                this.warnings.push(crystalWarning);
            }
        }
    };
    return new WarningsController();
})();
declareReady('WarningsController.js', function(){WarningsController.init()});