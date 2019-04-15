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
    if(data)
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
        if(typeof data.isCustom === 'undefined')
        {
            this.isCustom = false;
        }
        else
        {
            this.isCustom = data.isCustom;
        }

        let contents = data.contents;
        for(let i in contents)
        {
            if(contents.hasOwnProperty(i))
            {
                this.addItemModById(contents[i]);
            }
        }
    }
}
//TODO:getters and setters?
Item.prototype.getStats = function()
{
    let mods = this.getItemMods();
    if(mods.length === 0)
    {
        return this.stats;
    }
    let aggregateStats = {};
    for(let i=0; i<mods.length; i++)
    {
        let mod = mods[i];
        let stats = mod.stats;
        for(let statName in stats)
        {
            if(stats.hasOwnProperty(statName))
            {
                let statValue = stats[statName];
                if(aggregateStats.hasOwnProperty(statName))
                {
                    aggregateStats[statName] += statValue;
                }
                else
                {
                    aggregateStats[statName] = statValue;
                }
            }
        }
    }
    return aggregateStats;
}
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
    let mod = ItemManager.getItemModById(modId);
    if(mod === null)
    {
        console.error('Attempted to add nonexistent mod with ID ' + modId + '!');
        return;
    }
    this.addItemMod(mod);
}
Item.prototype.addItemMod = function(mod)
{
    let slotName = mod.slot;
    let oldId = this.getModIdInSlot(slotName);
    let newId = mod.id;
    if(oldId)
    {
        this.itemMods[this.itemMods.indexOf(oldId)] = newId;
    }
    else
    {
        this.itemMods.push(newId);
    }
}
Item.prototype.getModIdInSlot = function(slotName)
{
    for(let i=0; i<this.itemMods.length; i++)
    {
        let mod = ItemManager.getItemModById(this.itemMods[i]);
        if(mod.slot === slotName)
        {
            return mod.id;
        }
    }
    return null;
}
//'armoring', 'hilt', or 'barrel', or null for non-moddable items
Item.prototype.getDynamicSlotType = function()
{
    return this.dynamicSlotType;
};
declareReady('Item.js', null);