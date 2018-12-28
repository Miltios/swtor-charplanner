let ItemManager = (function()
{
    function ItemManager()
    {
        //declare vars
        this.items = [];
    }
    ItemManager.prototype.init = function()
    {
        this.populateItems(allItemData.items);

        log('ItemManager initialized.');
    };
    ItemManager.prototype.populateItems = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let item = new Item(data[i]);
            this.items.push(item);
        }
        //TODO:ItemMods
    };
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
        else if(spec.indexOf('Dps') !== -1)
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
        if(classname === 'all');
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
        if(!id || id<0) //NB: id=0 evaluates as "false" here, but that's ok because our DB IDs start at 1
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
    ItemManager.prototype.getImageForItem = function(item)
    {
        if(!item)
        {
            return 'empty.png';
        }
        switch(item.slot)
        {
            case 'ear':
                break;
            case 'implant':
                break;
            case 'wrists':
                break;
            case 'relic':
                let name = item.name.toLowerCase();
                if(name.indexOf('boundless') !== -1)
                {
                    return 'relic_boundless.png';
                }
                if(name.indexOf('devastating') !== -1)
                {
                    return 'relic_devastating.png';
                }
                if(name.indexOf('ephemeral') !== -1)
                {
                    return 'relic_ephemeral.png';
                }
                if(name.indexOf('focused') !== -1)
                {
                    return 'relic_devastating.png'; //has same image
                }
                if(name.indexOf('imperiling') !== -1)
                {
                    return 'relic_imperiling.png';
                }
                if(name.indexOf('reactive') !== -1)
                {
                    return 'relic_reactive.png';
                }
                if(name.indexOf('serendipitous') !== -1)
                {
                    return 'relic_devastating.png'; //has same image
                }
                if(name.indexOf('shield') !== -1)
                {
                    return 'relic_reactive.png'; //has same image
                }
                if(name.indexOf('fortunate') !== -1)
                {
                    return 'relic_reactive.png'; //has same image
                }
                if(name.indexOf('primeval') !== -1)
                {
                    return 'relic_primeval.png';
                }
                if(name.indexOf('shrouded') !== -1)
                {
                    return 'relic_imperiling.png';
                }
                break;
            case 'head':
                break;
            case 'chest':
                break;
            case 'hands':
                break;
            case 'waist':
                break;
            case 'legs':
                break;
            case 'feet':
                break;
            case 'mainhand':
                break;
            case 'offhand':
                break;
        }
    }
    return new ItemManager();
})();
declareReady('ItemManager.js', function(){ItemManager.init()});