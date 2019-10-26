/*=========README=========
* All changes to the encoded format MUST be backwards-compatible!
* Export strings are divided up first by pipe-delimited sections as follows: settings|gear|augments
* Within each section, they are further delimited by a period.
* Order for settings: faction.class.spec.datacrons.classbuffs.companionbuffs.stim
* Order for gear slots: ear.implant1.implant2.wrists.relic1.relic2.head.chest.hands.waist.legs.feet.mainhand.offhand
* Order for augment slots: same as above
* Regular items are just referenced by their static itemId.
* Custom items start with a ~ and then spell out their properties in this format: ~key:value,key:value,key:value //TODO:how do we handle lists and objects?
*/

let ImportExportController = (function()
{
    function ImportExportController()
    {
        //declare vars
    }
    ImportExportController.prototype.init = function()
    {
        //TODO
    };
    return new ImportExportController();
})();
declareReady('ImportExportController.js',  function(){ImportExportController.init()});