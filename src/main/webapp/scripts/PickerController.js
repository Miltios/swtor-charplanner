let PickerController = (function()
{
    function PickerController()
    {
        //declare vars
    }
    PickerController.prototype.init = function()
    {
        //locate DOM elements?

        log('PickerController initialized.');
    };
    PickerController.prototype.populateOptionsForSlot = function(slot)
    {
        DomController.clearItemLists();
        if(!slot)
        {
            return;
        }

        //populate (or hide?) "currently equipped" section

        //get list of items and sort them into color lists
        let items;
        let slotName = slot.getGenericName();
        let specFilter = Settings.getSpecFilter();
        if(specFilter === 'mySpec')
        {
            items = ItemManager.getItemsForSpecAndSlot(Settings.getSpec(), slotName);
        }
        else if(specFilter === 'myClass')
        {
            items = ItemManager.getItemsForClassAndSlot(Settings.getClass(), slotName);
        }
        else
        {
            items = ItemManager.getItemsForSlot(slotName);
        }

        let ratings = Settings.getItemRatings();
        items = items.filter(i => ratings.indexOf(i.rating) !== -1);

        items = items.sort((a,b) => (-1)*(a.rating-b.rating));
        for(let i=0; i<items.length; i++)
        {
            let item = items[i];
            let color = item.color;
            let listEl = document.createElement('div');
            listEl.className = 'list-item item-' + color;
            listEl.setAttribute('itemId', item.id);
            listEl.innerHTML = '[' + item.rating + '] ' + item.name;
            listEl.onclick = function(){DomController.userInput(listEl, 'listItemClick');};
            //TODO:other meta & functionality

            DomManager.getItemList(color).appendChild(listEl);
        }

        //do something with "custom item" section?
    };
    PickerController.prototype.filterOptions = function()
    {
        //when the dropdown selection changes, swap out a CSS class to show or hide various items in the color lists
    };
    return new PickerController();
})();
declareReady('PickerController.js', function(){PickerController.init()});