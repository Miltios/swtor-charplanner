package com.charplanner.swtor;

import com.charplanner.swtor.model.Item;
import com.charplanner.swtor.model.ItemMod;
import org.apache.commons.text.StringEscapeUtils;

import java.sql.*;
import java.util.*;

public class ItemManager
{
    private static Map<Integer,Item> items; //currently a Map<itemId, Item> because it's easier to fetch stuff than a Set.  May reconsider later since we're duplicating itemId this way.
    private static Map<Integer, ItemMod> itemMods;
    private static Map<Integer, Map<String,Integer>> ratings; //TODO:move this out to another class
    private static List<Map<String,Object>> specBuffs; //TODO:move this out to another class

    private ItemManager(){}
    static
    {
        items = new HashMap<>();
        itemMods = new HashMap<>();
        ratings = new HashMap<>();
        specBuffs = new ArrayList<>();
        updateItems();
        updateItemSpecs();
        updateItemStats();
        updateItemMods();
        updateItemModSpecs();
        updateItemModStats();
        updateItemContents();
        updateRatings();
        updateSpecBuffs();
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
                    i.setType(rs.getString("Type"));

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
                        Utilities.log("Item " + itemId + " is disabled.  Skipping...");
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
                        Utilities.log("Item " + itemId + " is disabled.  Skipping...");
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
    public static void updateItemModSpecs()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.ItemModSpecs"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                while(rs.next())
                {
                    int itemId = rs.getInt("ItemId");
                    ItemMod i = itemMods.get(itemId);
                    if(i == null)
                    {
                        Utilities.log("Item mod " + itemId + " is disabled.  Skipping...");
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
            System.out.println("Failed to update ItemModSpecs!");
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
                        Utilities.log("Item " + itemId + " is disabled.  Skipping...");
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
    public static void updateRatings()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.RatingStats"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                ResultSetMetaData md = rs.getMetaData();
                int cols = md.getColumnCount();
                while(rs.next())
                {
                    HashMap<String,Integer> row = new HashMap<>(cols);
                    for(int i=1; i<=cols; i++)
                    {
                        row.put(md.getColumnName(i), rs.getInt(i));
                    }
                    ratings.put(rs.getInt("Rating"), row);
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update Ratings!");
            e.printStackTrace();
        }
    }
    public static void updateSpecBuffs()
    {
        Connection c = ConnectionManager.getConnection();
        try
        {
            PreparedStatement statement = c.prepareStatement("SELECT * FROM swtor.SpecBuffs " +
                    "WHERE Disabled = FALSE"); //TODO:stop hard-coding schemas
            if(statement.execute())
            {
                ResultSet rs = statement.getResultSet();
                ResultSetMetaData md = rs.getMetaData();
                int cols = md.getColumnCount();
                while(rs.next())
                {
                    HashMap<String,Object> row = new HashMap<>(cols);
                    for(int i=1; i<=cols; i++)
                    {
                        row.put(md.getColumnName(i), rs.getObject(i));
                    }
                    specBuffs.add(row);
                }
            }
        }
        catch(SQLException e)
        {
            //TODO
            System.out.println("Failed to update SpecBuffs!");
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
            sb.append("type:'").append(i.getType()).append("',\n");
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

            sb.append("},");
        }
        Utilities.removeTrailingChar(sb, ',');
        sb.append("],");

        return sb.toString();
    }
    public static String getRatingsAsJson()
    {
        StringBuilder sb = new StringBuilder("{");
        for(Map<String, Integer> row : ratings.values())
        {
            sb.append(row.get("Rating")).append(":{\n");
            //sb.append("rating:").append(row.get("Rating")).append(",\n");
            sb.append("lightpri:").append(row.get("LightPri")).append(",\n");
            sb.append("lightsec:").append(row.get("LightSec")).append(",\n");
            sb.append("mediumpri:").append(row.get("MediumPri")).append(",\n");
            sb.append("mediumsec:").append(row.get("MediumSec")).append(",\n");
            sb.append("heavypri:").append(row.get("HeavyPri")).append(",\n");
            sb.append("heavysec:").append(row.get("HeavySec")).append(",\n");
            sb.append("dmgminsaber:").append(row.get("DmgMinSaber")).append(",\n");
            sb.append("dmgmaxsaber:").append(row.get("DmgMaxSaber")).append(",\n");
            sb.append("dmgminpistol:").append(row.get("DmgMinPistol")).append(",\n");
            sb.append("dmgmaxpistol:").append(row.get("DmgMaxPistol")).append(",\n");
            sb.append("dmgminstaff:").append(row.get("DmgMinStaff")).append(",\n");
            sb.append("dmgmaxstaff:").append(row.get("DmgMaxStaff")).append(",\n");
            sb.append("dmgminsniper:").append(row.get("DmgMinSniper")).append(",\n");
            sb.append("dmgmaxsniper:").append(row.get("DmgMaxSniper")).append(",\n");
            sb.append("dmgmincannon:").append(row.get("DmgMinCannon")).append(",\n");
            sb.append("dmgmaxcannon:").append(row.get("DmgMaxCannon")).append(",\n");
            sb.append("dmgminshotgun:").append(row.get("DmgMinShotgun")).append(",\n");
            sb.append("dmgmaxshotgun:").append(row.get("DmgMaxShotgun")).append(",\n");
            sb.append("dmgminknife:").append(row.get("DmgMinKnife")).append(",\n");
            sb.append("dmgmaxknife:").append(row.get("DmgMaxKnife")).append(",\n");
            sb.append("ftpower:").append(row.get("FTPower")).append("\n");

            sb.append("},");
        }
        Utilities.removeTrailingChar(sb, ',');
        sb.append("}");

        return sb.toString();
    }
    public static String getSpecBuffsAsJson()
    {
        StringBuilder sb = new StringBuilder("[");
        for(Map<String, Object> row : specBuffs)
        {
            sb.append("{\n");
            sb.append("spec:'").append(row.get("Spec")).append("',\n");
            sb.append("stat:'").append(row.get("Stat")).append("',\n");
            sb.append("statValue:").append(row.get("StatValue")).append(",\n");
            sb.append("passive:'").append(((String)row.get("Passive")).replaceAll("'", "\\\\'")).append("'\n");

            sb.append("},");
        }
        Utilities.removeTrailingChar(sb, ',');
        sb.append("]");

        return sb.toString();
    }
}
