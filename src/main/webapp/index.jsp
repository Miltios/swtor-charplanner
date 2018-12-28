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
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotHead" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotImplant1" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotChest" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotImplant2" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotHands" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotWrists" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotWaist" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotRelic1" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td colspan="2"></td>
                <td>
                    <div id="slotLegs" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotRelic2" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td>
                    <div id="slotMainhand" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td>
                    <div id="slotOffhand" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
                <td>
                    <div id="slotFeet" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');"></a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div class="content-left">
        <div id="charSettings">
            <!--spec, class, datacrons, class buffs, companion buffs-->
            <label "label-inline" for="classDropdown">Class:</label>
            <select id="classDropdown" onchange="DomController.userInput(this, 'classSelect')">
                <option class="faction-imp" value="sin" selected>Assassin</option>
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
            <select id="specDropdown" onchange="DomController.userInput(this, 'classSelect')"> <!--TODO: update options dynamically -->
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
                <div>
                    <!--TODO-->
                    [Currently equipped]
                </div>
            </div>
            <div id="itemListSettings">
                <label for="specFilterDropdown">Show items for:</label>
                <select name="specFilterDropdown" id="specFilterDropdown" onchange="DomController.userInput(this, 'specFilterChange'">
                    <option value="myClass">My class</option>
                    <option value="mySpec" selected>My spec</option>
                    <option value="all">All</option>
                </select>
            </div>
            <div id="itemListArea">
                <div id="itemListGreen" class="item-list" style="display:none"></div>
                <div id="itemListBlue" class="item-list" style="display:none"></div>
                <div id="itemListPurple" class="item-list"></div>
                <div id="itemListGold" class="item-list"></div>
            </div>
            <div id="customItemArea">
                <div colspan="4">
                    [custom item]
                </div>
            </div>
        </div>
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
    requireJs("/swtor/scripts/Settings.js");
    requireJs("/swtor/scripts/Utilities.js");
    requireJs("/swtor/scripts/model/Item.js");
    requireJs("/swtor/scripts/model/ItemMod.js");
    requireJs("/swtor/scripts/model/Slot.js");
    //requireJs("/swtor/scripts/model/allItemData.js"); //TODO: temporary hard-code

    let allItemData = <%= ItemManager.getItemsAsJson() %>;
</script>
</html>
