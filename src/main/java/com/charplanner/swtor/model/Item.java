package com.charplanner.swtor.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Item
{
    private int id;
    private String name;
    private String slot;
    private int rating;
    private TierColor color;
    private Set<String> specs; //may want to enum this
    private Map<String,Integer> stats;
    private Map<String,Integer> itemContents; //TODO: what about empty/available slots?
    private DynamicSlot dynamicSlotType;
    private String description;
    private String image;
    private String type;
    private String setId;

    public enum TierColor{NONE, GREEN, BLUE, PURPLE, GOLD, ALL}

    public enum DynamicSlot{NONE, HILT, BARREL, ARMORING}

    public Item()
    {
        this.specs = new HashSet<>();
        this.stats = new HashMap<>();
        this.itemContents = new HashMap<>();
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getEscapedName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlot() {
        return slot;
    }

    public void setSlot(String slot) {
        this.slot = slot;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public TierColor getColor() {
        return color;
    }

    public void setColor(TierColor color) {
        this.color = color;
    }

    public Set<String> getSpecs() {
        return specs;
    }

    public void setSpecs(Set<String> specs) {
        this.specs = specs;
    }

    public void addSpec(String spec)
    {
        if(spec != null)
        {
            this.specs.add(spec);
        }
    }

    public Map<String, Integer> getStats() {
        return stats;
    }

    public void setStats(Map<String, Integer> stats) {
        this.stats = stats;
    }

    public void setStat(String stat, int value)
    {
        if(stat == null || value < 1)
        {
            return;
        }
        this.stats.put(stat, value);
    }

    public Map<String,Integer> getItemContents() {
        return itemContents;
    }

    public void setItemContents(Map<String,Integer> itemContents) {
        this.itemContents = itemContents;
    }

    public void addItemContent(ItemMod mod)
    {
        if(mod == null)
        {
            return;
        }
        int modId = mod.getId();
        if(this.itemContents.containsValue(modId))
        {
            return;
        }
        String modSlot = mod.getSlot();
        if(this.itemContents.containsKey(modSlot))
        {
            return;
        }
        this.itemContents.put(modSlot, modId);
    }

    public DynamicSlot getDynamicSlotType() {
        return dynamicSlotType;
    }

    public void setDynamicSlotType(DynamicSlot dynamicSlotType) {
        this.dynamicSlotType = dynamicSlotType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getType()
    {
        return type;
    }

    public void setType(String type)
    {
        this.type = type;
    }

    public String getSetId()
    {
        return setId;
    }

    public void setSetId(String setId)
    {
        this.setId = setId;
    }
}
