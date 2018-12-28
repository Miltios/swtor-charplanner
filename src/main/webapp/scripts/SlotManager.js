let SlotManager = (function()
{
    function SlotManager()
    {
        //declare vars
        this.charSlotNames = ['ear', 'implant1', 'implant2', 'wrists', 'relic1', 'relic2', 'head', 'chest', 'hands', 'waist', 'legs', 'feet', 'mainhand', 'offhand'];
        this.charSlots = {};
        this.currentSlot = null;
    };
    SlotManager.prototype.init = function()
    {
        console.log('SlotManager.init()');

        //TODO: do we define allowable subslots here or in Items?
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
    SlotManager.prototype.getCurrentSlot = function()
    {
        return this.currentSlot;
    }
    SlotManager.prototype.setCurrentSlot = function(slot)
    {
        this.currentSlot = slot;
    }
    return new SlotManager();
})();
declareReady('SlotManager.js', function(){SlotManager.init();});