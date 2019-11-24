/*=========README=========
* All changes to the encoded format MUST be backwards-compatible!
* Export strings are divided up first by pipe-delimited sections as follows: settings|gear|augments
* Within each section, they are further delimited by a period, and then a comma if an additional level is needed
* Order for settings: faction.class.spec.datacrons.classbuffs.companionbuffs.stim
* Order for gear slots: ear.implant1.implant2.wrists.relic1.relic2.head.chest.hands.waist.legs.feet.mainhand.offhand
* Order for augment slots: same as above
* Regular items are just referenced by their static itemId.
* Custom items start with a ~ and then spell out their properties in a JSON string (sanitized to remove our reserved delimiters)
*/

let ImportExportController = (function()
{
    function ImportExportController()
    {
        this.slots;
        this.slotOrder = ['ear', 'implant1', 'implant2', 'wrists', 'relic1', 'relic2', 'head', 'chest', 'hands', 'waist', 'legs', 'feet', 'mainhand', 'offhand'];
        this.popup;
        this.codeEl;
    }
    ImportExportController.prototype.init = function()
    {
        this.slots = [];
        let unsortedSlots = SlotManager.getAllCharSlots();
        for(let i=0; i<this.slotOrder.length; i++)
        {
            this.slots.push(unsortedSlots[this.slotOrder[i]]);
        }

        this.popup = document.getElementById('importExportEl');
        this.codeEl = document.getElementById('importExportCodeEl');

        this.importFromStorage();
    };
    ImportExportController.prototype.getExportString = function()
    {
        let str = this.getSettingsString();
        str += '|';
        str += this.getGearString();
        str += '|';
        str += this.getAugmentsString();
        return LZString.compressToBase64(str); //base64 forces ASCII compression (default is invalid UTF-16, which round-trips fine but can play badly with copy/paste)
    };
    ImportExportController.prototype.getSettingsString = function()
    {
        try
        {
            let str = Settings.getFaction();
            str += '.';
            str += Settings.getClass();
            str += '.';
            str += Settings.getSpec();
            str += '.';
            let datacrons = Settings.getDatacrons();
            str += datacrons.join(',');
            str += '.';
            let classbuffs = Settings.getClassBuffs();
            str += classbuffs.join(',');
            str += '.';
            let companionbuffs = Settings.getCompanionBuffs();
            str += companionbuffs.join(',');
            str += '.';
            str += Settings.getStim();

            return str;
        }
        catch(e)
        {
            console.error(e);
            return '';
        }
    };
    ImportExportController.prototype.getGearString = function()
    {
        try
        {
            let str = '';
            for(let i=0; i<this.slots.length; i++)
            {
                let item = this.slots[i].getItem();
                if(item !== null)
                {
                    if(item.id > 0)
                    {
                        str += item.id;
                    }
                    else
                    {
                        str += '~';
                        str += this.getItemAsString(item);
                    }
                }
                if(i<this.slots.length-1)
                {
                    str += '.';
                }
            }

            return str;
        }
        catch(e)
        {
            console.error(e);
            return '';
        }

    };
    ImportExportController.prototype.getAugmentsString = function()
    {
        try
        {
            let str = '';
            for(let i=0; i<this.slots.length; i++)
            {
                let aug = this.slots[i].augment;
                if(aug !== null)
                {
                    if(aug.id > 0)
                    {
                        str += aug.id;
                    }
                    else
                    {
                        str += '~';
                        str += this.getItemAsString(aug);
                    }
                }
                if(i<this.slots.length-1)
                {
                    str += '.';
                }
            }

            return str;
        }
        catch(e)
        {
            console.error(e);
            return '';
        }
    };
    ImportExportController.prototype.getItemAsString = function(item)
    {
        if(item === null)
        {
            return '';
        }
        let hasCustomMods = false;
        item.itemMods.map((modId) => {
            if(parseInt(modId) < 0)
            {
                hasCustomMods = true;
            }
        });
        if(hasCustomMods)
        {
            //can't just track the mods by ID, as they will lose their custom stats, so we spell them out like we did with custom items
            let clone = Object.assign({}, item); //shallow copy
            clone.itemMods = [];
            item.itemMods.map((modId) => {
                let mod = ItemManager.getItemModById(modId);
                mod.specs = []; //not needed
                clone.itemMods.push(mod);
            });
            item = clone;
        }

        let itemStr = JSON.stringify(item);
        itemStr = itemStr.replace(/\,/g,'&com;'); //reserved delimiter
        itemStr = itemStr.replace(/\./g,'&dot;'); //reserved delimiter
        itemStr = itemStr.replace(/\|/g,'&pipe;'); //reserved delimiter

        return itemStr;
    };
    ImportExportController.prototype.getItemFromString = function(str)
    {
        str = str.replace(/&com;/g, ',');
        str = str.replace(/&dot;/g, '.');
        str = str.replace(/&pipe;/g, '|');
        let item = JSON.parse(str);

        for(let i=0; i<item.itemMods.length; i++)
        {
            //if mods come back as full objects rather than numeric IDs, it means they're custom and have to be re-added to ItemManager
            let mod = item.itemMods[i];
            if(typeof mod === 'object')
            {
                item.itemMods[i] = ItemManager.addItemMod(mod); //comes back with a new, ItemManager-approved ID
            }
        }

        return ItemManager.addItem(item); //comes back with a new, ItemManager-approved ID
    };
    ImportExportController.prototype.importFromCode = function()
    {
        let result = this.importFromString(this.codeEl.value);
        switch(result)
        {
            case true:
                alert('Imported successfully!');
                DomController.hideItemPicker();
                this.hide();
                break;
            case 'EMPTY_STRING':
                alert('Please enter a code in the text box.');
                break;
            case 'INVALID_SECTIONS':
                alert('Invalid code.  Please try again or contact an administrator.');
                break;
            case 'INVALID_SETTINGS':
                alert('Invalid code.  Please try again or contact an administrator.');
                break;
            case 'INVALID_GEAR':
                alert('Your settings have been imported, but there was an error while processing your gear.  Please try again or contact an administrator.');
                break;
            case 'INVALID_AUGMENTS':
                alert('Your settings and gear have been imported, but there was an error while processing your augments.  Please try again or contact an administrator.');
                break;
        }
    };
    ImportExportController.prototype.importFromStorage = function()
    {
        this.importFromString(Utilities.getStorage('savedData'));
    };
    ImportExportController.prototype.exportToStorage = function()
    {
        Utilities.setStorage('savedData', this.getExportString());
    };
    ImportExportController.prototype.importFromString = function(str)
    {
        //return "true" or an error message
        if(!str)
        {
            return 'EMPTY_STRING';
        }
        str = LZString.decompressFromBase64(str);
        let codes = str.split('|');
        if(codes.length !== 3)
        {
            return 'INVALID_SECTIONS';
        }
        try
        {
            this.importSettingsFromString(codes[0]);
        }
        catch(e)
        {
            console.error(e);
            return 'INVALID_SETTINGS';
        }
        try
        {
            this.importGearFromString(codes[1]);
        }
        catch(e)
        {
            console.error(e);
            return 'INVALID_GEAR';
        }
        try
        {
            this.importAugmentsFromString(codes[2]);
        }
        catch(e)
        {
            console.error(e);
            return 'INVALID_AUGMENTS';
        }
        return true;
    };
    ImportExportController.prototype.importSettingsFromString = function(str)
    {
        let codes = str.split('.');

        //faction
        let factionEl = document.getElementsByClassName('faction-select-button-' + codes[0])[0];
        DomController.toggleFaction(factionEl);

        //class
        Settings.selectClass(codes[1]);
        Settings.updateSpecDropdown();

        //spec
        Settings.selectSpec(codes[2]);

        //datacrons
        Settings.deselectAll('datacrons');
        codes[3].split(',').map((datacron) => {
            document.getElementById('datacronsCheckbox' + datacron).checked = true;
        });
        Settings.updateDatacrons(null);

        //class buffs
        Settings.deselectAll('classBuffs');
        codes[4].split(',').map((buff) => {
            document.getElementById('classBuffsCheckbox' + buff).checked = true;
        });
        Settings.updateClassBuffs(null);

        //companion buffs
        Settings.deselectAll('companionBuffs');
        codes[5].split(',').map((buff) => {
            document.getElementById('companionBuffsCheckbox' + buff).checked = true;
        });
        Settings.updateCompanionBuffs(null);

        //stim
        let stim = codes[6];
        if(stim !== 'none')
        {
            Settings.updateStim(document.querySelector(`[data-stim-type="${stim}"]`));
        }
        else
        {
            let selected = document.getElementsByClassName('button-stim-selected');
            for(let i=0; i<selected.length; i++)
            {
                Settings.updateStim(selected[i]);
            }
        }
    };
    ImportExportController.prototype.importGearFromString = function(str)
    {
        let codes = str.split('.');
        for(let i=0; i<this.slots.length; i++)
        {
            let code = codes[i];
            let slot = this.slots[i];
            if(code[0] !== '~')
            {
                slot.setItem(ItemManager.getItemById(code));
            }
            else
            {
                code = code.substr(1);
                let item = this.getItemFromString(code);
                slot.setItem(item);
            }
        }
    };
    ImportExportController.prototype.importAugmentsFromString = function(str)
    {
        let codes = str.split('.');
        for(let i=0; i<this.slots.length; i++)
        {
            let code = codes[i];
            let slot = this.slots[i];
            if(code[0] !== '~')
            {
                slot.setAugment(ItemManager.getItemById(code));
            }
            else
            {
                code = code.substr(1);
                let aug = this.getItemFromString(code);
                slot.setAugment(aug);
            }
        }
    };
    ImportExportController.prototype.show = function()
    {
        this.codeEl.value = this.getExportString();
        this.popup.style.display = '';
        DomManager.showModalMask();
    };
    ImportExportController.prototype.hide = function()
    {
        this.popup.style.display = 'none';
        DomManager.hideModalMask();
    };
    return new ImportExportController();
})();
declareReady('ImportExportController.js',  function(){ImportExportController.init()});