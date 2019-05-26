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
        this.listType = '';
        this.cai;
        this.can;
        this.cas;
        this.iat;
        this.iar;
    }
    PickerController.prototype.init = function()
    {
        //locate DOM elements
        this.cii = document.getElementById('currentItemImg');
        this.cin = document.getElementById('currentItemName');
        this.cir = document.getElementById('currentItemRating');
        this.cis = document.getElementById('currentItemStats');
        this.cid = document.getElementById('currentItemDescription');

        this.cai = document.getElementById('currentAugImg');
        this.can = document.getElementById('currentAugName');
        this.cas = document.getElementById('currentAugStats');
        this.iat = document.getElementById('inputAugType');
        this.iar = document.getElementById('inputAugRating');

        log('PickerController initialized.');
    };
    PickerController.prototype.getListType = function()
    {
        return this.listType;
    };
    PickerController.prototype.populateOptionsForSlot = function(slot)
    {
        this.listType = 'items';
        this.updateListsForSlot(slot);
    };
    PickerController.prototype.populateOptionsForModSlot = function(slot)
    {
        this.listType = 'itemMods';
        this.updateListsForSlot(slot);
    };
    PickerController.prototype.updateLists = function()
    {
        if(this.listType === 'items')
        {
            this.updateListsForSlot(SlotManager.getCurrentSlot());
        }
        else if(this.listType === 'itemMods')
        {
            this.updateListsForSlot(SlotManager.getCurrentModSlot());
        }
    };
    PickerController.prototype.updateListsForSlot = function(slot)
    {
        DomController.clearItemLists();
        if(!slot)
        {
            console.error('No slot for updateListsForSlot!');
            this.listType = '';
            return;
        }

        let items;
        let slotName;
        let specFilter = Settings.getSpecFilter();
        let functionName;
        if(this.listType === 'items')
        {
            slotName = slot.getGenericName();
            functionName = 'listItemClick';
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
        }
        else
        {
            slotName = slot.getName();
            functionName = 'listItemModClick';
            if(specFilter === 'mySpec')
            {
                items = ItemManager.getModsForSpecAndSlot(Settings.getSpec(), slotName);
            }
            else if(specFilter === 'myClass')
            {
                items = ItemManager.getModsForClassAndSlot(Settings.getClass(), slotName);
            }
            else
            {
                items = ItemManager.getModsForSlot(slotName);
            }
        }

        let ratings = Settings.getItemRatings();
        if(slotName !== 'crystal') //HACK: crystals have a rating of 136, which will always fail
        {
            items = items.filter(i => ratings.indexOf(i.rating) !== -1);
        }

        items = items.sort((a,b) => (-1)*(a.rating-b.rating));
        for(let i=0; i<items.length; i++)
        {
            let item = items[i];
            let color = item.color;
            let listEl = document.createElement('div');
            listEl.className = 'list-item item-' + color;
            listEl.setAttribute('itemId', item.id);
            listEl.innerHTML = '[' + item.rating + '] ' + item.name;
            listEl.onclick = function(){DomController.userInput(listEl, functionName);};
            TooltipController.addTrigger(listEl);

            DomManager.getItemList(color).appendChild(listEl);
        }
    };
    PickerController.prototype.populateCurrentItemForSlot = function(slot)
    {
        //first, remove all the existing color classes from the item elements
        let classList = this.cin.classList;
        for(let i=0; i<classList.length; i++)
        {
            let cls = classList[i];
            if(cls.indexOf('item-' === 0) && cls.split('-').length === 2)
            {
                this.cin.classList.remove(cls);
            }
        }
        let imgClassList = this.cii.classList;
        for(let i=0; i<imgClassList.length; i++)
        {
            let cls = imgClassList[i];
            if(cls.indexOf('slot-' === 0) && cls.split('-').length === 2)
            {
                this.cii.classList.remove(cls);
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
    };
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
    };
    PickerController.prototype.populateCurrentAugForSlot = function(slot)
    {
        //first, remove all the existing color classes from the item elements
        let classList = this.can.classList;
        for(let i=0; i<classList.length; i++)
        {
            let cls = classList[i];
            if(cls.indexOf('item-' === 0) && cls.split('-').length === 2)
            {
                this.can.classList.remove(cls);
            }
        }
        let imgClassList = this.cai.classList;
        for(let i=0; i<imgClassList.length; i++)
        {
            let cls = imgClassList[i];
            if(cls.indexOf('slot-' === 0) && cls.split('-').length === 2)
            {
                this.cai.classList.remove(cls);
            }
        }

        //then update everything
        let aug = slot.getAugment();
        if(aug === null)
        {
            this.iat.value = 'none';
            this.iar.value = '228';

            this.cai.src = 'images/items50/empty_augment.png';
            this.can.innerHTML = 'None';
        }
        else
        {
            //update the menus to reflect the current aug
            let type = aug.type;
            type = type.split('_')[1];
            this.iat.value = type;
            this.iar.value = '' + aug.rating;

            this.cai.src = 'images/items50/' + aug.image;
            this.cai.classList.add('slot-' + aug.color);
            this.can.innerHTML = aug.name;
            this.can.classList.add('item-' + aug.color);
            this.cas.innerHTML = '';
            let stats = aug.getStats();
            for(let stat in stats)
            {
                if(stats.hasOwnProperty(stat))
                {
                    let el = document.createElement('span');
                    el.classList.add('item-stat');
                    el.innerHTML = '+' + stats[stat] + ' ' + StatController.getStatName(stat);
                    this.cas.appendChild(el);
                }
            }
        }
    };
    PickerController.prototype.showHideAugTypes = function()
    {
        //the endurance and power augs only exist for 228, so for 230+ ratings we hide the option
        let options = this.iat.getElementsByTagName('option');
        for(let i=0; i<options.length; i++)
        {
            if(['endurance', 'power'].indexOf(options[i].value) !== -1)
            {
                options[i].style.display = (this.iar.value === '228')?'':'none';
            }
        }
        if(['endurance', 'power'].indexOf(this.iat.value) !== -1 && this.iar.value !== '228')
        {
            this.iat.value = 'none';
            this.setCurrentAug();
        }
    };
    PickerController.prototype.showHideAugRatings = function()
    {
        //the endurance and power augs only exist for 228, so if they're selected we hide the 230+ options
        let options = this.iar.getElementsByTagName('option');
        for(let i=0; i<options.length; i++)
        {
            if(options[i].value !== '228')
            {
                options[i].style.display = (['endurance', 'power'].indexOf(this.iat.value) === -1)?'':'none';
            }
        }
        if(['endurance', 'power'].indexOf(this.iat.value) !== -1 && this.iar.value !== '228')
        {
            this.iar.value = '228';
            this.setCurrentAug();
        }
    };
    PickerController.prototype.setCurrentAug = function()
    {
        let type = this.iat.value;
        let rating = parseInt(this.iar.value);
        SlotManager.getCurrentSlot().setAugment(ItemManager.getAugmentForTypeAndRating(type, rating));
        this.populateCurrentAugForSlot(SlotManager.getCurrentSlot());
    };
    return new PickerController();
})();
declareReady('PickerController.js', function(){PickerController.init()});