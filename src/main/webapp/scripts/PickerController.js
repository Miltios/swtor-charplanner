let PickerController = (function()
{
    function PickerController()
    {
        //declare vars
        this.cii;
        this.cin;
        this.cir;
        this.cis;
        this.cid;
    }
    PickerController.prototype.init = function()
    {
        //locate DOM elements?
        this.cii = document.getElementById('currentItemImg');
        this.cin = document.getElementById('currentItemName');
        this.cir = document.getElementById('currentItemRating');
        this.cis = document.getElementById('currentItemStats');
        this.cid = document.getElementById('currentItemDescription');

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
    PickerController.prototype.populateCurrentItemForSlot = function(slot)
    {
        //first, remove all the existing color classes from the item elements
        let classList = this.cin.classList;
        for(let i in classList)
        {
            if(classList.hasOwnProperty(i))
            {
                let cls = classList[i];
                if(cls.indexOf('item-' === 0) && cls.split('-').length === 2)
                {
                    this.cin.classList.remove(cls);
                }
            }
        }
        let imgClassList = this.cii.imgClassList;
        for(let i in imgClassList)
        {
            if(imgClassList.hasOwnProperty(i))
            {
                let cls = imgClassList[i];
                if(cls.indexOf('slot-' === 0) && cls.split('-').length === 2)
                {
                    this.cin.imgClassList.remove(cls);
                }
            }
        }

        //then update everything
        let item = slot.getItem();
        if(item === null)
        {
            this.cii.src = 'images/items80/' + SlotManager.getImageForEmptySlot(slot);
            this.cin.innerHTML = 'None';
            this.cir.innerHTML = '';
        }
        else
        {
            this.cii.src = 'images/items80/' + item.image;
            this.cii.classList.add('slot-' + item.color);
            this.cin.innerHTML = slot.getItem().name;
            this.cin.classList.add('item-' + item.color);
            this.cir.innerHTML = 'Item Rating ' + item.rating;
            this.cis.innerHTML = '';
            for(let stat in item.stats)
            {
                if(item.stats.hasOwnProperty(stat))
                {
                    let el = document.createElement('span');
                    el.classList.add('item-stat');
                    el.innerHTML = '+' + item.stats[stat] + ' ' + StatController.getStatName(stat);
                    this.cis.appendChild(el);
                }
            }
            this.cid.innerHTML = item.description;
        }
    }
    PickerController.prototype.filterOptions = function()
    {
        //when the dropdown selection changes, swap out a CSS class to show or hide various items in the color lists
    };
    return new PickerController();
})();
declareReady('PickerController.js', function(){PickerController.init()});