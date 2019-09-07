function ItemMod(data)
{
    this.id;
    this.name;
    this.slot;
    this.rating;
    this.color;
    this.specs = [];
    this.stats = {};
    //this.itemMods = [];
    //this.dynamicSlotType;
    //this.description;
    this.image;
    this.isCustom;
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
        //this.dynamicSlotType = data.dynamicSlot;
        //this.description = data.description;
        this.image = data.image;
        if(typeof data.isCustom === 'undefined')
        {
            this.isCustom = false;
        }
        else
        {
            this.isCustom = data.isCustom;
        }
    }
    ItemMod.prototype.getStats = function()
    {
        return this.stats;
    }
}
declareReady('ItemMod.js', null);