let Settings = (function()
{
    function Settings()
    {
        //declare vars
        this.ft;
        this.sfd;
        this.cd;
        this.sd;
        this.dc;
        this.dcSub;
        this.clb;
        this.clbSub;
        this.cob;
        this.cobSub;
        this.ilsc;
        this.ilMin;
        this.ilMax;
        this.stim = 'none';
        this.maxLevel = 75;
    }
    Settings.prototype.init = function()
    {
        //locate DOM elements
        this.ft = document.getElementById('factionToggle');
        this.sfd = document.getElementById('specFilterDropdown');
        this.cd = document.getElementById('classDropdown');
        this.sd = document.getElementById('specDropdown');
        this.dc = document.getElementById('datacronsCheckbox');
        this.dcSub = document.getElementsByClassName('datacrons-checkbox');
        this.clb = document.getElementById('classBuffsCheckbox');
        this.clbSub = document.getElementsByClassName('class-buffs-checkbox');
        this.cob = document.getElementById('companionBuffsCheckbox');
        this.cobSub = document.getElementsByClassName('companion-buffs-checkbox');
        this.ilsc = document.getElementById('itemListSettingsColor');
        this.ilscSub = this.ilsc.getElementsByClassName('item-color-checkbox');
        this.ilMin = document.getElementById('itemRatingMin');
        this.ilMax = document.getElementById('itemRatingMax');

        this.lastColor = null;
        this.oldLastColor = null;
        for(let i in this.ilscSub)
        {
            if(this.ilscSub.hasOwnProperty(i))
            {
                let box = this.ilscSub[i];
                if(box.checked)
                {
                    this.updateItemColorCheckboxes(box);
                }
            }
        }

        //make sure parent checkboxes are in line with their children
        this.updateDatacrons(null);
        this.updateClassBuffs(null);
        this.updateCompanionBuffs(null);


        let stims = document.getElementsByClassName('button-stim-selected');
        if(stims.length !== 1)
        {
            this.stims = 'none';
        }
        else
        {
            this.stims = stims[0].getAttribute('data-stim-type');
        }

        this.updateFactionSelections();
        log('Settings initialized.');
    };
    Settings.prototype.getFaction = function()
    {
        return this.ft.querySelector('.faction-select-button-checked').getAttribute('value');
    };
    Settings.prototype.getSpecFilter = function()
    {
        return this.sfd.value;
    };
    Settings.prototype.getSpec = function()
    {
        return this.sd.value;
    };
    Settings.prototype.getClass = function()
    {
        return this.cd.value;
    };
    Settings.prototype.getDatacrons = function()
    {
        //rishi, makeb, ossus, mek-sha, fleet, base game
        let datacrons = [];
        for(let i=0; i<this.dcSub.length; i++)
        {
            if(this.dcSub[i].checked)
            {
                let id = this.dcSub[i].id;
                id = id.substring(17);
                datacrons.push(id);
            }
        }
        return datacrons;
    };
    Settings.prototype.getClassBuffs = function()
    {
        //all class buffs by default
        /*
        * 5% mastery, 10% internal/elemental DR
        * 5% dmg/healing
        * 5% crit chance
        * 5% endurance
        */
        let buffs = [];
        for(let i=0; i<this.clbSub.length; i++)
        {
            if(this.clbSub[i].checked)
            {
                let id = this.clbSub[i].id;
                id = id.substring(18);
                buffs.push(id);
            }
        }
        return buffs;
    };
    Settings.prototype.getCompanionBuffs = function()
    {
        //all companion buffs by default
        /*
        * 1% Max HP (Ranged Tank; e.g. T7-O1)
        * 1% Critical Damage (Melee DPS; e.g. Torian Cadera)
        * 1% Healing Received (Healer; e.g. Malavai Quinn)
        * 1% Critical Chance (Ranged DPS; e.g. Aric Jorgan)
        * 1% Accuracy (Melee Tank; e.g. SCORPIO)
        */
        let buffs = [];
        for(let i=0; i<this.cobSub.length; i++)
        {
            if(this.cobSub[i].checked)
            {
                let id = this.cobSub[i].id;
                id = id.substring(22);
                buffs.push(id);
            }
        }
        return buffs;
    };
    Settings.prototype.getItemColors = function()
    {
        let colors = [];
        for(let i in this.ilscSub)
        {
            if(this.ilscSub.hasOwnProperty(i) && this.ilscSub[i].checked)
            {
                colors.push(this.ilscSub[i].value);
            }
        }
        return colors;
    }
    Settings.prototype.getItemRatings = function()
    {
        let ratings = [];
        let min = parseInt(this.ilMin.value);
        let max = parseInt(this.ilMax.value);
        for(let i=min; i<= max; i+=2)
        {
            ratings.push(i);
        }
        return ratings;
    };
    Settings.prototype.getWeaponTypeForSlot = function(slotName)
    {
        let className = this.getClass();
        let faction = this.getFaction();
        if(faction === 'pub') //HACK: "mando" etc. normally don't exist because we track by imperial class names, but they have different offhands pubside
        {
            if(className === 'merc')
            {
                className = 'mando';
            }
            else if(className === 'sniper')
            {
                className = 'slinger';
            }
            else if(className === 'op')
            {
                className = 'scoundrel';
            }
        }
        if(slotName === 'mainhand')
        {
            switch(className)
            {
                case 'jugg':
                case 'mara':
                case 'sorc':
                    return 'saber';
                    break;
                case 'sin':
                    return 'dualsaber';
                    break;
                case 'merc':
                case 'scoundrel': //temporary pseudo-class
                case 'slinger': //temporary pseudo-class
                case 'pt':
                    return 'pistol';
                    break;
                case 'mando': //temporary pseudo-class
                    return 'cannon';
                    break;
                case 'op':
                    return 'rifle';
                    break;
                case 'sniper':
                    return 'sniper';
                    break;
            }
        }
        else if(slotName === 'offhand')
        {
            switch(className)
            {
                case 'mando': //temporary pseudo-class
                case 'pt':
                case 'jugg':
                case 'sin':
                case 'sorc':
                    let spec = this.getSpec();
                    if(['juggTank','sinTank','ptTank'].indexOf(spec) !== -1)
                    {
                        return 'shield';
                    }
                    else if(['ptSust', 'ptBurst', 'mercBurst', 'mercSust', 'mercHealer'].indexOf(spec) !== -1)
                    {
                        return 'generator';
                    }
                    else
                    {
                        return 'focus';
                    }
                    break;
                case 'merc':
                case 'slinger': //temporary pseudo-class
                    return 'pistol';
                    break;
                case 'mara':
                    return 'saber';
                    break;
                case 'op':
                case 'sniper':
                    return 'knife';
                    break;
                case 'scoundrel': //temporary pseudo-class
                    return 'shotgun';
                    break;
            }
        }
        return null;
    };
    Settings.prototype.getModTypeForDynamicSlot = function()
    {
        let slot = SlotManager.getCurrentSlot();
        if(slot === null)
        {
            return null;
        }
        let slotName = slot.getGenericName();
        if(slotName === 'mainhand' || slotName === 'offhand')
        {
            switch(this.getWeaponTypeForSlot(slotName))
            {
                case 'saber':
                case 'dualsaber':
                    return 'hilt';
                    break;
                case 'pistol':
                case 'rifle':
                case 'sniper':
                case 'cannon':
                case 'knife':
                case 'shotgun':
                    return 'barrel';
                    break;
                case 'shield':
                case 'generator':
                case 'focus':
                    return 'armoring';
                    break;
            }
        }
        return 'armoring';
    }
    Settings.prototype.updateDatacrons = function(checkbox)
    {
        this.updateNestedCheckboxes(checkbox, this.dc, this.dcSub);
    };
    Settings.prototype.updateClassBuffs = function(checkbox)
    {
        this.updateNestedCheckboxes(checkbox, this.clb, this.clbSub);
    };
    Settings.prototype.updateCompanionBuffs = function(checkbox)
    {
        this.updateNestedCheckboxes(checkbox, this.cob, this.cobSub);
    };
    Settings.prototype.updateNestedCheckboxes = function(checkbox, parent, children)
    {
        if(checkbox === parent)
        {
            parent.indeterminate = false;
            for(let i in children)
            {
                if(children.hasOwnProperty(i))
                {
                    children[i].checked = parent.checked;
                }
            }
        }
        else
        {
            let allTrue = true;
            let allFalse = true;
            for(let i in children)
            {
                if(children.hasOwnProperty(i))
                {
                    let box = children[i];
                    if(box.checked)
                    {
                        allFalse = false;
                    }
                    else if(!box.checked)
                    {
                        allTrue = false;
                    }
                }
            }
            if(allTrue)
            {
                parent.checked = true;
                parent.indeterminate = false;
            }
            else if(allFalse)
            {
                parent.checked = false;
                parent.indeterminate = false;
            }
            else
            {
                parent.indeterminate = true;
            }
        }
        StatController.updateCharStats(); //HACK:probably shouldn't be triggering this here, but it's reliable
    };
    Settings.prototype.updateFactionSelections = function()
    {
        let faction = this.getFaction();
        let oldFaction;
        if(faction === 'pub')
        {
            oldFaction = 'imp';
        }
        else
        {
            oldFaction = 'pub';
        }
        this.updateFactionDropdown(this.cd, faction, oldFaction);
        this.updateFactionDropdown(this.sd, faction, oldFaction);
    };
    Settings.prototype.updateFactionButtons = function(el)
    {
        let buttons = this.ft.getElementsByClassName('faction-select-button');
        for(let i=0; i<buttons.length; i++)
        {
            buttons[i].classList.remove('faction-select-button-checked');
        }
        el.classList.add('faction-select-button-checked');
    }
    Settings.prototype.updateFactionDropdown = function(dropdown, faction, oldFaction)
    {
        if(!dropdown)
        {
            console.error('No dropdown specified for updateFactionDropdown!');
            return;
        }
        let selected = dropdown.selectedOptions[0];
        if(!selected || !selected.classList.contains('faction-' + oldFaction))
        {
            return;
        }
        let value = selected.value;
        let options = dropdown.getElementsByClassName('faction-' + faction);
        for(let i in options)
        {
            if(options.hasOwnProperty(i) && options[i].value === value)
            {
                options[i].selected = true;
                break;
            }
        }
    };
    Settings.prototype.selectClass = function(value)
    {
        if(!value || typeof value !== 'string')
        {
            console.error('Invalid class!');
            return;
        }
        this.selectFactionDropdown(this.cd, value);
    };
    Settings.prototype.selectSpec = function(value)
    {
        if(!value || typeof value !== 'string')
        {
            console.error('Invalid spec!');
            return;
        }
        this.selectFactionDropdown(this.sd, value);
    };
    Settings.prototype.selectFactionDropdown = function(dropdown, value)
    {
        let options = dropdown.getElementsByClassName('faction-' + this.getFaction());
        let match = false;
        for(let i in options)
        {
            if(options.hasOwnProperty(i) && options[i].value === value)
            {
                options[i].selected = true;
                match = true;
                break;
            }
        }
        if(!match)
        {
            console.error('Could not find dropdown option "' + value + '" for faction "' + this.getFaction() + '"!');
        }
    };
    Settings.prototype.updateSpecDropdown = function()
    {
        let className = this.getClass();
        let specs = SpecManager.getSpecsForClass(className);
        this.sd.innerHTML = '';
        let first = true;
        for(let i in specs)
        {
            if(specs.hasOwnProperty(i))
            {
                let spec = specs[i];
                let impOption = document.createElement('option');
                let pubOption = document.createElement('option');
                impOption.classList.add('faction-imp');
                pubOption.classList.add('faction-pub');
                impOption.value = spec;
                pubOption.value = spec;
                impOption.innerHTML = SpecManager.getSpecName(spec);
                pubOption.innerHTML = SpecManager.getSpecMirrorName(spec);
                if(first)
                {
                    if(this.getFaction() == 'imp')
                    {
                        impOption.selected = true;
                    }
                    else
                    {
                        pubOption.selected = true;
                    }
                    first = false;
                }
                this.sd.appendChild(impOption);
                this.sd.appendChild(pubOption);
            }
        }
    };
    Settings.prototype.updateItemColorCheckboxes = function(el)
    {
        //first, handle if user is un-checking one of the existing two boxes
        if(!el.checked)
        {
            if(el.value === this.lastColor)
            {
                this.lastColor = this.oldLastColor;
                this.oldLastColor = null;
            }
            else
            {
                this.oldLastColor = null;
            }
            //DomController.updateItemColorLists();
            //return;
        }
        //otherwise, make sure that no more than two boxes can be checked at once
        else if(this.lastColor === null)
        {
            this.lastColor = el.value;
            //return;
        }
        else if(this.oldLastColor === null)
        {
            this.oldLastColor = this.lastColor;
            this.lastColor = el.value;
            //return;
        }
        else
        {
            document.getElementById('gearQualityCheckbox' + Utilities.capitalizeFirstLetter(this.oldLastColor)).checked = false;
            this.oldLastColor = this.lastColor;
            this.lastColor = el.value;
        }
        DomController.updateItemColorLists();
    };
    Settings.prototype.updateStim = function(el)
    {
        if(!el || !el.classList.contains('button-stim') || !el.getAttribute('data-stim-type'))
        {
            console.error('Invalid target for updateStim: ' + el);
            return;
        }
        let id = el.id;
        if(el.classList.contains('button-stim-selected'))
        {
            el.classList.remove('button-stim-selected');
            this.stim = 'none';
        }
        else
        {
            let selected = document.getElementsByClassName('button-stim-selected');
            for(let i=0; i<selected.length; i++)
            {
                selected[i].classList.remove('button-stim-selected');
            }
            el.classList.add('button-stim-selected');
            this.stim = el.getAttribute('data-stim-type');
        }
    };
    Settings.prototype.getStim = function()
    {
        return this.stim;
    };
    Settings.prototype.getMaxLevel = function()
    {
        return this.maxLevel;
    };
    Settings.prototype.setMaxLevel = function(level)
    {
        this.maxLevel = level;
    };
    Settings.prototype.deselectAll = function(section)
    {
        //if "section" parameter is blank or absent, just deselect everything
        if(!section || section === 'datacrons')
        {
            this.clearSection(this.dcSub);
            this.updateDatacrons(null);
        }
        if(!section || section === 'classBuffs')
        {
            this.clearSection(this.clbSub);
            this.updateClassBuffs(null);
        }
        if(!section || section === 'companionBuffs')
        {
            this.clearSection(this.cobSub);
            this.updateCompanionBuffs(null);
        }
    };
    Settings.prototype.clearSection = function(checkboxes)
    {
        //does NOT recalculate anything based on these changes.  If recalc is needed, trigger manually after calling.
        for(let i in checkboxes)
        {
            if(checkboxes.hasOwnProperty(i))
            {
                checkboxes[i].checked = false;
            }
        }
    };
    return new Settings();
})();
declareReady('Settings.js', function(){Settings.init()});