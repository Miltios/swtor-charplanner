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
                let slot = DomManager.getSlot(el);
                SlotManager.setCurrentModSlot(slot);
                PickerController.populateOptionsForModSlot(slot);
                break;
            }
            case 'factionToggle':
            {
                let faction = el.value;
                DomManager.setFaction(faction);
                Settings.updateFactionSelections();
                let currSlot = SlotManager.getCurrentSlot();

                //some republic classes have a different offhand from their imperial counterparts.  All other slots are the same.
                if(currSlot.getName() === 'offhand')
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
                PickerController.populateCurrentItemForSlot(SlotManager.getCurrentSlot());
                //TODO: update stats:
                    //arsenal merc gets +3% alacrity
                    //corruption sorc gets +3% force crit chance, 3% dmg reduction, +3% bonus healing
                    //bodyguard merc gets +3% healing/dmg, +5% dmg reduction +3% tech crit chance, +5% bonus healing
                    //IO merc gets +5% ranged crit chance
                    //concealment op gets +2% def chance
                    //carnage mara gets +3% alacrity, +25% offhand dmg, +2% dmg reduction
                    //fury mara gets +5% saber dmg, +3% force dmg, +10% crit dmg
                    //immortal jugg gets +60% armor (+15% additional armor),
                        //+6% dmg reduction, +15% shield chance, +10% accuracy, -10% dmg dealt,
                        //+3% melee/ranged def, +4% shield chance, +5% elemental/internal dmg reduction
                    //vengeance jugg gets +6% dmg, +5% melee dmg, +5% dmg reduction
                    //rage jugg gets +5% saber dmg, +3% force dmg, +15% crit dmg
                    //darkness sin gets -10% dmg dealt, +130% armor (+20% additional armor), +15% shield chance, +10% accuracy
                        //+25% dmg reduction, +30% force regen, +10% internal/elemental dmg reduction
                        //+4% melee/ranged def, +2% def, +4% absorb, +2% dmg reduction, +2% endurance
                    //shield tech pt gets +60% armor rating (+15% additional armor), +5% dmg reduction, +15% shield chance, +10% accuracy, -10% dmg dealt
                        //+2% shield chance, +2% dmg reduction (+2% additional dmg reduction), +4% melee/ranged def, +4% absorb
                    //pyrotech pt gets +5% internal/elemental dmg reduction
                    //AP pt gets +3% melee/ranged def +2% ranged/tech crit chance
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
        }
    };
    DomController.prototype.initSelections = function()
    {
        Settings.updateSpecDropdown();
        DomManager.setFaction(Settings.getFaction());
        Settings.updateFactionSelections();
        SlotManager.getSlot('mainhand').updateAppearance();
        SlotManager.getSlot('offhand').updateAppearance();
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
    }

    return new DomController();
})();
declareReady('DomController.js', function(){DomController.init();});