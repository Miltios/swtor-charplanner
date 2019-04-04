function Slot(name, isSubSlot)
{
    this.name = name;
    this.item = null;
    this.allowedSlots = {};
    this.isSubSlot = (isSubSlot === true);
    //this.isSubSlot = (['dynamic', 'armoring', 'barrel', 'hilt', 'mod', 'enhancement', 'crystal'].indexOf(this.name) !== -1);

    let className = (this.isSubSlot ? 'mod' : 'character') + '-slot-img';
    this.imgEl = this.getEl().getElementsByClassName(className)[0];
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
    let genericName = this.getGenericName();
    if(item.slot !== genericName)
    {
        if(genericName === 'dynamic')
        {
            if(['armoring', 'hilt', 'barrel'].indexOf(item.slot) === -1)
            {
                console.error('Attempted to add item type "' + item.slot + '" to slot "' + this.getGenericName() + '"!');
                alert('This slot cannot accept that item.');
                return;
            }
        }
    }
    this.item = item;
    this.updateAppearance();
};
Slot.prototype.isSubSlot = function()
{
    return this.isSubSlot;
}
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
    if(this.isSubSlot)
    {
        if(item !== null && item.name !== 'empty')
        {
            this.imgEl.className = 'mod-slot-img slot-' + item.color;
            this.imgEl.src = 'images/items50/' + item.image;
        }
        else
        {
            this.imgEl.className = 'mod-slot-img slot-empty';
            this.imgEl.src = 'images/items50/' + SlotManager.getImageForEmptyModSlot(this);
        }
    }
    else
    {
        if(item !== null)
        {
            this.imgEl.className = 'character-slot-img slot-' + item.color;
            this.imgEl.src = 'images/items80/' + item.image;
        }
        else
        {
            this.imgEl.className = 'character-slot-img slot-empty';
            this.imgEl.src = 'images/items80/' + SlotManager.getImageForEmptySlot(this);
        }
    }
}

declareReady('Slot.js', null);