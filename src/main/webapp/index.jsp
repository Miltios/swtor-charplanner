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
    <div id="charBodyDiv">
        <table id="charBodyTable">
            <tr>
                <td>
                    <div id="slotEar" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_ear.png" />
                        </a>
                    </div>
                </td>
                <td colspan="2" style="vertical-align:top">
                    <div id="charStatsWrapper">
                        <div id="charStatsDiv">
                        <table id="factionToggle">
                            <tr>
                                <td value="pub" class="faction-select-button faction-select-button-pub" onclick="DomController.userInput(this, 'factionToggle')">
                                    <img src="images/logo_republic_250.png" />
                                </td>
                                <td value="imp" class="faction-select-button faction-select-button-imp faction-select-button-checked" onclick="DomController.userInput(this, 'factionToggle')">
                                    <img src="images/logo_empire_250.png" />
                                </td>
                            </tr>
                        </table>
                            <table id="charStatsBody">
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Mastery</td>
                                    <td class="char-stat-value" id="charStatMastery"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Endurance</td>
                                    <td class="char-stat-value" id="charStatEndurance"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Power</td>
                                    <td class="char-stat-value" id="charStatPower"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Critical</td>
                                    <td class="char-stat-value" id="charStatCrit"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Alacrity</td>
                                    <td class="char-stat-value" id="charStatAlacrity"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Accuracy</td>
                                    <td class="char-stat-value" id="charStatAccuracy"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Defense</td>
                                    <td class="char-stat-value" id="charStatDefense"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Absorb</td>
                                    <td class="char-stat-value" id="charStatAbsorption"></td>
                                </tr>
                                <tr class="char-stat-row">
                                    <td class="char-stat-name">Shield</td>
                                    <td class="char-stat-value" id="charStatShield"></td>
                                </tr>
                                <tr class="char-stat-row" style="display:none">
                                    <td class="char-stat-name">Presence</td>
                                    <td class="char-stat-value" id="charStatPresence"></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </td>
                <td>
                    <div id="slotHead" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_head.png" />
                        </a>
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotImplant1" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
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
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotImplant2" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
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
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotWrists" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
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
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotRelic1" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
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
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="slotRelic2" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_relic.png" />
                        </a>
                    </div>
                </td>
                <td>
                    <div id="slotMainhand" class="character-slot">
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
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
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
                <td>
                    <div id="slotFeet" class="character-slot">
                        <a class="character-slot-link" onclick="DomController.userInput(this, 'charSlot');">
                            <img class="character-slot-img slot-empty" src="images/items80/empty_feet.png" />
                        </a>
                        <a class="augment-slot-link" onclick="DomController.userInput(this, 'augSlot');">
                            <img class="augment-slot-img slot-empty" src="images/items50/empty_augment.png" />
                        </a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <br/>
    <div id="calcStatsDiv">
        <table id="calcStatsTable">
            <tr>
                <td id="calcStatsOffense">
                    <table class="calc-stats-table-inner">
                        <tr>
                            <td class="calc-stat-name">Mainhand Damage:</td>
                            <td class="calc-stat-value" id="calcStatDmgPri"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Offhand Damage:</td>
                            <td class="calc-stat-value" id="calcStatDmgSec"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Bonus Damage (Melee/Ranged):</td>
                            <td class="calc-stat-value" id="calcStatDmgBonusMR"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Accuracy:</td>
                            <td class="calc-stat-value" id="calcStatAccuracy"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Critical Chance:</td>
                            <td class="calc-stat-value" id="calcStatCritChance"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Critical Multiplier:</td>
                            <td class="calc-stat-value" id="calcStatCritMult"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Bonus Damage (Force/Tech):</td>
                            <td class="calc-stat-value" id="calcStatDmgBonusFT"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Bonus Healing:</td>
                            <td class="calc-stat-value" id="calcStatHealing"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Alacrity:</td>
                            <td class="calc-stat-value" id="calcStatAlacrity"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">&nbsp;</td>
                            <td class="calc-stat-value" id="calcStatEmpty">&nbsp;</td>
                        </tr>
                    </table>
                </td>
                <td id="calcStatsDefense">
                    <table class="calc-stats-table-inner">
                        <tr>
                            <td class="calc-stat-name">Health:</td>
                            <td class="calc-stat-value" id="calcStatHealth"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Armor Rating:</td>
                            <td class="calc-stat-value" id="calcStatArmor"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Damage Reduction:</td>
                            <td class="calc-stat-value" id="calcStatDmgReduction"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Defense Chance:</td>
                            <td class="calc-stat-value" id="calcStatDefense"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Shield Chance:</td>
                            <td class="calc-stat-value" id="calcStatShield"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">Shield Absorption:</td>
                            <td class="calc-stat-value" id="calcStatAbsorb"></td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">&nbsp;</td>
                            <td class="calc-stat-value">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">&nbsp;</td>
                            <td class="calc-stat-value">&nbsp;</td>
                        </tr>
                        <tr>
                            <td class="calc-stat-name">&nbsp;</td>
                            <td class="calc-stat-value">&nbsp;</td>
                        </tr>
                    </table>
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
            <div id="stimDiv">
                <label class="label-single-line">Stim: </label>
                <img onclick="DomController.userInput(this, 'stimClick', event)" class="button-stim" src="images/items50/stim_blue.png" data-stim-type="blue" />
                <img onclick="DomController.userInput(this, 'stimClick', event)" class="button-stim" src="images/items50/stim_yellow.png" data-stim-type="yellow" />
                <img onclick="DomController.userInput(this, 'stimClick', event)" class="button-stim" src="images/items50/stim_red.png" data-stim-type="red" />
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
    <div class="content-right">
        <div id="warningsWrapper">
            <div id="warningsContent"></div>
        </div>
        <div id="augPicker" style="display:none">
            <table id="currentAugArea">
                <tr id="currentAugSettings">
                    <td colspan="4">
                     <label for="inputAugType">Augment type:</label>
                     <select onchange="DomController.userInput(this, 'augTypeSelect')" id="inputAugType">
                        <option value="none" selected>None</option>
                        <option value="absorption">Absorb</option>
                        <option value="accuracy">Accuracy</option>
                        <option value="alacrity">Alacrity</option>
                        <option value="crit">Critical</option>
                        <option value="defense">Defense</option>
                        <option value="endurance">Endurance</option>
                        <option value="mastery">Mastery</option>
                        <option value="power">Power</option>
                        <option value="shield">Shield</option>
                     </select>
                     <label for="inputAugRating">Augment rating:</label>
                     <select onchange="DomController.userInput(this, 'augRatingSelect')" id="inputAugRating">
                        <option value="228">228</option>
                        <option value="230">230</option>
                        <option value="236">236</option>
                        <option value="240">240</option>
                     </select>
                     <br />
                     <!--<button id="removeAugButton">Remove this augment</button>-->
                    </td>
                </tr>
                <tr id="currentAugDisplay">
                    <td>
                        <img id="currentAugImg" class="character-slot-img slot-empty"> <!--TODO:empty img src?-->
                    </td>
                    <td id="currentAugName">
                        None
                    </td>
                    <td id="currentAugStats">
                    </td>
                    <td>
                        <button id="copyAugButton" onclick="DomController.userInput(this, 'toggleCopyAugment')">Clone...</button>
                    </td>
                </tr>
                <tr id="currentAugMask" style="display:none">
                    <td>
                        <button id="singleAugButton" style="display:none">Edit single augment...</button>
                    </td>
                </tr>
            </table>
            <div id="bulkAugsArea">
                <button id="bulkAugsButton">Edit bulk augments...</button>
            </div>
        </div>
    </div>
    <div id="tooltipEl" style="display:none">
        <div id="tooltipItemName"></div>
        <div id="tooltipItemRating"></div>
        <div id="tooltipItemStats"></div>
        <div id="tooltipItemDescription"></div>
        <div id="tooltipStatComparison"></div>
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
    requireJs("/swtor/scripts/StatManager.js");
    requireJs("/swtor/scripts/TooltipController.js");
    requireJs("/swtor/scripts/AugmentController.js");
    requireJs("/swtor/scripts/Settings.js");
    requireJs("/swtor/scripts/Utilities.js");
    requireJs("/swtor/scripts/Dev.js"); //TODO: developer hacks, not needed for functionality
    requireJs("/swtor/scripts/model/Item.js");
    requireJs("/swtor/scripts/model/ItemMod.js");
    requireJs("/swtor/scripts/model/Slot.js");
    //requireJs("/swtor/scripts/model/allItemData.js"); //TODO: temporary hard-code

    //TODO:this may be getting unwieldy.  AJAX?
    let allItemData = <%= ItemManager.getAllAsJson() %>;
    let ratingData = <%= ItemManager.getRatingsAsJson() %>;
    let specBuffData = <%= ItemManager.getSpecBuffsAsJson() %>;
</script>
</html>
