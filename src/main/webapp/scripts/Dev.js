/* Class for developer shortcuts, called directly from console.  Main functionality should never be dependent on this file. */
let Dev = (function()
{
    function Dev()
    {
        //declare vars
    }
    Dev.prototype.populateTankGear = function(rating)
    {
        let cls = Settings.getClass();
        if(['jugg', 'sin', 'pt'].indexOf(cls) === -1)
        {
            cls = 'jugg';
        }
        let tankSpec = cls + 'Tank';
        if(!rating)
        {
            rating = 248;
        }
        let slots = SlotManager.getAllCharSlots();
        let lastSlot;
        for(let slotName in slots)
        {
            if(slots.hasOwnProperty(slotName))
            {
                let slot = slots[slotName];
                slotName = slot.getGenericName();
                let items = ItemManager.getItemsForSpecAndSlot(tankSpec, slotName);
                items = items.filter(i => (i.rating === rating));
                if(lastSlot === slotName)
                {
                    slot.setItem(items[1]); //so we don't get two of the same relic/implant
                }
                else
                {
                    slot.setItem(items[0]);
                }
                //PickerController.populateCurrentItemForSlot(slot);
                lastSlot = slotName;
            }
        }
        StatController.updateCharStats();
    };
    return new Dev();
})();
declareReady('Dev.js', null);