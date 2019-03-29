package com.charplanner.swtor;

import com.charplanner.swtor.model.Item;
import com.charplanner.swtor.model.ItemMod;
import org.apache.commons.text.StringEscapeUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ItemManager
{
    private static Map<Integer,Item> items; //currently a Map<itemId, Item> because it's easier to fetch stuff than a Set.  May reconsider later since we're duplicating itemId this way.
    private static Map<Integer, ItemMod> itemMods;

    private ItemManager(){}
    static
    {
        items = new HashMap<>();
        itemMods = new HashMap<>();
        updateItems();
        updateItemSpecs();
        updateItemStats();
        updateItemMods();
        updateItemModStats();
        updateItemContents();
    }
    public static void updateItems()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.Items " +
                    "WHERE Disabled = FALSE"); //TODO:stop hard-coding schemas
            if(statement.execute()) //TODO:try-with-resources?
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {
                    Item i = new Item();
                    int itemId = rs.getInt("ItemId");
                    i.setId(itemId);
                    i.setName(rs.getString("Name"));
                    i.setSlot(rs.getString("Slot"));
                    i.setRating(rs.getInt("Rating"));
                    i.setColor(Item.TierColor.valueOf(rs.getString("Color").toUpperCase())); //TODO:ugh.
                    i.setDescription(rs.getString("Description"));
                    String ds = rs.getString("DynamicSlot");
                    if(ds == null || ds.equals(""))
                    {
                        ds = "NONE";
                    }
                    else
                    {
                        ds = ds.toUpperCase();
                    }
                    i.setDynamicSlotType(Item.DynamicSlot.valueOf(ds));
                    i.setImage(rs.getString("Image"));

                    items.put(itemId, i); //TODO:better safety pls
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update Items!");
            e.printStackTrace();
        }
    }
    public static void updateItemSpecs()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.ItemSpecs"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {
                    int itemId = rs.getInt("ItemId");
                    Item i = items.get(itemId);
                    if(i == null)
                    {
                        System.out.println("Item " + itemId + " is disabled.  Skipping..."); //TODO:DEBUG
                    }
                    else
                    {
                        i.addSpec(rs.getString("Spec"));
                    }
                }
            }
        }
        catch(SQLException e)
        {
            System.out.println("Failed to update ItemSpecs!");
            e.printStackTrace();
        }
    }
    public static void updateItemStats()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.ItemStats"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {
                    int itemId = rs.getInt("ItemId");
                    Item i = items.get(itemId);
                    if(i == null)
                    {
                        System.out.println("Item " + itemId + " is disabled.  Skipping..."); //TODO:DEBUG
                    }
                    else
                    {
                        i.setStat(rs.getString("StatName"), rs.getInt("StatValue"));
                    }
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update ItemStats!");
            e.printStackTrace();
        }
    }
    public static void updateItemMods()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.ItemMods"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {
                    ItemMod i = new ItemMod();
                    int itemId = rs.getInt("ItemId");
                    i.setId(itemId);
                    i.setName(rs.getString("Name"));
                    i.setSlot(rs.getString("Slot"));
                    i.setRating(rs.getInt("Rating"));
                    i.setColor(Item.TierColor.valueOf(rs.getString("Color").toUpperCase())); //TODO:ugh.
                    i.setImage(rs.getString("Image"));

                    itemMods.put(itemId, i); //TODO:better safety pls
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update ItemMods!");
            e.printStackTrace();
        }
    }
    public static void updateItemModStats()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.ItemModStats"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {
                    int itemId = rs.getInt("ItemId");
                    ItemMod i = itemMods.get(itemId);
                    i.setStat(rs.getString("StatName"), rs.getInt("StatValue"));
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update ItemModStats!");
            e.printStackTrace();
        }
    }
    public static void updateItemContents()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.ItemContents"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {

                    int itemId = rs.getInt("ItemId");
                    int itemModId = rs.getInt("ItemModId");
                    Item i = items.get(itemId);
                    if(i == null)
                    {
                        System.out.println("Item " + itemId + " is disabled.  Skipping..."); //TODO:DEBUG
                    }
                    else
                    {
                        ItemMod m = itemMods.get(itemModId);
                        i.addItemContent(m);
                    }
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update ItemContents!");
            e.printStackTrace();
        }
    }
    public static String getAllAsJson() //someday we probably want a method to get some items for performance, not the full list
    {
        StringBuilder sb = new StringBuilder("{");
        sb.append("items:").append(getItemsAsJson());
        sb.append("itemMods:").append(getItemModsAsJson());
        sb.append("itemCount:").append(items.size()).append(",");
        sb.append("itemModCount:").append(items.size());
        sb.append("}");

        return sb.toString();
    }
    public static String getItemsAsJson()
    {
        //example item output
        /*{
            id:'1',
                name:'GEMINI MK-4 Relic of Serendipitous Assault',
                slot: 'relic',
                rating: 246,
                color:'purple',
                specs: ['ptTank', 'ptSust', 'ptBurst', 'mercHealer', 'mercBurst', 'mercSust', 'opHealer', 'opBurst', 'opSust', 'sniperBurst', 'sniperSust', 'sniperHybrid', 'sinTank', 'sinBurst', 'sinSust', 'sorcHealer', 'sorcBurst', 'sorcSust', 'maraSust', 'maraBurst', 'maraHybrid', 'juggTank', 'juggSust', 'juggBurst'],
                stats:{
                    'endurance':263,
                    'power':104
                },
                contents:{
                    'armoring':123,
                    'mod':456,
                    'enhancement':789
                },
                dynamicSlot: null,
                description:'Equip: Healing an ally or performing a damaging attack on an enemy both have a 30% chance to grant 1181 Power for <<1>> seconds. This effect can only occur once every <<2>> seconds.'
        }*/

        StringBuilder sb = new StringBuilder("[");
        for(Item i : items.values())
        {
            sb.append("{\n"); //TODO:swtich back to no line breaks once we're done debugging
            sb.append("id:'").append(i.getId()).append("',\n");
            sb.append("name:'").append(StringEscapeUtils.escapeEcmaScript(i.getName())).append("',\n");
            sb.append("slot:'").append(i.getSlot()).append("',\n");
            sb.append("rating:").append(i.getRating()).append(",\n");
            sb.append("color:'").append(i.getColor().toString().toLowerCase()).append("',\n"); //TODO:figure out some better toString method for this enum
            sb.append("image:'").append(i.getImage()).append("',\n");
            sb.append("specs:[");
            Set<String> specs = i.getSpecs();
            for(String spec : specs)
            {
                sb.append("'").append(spec).append("',");
            }
            Utilities.removeTrailingChar(sb, ',');
            sb.append("],\n");
            sb.append("stats:{");
            Map<String,Integer> stats = i.getStats();
            for(Map.Entry<String,Integer> entry : stats.entrySet())
            {
                sb.append(entry.getKey()).append(":").append(entry.getValue()).append(",");
            }
            Utilities.removeTrailingChar(sb, ',');
            sb.append("},\n");
            sb.append("contents:{");
            Map<String,Integer> contents = i.getItemContents();
            for(Map.Entry<String,Integer> entry : contents.entrySet())
            {
                sb.append(entry.getKey()).append(":").append(entry.getValue()).append(",");
            }
            Utilities.removeTrailingChar(sb, ',');
            sb.append("},\n");
            if(i.getDynamicSlotType() != null)
            {
                sb.append("dynamicSlot:'").append(i.getDynamicSlotType()).append("',\n");
            }
            sb.append("description:'").append(StringEscapeUtils.escapeEcmaScript(i.getDescription())).append("'\n");

            sb.append("},");
        }
        Utilities.removeTrailingChar(sb, ',');
        sb.append("],");

        return sb.toString();
    }
    public static String getItemModsAsJson()
    {
        StringBuilder sb = new StringBuilder("[");
        for(ItemMod i : itemMods.values())
        {
            sb.append("{\n");
            sb.append("id:'").append(i.getId()).append("',\n");
            sb.append("name:'").append(StringEscapeUtils.escapeEcmaScript(i.getName())).append("',\n");
            sb.append("slot:'").append(i.getSlot()).append("',\n");
            sb.append("rating:").append(i.getRating()).append(",\n");
            sb.append("color:'").append(i.getColor().toString().toLowerCase()).append("',\n"); //figure out some better toString method for this enum
            sb.append("image:'").append(i.getImage()).append("',\n");
            //we may or may not want to add specs for mods later
            /*sb.append("specs:[");
            Set<String> specs = i.getSpecs();
            for(String spec : specs)
            {
                sb.append("'").append(spec).append("',");
            }
            Utilities.removeTrailingChar(sb, ',');
            sb.append("],\n");*/
            sb.append("stats:{");
            Map<String,Integer> stats = i.getStats();
            for(Map.Entry<String,Integer> entry : stats.entrySet())
            {
                sb.append(entry.getKey()).append(":").append(entry.getValue()).append(",");
            }
            Utilities.removeTrailingChar(sb, ',');
            sb.append("},\n");

            sb.append("},");
        }
        Utilities.removeTrailingChar(sb, ',');
        sb.append("],");

        return sb.toString();
    }
}
