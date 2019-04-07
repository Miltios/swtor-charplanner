let TooltipController = (function()
{
    function TooltipController()
    {
        //declare vars
        this.tooltipEl;
        this.tin;
        this.tir;
        this.tis;
        this.tid;
        this.triggerElClasses = ['mod-slot-link', 'character-slot-link', 'list-item'];
    }
    TooltipController.prototype.init = function(self) //HACK: we pass TooltipController into its own init function so that the eventListeners we create can reference it
    {
        this.tooltipEl = document.getElementById('tooltipEl');
        this.tin = document.getElementById('tooltipItemName');
        this.tir = document.getElementById('tooltipItemRating');
        this.tis = document.getElementById('tooltipItemStats');
        this.tid = document.getElementById('tooltipItemDescription');
        for(let i=0; i<this.triggerElClasses.length; i++)
        {
            let els = document.getElementsByClassName(this.triggerElClasses[i]);
            for(let j=0; j<els.length; j++)
            {
                this.addTrigger(els[j], self);
            }
        }
        document.addEventListener('mousemove', this.updateTooltipLocation.bind(null, this)); //HACK: we pass TooltipController again so eventListeners can reference it

        log('TooltipController initialized.');
    };
    TooltipController.prototype.addTrigger = function(el, self)
    {
        if(!self)
        {
            self = this;
        }
        if(!el || typeof el.addEventListener !== 'function')
        {
            console.error('Tried to add trigger for invalid object ' + el);
            return;
        }
        function triggerTooltip()
        {
            self.triggerTooltip(this);
        }
        function hideTooltip()
        {
            self.hideTooltip(this); //TODO: what if we move directly from one trigger element to another?
        }
        //remove triggers before we re-add them, in case they're already present
        el.removeEventListener('mouseover', triggerTooltip);
        el.removeEventListener('mouseover', hideTooltip);

        el.addEventListener('mouseover', triggerTooltip);
        el.addEventListener('mouseout', hideTooltip);
    }
    TooltipController.prototype.showTooltip = function(el)
    {
        this.tooltipEl.style.display = '';
        this.isShown = true;
    }
    TooltipController.prototype.hideTooltip = function()
    {
        this.tooltipEl.style.display = 'none';
        this.isShown = false;
    }
    TooltipController.prototype.triggerTooltip = function(el)
    {
        if(this.updateTooltip(el))
        {
            this.showTooltip(el);
        }
    }
    TooltipController.prototype.updateTooltip = function(el)
    {
        let item = null;
        if(el.classList.contains('mod-slot-link'))
        {
            let slot = SlotManager.getModSlotFromLinkEl(el);
            if(slot === null)
            {
                return false;
            }
            item = slot.getItem();
        }
        else if(el.classList.contains('character-slot-link'))
        {
            let slot = SlotManager.getSlotFromLinkEl(el);
            if(slot === null)
            {
                return false;
            }
            item = slot.getItem();
        }
        else if(el.classList.contains('list-item'))
        {
            //TODO:also show item comparison in this case?
            let itemId = parseInt(el.getAttribute('itemid'));
            item = ItemManager.getItemById(itemId);
        }
        if(item === null || item.name === 'empty')
        {
            return false;
        }

        //remove all existing color classes
        let classList = this.tin.classList;
        for(let i in classList)
        {
            if(classList.hasOwnProperty(i))
            {
                let cls = classList[i];
                if(cls.indexOf('item-' === 0) && cls.split('-').length === 2)
                {
                    this.tin.classList.remove(cls);
                }
            }
        }
        //then re-add the correct color
        this.tin.classList.add('item-' + item.color);
        this.tin.innerHTML = item.name;

        this.tir.innerHTML = 'Item Rating ' + item.rating;
        let statsHTML = '';
        let stats = item.getStats();
        for(let statName in stats)
        {
            if(stats.hasOwnProperty(statName))
            {
                statsHTML += '<span class="item-stat">+' + stats[statName] + ' ' + StatController.getStatName(statName) + '</span>';
            }
        }
        this.tis.innerHTML = statsHTML;
        this.tid.innerHTML = item.description?item.description:'';

        return true;
    }
    TooltipController.prototype.updateTooltipLocation = function(self, event)
    {
        if(self.isShown)
        {
            let mouseX = event.clientX;
            let mouseY = event.clientY;

            //TODO:more intelligent calculation
            self.tooltipEl.style.left = mouseX + 20;
            self.tooltipEl.style.top = mouseY + 5;
        }
    }
    return new TooltipController();
})();
declareReady('TooltipController.js', function(){TooltipController.init(TooltipController);});