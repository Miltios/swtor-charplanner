<html>
<head>
    <link rel="stylesheet" type="text/css" href="/swtor/styles/global.css">
    <link rel="stylesheet" type="text/css" href="/swtor/styles/gearPlanner.css">
</head>
<body>
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
    <table id="itemPicker" style="display:none;">
        <tr id="currentItemArea">
            <td colspan="2">
                <!--TODO-->
                [Currently equipped]
            </td>
        </tr>
        <tr class="itemListArea">
            <td id="itemListPurple" class="item-list"></td>
            <td id="itemListGold" class="item-list"></td>
        </tr>
        <tr id="customItemArea">
            <td colspan="2">
                [custom item]
            </td>
        </tr>
    </table>
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
    requireJs("/swtor/scripts/Settings.js");
    requireJs("/swtor/scripts/model/Item.js");
    requireJs("/swtor/scripts/model/ItemMod.js");
    requireJs("/swtor/scripts/model/Slot.js");
    requireJs("/swtor/scripts/model/allItemData.js"); //TODO: temporary hard-code
</script>
</html>
