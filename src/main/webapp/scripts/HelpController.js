let HelpController = (function()
{
    function HelpController()
    {
        this.content;
    }
    HelpController.prototype.init = function()
    {
        this.content = document.getElementById('helpDivContent');
        this.lastMsgType = 'welcome';

        this.addHoverTip(document.getElementById('calcStatAlacrity'), 'alacTiers');
    };
    HelpController.prototype.display = function(msgType, isTransient)
    {
        let msg = '';
        switch(msgType)
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
            case 'alacTiers':
            {
                msg = 'Each alacrity tier reduces the length of your global cooldown (GCD) by 0.1 seconds.  The tiers are as follows:<br/>' +
                    'Tier 0 (1.5s): 0.00% to 7.142%<br/>' +
                    'Tier 1 (1.4s): 7.143% to 15.384%<br/>' +
                    'Tier 2 (1.3s): 15.385% and higher';
                break;
            }
        }

        this.content.innerHTML = msg;
        if(!isTransient)
        {
            this.lastMsgType = msgType;
        }
    };
    HelpController.prototype.addHoverTip = function(el, msgType)
    {
        if(el === null)
        {
            console.error('Cannot add hover tip to null element!');
            return;
        }
        let me = this;
        el.addEventListener('mouseenter', function(event)
        {
            me.display(msgType, true);
        });
        el.addEventListener('mouseout', function(event)
        {
            me.revert();
        });
    };
    HelpController.prototype.revert = function()
    {
        this.display(this.lastMsgType);
    };
    return new HelpController();
})();
declareReady('HelpController.js', function(){HelpController.init()});