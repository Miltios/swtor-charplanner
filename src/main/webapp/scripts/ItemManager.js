let ItemManager = (function()
{
    function ItemManager()
    {
        //declare vars
        this.items = [];
        this.itemMods = [];
    }
    ItemManager.prototype.init = function()
    {
        this.populateItems(allItemData.items);
        this.populateItemMods(allItemData.itemMods);

        log('ItemManager initialized.');
    };
    ItemManager.prototype.populateItems = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let item = new Item(data[i]);
            this.items.push(item);
        }
    };
    ItemManager.prototype.populateItemMods = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let mod = new ItemMod(data[i]);
            this.itemMods.push(mod);
        }
    }
    ItemManager.prototype.getItemsForSlot = function(slotName)
    {
        let items = this.items.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        return items;
    }
    ItemManager.prototype.getItemsForSpecAndSlot = function(spec, slotName)
    {
        let items = this.items.slice(); //shallow copy
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
        return items.filter(i => ((i.specs.indexOf(spec) !== -1)
            || (i.specs.indexOf('all') !== -1)
            || (i.specs.indexOf('all') !== -1)
            || (i.specs.indexOf(specRole) !== -1)));
    };
    ItemManager.prototype.getItemsForClassAndSlot = function(classname, slotName)
    {
        let items = this.items.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        if(classname === 'all')
        {
            return items;
        }
        let specs = [];
        switch(classname)
        {
            case 'jugg':
                specs = ['juggTank', 'juggSust', 'juggBurst', 'allTank', 'allDps'];
                break;
            case 'sin':
                specs = ['sinTank', 'sinBurst', 'sinSust', 'allTank', 'allDps'];
                break;
            case 'pt':
                specs = ['ptTank', 'ptSust', 'ptBurst', 'allTank', 'allDps'];
                break;
            case 'merc':
                specs = ['mercHealer', 'mercBurst', 'mercSust', 'allHealer', 'allDps'];
                break;
            case 'sorc':
                specs = ['sorcHealer', 'sorcBurst', 'sorcSust', 'allHealer', 'allDps'];
                break;
            case 'op':
                specs = ['opHealer', 'opBurst', 'opSust', 'allHealer', 'allDps'];
                break;
            case 'sniper':
                specs = ['sniperBurst', 'sniperSust', 'sniperHybrid', 'allDps'];
                break;
            case 'mara':
                specs = ['maraSust', 'maraBurst', 'maraHybrid', 'allDps'];
                break;
        }
        return items.filter(i => (Utilities.arrayMatch(specs, i.specs)
            || (i.specs.indexOf('all') !== -1)));
    };
    ItemManager.prototype.addItem = function(data)
    {
        //TODO
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
    }
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
    }
    ItemManager.prototype.getItemsModsForSlot = function(slotName)
    {
        let mods = this.itemMods.slice(); //shallow copy
        mods = mods.filter(i => (i.slot === slotName));
        return mods;
    }
    return new ItemManager();
})();
declareReady('ItemManager.js', function(){ItemManager.init()});