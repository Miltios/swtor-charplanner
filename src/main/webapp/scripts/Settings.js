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

        this.updateFactionSelections();
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
    }
    return new Settings();
})();
declareReady('Settings.js', function(){Settings.init()});