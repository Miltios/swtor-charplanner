let HelpController = (function()
{
    function HelpController()
    {
        this.content;
    }
    HelpController.prototype.init = function()
    {
        this.content = document.getElementById('helpDivContent');
    }
    HelpController.prototype.display = function(messageType)
    {
        let msg = '';
        switch(messageType)
        {
            case 'welcome':
            {
                msg = 'Welcome to the SWTOR charplanner!  Set your class and other info in the top left menu, and then click a gear slot to get started.';
                break;
            }
            case 'itemPicker':
            {
                msg = 'Now that you\'ve chosen a gear slot, you can click any item in the lists to equip it to that slot.  ' +
                    'Some items are not listed by default (e.g. lower quality items or items for different specs).  ' +
                    'If the item you want isn\'t listed, just change your settings in the menus below the lists.';
                break;
            }
            case 'itemSelected':
            {
                msg = 'Now that you\'ve selected an item, your stats have updated automatically.  ' +
                    'If the item is moddable, you can also click the individual mods to swap them out.';
                break;
            }
        }

        this.content.innerHTML = msg;
    }
    return new HelpController();
})();
declareReady('HelpController.js', function(){HelpController.init()});