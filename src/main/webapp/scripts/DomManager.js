let DomManager = (function()
{
    function DomManager()
    {
        //declare vars
        this.body;
        this.itemPicker;
        this.itemListGreen;
        this.itemListBlue;
        this.itemListPurple;
        this.itemListGold;
        this.itemListEmpty;
        this.augmentPicker;
        this.modalMask;
    }
    DomManager.prototype.init = function()
    {
        let me = this;
        document.onclick = function(event){me.dismissOtherPopups(event);};

        //locate DOM elements
        this.body = document.getElementById('documentBody');
        this.itemPicker = document.getElementById('itemPicker');
        this.itemListGreen = document.getElementById('itemListGreen');
        this.itemListBlue = document.getElementById('itemListBlue');
        this.itemListPurple = document.getElementById('itemListPurple');
        this.itemListGold = document.getElementById('itemListGold');
        this.itemListEmpty = document.getElementById('itemListEmpty'); //just a dummy list to take up space in the layout if there aren't enough real lists display
        this.augmentPicker = document.getElementById('augPicker');
        this.modalMask = document.getElementById('modalMask');

        log('DomManager initialized.');
    };
    DomManager.prototype.setFaction = function(faction)
    {
        if(!faction)
        {
            console.error('Faction not found!');
            return;
        }
        if(faction === 'imp')
        {
            this.body.classList.add('faction-mode-imp');
            this.body.classList.remove('faction-mode-pub');
        }
        else
        {
            this.body.classList.add('faction-mode-pub');
            this.body.classList.remove('faction-mode-imp');
        }
    }
    DomManager.prototype.getSlot = function(el)
    {
        let name;
        if(el.classList.contains('character-slot') || el.classList.contains('mod-slot'))
        {
            name = el.id;
        }
        else
        {
            name = el.parentNode.id;
        }
        let i = name.indexOf('slot');
        if(i !== 0)
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
    DomManager.prototype.getAugmentPicker = function()
    {
        return this.augmentPicker;
    };
    DomManager.prototype.getItemList = function(color)
    {
        color = color.toLowerCase();
        switch(color)
        {
            case 'green':
                return this.itemListGreen;
                break;
            case 'blue':
                return this.itemListBlue;
                break;
            case 'purple':
                return this.itemListPurple;
                break;
            case 'gold':
                return this.itemListGold;
                break;
            case 'empty':
                return this.itemListEmpty;
                break;
        }
    };
    DomManager.prototype.dismissOtherPopups = function(event)
    {
        let el = event.target;
        if(!el || !el.parentNode)
        {
            console.error('No event target for dismissOtherPopups!');
            return;
        }
        let parentEl = el.parentNode;
        let keepEl = null;
        while(parentEl && parentEl.tagName && parentEl.tagName.toLowerCase() !== 'body')
        {
            if(parentEl.classList.contains('popup-volatile') || parentEl.classList.contains('spawns-popup'))
            {
                keepEl = parentEl;
                break;
            }
            parentEl = parentEl.parentNode;
        }
        this.dismissAllPopupsExcept(keepEl);
    };
    DomManager.prototype.dismissAllPopupsExcept = function(keepEl)
    {
        let popups = document.getElementsByClassName('popup-volatile');
        for(let i in popups)
        {
            if(popups.hasOwnProperty(i) && popups[i] !== keepEl)
            {
                if(!Utilities.elHasAncestor(popups[i], keepEl) || keepEl.classList.contains('spawns-popup-visible'))
                {
                    this.hideVolatilePopup(popups[i], keepEl);
                }
            }
        }
    };
    DomManager.prototype.hideVolatilePopup = function(popupEl, keepEl)
    {
        //first, the basic hiding
        popupEl.classList.add('popup-hidden');

        //then we check for the element that spawned it and toggle state if necessary
        let spawners = document.getElementsByClassName('spawns-popup-visible');
        for(let i in spawners)
        {
            if(spawners.hasOwnProperty(i))
            {
                let spawner = spawners[i];
                if(!Utilities.elHasAncestor(popupEl, keepEl) && spawner !== keepEl)
                {
                    spawner.classList.remove('spawns-popup-visible');
                    spawner.classList.add('spawns-popup-hidden');
                }
            }
        }
    };
    DomManager.prototype.showModalMask = function()
    {
        this.modalMask.style.display = '';
    };
    DomManager.prototype.hideModalMask = function()
    {
        this.modalMask.style.display = 'none';
    };
    return new DomManager();
})();
declareReady('DomManager.js', function(){DomManager.init()});