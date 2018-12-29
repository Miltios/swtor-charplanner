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
        let className = Settings.getClass();
        if(Settings.getFaction() === 'pub') //HACK: "mando" etc. normally don't exist because we track by imperial class names, but they have different offhands pubside
        {
            if(className === 'merc')
            {
                className = 'mando';
            }
            else if(className === 'sniper')
            {
                className = 'slinger';
            }
            else if(className === 'op')
            {
                className = 'scoundrel';
            }
        }
        switch(this.getGenericName())
        {
            case 'mainhand':
                switch(className)
                {
                    case 'jugg':
                    case 'sin':
                    case 'mara':
                    case 'sorc':
                        this.imgEl.src = 'images/items80/empty_mainhand_saber.png';
                        break;
                    case 'merc':
                    case 'mando': //temporary pseudo-class
                    case 'pt':
                    case 'op':
                    case 'scoundrel': //temporary pseudo-class
                    case 'sniper':
                    case 'slinger': //temporary pseudo-class
                        this.imgEl.src = 'images/items80/empty_mainhand_gun.png';
                        break;
                }
                break;
            case 'offhand':
                switch(className)
                {
                    case 'mando': //temporary pseudo-class
                    case 'pt':
                    case 'jugg':
                    case 'sin':
                    case 'sorc':
                        this.imgEl.src = 'images/items80/empty_offhand_shield.png';
                        break;
                    case 'merc':
                    case 'slinger': //temporary pseudo-class
                        this.imgEl.src = 'images/items80/empty_offhand_gun.png';
                        break;
                    case 'mara':
                        this.imgEl.src = 'images/items80/empty_offhand_saber.png';
                        break;
                    case 'op':
                    case 'sniper':
                        this.imgEl.src = 'images/items80/empty_offhand_knife.png';
                        break;
                    case 'scoundrel': //temporary pseudo-class
                        this.imgEl.src = 'images/items80/empty_offhand_shotgun.png';
                        break;
                }
                break;
            default:
                this.imgEl.src = 'images/items80/empty_' + this.getGenericName() + '.png';
                break;
        }
    }
}

declareReady('Slot.js', null);