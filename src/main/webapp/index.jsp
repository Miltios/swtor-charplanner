<%@ page import="com.charplanner.swtor.*" %>

<html>
<head>
    <link rel="stylesheet" type="text/css" href="/swtor/styles/global.css">
    <link rel="stylesheet" type="text/css" href="/swtor/styles/gearPlanner.css">
</head>
<body id="documentBody" class="faction-mode-imp">
    <div>
        <!--TODO:
            -choose class/spec
            -class buffs (on by default?)
            -datacrons (mastery/endurance/presence...should these be on by default?)
            -stim?
            -checkbox or dropdown for "show only: [gear for my spec]/[gear for my class]/[all]"
            -gearPlanner should be greyed out until options are chosen?
        -->
    </div>
    <div id="factionToggle">
        <input type="radio" name="faction" value="pub" onclick="DomController.userInput(this, 'factionToggle')"><label>Republic</label>
        <input type="radio" name="faction" value="imp" onclick="DomController.userInput(this, 'factionToggle')" checked><label>Empire</label>
    </div>
    <div id="charBodyDiv">
        <table id="charBodyTable">
            <tr>
                <td>
                    <div id="slotEar" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_ear.png" />
                        </a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotHead" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_head.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotImplant1" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_implant.png" />
                        </a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotChest" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_chest.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotImplant2" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_implant.png" />
                        </a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotHands" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_hands.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotWrists" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_wrists.png" />
                        </a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotWaist" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_waist.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotRelic1" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_relic.png" />
                        </a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotLegs" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_legs.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotRelic2" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_relic.png" />
                        </a>
                    </div>
                </td>
                <td>
                    <div id="slotMainhand" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_mainhand_saber.png" />
                        </a>
                    </div>
                </td>
                <td>
                    <div id="slotOffhand" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_offhand_shield.png" />
                        </a>
                    </div>
                </td>
                <td>
                    <div id="slotFeet" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_feet.png" />
                        </a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="content-left">
        <div id="charSettings">
            <label "label-inline" for="classDropdown">Class:</label>
            <select id="classDropdown" onchange="DomController.userInput(this, 'classSelect')">
                <option class="faction-imp" value="sin">Assassin</option>
                <option class="faction-imp" value="jugg">Juggernaut</option>
                <option class="faction-imp" value="mara">Marauder</option>
                <option class="faction-imp" value="merc">Mercenary</option>
                <option class="faction-imp" value="op">Operative</option>
                <option class="faction-imp" value="pt">Powertech</option>
                <option class="faction-imp" value="sniper">Sniper</option>
                <option class="faction-imp" value="sorc">Sorcerer</option>
                <option class="faction-pub" value="merc">Commando</option>
                <option class="faction-pub" value="jugg">Guardian</option>
                <option class="faction-pub" value="sniper">Gunslinger</option>
                <option class="faction-pub" value="sorc">Sage</option>
                <option class="faction-pub" value="op">Scoundrel</option>
                <option class="faction-pub" value="mara">Sentinel</option>
                <option class="faction-pub" value="sin">Shadow</option>
                <option class="faction-pub" value="pt">Vanguard</option>
            </select>
            <label "label-inline" for="specDropdown">Spec:</label>
            <select id="specDropdown" onchange="DomController.userInput(this, 'specSelect')">
                <option class="faction-imp" value="sinTank">Darkness</option>
                <option class="faction-imp" value="sinBurst">Deception</option>
                <option class="faction-imp" value="sinSust">Hatred</option>
                <option class="faction-pub" value="sinTank">Kinetic Combat</option>
                <option class="faction-pub" value="sinBurst">Infiltration</option>
                <option class="faction-pub" value="sinSust">Serenity</option>
            </select>
            <div id="datacronsCheckboxDiv" class="setting-expandable spawns-popup spawns-popup-hidden">
                <span class="expand-settings" onclick="DomController.userInput(this, 'toggleExpand', event)"></span>
                <input type="checkbox" checked id="datacronsCheckbox" onchange='Settings.updateDatacrons(this)'>
                <label class="label-single-line" for="datacronsCheckbox">All datacrons</label>
                <div class="setting-extra setting-extra-collapsed popup-volatile popup-hidden">
                    <div class="setting">
                        <input type="checkbox" checked id="datacronsCheckboxOssus" class="datacrons-checkbox" onchange="Settings.updateDatacrons(this)">
                        <label class="label-single-line" for="datacronsCheckboxOssus">Ossus</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="datacronsCheckboxRishi" class="datacrons-checkbox" onchange="Settings.updateDatacrons(this)">
                        <label class="label-single-line" for="datacronsCheckboxRishi">Rishi</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="datacronsCheckboxMakeb" class="datacrons-checkbox" onchange="Settings.updateDatacrons(this)">
                        <label class="label-single-line" for="datacronsCheckboxMakeb">Makeb</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="datacronsCheckboxFleet" class="datacrons-checkbox" onchange="Settings.updateDatacrons(this)">
                        <label class="label-single-line" for="datacronsCheckboxFleet">Fleet</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="datacronsCheckboxBase" class="datacrons-checkbox" onchange="Settings.updateDatacrons(this)">
                        <label class="label-single-line" for="datacronsCheckboxBase">Base game planets</label>
                    </div>
                </div>
            </div>
            <div id="classBuffsCheckboxDiv" class="setting-expandable spawns-popup spawns-popup-hidden">
                <span class="expand-settings collapsed" onclick="DomController.userInput(this, 'toggleExpand', event)"></span>
                <input type="checkbox" checked id="classBuffsCheckbox" onchange='Settings.updateClassBuffs(this)'>
                <label class="label-single-line" for="classBuffsCheckbox">All class buffs</label>
                <div class="setting-extra setting-extra-collapsed popup-volatile popup-hidden">
                    <div class="setting">
                        <input type="checkbox" checked id="classBuffsCheckboxMastery" class="class-buffs-checkbox" onchange="Settings.updateClassBuffs(this)">
                        <label class="label-single-line faction-imp" for="classBuffsCheckboxMastery">Mark of Power</label>
                        <label class="label-single-line faction-pub" for="classBuffsCheckboxMastery">Force Valor</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="classBuffsCheckboxDmg" class="class-buffs-checkbox" onchange="Settings.updateClassBuffs(this)">
                        <label class="label-single-line faction-imp" for="classBuffsCheckboxDmg">Unnatural Might</label>
                        <label class="label-single-line faction-pub" for="classBuffsCheckboxDmg">Force Might</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="classBuffsCheckboxCrit" class="class-buffs-checkbox" onchange="Settings.updateClassBuffs(this)">
                        <label class="label-single-line faction-imp" for="classBuffsCheckboxCrit">Coordination</label>
                        <label class="label-single-line faction-pub" for="classBuffsCheckboxCrit">Lucky Shots</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="classBuffsCheckboxEndurance" class="class-buffs-checkbox" onchange="Settings.updateClassBuffs(this)">
                        <label class="label-single-line faction-imp" for="classBuffsCheckboxEndurance">Hunter&apos;s Boon</label>
                        <label class="label-single-line faction-pub" for="classBuffsCheckboxEndurance">Fortification</label>
                    </div>
                </div>
            </div>
            <div id="companionBuffsCheckboxDiv" class="setting-expandable spawns-popup spawns-popup-hidden">
                <span class="expand-settings collapsed" onclick="DomController.userInput(this, 'toggleExpand', event)"></span>
                <input type="checkbox" checked id="companionBuffsCheckbox" onchange='Settings.updateCompanionBuffs(this)'>
                <label class="label-single-line" for="companionBuffsCheckbox">All companion buffs</label>
                <div class="setting-extra setting-extra-collapsed popup-volatile popup-hidden">
                    <div class="setting">
                        <input type="checkbox" checked id="companionBuffsCheckboxRTank" class="companion-buffs-checkbox" onchange="Settings.updateCompanionBuffs(this)">
                        <label class="label-single-line" for="companionBuffsCheckboxRTank">Ranged Tank</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="companionBuffsCheckboxMTank" class="companion-buffs-checkbox" onchange="Settings.updateCompanionBuffs(this)">
                        <label class="label-single-line" for="companionBuffsCheckboxMTank">Melee Tank</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="companionBuffsCheckboxRDPS" class="companion-buffs-checkbox" onchange="Settings.updateCompanionBuffs(this)">
                        <label class="label-single-line" for="companionBuffsCheckboxRDPS">Ranged DPS</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="companionBuffsCheckboxMDPS" class="companion-buffs-checkbox" onchange="Settings.updateCompanionBuffs(this)">
                        <label class="label-single-line" for="companionBuffsCheckboxRTank">Melee DPS</label>
                    </div>
                    <div class="setting">
                        <input type="checkbox" checked id="companionBuffsCheckboxHealer" class="companion-buffs-checkbox" onchange="Settings.updateCompanionBuffs(this)">
                        <label class="label-single-line" for="companionBuffsCheckboxRTank">Healer</label>
                    </div>
                </div>
            </div>
        </div>
        <div id="itemPicker" style="display:none;">
            <div id="currentItemArea">
                <table>
                    <tr>
                        <td colspan="2"><span class="block-title">Currently Equipped:&nbsp;</span><span id="currentItemName" class="block-title">None</span></td>
                    </tr>
                    <tr>
                        <td><img id="currentItemImg" class="character-slot-img slot-empty" src="images/items80/empty_mainhand_saber.png" /></td>
                        <td style="width:100%">
                            <div id="currentItemRating"></div>
                            <div id="currentItemStats"></div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2"><div id="currentItemDescription"></div></td>
                    </tr>
                </table>
            </div>
            <div id="itemModdingArea">
                <div>
                    <div id="slotDynamic" class="mod-slot">
                        <a class="mod-slot-link" onclick="DomController.userInput(this, 'modSlot');">
                            <img class="mod-slot-img slot-empty" src="images/items80/empty_offhand_shield.png" />
                        </a>
                    </div>
                    <div id="slotMod" class="mod-slot">
                        <a class="mod-slot-link" onclick="DomController.userInput(this, 'modSlot');">
                            <img class="mod-slot-img slot-empty" src="images/items80/empty_offhand_shield.png" />
                        </a>
                    </div>
                    <div id="slotEnhancement" class="mod-slot">
                        <a class="mod-slot-link" onclick="DomController.userInput(this, 'modSlot');">
                            <img class="mod-slot-img slot-empty" src="images/items80/empty_offhand_shield.png" />
                        </a>
                    </div>
                    <div id="slotCrystal" class="mod-slot">
                        <a class="mod-slot-link" onclick="DomController.userInput(this, 'modSlot');">
                            <img class="mod-slot-img slot-empty" src="images/items80/empty_offhand_shield.png" />
                        </a>
                    </div>
                </div>
            </div>
            <div id="itemListSettingsTop">
            </div>
            <div id="itemListArea">
                <div id="itemListGreen" class="item-list" style="display:none;"></div>
                <div id="itemListBlue" class="item-list" style="display:none;"></div>
                <div id="itemListPurple" class="item-list"></div>
                <div id="itemListGold" class="item-list"></div>
                <div id="itemListEmpty" class="item-list" stle="display:none;"></div>
            </div>
            <div id="itemListSettingsBottom">
                <div id="itemListSettingsColor" class="item-list-settings-block settings-partwidth">
                    <span class="block-title">Gear Quality:</span>
                    <div class="item-green"><input type="checkbox" id="gearQualityCheckboxGreen" class="item-color-checkbox" value="green" onclick="DomController.userInput(this, 'updateItemColors')"><label for="gearQualityCheckboxPremium">Premium</label></div>
                    <div class="item-blue"><input type="checkbox" id="gearQualityCheckboxBlue" class="item-color-checkbox" value="blue" onclick="DomController.userInput(this, 'updateItemColors')"><label for="gearQualityCheckboxPrototype">Prototype</label></div>
                    <div class="item-purple"><input type="checkbox" checked id="gearQualityCheckboxPurple" class="item-color-checkbox" value="purple" onclick="DomController.userInput(this, 'updateItemColors')"><label for="gearQualityCheckboxArtifact">Artifact</label></div>
                    <div class="item-gold"><input type="checkbox" checked id="gearQualityCheckboxGold" class="item-color-checkbox" value="gold" onclick="DomController.userInput(this, 'updateItemColors')"><label for="gearQualityCheckboxLegendary">Legendary</label></div>
                    <div class="item-orange"><!--<input type="checkbox" id="gearQualityCheckboxOrange" class="item-color-checkbox" value="orange" onclick="DomController.userInput(this, 'updateItemColors')"><label for="gearQualityCheckboxCustom">Custom</label>--></div>
                </div>
                <div id="itemListSettingsRating" class="item-list-settings-block settings-partwidth">
                    <span class="block-title">Item Rating:</span>
                    <div><input type="checkbox" checked id="itemRatingCheckboxT1" class="item-rating-checkbox" value="228-230" onclick="DomController.userInput(this, 'updateItemRatings')"><label for="itemRatingCheckboxT1">Tier 1 (228-230)</label></div>
                    <div><input type="checkbox" checked id="itemRatingCheckboxT2" class="item-rating-checkbox" value="232-236" onclick="DomController.userInput(this, 'updateItemRatings')"><label for="itemRatingCheckboxT2">Tier 2 (232-236)</label></div>
                    <div><input type="checkbox" checked id="itemRatingCheckboxT3" class="item-rating-checkbox" value="238-242" onclick="DomController.userInput(this, 'updateItemRatings')"><label for="itemRatingCheckboxT3">Tier 3 (238-242)</label></div>
                    <div><input type="checkbox" checked id="itemRatingCheckboxT4" class="item-rating-checkbox" value="244-248" onclick="DomController.userInput(this, 'updateItemRatings')"><label for="itemRatingCheckboxT4">Tier 4 (244-248)</label></div>
                    <div><input type="checkbox" checked id="itemRatingCheckboxT5" class="item-rating-checkbox" value="252-258" onclick="DomController.userInput(this, 'updateItemRatings')"><label for="itemRatingCheckboxT5">Tier 5 (252-258)</label></div>
                </div>
                <div class="item-list-settings-block settings-partwidth" style="width:30%;">
                    <label class="block-title" for="specFilterDropdown">Show items for:</label>
                    <select name="specFilterDropdown" id="specFilterDropdown" onchange="DomController.userInput(this, 'specFilterChange')">
                        <option value="myClass">My class</option>
                        <option value="mySpec" selected>My spec</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
    <div id="tooltipEl" style="display:none">
        <div id="tooltipItemName"></div>
        <div id="tooltipItemRating"></div>
        <div id="tooltipItemStats"></div>
        <div id="tooltipItemDescription"></div>
    </div>
</body>
<script type="text/javascript">
let debug = true;
let requiredFiles = {};
function requireJs(filepath)
{
    let filename = filepath.split('/');
    filename = filename[filename.length-1]; //ahh, weakly-typed languages...

    let dcParam = new Date().getTime();
    let scriptEl = document.createElement('script');
    scriptEl.setAttribute('type', 'text/javascript');
    scriptEl.setAttribute('src', filepath + '?dc=' + dcParam);
    document.head.appendChild(scriptEl);

    requiredFiles[filename] = false;
}
function declareReady(filename, callback)
{
    log(filename + ' loaded successfully.');

    requiredFiles[filename] = callback;
    for(f in requiredFiles)
    {
        if(requiredFiles.hasOwnProperty(f))
        {
            if(requiredFiles[f] === false)
            {
                return;
            }
        }
    }
    initAll();
}
function initAll()
{
    for(f in requiredFiles)
    {
        if(requiredFiles.hasOwnProperty(f))
        {
            let fn = requiredFiles[f];
            if(typeof fn === 'function')
            {
                try
                {
                    requiredFiles[f]();
                }
                catch(e)
                {
                    console.error('Failed to initialize ' + f + '!');
                    console.error(e);
                }
            }
        }
    }
    DomController.initSelections();
}
function log(str)
{
    if(debug)
    {
        console.log(str);
    }
}
</script>
<script type="text/javascript">
    requireJs("/swtor/scripts/DomController.js");
    requireJs("/swtor/scripts/DomManager.js");
    requireJs("/swtor/scripts/ItemManager.js");
    requireJs("/swtor/scripts/PickerController.js");
    requireJs("/swtor/scripts/SlotManager.js");
    requireJs("/swtor/scripts/SpecManager.js");
    requireJs("/swtor/scripts/StatController.js");
    requireJs("/swtor/scripts/TooltipController.js");
    requireJs("/swtor/scripts/Settings.js");
    requireJs("/swtor/scripts/Utilities.js");
    requireJs("/swtor/scripts/model/Item.js");
    requireJs("/swtor/scripts/model/ItemMod.js");
    requireJs("/swtor/scripts/model/Slot.js");
    //requireJs("/swtor/scripts/model/allItemData.js"); //TODO: temporary hard-code

    let allItemData = <%= ItemManager.getAllAsJson() %>;
</script>
</html>
