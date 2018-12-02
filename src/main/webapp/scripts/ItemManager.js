let ItemManager = (function()
{
    function ItemManager()
    {
        //declare vars
        this.items = [];
    }
    ItemManager.prototype.init = function()
    {
        this.populateItems(allItemData.items); //currently pulling from hard-coded JS.  AJAX from server when we have a DB?

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
    ItemManager.prototype.getItemsForSlot = function(slot)
    {
        let items = this.items.slice(); //shallow copy
        items = items.filter(i => (i.slot === slot));
        return items;
    }
    ItemManager.prototype.getItemsForSpecAndSlot = function(spec, slot)
    {
        let items = this.items.slice(); //shallow copy
        items = items.filter(i => (i.slot === slot));
        if(spec === 'all')
        {
            return items;
        }
        return items.filter(i => ((i.specs.indexOf(spec) !== -1) || (i.specs.indexOf('all') !== -1)));
    };
    ItemManager.prototype.getItemsForClassAndSlot = function(classname, slot)
    {
        let items = this.items.slice(); //shallow copy
        items = items.filter(i => (i.slot === slot));
        if(classname === 'all');
        {
            return items;
        }
        let specs = [];
        switch(classname)
        {
            case 'jugg':
                specs = ['juggTank', 'juggSust', 'juggBurst'];
                break;
            case 'sin':
                specs = ['sinTank', 'sinBurst', 'sinSust'];
                break;
            case 'pt':
                specs = ['ptTank', 'ptSust', 'ptBurst'];
                break;
            case 'merc':
                specs = ['mercHealer', 'mercBurst', 'mercSust'];
                break;
            case 'sorc':
                specs = ['sorcHealer', 'sorcBurst', 'sorcSust'];
                break;
            case 'op':
                specs = ['opHealer', 'opBurst', 'opSust'];
                break;
            case 'sniper':
                specs = ['sniperBurst', 'sniperSust', 'sniperHybrid'];
                break;
            case 'mara':
                specs = ['maraSust', 'maraBurst', 'maraHybrid'];
                break;
        }
        return this.items.filter(i => ((i.specs.indexOf(specs[0]) !== -1) || (i.specs.indexOf(specs[1]) !== -1) || (i.specs.indexOf(specs[2]) !== -1) || (i.specs.indexOf('all') !== -1)))
    };
    ItemManager.prototype.addItem = function(data)
    {
        //TODO
    };
    return new ItemManager();
})();
declareReady('ItemManager.js', function(){ItemManager.init()});