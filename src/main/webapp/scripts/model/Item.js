function Item()
{
    this.itemMods = [];
}
Item.prototype.getItemMods = function()
{
    return this.itemMods;
}
declareReady('Item.js', null);