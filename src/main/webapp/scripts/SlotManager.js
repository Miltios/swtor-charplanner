let SlotManager = (function()
{
    function SlotManager()
    {
        //declare vars
        this.charSlotNames = ['ear', 'implant1', 'implant2', 'wrists', 'relic1', 'relic2', 'head', 'chest', 'hands', 'waist', 'legs', 'feet', 'mainhand', 'offhand'];
        this.itemSlotNames = ['dynamic', /*'armoring',*/ /*'barrel',*/ 'mod', 'enhancement', 'crystal'];
        this.charSlots = {};
        this.itemSlots = {};
        this.currentSlot = null;
        this.currentItemSlot = null;

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
        return null;
    };
    SlotManager.prototype.getModSlot = function(name)
    {
        if(typeof this.itemSlots[name] === 'object')
        {
            return this.itemSlots[name];
        }
        return null;
    }
    SlotManager.prototype.getCurrentSlot = function()
    {
        return this.currentSlot;
    }
    SlotManager.prototype.setCurrentSlot = function(slot)
    {
        this.currentSlot = slot;
    }
    SlotManager.prototype.getAllModSlots = function()
    {
        return this.itemSlots;
    }
    SlotManager.prototype.getImageForEmptySlot = function(slot)
    {
        let className = Settings.getClass();
        if(Settings.getFaction() === 'pub') //HACK: "mando" etc. normally don't exist because we track by imperial class names, but they have different offhands pubside
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
        switch(slot.getGenericName())
        {
            case 'mainhand':
                switch(className)
                {
                    case 'jugg':
                    case 'sin':
                    case 'mara':
                    case 'sorc':
                        return 'empty_mainhand_saber.png';
                        break;
                    case 'merc':
                    case 'mando': //temporary pseudo-class
                    case 'pt':
                    case 'op':
                    case 'scoundrel': //temporary pseudo-class
                    case 'sniper':
                    case 'slinger': //temporary pseudo-class
                        return 'empty_mainhand_gun.png';
                        break;
                }
                break;
            case 'offhand':
                switch(className)
                {
                    case 'mando': //temporary pseudo-class
                    case 'pt':
                    case 'jugg':
                    case 'sin':
                    case 'sorc':
                        return 'empty_offhand_shield.png';
                        break;
                    case 'merc':
                    case 'slinger': //temporary pseudo-class
                        return 'empty_offhand_gun.png';
                        break;
                    case 'mara':
                        return 'empty_offhand_saber.png';
                        break;
                    case 'op':
                    case 'sniper':
                        return 'empty_offhand_knife.png';
                        break;
                    case 'scoundrel': //temporary pseudo-class
                        return 'empty_offhand_shotgun.png';
                        break;
                }
                break;
            default:
                return 'empty_' + slot.getGenericName() + '.png';
                break;
        }
    };
    SlotManager.prototype.getImageForEmptyModSlot = function(slotName)
    {
        switch(slotName)
        {
            case 'mod':
            case 'enhancement':
            case 'crystal':
                return 'empty_' + slotName + '.png';
                break;
            case 'dynamic':
            default:
                return 'empty_dynamic.png';
                break;
        }
    }
    return new SlotManager();
})();
declareReady('SlotManager.js', function(){SlotManager.init();});