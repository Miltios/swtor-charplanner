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
        this.ilsr;
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
        this.ilsr = document.getElementById('itemListSettingsRating');
        this.ilsrSub = this.ilsr.getElementsByClassName('item-rating-checkbox');

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

        this.updateFactionSelections(); //TODO:if user selects a republic class/spec and soft-refreshes, stuff gets screwy
        log('Settings initialized.');
    };
    Settings.prototype.getFaction = function()
    {
        return this.ft.querySelector('input:checked').value;
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
        //rishi, makeb, ossus, fleet, base game
        return null;
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
        return null;
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
        return null;
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
        for(let i in this.ilsrSub)
        {
            if(this.ilsrSub.hasOwnProperty(i))
            {
                let box = this.ilsrSub[i];
                //'232-236'
                if(box.checked)
                {
                    let min = parseInt(box.value.split('-')[0]);
                    let max = parseInt(box.value.split('-')[1]);
                    for(let j=min; j<=max; j+=2) //+=2 because there are no odd-numbered item ratings that we know of
                    {
                        ratings.push(j);
                    }
                }
            }
        }
        return ratings;
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
                pubOption.innerHTML = SpecManager.getSpecMirror(spec);
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
    }
    return new Settings();
})();
declareReady('Settings.js', function(){Settings.init()});