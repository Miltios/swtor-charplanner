let DomController = (function()
{
    function DomController()
    {
        //declare vars
    }
    DomController.prototype.init = function()
    {
        log('DomController initialized.');
    };
    DomController.prototype.userInput = function(el, str)
    {
        switch(str)
        {
            case 'charSlot':
                let slot = DomManager.getSlot(el);
                this.spawnItemPicker(slot);
            break;
        }
    };
    DomController.prototype.spawnItemPicker = function(slot)
    {
        let pickerEl = DomManager.getItemPicker();
        PickerController.populateOptionsForSlot(slot);
        pickerEl.style.display = '';
    };
    DomController.prototype.hideItemPicker = function()
    {
        DomManager.getItemPicker().style.display = 'none';
    };
    DomController.prototype.clearItemLists = function()
    {
        let colors = ['green', 'blue', 'purple', 'gold'];
        for(i in colors)
        {
            if(colors.hasOwnProperty(i))
            {
                let list = DomManager.getItemList(colors[i]);
                if(list)
                {
                    list.innerHTML = ''; //may need to change this if lists get more complex
                }
            }
        }
    };

    return new DomController();
})();
declareReady('DomController.js', function(){DomController.init();});