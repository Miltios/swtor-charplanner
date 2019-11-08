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
    }
    ImportExportController.prototype.init = function()
    {
        this.slots = [];
        let unsortedSlots = SlotManager.getAllCharSlots();
        for(let i=0; i<this.slotOrder.length; i++)
        {
            this.slots.push(unsortedSlots[this.slotOrder[i]]);
        }
    };
    ImportExportController.prototype.getExportString = function()
    {
        let str = this.getSettingsString();
        str += '|';
        str += this.getGearString();
        str += '|';
        str += this.getAugmentsString();
        return btoa(str); //honestly, base64 just looks more professional here; we don't actually need it
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
                        str += this.getItemAsString(item); //TODO:remember to give this a new ID when importing
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
                        str += this.getItemAsString(aug); //TODO:remember to give this a new ID when importing
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
        let itemStr = JSON.stringify(item);
        itemStr = itemStr.replace(/\,/g,'&com;'); //reserved delimiter
        itemStr = itemStr.replace(/\./g,'&dot;'); //reserved delimiter
        itemStr = itemStr.replace(/\|/g,'&pipe;'); //reserved delimiter

        return itemStr;
    };
    return new ImportExportController();
})();
declareReady('ImportExportController.js',  function(){ImportExportController.init()});