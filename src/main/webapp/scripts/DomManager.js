let DomManager = (function()
{
    function DomManager()
    {
        //declare vars
        this.itemPicker;
        this.itemListPurple;
        this.itemListGold;
    }
    DomManager.prototype.init = function()
    {
        //locate DOM elements
        this.itemPicker = document.getElementById('itemPicker');
        this.itemListPurple = document.getElementById('itemListPurple');
        this.itemListGold = document.getElementById('itemListGold');

        log('DomManager initialized.');
    };
    DomManager.prototype.getSlot = function(el)
    {
        let name;
        if(el.classList.contains('character-slot'))
        {
            name = el.id;
        }
        else
        {
            name = el.parentNode.id;
        }
        let i = name.indexOf('slot');
        if(name.indexOf('slot') !== 0)
        {
            return null;
        }
        name = name.toLowerCase().substring(i+4);
        return SlotManager.getSlot(name);
    };
    DomManager.prototype.getItemPicker = function()
    {
        return this.itemPicker;
    };
    DomManager.prototype.getItemList = function(color)
    {
        color = color.toLowerCase();
        switch(color)
        {
            case 'purple':
                return this.itemListPurple;
                break;
            case 'gold':
                return this.itemListGold;
                break;
        }
    }
    return new DomManager();
})();
declareReady('DomManager.js', function(){DomManager.init()});