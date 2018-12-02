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
        this.dynamicSlotType = data.dynamicSlot;
        this.description = data.description;
    }
}
//TODO:getters and setters?
Item.prototype.getItemMods = function()
{
    return this.itemMods;
};
//'armoring', 'hilt', or 'barrel', or null for non-moddable items
Item.prototype.getDynamicSlotType = function()
{
    return this.dynamicSlotType;
};
declareReady('Item.js', null);