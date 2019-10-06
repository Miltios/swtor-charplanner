let CustomStatsController = (function()
{
    function CustomStatsController()
    {
        //declare vars
        this.el;
        this.statsEl;
        this.saveButton;
        this.item = null;
    }
    CustomStatsController.prototype.init = function()
    {

        this.el = document.getElementById('customStatsEl');
        this.statsEl = document.getElementById('customStatsContent');
        this.saveButton = document.getElementById('customStatsSaveButton');

        log('CustomStatsController initialized.');
    };
    CustomStatsController.prototype.show = function(item)
    {
        if(item === null)
        {
            console.error('Cannot show CustomStatsController for null item!');
            return;
        }
        this.item = item;
        this.statsEl.innerHTML = '';
        let statEls = [];
        for(let statName in item.stats)
        {
            let row = document.createElement('tr');
            row.innerHTML = '<td class="custom-stat-name">' + StatController.getStatName(statName) + ':</td><td><input type="text" class="custom-stat-input" id="customStatValue_' + statName + '" value="' + item.stats[statName] + '"/></td>';
            statEls.push(row);
        }
        if(statEls.length === 0)
        {
            this.statsEl.innerHTML = 'This item has no stats!';
            this.saveButton.disabled = true;
        }
        else
        {
            this.saveButton.disabled = false;
            for(let i=0; i<statEls.length; i++)
            {
                this.statsEl.appendChild(statEls[i]);
            }
        }
        this.el.style.display = '';
        DomManager.showModalMask();
    };
    CustomStatsController.prototype.cancel = function()
    {
        this.el.style.display = 'none';
        DomManager.hideModalMask();
    };
    CustomStatsController.prototype.save = function()
    {
        let inputs = this.statsEl.getElementsByClassName('custom-stat-input');
        let stats = {}
        for(let i=0; i<inputs.length; i++)
        {
            let statName = inputs[i].id.split('_')[1];
            stats[statName] = parseInt(inputs[i].value);
        }
        let clone;
        let item;
        let slot = SlotManager.getCurrentSlot();
        if(this.item instanceof ItemMod)
        {
            clone = ItemManager.getCustomModClone(this.item);
            clone.stats = stats;
            item = slot.getItem();
            item = ItemManager.getCustomClone(item);
            item.addItemMod(clone);
            slot.setItem(item);
        }
        else
        {
            clone = ItemManager.getCustomClone(this.item);
            clone.stats = stats;
            slot.setItem(clone);
            item = clone;
        }
        this.el.style.display = 'none';
        DomManager.hideModalMask();
        PickerController.populateCurrentItemForSlot(slot);
        StatController.updateCharStats();
        WarningsController.updateWarnings();
    };
    return new CustomStatsController();
})();
declareReady('CustomStatsController.js', function(){CustomStatsController.init();});