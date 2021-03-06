let ItemManager = (function()
{
    function ItemManager()
    {
        //declare vars
        this.items = [];
        this.itemMods = [];
        this.lastItemId = -1;
        this.lastModId = -1;
    }
    ItemManager.prototype.init = function()
    {
        this.populateItemMods(allItemData.itemMods);
        this.populateItems(allItemData.items); //items reference mods, so mods must be populated first

        log('ItemManager initialized.');
    };
    ItemManager.prototype.populateItems = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let item = new Item(data[i]);
            let add = [item];

            //spawn clones of each color for this item
            if(item.color === 'all')
            {
                add = this.getColorClones(item);
            }
            for(let j=0; j<add.length; j++)
            {
                this.items.push(add[j]);
                let id = parseInt(add[j].id);
                if(id < this.lastItemId)
                {
                    this.lastItemId = id;
                }
            }
        }
    };
    ItemManager.prototype.populateItemMods = function(data)
    {
        for(let i=0; i<data.length; i++)
        {
            let mod = new ItemMod(data[i]);
            this.itemMods.push(mod);
            let id = parseInt(mod.id);
            if(id < this.lastModId)
            {
                this.lastModId = id;
            }
        }
    };
    ItemManager.prototype.filterListForSlot = function(slotName, list)
    {
        let items = list.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        this.adjustListForCurrentRole(items);
        return items;
    };
    ItemManager.prototype.filterListForSpecAndSlot = function(spec, slotName, list)
    {
        let items = list.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        if(spec === 'all')
        {
            return items;
        }
        let specRole = null;
        if(spec.indexOf('Tank') !== -1)
        {
            specRole = 'allTank';
        }
        else if(spec.indexOf('Dps') !== -1 || spec.indexOf('Burst') !== -1 || spec.indexOf('Sust') !== -1 || spec.indexOf('Hybrid') !== -1)
        {
            specRole = 'allDps';
        }
        else if(spec.indexOf('Healer') !== -1)
        {
            specRole = 'allHealer';
        }
        if(Settings.getFaction() === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1) //some pubside classes use different mainhand/offhand types from imperials
        {
            if(['pt', 'merc', 'op', 'sniper'].indexOf(Settings.getClass()) !== -1) //these classes are the ones that have different pubside gear
            {
                spec = SpecManager.getSpecMirror(spec);
            }
        }
        let specClass = 'all' + Utilities.capitalizeFirstLetter(Settings.getClass());
        items = items.filter(i => ((i.specs.indexOf(spec) !== -1)
            || (i.specs.indexOf('all') !== -1)
            || (i.specs.indexOf('all') !== -1)
            || (i.specs.indexOf(specRole) !== -1)
            || (i.specs.indexOf(specClass) !== -1)));
        this.adjustListForCurrentRole(items);
        return items;
    };
    ItemManager.prototype.filterListForClassAndSlot = function(className, slotName, list)
    {
        let items = list.slice(); //shallow copy
        items = items.filter(i => (i.slot === slotName));
        if(className === 'all')
        {
            return items;
        }
        let specs = [];
        let faction = Settings.getFaction(); //some pubside classes use different mainhand/offhand types from imperials
        switch(className)
        {
            case 'jugg':
                specs = ['juggTank', 'juggSust', 'juggBurst', 'allTank', 'allDps'];
                break;
            case 'sin':
                specs = ['sinTank', 'sinBurst', 'sinSust', 'allTank', 'allDps'];
                break;
            case 'pt':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['vanTank', 'vanSust', 'vanBurst', 'allTank', 'allDps'];
                }
                else
                {
                    specs = ['ptTank', 'ptSust', 'ptBurst', 'allTank', 'allDps'];
                }
                break;
            case 'merc':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['mandoHealer', 'mandoBurst', 'mandoSust', 'allHealer', 'allDps'];
                }
                else
                {
                    specs = ['mercHealer', 'mercBurst', 'mercSust', 'allHealer', 'allDps'];
                }
                break;
            case 'sorc':
                specs = ['sorcHealer', 'sorcBurst', 'sorcSust', 'allHealer', 'allDps'];
                break;
            case 'op':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['scoundrelHealer', 'scoundrelBurst', 'scoundrelSust', 'allHealer', 'allDps'];
                }
                else
                {
                    specs = ['opHealer', 'opBurst', 'opSust', 'allHealer', 'allDps'];
                }
                break;
            case 'sniper':
                if(faction === 'pub' && ['mainhand', 'offhand'].indexOf(slotName) !== -1)
                {
                    specs = ['slingerBurst', 'slingerSust', 'slingerHybrid', 'allDps'];
                }
                else
                {
                    specs = ['sniperBurst', 'sniperSust', 'sniperHybrid', 'allDps'];
                }
                break;
            case 'mara':
                specs = ['maraSust', 'maraBurst', 'maraHybrid', 'allDps'];
                break;
        }
        items = items.filter(i => (Utilities.arrayMatch(specs, i.specs)
            || (i.specs.indexOf('all') !== -1)));
        this.adjustListForCurrentRole(items);
        return items;
    };
    ItemManager.prototype.getItemsForSlot = function(slotName)
    {
        return this.filterListForSlot(slotName, this.items);
    };
    ItemManager.prototype.getItemsForSpecAndSlot = function(spec, slotName)
    {
        return this.filterListForSpecAndSlot(spec, slotName, this.items);
    };
    ItemManager.prototype.getItemsForClassAndSlot = function(className, slotName)
    {
        return this.filterListForClassAndSlot(className, slotName, this.items);
    };
    ItemManager.prototype.getModsForSlot = function(slotName)
    {
        if(slotName === 'dynamic')
        {
            let item = SlotManager.getCurrentSlot().getItem();
            if(item !== null && typeof item.dynamicSlotType === 'string')
            {
                return this.filterListForSlot(item.dynamicSlotType.toLowerCase(), this.itemMods);
            }
        }
        return this.filterListForSlot(slotName, this.itemMods);
    };
    ItemManager.prototype.getModsForSpecAndSlot = function(spec, slotName)
    {
        if(slotName === 'dynamic')
        {
            let item = SlotManager.getCurrentSlot().getItem();
            if(item !== null && typeof item.dynamicSlotType === 'string')
            {
                return this.filterListForSpecAndSlot(spec, item.dynamicSlotType.toLowerCase(), this.itemMods);
            }
        }
        return this.filterListForSpecAndSlot(spec, slotName, this.itemMods);
    };
    ItemManager.prototype.getModsForClassAndSlot = function(className, slotName)
    {
        if(slotName === 'dynamic')
        {
            let item = SlotManager.getCurrentSlot().getItem();
            if(item !== null && typeof item.dynamicSlotType === 'string')
            {
                return this.filterListForClassAndSlot(className, item.dynamicSlotType.toLowerCase(), this.itemMods);
            }
        }
        return this.filterListForClassAndSlot(className, slotName, this.itemMods);
    };
    ItemManager.prototype.getAugmentForTypeAndRating = function(type, rating)
    {
        if(type !== 'none')
        {
            type = 'aug_' + type;
            let augs = this.items.filter(i => (i.type===type && i.rating === rating));
            if(augs.length === 1)
            {
                return augs[0];
            }
        }
        return null;
    };
    ItemManager.prototype.addItem = function(data)
    {
        //for calling externally
        let item = new Item(data);
        item.id = this.getNewId();
        data.itemMods.map((mod) => {
            item.addItemMod(mod);
        });
        this.items.push(item);
        return item; //in case the caller needs to use it with its new ID
    };
    ItemManager.prototype.addItemMod = function(data)
    {
        //for calling externally
        let mod = new ItemMod(data);
        mod.id = this.getNewModId();
        this.itemMods.push(mod);
        return mod;
    }
    ItemManager.prototype.getItemById = function(id)
    {
        //we need strongly typed values here, so we coerce id to string and parse intId from there
        id += '';
        let intId = parseInt(id);
        if(!id || !intId) //NB: id=0 evaluates as "false" here, but that's ok because our DB IDs start at 1
        {
            return null;
        }
        for(let i=0; i<this.items.length; i++)
        {
            if(this.items[i].id === id)
            {
                return this.items[i];
            }
        }
        return null;
    };
    ItemManager.prototype.getItemByName = function(name)
    {
        if(!name)
        {
            return null;
        }
        for(let i=0; i<this.items.length; i++)
        {
            if(this.items[i].name === name)
            {
                return this.items[i];
            }
        }
        return null;
    };
    ItemManager.prototype.getItemModById = function(id)
    {
        //we need strongly typed values here, so we coerce id to string and parse intId from there
        id += '';
        let intId = parseInt(id);
        if(!id || !intId) //NB: id=0 evaluates as "false" here, but that's ok because our DB IDs start at 1
        {
            return null;
        }
        for(let i=0; i<this.itemMods.length; i++)
        {
            if(this.itemMods[i].id === id)
            {
                return this.itemMods[i];
            }
        }
        return null;
    };
    ItemManager.prototype.getItemsModsForSlot = function(slotName)
    {
        let mods = this.itemMods.slice(); //shallow copy
        mods = mods.filter(i => (i.slot === slotName));
        return mods;
    };
    ItemManager.prototype.getClone = function(item)
    {
        let clone = new Item();
        clone.id = this.getNewId();
        clone.name = item.name;
        clone.slot = item.slot;
        clone.rating = item.rating;
        clone.color = item.color;
        clone.specs = item.specs.slice();
        clone.stats = {};
        for(let i in item.stats)
        {
            if(item.stats.hasOwnProperty(i))
            {
                clone.stats[i] = item.stats[i];
            }
        }
        clone.dynamicSlotType = item.dynamicSlotType;
        clone.description = item.description;
        clone.image = item.image;
        clone.type = item.type;
        clone.setId = item.setId;
        clone.isCustom = item.isCustom;
        clone.itemMods = item.itemMods.slice();
        return clone;
    };
    ItemManager.prototype.getModClone = function(mod)
    {
        let clone = new ItemMod();
        clone.id = this.getNewModId();
        clone.name = mod.name;
        clone.slot = mod.slot;
        clone.rating = mod.rating;
        clone.color = mod.color;
        clone.specs = mod.specs.slice();
        clone.stats = {};
        for(let i in mod.stats)
        {
            if(mod.stats.hasOwnProperty(i))
            {
                clone.stats[i] = mod.stats[i];
            }
        }
        clone.image = mod.image;
        clone.isCustom = mod.isCustom;
        this.itemMods.push(clone);
        return clone;
    };
    ItemManager.prototype.getCustomClone = function(item)
    {
        if(item.isCustom)
        {
            return item;
        }
        let clone = this.getClone(item);
        clone.isCustom = true;
        return clone;
    };
    ItemManager.prototype.getCustomModClone = function(mod)
    {
        if(mod.isCustom)
        {
            return mod;
        }
        let clone = this.getModClone(mod);
        clone.isCustom = true;
        return clone;
    };
    ItemManager.prototype.getColorClones = function(item)
    {
        //return an array of item clones, one for each color
        let clones = [];
        let ratings = [
            {rating:270, color:'green'},
            {rating:272, color:'green'},
            {rating:274, color:'green'},
            {rating:276, color:'blue'},
            {rating:278, color:'blue'},
            {rating:280, color:'blue'},
            {rating:282, color:'blue'},
            {rating:284, color:'blue'},
            {rating:286, color:'purple'},
            {rating:288, color:'purple'},
            {rating:290, color:'purple'},
            {rating:292, color:'purple'},
            {rating:294, color:'purple'},
            {rating:296, color:'purple'},
            {rating:298, color:'purple'},
            {rating:300, color:'gold'},
            {rating:302, color:'gold'},
            {rating:304, color:'gold'},
            {rating:306, color:'gold'},
        ];
        for(let i=0; i<ratings.length; i++)
        {
            let clone = this.getClone(item);
            clone.color = ratings[i].color;
            clone.rating = ratings[i].rating;
            clone.itemMods = this.getEquivalentModsForRating(item, ratings[i].rating);
            clone.variableMods = true; //indicate that this item should have whatever mods are appropriate to the given role.  Mods will be swapped when filtering item lists.
            clones.push(clone);
        }
        return clones;
    };
    ItemManager.prototype.getEquivalentModsForRating = function(item, rating)
    {
        let newMods = [];
        if(item === null || !Array.isArray(item.itemMods))
        {
            console.error('Cannot get equivalent mods for invalid item!');
            return newMods;
        }
        for(let i=0; i<item.itemMods.length; i++)
        {
            let mod = this.getItemModById(item.itemMods[i]);
            if(mod !== null && mod.name !== 'empty')
            {
                let name = mod.name;
                name = name.replace(/^(Superior )|(Advanced )/, '');
                name = name.replace(/ \d+[AB]?$/, '');
                try
                {
                    let newMod = this.itemMods.filter(m => m.name.indexOf(name)!==-1 && m.rating === rating)[0];
                    newMods.push(newMod.id);
                }
                catch(e)
                {
                    console.error('Unable to find equivalent mod for "' + name + '" at item rating ' + rating + '!');
                }
            }
        }
        return newMods;
    };
    ItemManager.prototype.adjustListForCurrentRole = function(list)
    {
        let role = SpecManager.getRoleFromSpec(Settings.getSpec());
        for(let i=0; i<list.length; i++)
        {
            if(list[i].variableMods)
            {
                list[i].itemMods = this.getEquivalentModsForRole(list[i], role);
            }
        }
    };
    ItemManager.prototype.getEquivalentModsForRole = function(item, role)
    {
        let newMods = [];
        if(item === null || !Array.isArray(item.itemMods))
        {
            console.error('Cannot get equivalent mods for invalid item!');
            return newMods;
        }
        for(let i=0; i<item.itemMods.length; i++)
        {
            let mod = this.getItemModById(item.itemMods[i]);
            let name = mod.name;
            let rating = mod.rating;
            if(['armoring','hilt','barrel','dynamic'].indexOf(mod.slot) !== -1)
            {
                if(role === 'tank')
                {
                    name = name.replace('Versatile', 'Resistive');
                }
                else
                {
                    name = name.replace('Resistive', 'Versatile');
                }
            }
            else if(mod.slot === 'mod')
            {
                if(role === 'tank')
                {
                    name = name.replace('Lethal', 'Warding');
                }
                else
                {
                    name = name.replace('Warding', 'Lethal');
                }
            }
            else if(mod.slot === 'crystal')
            {
                //we shouldn't ever be running this on items that have crystals, but if we do, just respect whatever's in there already
            }
            else if(mod.slot === 'enhancement')
            {
                let alacName = rating >= 268 ? 'Nimble':'Quick Savant';
                switch(item.slot)
                {
                    case 'head':
                        if(role === 'tank')
                        {
                            name = name.replace(alacName, 'Immunity');
                        }
                        else
                        {
                            name = name.replace('Immunity', alacName);
                        }
                        break;
                    case 'chest':
                        if(role === 'tank')
                        {
                            name = name.replace(/(Quick Savant)|(Nimble)|(Adept)/, 'Immunity');
                        }
                        else if(role === 'healer')
                        {
                            name = name.replace(/(Immunity)|(Adept)/, alacName);
                        }
                        else
                        {
                            name = name.replace(/(Quick Savant)|(Nimble)|(Immunity)/, 'Adept');
                        }
                        break;
                    case 'hands':
                        if(role === 'tank')
                        {
                            name = name.replace(/(Initiative)|(Adept)/, 'Sturdiness');
                        }
                        else if(role === 'healer')
                        {
                            name = name.replace(/(Sturdiness)|(Initiative)/, 'Adept');
                        }
                        else
                        {
                            name = name.replace(/(Adept)|(Sturdiness)/, 'Initiative');
                        }
                        break;
                    case 'waist':
                        //no enhancements in belt or wrists
                        break;
                    case 'legs':
                        if(role === 'tank')
                        {
                            name = name.replace('Adept', 'Sturdiness');
                        }
                        else
                        {
                            name = name.replace('Sturdiness', 'Adept');
                        }
                        break;
                    case 'feet':
                        if(role === 'tank')
                        {
                            name = name.replace(/(Initiative)|(Adept)/, 'Sturdiness');
                        }
                        else if(role === 'healer')
                        {
                            name = name.replace(/(Sturdiness)|(Initiative)/, 'Adept');
                        }
                        else
                        {
                            name = name.replace(/(Adept)|(Sturdiness)/, 'Initiative');
                        }
                        break;
                    case 'wrists':
                        //no enhancements in belt or wrists
                        break;
                    default:
                        //do nothing for mainhand/offhand, as these are already designed for a specific role
                        //left-side slots are unmoddable and will never get here
                        break;
                }
            }
            try
            {
                let newMod = this.itemMods.filter(m => m.name.indexOf(name)!==-1 && m.rating === rating)[0];
                newMods.push(newMod.id);
            }
            catch(e)
            {
                console.error('Unable to find equivalent mod for "' + name + '" with role ' + role + '!');
            }
        }
        return newMods;
    };
    ItemManager.prototype.getNewId = function()
    {
        //all generated IDs are negative, to ensure no conflicts with hard-coded IDs from the DB
        this.lastItemId--;
        return this.lastItemId + ''; //coerce to string
    };
    ItemManager.prototype.getNewModId = function()
    {
        this.lastModId--;
        return this.lastModId + '';
    };
    return new ItemManager();
})();
declareReady('ItemManager.js', function(){ItemManager.init()});