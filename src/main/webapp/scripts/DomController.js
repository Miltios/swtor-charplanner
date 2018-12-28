let DomController = (function()
{
    function DomController()
    {
        //declare vars
    }
    DomController.prototype.init = function()
    {
        log('DomController initialized.');
    };
    DomController.prototype.userInput = function(el, str, event)
    {
        switch(str)
        {
            case 'charSlot':
                let slot = DomManager.getSlot(el);
                this.spawnItemPicker(slot);
            break;
            case 'factionToggle':
                let faction = el.value;
                DomManager.setFaction(faction);
                Settings.updateFactionSelections();
            break;
            case 'toggleExpand':
                DomManager.dismissOtherPopups(event);
                if(el.classList.contains('collapsed'))
                {
                    el.classList.remove('collapsed');
                    el.classList.add('expanded');
                }
                else if(el.classList.contains('expanded'))
                {
                    el.classList.remove('expanded');
                    el.classList.add('collapsed');
                }
                let parentEl = el.parentNode;
                let popups = parentEl.getElementsByClassName('popup-volatile');
                if(parentEl.classList.contains('spawns-popup-hidden'))
                {
                    parentEl.classList.remove('spawns-popup-hidden');
                    parentEl.classList.add('spawns-popup-visible');
                    if(popups.length === 1) //TODO:how do we handle elements with multiple popup children?
                    {
                        popups[0].classList.remove('popup-hidden');
                    }
                }
                else if(parentEl.classList.contains('spawns-popup-visible'))
                {
                    parentEl.classList.remove('spawns-popup-visible');
                    parentEl.classList.add('spawns-popup-hidden');
                }

                else
                {
                    console.error('Expandable node not found!');
                }
                event.stopPropagation();
                break;
        }
    };
    DomController.prototype.spawnItemPicker = function(slot)
    {
        let pickerEl = DomManager.getItemPicker();
        PickerController.populateOptionsForSlot(slot);
        pickerEl.style.display = '';
    };
    DomController.prototype.hideItemPicker = function()
    {
        DomManager.getItemPicker().style.display = 'none';
    };
    DomController.prototype.clearItemLists = function()
    {
        let colors = ['green', 'blue', 'purple', 'gold'];
        for(i in colors)
        {
            if(colors.hasOwnProperty(i))
            {
                let list = DomManager.getItemList(colors[i]);
                if(list)
                {
                    list.innerHTML = ''; //may need to change this if lists get more complex
                }
            }
        }
    };

    return new DomController();
})();
declareReady('DomController.js', function(){DomController.init();});