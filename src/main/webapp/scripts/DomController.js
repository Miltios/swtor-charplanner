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
            {
                let slot = DomManager.getSlot(el);
                SlotManager.setCurrentSlot(slot);
                this.spawnItemPicker(slot);
                break;
            }
            case 'modSlot':
            {
                if(SlotManager.getCurrentSlot().getItem() !== null)
                {
                    let slot = DomManager.getSlot(el);
                    SlotManager.setCurrentModSlot(slot);
                    PickerController.populateOptionsForModSlot(slot);
                }
                break;
            }
            case 'augSlot':
            {
                let slot = DomManager.getSlot(el);
                if(AugmentController.isCopyMode())
                {
                    slot.setAugment(AugmentController.getAugmentToCopy());
                }
                else
                {
                    SlotManager.setCurrentSlot(slot);
                    AugmentController.setHasCurrent(true);
                    this.spawnAugmentPicker(slot);
                }
                break;
            }
            case 'factionToggle':
            {
                Settings.updateFactionButtons(el);
                let faction = el.getAttribute('value');
                DomManager.setFaction(faction);
                Settings.updateFactionSelections();
                let currSlot = SlotManager.getCurrentSlot();

                //some republic classes have a different offhand from their imperial counterparts.  All other slots are the same.
                if(currSlot && (currSlot.getName() === 'offhand' || currSlot.getName() === 'mainhand'))
                {
                    PickerController.updateLists();
                    PickerController.populateCurrentItemForSlot(currSlot);
                }
                SlotManager.getSlot('offhand').updateAppearance();
                break;
            }
            case 'toggleExpand':
            {
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
            case 'listItemClick':
            {
                let currentSlot = SlotManager.getCurrentSlot();
                let item = ItemManager.getItemById(el.getAttribute('itemId'));
                currentSlot.setItem(item);
                PickerController.populateCurrentItemForSlot(currentSlot);
                break;
            }
            case 'listItemModClick':
            {
                let itemSlot = SlotManager.getCurrentSlot();
                let mod = ItemManager.getItemModById(el.getAttribute('itemId'));
                let oldItem = itemSlot.getItem();
                let newItem = ItemManager.getCustomClone(oldItem);
                newItem.addItemMod(mod)
                itemSlot.setItem(newItem);
                PickerController.populateCurrentItemForSlot(itemSlot); //we do this instead of populateCurrentModsForItem because we need to bump the stats too
                break;
            }
            case 'classSelect':
            {
                Settings.updateSpecDropdown();
                SlotManager.getSlot('mainhand').updateAppearance();
                SlotManager.getSlot('offhand').updateAppearance();
                PickerController.updateLists();
                let currSlot = SlotManager.getCurrentSlot();
                if(currSlot !== null)
                {
                    PickerController.populateCurrentItemForSlot(currSlot);
                }
                break;
            }
            case 'specSelect':
                PickerController.updateLists();
                break;
            case 'specFilterChange':
                PickerController.updateLists();
                break;
            case 'updateItemColors':
                Settings.updateItemColorCheckboxes(el);
                PickerController.updateLists();
                break;
            case 'updateItemRatings':
                PickerController.updateLists();
                break;
            case 'augTypeSelect':
                PickerController.showHideAugRatings();
                PickerController.updateCurrentAugDisplay();
                break;
            case 'augRatingSelect':
                PickerController.showHideAugTypes();
                PickerController.updateCurrentAugDisplay();
                break;
            case 'saveAugment':
                PickerController.setCurrentAug();
                break;
            case 'toggleCopyAugment':
                AugmentController.toggleCopyMode();
                break;
            case 'stimClick':
                Settings.updateStim(el);
                break;
        }
        StatController.updateCharStats(); //not actually necessary for ALL userInput functions, but simpler and more reliable to put it here
        WarningsController.updateWarnings(); //ditto
    };
    DomController.prototype.initSelections = function()
    {
        Settings.updateSpecDropdown();
        DomManager.setFaction(Settings.getFaction());
        Settings.updateFactionSelections();
        SlotManager.getSlot('mainhand').updateAppearance();
        SlotManager.getSlot('offhand').updateAppearance();
        StatController.updateCharStats();
    }
    DomController.prototype.spawnItemPicker = function(slot)
    {
        let pickerEl = DomManager.getItemPicker();
        PickerController.populateCurrentItemForSlot(slot);
        PickerController.populateOptionsForSlot(slot);
        pickerEl.style.display = '';
    };
    DomController.prototype.hideItemPicker = function()
    {
        DomManager.getItemPicker().style.display = 'none';
    };
    DomController.prototype.spawnAugmentPicker = function(slot)
    {
        let pickerEl = DomManager.getAugmentPicker();
        PickerController.populateCurrentAugForSlot(slot);
        pickerEl.style.display = '';
    };
    DomController.prototype.hideAugmentPicker = function()
    {
        DomManager.getAugmentPicker().style.display = 'none';
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
        TooltipController.hideTooltip(); //prevents the tooltip from lingering if it didn't get caught by a mouseout event
    };
    DomController.prototype.updateItemColorLists = function()
    {
        let colors = Settings.getItemColors();
        let listEls = document.getElementsByClassName('item-list');
        for(let i in listEls)
        {
            if(listEls.hasOwnProperty(i))
            {
                listEls[i].style.display = 'none';
            }
        }
        for(let i in colors)
        {
            if(colors.hasOwnProperty(i))
            {
                let listEl = DomManager.getItemList(colors[i]);
                listEl.style.display = '';
            }
        }
        if(colors.length < 2)
        {
            DomManager.getItemList('empty').style.display = '';
        }
    };

    return new DomController();
})();
declareReady('DomController.js', function(){DomController.init();});