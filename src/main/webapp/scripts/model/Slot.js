function Slot(name)
{
    this.name = name;
    this.item = null;
    this.allowedSlots = {};

    this.imgEl = this.getEl().getElementsByClassName('character-slot-img')[0];
}
Slot.prototype.getName = function()
{
    return this.name;
};
Slot.prototype.setName = function(name)
{
    this.name = name;
};
Slot.prototype.getGenericName = function()
{
    if(this.name === 'relic1' || this.name === 'relic2')
    {
        return 'relic';
    }
    if(this.name === 'implant1' || this.name ==='implant2')
    {
        return 'implant';
    }
    return this.name;
}
Slot.prototype.getItem = function()
{
    return this.item;
};
Slot.prototype.setItem = function(item)
{
    if(item === null)
    {
        this.item = null;
        this.updateAppearance();
        return;
    }
    if(item.slot !== this.getGenericName())
    {
        console.error('Attempted to add item type "' + item.slot + '" to slot "' + this.getGenericName() + '"!');
        alert('This slot cannot accept that item.');
        return;
    }
    this.item = item;
    this.updateAppearance();
};
Slot.prototype.allow = function(type, allow)
{
    this.allowedSlots[type] = allow;
};
Slot.prototype.allows = function(type)
{
    if(this.allowedSlots[type] === true)
    {
        return true;
    }
    return false;
};
Slot.prototype.getEl = function()
{
    return document.getElementById('slot' + Utilities.capitalizeFirstLetter(this.getName()));
}
Slot.prototype.updateAppearance = function()
{
    let item = this.getItem();
    if(item !== null)
    {
        this.imgEl.className = 'character-slot-img slot-' + item.color;
        this.imgEl.src = 'images/items80/' + ItemManager.getImageForItem(item);
    }
    else
    {
        this.imgEl.className = 'character-slot-img slot-empty';
        this.imgEl.src = 'images/items80/' + SlotManager.getImageForEmptySlot(this);



    }
}

declareReady('Slot.js', null);