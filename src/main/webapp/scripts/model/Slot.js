function Slot(name, isSubSlot)
{
    this.name = name;
    this.item = null;
    this.augment = null;
    this.allowedSlots = {};
    this.isSubSlot = (isSubSlot === true);
    //this.isSubSlot = (['dynamic', 'armoring', 'barrel', 'hilt', 'mod', 'enhancement', 'crystal'].indexOf(this.name) !== -1);

    let className = (this.isSubSlot ? 'mod' : 'character') + '-slot-img';
    this.imgEl = this.getEl().getElementsByClassName(className)[0];
    this.augImgEl = this.getEl().getElementsByClassName('augment-slot-img')[0];
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
Slot.prototype.getAugment = function()
{
    return this.augment;
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
Slot.prototype.setAugment = function(aug)
{
    if(aug && aug.slot !== 'augment')
    {
        console.error('Attempted to add non-augment type "' + aug.slot + '" to augment slot "' + this.getGenericName() + '"!');
        alert('This slot cannot accept that item.');
        return;
    }
    this.augment = aug;
    this.updateAugAppearance();
};
Slot.prototype.isSubSlot = function()
{
    return this.isSubSlot;
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
};
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
            let color = item.color;
            if(item.isCustom)
            {
                color = 'orange';
            }
            this.imgEl.className = 'character-slot-img slot-' + color;
            this.imgEl.src = 'images/items80/' + item.image;
        }
        else
        {
            this.imgEl.className = 'character-slot-img slot-empty';
            this.imgEl.src = 'images/items80/' + SlotManager.getImageForEmptySlot(this);
        }
    }
};
Slot.prototype.updateAugAppearance = function()
{
    let aug = this.getAugment();
    if(aug !== null)
    {
        this.augImgEl.className = 'augment-slot-img slot-' + aug.color;
        this.augImgEl.src = 'images/items50/' + aug.image;
    }
    else
    {
        this.augImgEl.className = 'augment-slot-img slot-empty';
        this.augImgEl.src = 'images/items50/empty_augment.png';
    }
};

declareReady('Slot.js', null);