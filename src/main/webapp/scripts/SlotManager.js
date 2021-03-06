let SlotManager = (function()
{
    function SlotManager()
    {
        //declare vars
        this.charSlotNames = ['ear', 'implant1', 'implant2', 'wrists', 'relic1', 'relic2', 'head', 'chest', 'hands', 'waist', 'legs', 'feet', 'mainhand', 'offhand'];
        this.itemSlotNames = ['dynamic', /*'armoring',*/ /*'barrel',*/ /*'hilt',*/ 'mod', 'enhancement', 'crystal'];
        this.charSlots = {};
        this.itemSlots = {};
        this.currentSlot = null;
        this.currentModSlot = null;

        this.ima;
        this.imaSlots;
    };
    SlotManager.prototype.init = function()
    {
        //TODO: do we define allowable subslots here or in Items?

        this.ima = document.getElementById('itemModdingArea');
        this.imaSlots = this.ima.getElementsByClassName('mod-slot');

        for(let i=0; i<this.charSlotNames.length; i++)
        {
            let name = this.charSlotNames[i];
            let slot = new Slot(name);
            switch(name)
            {
                case 'ear':
                case 'implant1':
                case 'implant2':
                case 'relic1':
                case 'relic2':
                    //none of the above allow internal modification
                    slot.allow('augment', true);
                    break;
                case 'wrists':
                case 'waist':
                    slot.allow('dynamic', true);
                    slot.allow('mod', true);
                    slot.allow('augment', true);
                    break;
                case 'mainhand':
                case 'offhand':
                    slot.allow('crystal', true);
                default:
                    slot.allow('dynamic', true);
                    slot.allow('mod', true);
                    slot.allow('enhancement', true);
                    slot.allow('augment', true);
            }
            this.charSlots[name] = slot;
        }

        for(let i=0; i<this.itemSlotNames.length; i++)
        {
            let name = this.itemSlotNames[i];
            let slot = new Slot(name, true);
            this.itemSlots[name] = slot;
        }

        log('SlotManager initialized.');
    };
    SlotManager.prototype.getSlot = function(name)
    {
        if(typeof this.charSlots[name] === 'object')
        {
            return this.charSlots[name];
        }
        return this.getModSlot(name); //if we don't find a char slot by that name, look for a mod slot instead.
    };
    SlotManager.prototype.getAllCharSlots = function()
    {
        return this.charSlots;
    };
    SlotManager.prototype.getSlotFromLinkEl = function(el)
    {
        if(!el || !(el.classList.contains('character-slot-link') || el.classList.contains('augment-slot-link')))
        {
            return null;
        }
        let parentId = el.parentNode.id; //e.g. "slotMainhand"
        parentId = parentId.substring(4); //trim the word "slot"
        parentId = parentId.toLowerCase();
        return this.getSlot(parentId);
    };
    SlotManager.prototype.getModSlot = function(name)
    {
        if(typeof this.itemSlots[name] === 'object')
        {
            return this.itemSlots[name];
        }
        if(name === 'barrel' || name === 'hilt' || name === 'armoring')
        {
            let slot = this.itemSlots['dynamic'];
            if(typeof slot === 'object')
            {
                return slot;
            }
        }
        if(name === 'all')
        {
            return this.itemSlots['crystal']; //TODO:HACK: This should be fixed in the DB, not here
        }
        return null;
    }
    SlotManager.prototype.getModSlotFromLinkEl = function(el)
    {
        if(!el || !el.classList.contains('mod-slot-link'))
        {
            return null;
        }
        let parentId = el.parentNode.id; //e.g. "slotEnhancement"
        parentId = parentId.substring(4); //trim the word "slot"
        parentId = parentId.toLowerCase();
        return this.getModSlot(parentId);
    }
    SlotManager.prototype.getCurrentSlot = function()
    {
        return this.currentSlot;
    }
    SlotManager.prototype.setCurrentSlot = function(slot)
    {
        let old = this.currentSlot;
        if(old !== null)
        {
            let el = old.getEl();
            el.classList.remove('slot-current');
        }
        this.currentSlot = slot;
        slot.getEl().classList.add('slot-current');
    }
    SlotManager.prototype.getCurrentModSlot = function()
    {
        return this.currentModSlot;
    }
    SlotManager.prototype.setCurrentModSlot = function(slot)
    {
        this.currentModSlot = slot;
    }
    SlotManager.prototype.getAllModSlots = function()
    {
        return this.itemSlots;
    }
    SlotManager.prototype.getImageForEmptySlot = function(slot)
    {
        let slotName = slot.getGenericName();
        if(slotName === null)
        {
            return 'empty_' + slotName + '.png';
        }
        let itemName = '';
        if(slotName === 'mainhand' || slotName === 'offhand')
        {
            let weaponType = Settings.getWeaponTypeForSlot(slotName);
            switch(weaponType)
            {
                case 'saber':
                case 'dualsaber':
                    itemName = '_saber';
                    break;
                case 'pistol':
                case 'rifle':
                case 'sniper':
                case 'cannon':
                    itemName = '_gun';
                    break;
                case 'knife':
                    itemName = '_knife';
                    break;
                case 'shotgun':
                    itemName = '_shotgun';
                    break;
                case 'shield':
                case 'generator':
                case 'focus':
                    itemName = '_shield';
                    break;
            }
        }
        return 'empty_' + slotName + itemName + '.png';
    };
    SlotManager.prototype.getImageForEmptyModSlot = function(slot)
    {
        let slotName = slot.getGenericName();
        if(slotName === 'dynamic')
        {
            let modType = Settings.getModTypeForDynamicSlot();
            if(modType !== null)
            {
                return 'empty_' + modType + '.png';
            }
        }
        return 'empty_' + slotName + '.png';
    };
    SlotManager.prototype.getEquippedItems = function()
    {
        let items = [];
        for(let slotName in this.charSlots)
        {
            let item = this.charSlots[slotName].getItem();
            if(item !== null)
            {
                items.push(item);
            }
        }
        return items;
    };
    return new SlotManager();
})();
declareReady('SlotManager.js', function(){SlotManager.init();});