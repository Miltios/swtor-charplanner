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
        this.ima;
        this.imaSlots;
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
            TooltipController.addTrigger(listEl);
            //TODO:other meta & functionality

            DomManager.getItemList(color).appendChild(listEl);
        }

        //do something with "custom item" section?
    };
    PickerController.prototype.populateOptionsForModSlot = function(slot) //TODO:we could probably stand to have less duplicated code here
    {
        DomController.clearItemLists();
        if(!slot)
        {
            return;
        }

        //get list of mods and sort them into color lists
        let mods;
        let slotName = slot.getName();
        let specFilter = Settings.getSpecFilter();
        if(specFilter === 'mySpec')
        {
            mods = ItemManager.getModsForSpecAndSlot(Settings.getSpec(), slotName);
        }
        else if(specFilter === 'myClass')
        {
            mods = ItemManager.getModsForClassAndSlot(Settings.getClass(), slotName);
        }
        else
        {
            mods = ItemManager.getModsForSlot(slotName);
        }

        let ratings = Settings.getItemRatings();
        mods = mods.filter(i => ratings.indexOf(i.rating) !== -1);

        mods = mods.sort((a,b) => (-1)*(a.rating-b.rating));
        for(let i=0; i<mods.length; i++)
        {
            let mod = mods[i];
            let color = mod.color;
            let listEl = document.createElement('div');
            listEl.className = 'list-item item-' + color;
            listEl.setAttribute('itemId', mod.id);
            listEl.innerHTML = '[' + mod.rating + '] ' + mod.name;
            listEl.onclick = function(){DomController.userInput(listEl, 'listItemModClick');};
            TooltipController.addTrigger(listEl);

            DomManager.getItemList(color).appendChild(listEl);
        }
    }
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
            let stats = item.getStats();
            for(let stat in stats)
            {
                if(stats.hasOwnProperty(stat))
                {
                    let el = document.createElement('span');
                    el.classList.add('item-stat');
                    el.innerHTML = '+' + stats[stat] + ' ' + StatController.getStatName(stat);
                    this.cis.appendChild(el);
                }
            }
            this.cid.innerHTML = item.description;
        }
        this.populateCurrentItemModsForItem(item);
        this.showOrHideModSlots(slot);
    };
    PickerController.prototype.populateCurrentItemModsForItem = function(item)
    {
        let slots = SlotManager.getAllModSlots();
        for(let i in slots)
        {
            if(slots.hasOwnProperty(i))
            {
                if(item === null)
                {
                    slots[i].setItem(null);
                }
                slots[i].updateAppearance();
            }
        }
        if(item === null)
        {
            return;
        }
        let mods = item.getItemMods();
        for(let i=0; i<mods.length; i++)
        {
            let mod = mods[i];
            let slot = SlotManager.getSlot(mod.slot);
            if(slot !== null)
            {
                slot.setItem(mod);
                slot.updateAppearance();
            }
            else
            {
                console.error('Slot was null for mod "' + mod.name + '"!');
            }
        }
    }
    PickerController.prototype.showOrHideModSlots = function(charSlot)
    {
        if(charSlot === null)
        {
            return;
        }
        let modSlots = SlotManager.getAllModSlots()
        for(let slotName in modSlots)
        {
            if(modSlots.hasOwnProperty(slotName))
            {
                let el = modSlots[slotName].getEl();
                if(charSlot.allows(slotName))
                {
                    el.style.visibility = '';
                }
                else
                {
                    el.style.visibility = 'hidden';
                }
            }
        }
    }
    PickerController.prototype.filterOptions = function()
    {
        //when the dropdown selection changes, swap out a CSS class to show or hide various items in the color lists
    };
    return new PickerController();
})();
declareReady('PickerController.js', function(){PickerController.init()});