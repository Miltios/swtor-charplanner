function Item(data)
{
    this.id;
    this.name;
    this.slot;
    this.rating;
    this.color;
    this.specs = [];
    this.stats = {};
    this.itemMods = [];
    this.dynamicSlotType;
    this.description;
    this.image;
    if(!data)
    {
        //should we even allow this?
    }
    else
    {
        this.id = data.id;
        this.name = data.name;
        this.slot = data.slot;
        this.rating = data.rating;
        this.color = data.color;
        this.specs = data.specs;
        this.stats = data.stats;
        //this.itemMods = data.contents;
        this.dynamicSlotType = data.dynamicSlot;
        this.description = data.description;
        this.image = data.image;

        let contents = data.contents;
        for(let i in data.contents)
        {
            if(data.contents.hasOwnProperty(i))
            {
                this.addItemModById(data.contents[i]);
            }
        }
    }
}
//TODO:getters and setters?
Item.prototype.getItemMods = function()
{
    let mods = [];
    for(let i in this.itemMods)
    {
        if(this.itemMods.hasOwnProperty(i))
        {
            let mod = ItemManager.getItemModById(this.itemMods[i]);
            if(mod)
            {
                mods.push(mod);
            }
        }
    }
    return mods;
};
Item.prototype.addItemModById = function(modId)
{
    if(!this.itemMods.indexOf(modId) !== -1)
    {
        this.itemMods.push(modId);
    }
}
//'armoring', 'hilt', or 'barrel', or null for non-moddable items
Item.prototype.getDynamicSlotType = function()
{
    return this.dynamicSlotType;
};
declareReady('Item.js', null);