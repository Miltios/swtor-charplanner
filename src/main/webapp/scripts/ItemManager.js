let ItemManager = (function()
{
    function ItemManager()
    {
        //declare vars
        this.items = [];
        this.itemMods = [];
        this.lastItemId = 0;
    }
    ItemManager.prototype.init = function()
    {
        this.populateItemMods(allItemData.itemMods);
        this.populateItems(allItemData.items); //items reference mods, so mods must be populated first

        log('ItemManager initialized.');
    };
    ItemManager.prototype.populateItems = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let item = new Item(data[i]);
            let add = [item];

            //spawn clones of each color for this item
            if(item.color === 'all')
            {
                add = this.getColorClones(item);
            }
            for(let j=0; j<add.length; j++)
            {
                this.items.push(add[j]);
                let id = parseInt(add[j].id);
                if(id > this.lastItemId)
                {
                    this.lastItemId = id;
                }
            }
        }
    };
    ItemManager.prototype.populateItemMods = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let mod = new ItemMod(data[i]);
            this.itemMods.push(mod);
        }
    };
    ItemManager.prototype.filterListForSlot = function(slotName, list)
    {
        let items = list.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        return items;
    };
    ItemManager.prototype.filterListForSpecAndSlot = function(spec, slotName, list)
    {
        let items = list.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        if(spec === 'all')
        {
            return items;
        }
        let specRole = null;
        if(spec.indexOf('Tank') !== -1)
        {
            specRole = 'allTank';
        }
        else if(spec.indexOf('Dps') !== -1 || spec.indexOf('Burst') !== -1 || spec.indexOf('Sust') !== -1 || spec.indexOf('Hybrid') !== -1)
        {
            specRole = 'allDps';
        }
        else if(spec.indexOf('Healer') !== -1)
        {
            specRole = 'allHealer';
        }
        if(Settings.getFaction() === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1) //some pubside classes use different mainhand/offhand types from imperials
        {
            if(['pt', 'merc', 'op', 'sniper'].indexOf(Settings.getClass()) !== -1) //these classes are the ones that have different pubside gear
            {
                spec = SpecManager.getSpecMirror(spec);
            }
        }
        return items.filter(i => ((i.specs.indexOf(spec) !== -1)
            || (i.specs.indexOf('all') !== -1)
            || (i.specs.indexOf('all') !== -1)
            || (i.specs.indexOf(specRole) !== -1)));
    };
    ItemManager.prototype.filterListForClassAndSlot = function(className, slotName, list)
    {
        let items = list.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        if(className === 'all')
        {
            return items;
        }
        let specs = [];
        let faction = Settings.getFaction(); //some pubside classes use different mainhand/offhand types from imperials
        switch(className)
        {
            case 'jugg':
                specs = ['juggTank', 'juggSust', 'juggBurst', 'allTank', 'allDps'];
                break;
            case 'sin':
                specs = ['sinTank', 'sinBurst', 'sinSust', 'allTank', 'allDps'];
                break;
            case 'pt':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['vanTank', 'vanSust', 'vanBurst', 'allTank', 'allDps'];
                }
                else
                {
                    specs = ['ptTank', 'ptSust', 'ptBurst', 'allTank', 'allDps'];
                }
                break;
            case 'merc':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['mandoHealer', 'mandoBurst', 'mandoSust', 'allHealer', 'allDps'];
                }
                else
                {
                    specs = ['mercHealer', 'mercBurst', 'mercSust', 'allHealer', 'allDps'];
                }
                break;
            case 'sorc':
                specs = ['sorcHealer', 'sorcBurst', 'sorcSust', 'allHealer', 'allDps'];
                break;
            case 'op':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['scoundrelHealer', 'scoundrelBurst', 'scoundrelSust', 'allHealer', 'allDps'];
                }
                else
                {
                    specs = ['opHealer', 'opBurst', 'opSust', 'allHealer', 'allDps'];
                }
                break;
            case 'sniper':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['slingerBurst', 'slingerSust', 'slingerHybrid', 'allDps'];
                }
                else
                {
                    specs = ['sniperBurst', 'sniperSust', 'sniperHybrid', 'allDps'];
                }
                break;
            case 'mara':
                specs = ['maraSust', 'maraBurst', 'maraHybrid', 'allDps'];
                break;
        }
        return items.filter(i => (Utilities.arrayMatch(specs, i.specs)
            || (i.specs.indexOf('all') !== -1)));
    };
    ItemManager.prototype.getItemsForSlot = function(slotName)
    {
        return this.filterListForSlot(slotName, this.items);
    };
    ItemManager.prototype.getItemsForSpecAndSlot = function(spec, slotName)
    {
        return this.filterListForSpecAndSlot(spec, slotName, this.items);
    };
    ItemManager.prototype.getItemsForClassAndSlot = function(className, slotName)
    {
        return this.filterListForClassAndSlot(className, slotName, this.items);
    };
    ItemManager.prototype.getModsForSlot = function(slotName)
    {
        if(slotName === 'dynamic')
        {
            let item = SlotManager.getCurrentSlot().getItem();
            if(item !== null && typeof item.dynamicSlotType === 'string')
            {
                return this.filterListForSlot(item.dynamicSlotType.toLowerCase(), this.itemMods);
            }
        }
        return this.filterListForSlot(slotName, this.itemMods);
    };
    ItemManager.prototype.getModsForSpecAndSlot = function(spec, slotName)
    {
        if(slotName === 'dynamic')
        {
            let item = SlotManager.getCurrentSlot().getItem();
            if(item !== null && typeof item.dynamicSlotType === 'string')
            {
                return this.filterListForSpecAndSlot(spec, item.dynamicSlotType.toLowerCase(), this.itemMods);
            }
        }
        return this.filterListForSpecAndSlot(spec, slotName, this.itemMods);
    };
    ItemManager.prototype.getModsForClassAndSlot = function(className, slotName)
    {
        if(slotName === 'dynamic')
        {
            let item = SlotManager.getCurrentSlot().getItem();
            if(item !== null && typeof item.dynamicSlotType === 'string')
            {
                return this.filterListForClassAndSlot(className, item.dynamicSlotType.toLowerCase(), this.itemMods);
            }
        }
        return this.filterListForClassAndSlot(className, slotName, this.itemMods);
    };
    ItemManager.prototype.getAugmentForTypeAndRating = function(type, rating)
    {
        if(type !== 'none')
        {
            type = 'aug_' + type;
            let augs = this.items.filter(i => (i.type===type && i.rating === rating));
            if(augs.length === 1)
            {
                return augs[0];
            }
        }
        return null;
    };
    ItemManager.prototype.addItem = function(data)
    {
        //not actually used yet
        let item = new Item(data);
        this.items.push(item);
        let id = parseInt(item.id);
        if(id > this.lastItemId)
        {
            this.lastItemId = id;
        }
    };
    ItemManager.prototype.getItemById = function(id)
    {
        //we need strongly typed values here, so we coerce id to string and parse intId from there
        id += '';
        let intId = parseInt(id);
        if(!id || !intId || intId<0) //NB: id=0 evaluates as "false" here, but that's ok because our DB IDs start at 1
        {
            return null;
        }
        for(let i=0; i<this.items.length; i++)
        {
            if(this.items[i].id === id)
            {
                return this.items[i];
            }
        }
        return null;
    };
    ItemManager.prototype.getItemModById = function(id)
    {
        //we need strongly typed values here, so we coerce id to string and parse intId from there
        id += '';
        let intId = parseInt(id);
        if(!id || !intId || intId<0) //NB: id=0 evaluates as "false" here, but that's ok because our DB IDs start at 1
        {
            return null;
        }
        for(let i=0; i<this.itemMods.length; i++)
        {
            if(this.itemMods[i].id === id)
            {
                return this.itemMods[i];
            }
        }
        return null;
    };
    ItemManager.prototype.getItemsModsForSlot = function(slotName)
    {
        let mods = this.itemMods.slice(); //shallow copy
        mods = mods.filter(i => (i.slot === slotName));
        return mods;
    };
    ItemManager.prototype.getClone = function(item)
    {
        let clone = new Item();
        clone.id = this.getNewId();
        clone.name = item.name;
        clone.slot = item.slot;
        clone.rating = item.rating;
        clone.color = item.color;
        clone.specs = item.specs.slice();
        clone.stats = {};
        for(let i in item.stats)
        {
            if(item.stats.hasOwnProperty(i))
            {
                clone.stats[i] = item.stats[i];
            }
        }
        clone.dynamicSlotType = item.dynamicSlotType;
        clone.description = item.description;
        clone.image = item.image;
        clone.type = item.type;
        clone.setId = item.setId;
        clone.isCustom = item.isCustom;
        clone.itemMods = item.itemMods.slice();
        return clone;
    }
    ItemManager.prototype.getCustomClone = function(item)
    {
        if(item.isCustom)
        {
            return item;
        }
        let clone = this.getClone(item);
        clone.isCustom = true;
        return clone;
    };
    ItemManager.prototype.getColorClones = function(item)
    {
        //TODO: needs to adjust item rating and contents as well
        //return an array of item clones, one for each color
        let clones = [];
        //let colors = ['green', 'blue', 'purple', 'gold'];
        let colors = ['gold']; //TODO:temporary workaround while we only have gold data
        for(let i=0; i<colors.length; i++)
        {
            let clone = this.getClone(item);
            clone.color = colors[i];
            clones.push(clone);
        }
        return clones;
    };
    ItemManager.prototype.getNewId = function()
    {
        this.lastItemId++;
        return this.lastItemId + ''; //coerce to string
    };
    return new ItemManager();
})();
declareReady('ItemManager.js', function(){ItemManager.init()});