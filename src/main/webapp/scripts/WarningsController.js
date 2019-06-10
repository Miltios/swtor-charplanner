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
        this.checkAugments();
        this.checkRelics();

        this.updateText();
    };
    WarningsController.prototype.checkAlacrity = function()
    {
        //TODO
        //check alacrity above tier 3
        //check alacrity just below tier cutoff
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
        //TODO
        //check defense above 3k
        //check defense above 2k?
    };
    WarningsController.prototype.checkShieldAbsorb = function()
    {
        //TODO
        //check absorb higher than shield
        //check very large difference between shield/absorb
        //check shield XOR absorb at zero
    };
    WarningsController.prototype.checkAugments = function()
    {
        //TODO
        //check that all aug slots are filled
    };
    WarningsController.prototype.checkRelics = function()
    {
        //TODO
        //check for duplicate relics
        //check for crappy relics
        //check for off-class relics
        let relic1 = SlotManager.getSlot('relic1').getItem();
        let relic2 = SlotManager.getSlot('relic2').getItem();
        let type1 = null;
        let type2 = null;
        if(relic1 !== null)
        {
            type1 = relic1.name.toLowerCase().split('relic of ')[1];
        }
        if(relic2 !== null)
        {
            type2 = relic2.name.toLowerCase().split('relic of ')[1];
        }
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
    };
    return new WarningsController();
})();
declareReady('WarningsController.js', function(){WarningsController.init()});