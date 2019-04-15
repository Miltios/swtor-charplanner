package com.charplanner.swtor.model;

import java.util.Map;
import java.util.Set;

public class ItemMod extends Item //TODO: probably want an interface or abstract class instead
{
    public ItemMod()
    {
        super();
    }

    @Override
    public Map<String,Integer> getItemContents()
    {
        System.out.println("Attempted to access nonexistent method getItemContents for ItemMod " + this.getName() + " (itemId " + this.getId() + ")");
        return null;
    }
    @Override
    public DynamicSlot getDynamicSlotType()
    {
        System.out.println("Attempted to access nonexistent method getDynamicSlotType for ItemMod " + this.getName() + " (itemId " + this.getId() + ")");
        return null;
    }
}
