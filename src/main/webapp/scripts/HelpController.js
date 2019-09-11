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
                    'If the item you want isn\'t listed, just change your settings in the menus below the lists.<br/><br/>' +
                    'If you want to change augments, click on the augment slot next to the gear slot.';
                break;
            }
            case 'itemSelected':
            {
                msg = 'Now that you\'ve selected an item, your stats have updated automatically.  ' +
                    'If the item is moddable, you can also click the individual mods to swap them out.<br /><br />' +
                    'Click the "clear slot" button if you wish to remove this item.';
                break;
            }
            case 'alacTiers': //TODO: these values are out of date
            {
                msg = 'Each alacrity tier reduces the length of your global cooldown (GCD) by 0.1 seconds.  The tiers are as follows:<br/>' +
                    '-Tier 1 (1.5s): 0.00% to 7.142%<br/>' +
                    '-Tier 2 (1.4s): 7.143% to 15.384%<br/>' +
                    '-Tier 3 (1.3s): 15.385% and higher<br/>' +
                    'As far as GCD reduction goes, there is no benefit to getting additional alacrity unless it moves you up to the next tier.  ' +
                    'Try to stay as close to the cutoffs as possible without going below them.';
                break;
            }
            case 'modPicker':
            {
                msg = 'Mods can swapped by clicking what you want in the list, just like items.  ' +
                    'When a gear piece has been modified, its border turns to orange to indicate that it has non-standard mods.';
                break;
            }
            case 'augPicker':
            {
                msg = 'To add an augment to this gear slot, just choose the type and rating, and then click Add.  ' +
                    'Then you can use the Clone button to copy the same augment to as many other slots as you want.<br/><br/>' +
                    'Unlike in game, augments are not actually tied to gear items, and you can even add augments to empty gear slots.  ' +
                    'This makes it easier to fine-tune your stats without extra clicking.';
                break;
            }
            case 'augClone':
            {
                msg = 'You are now in Augment Clone mode.  Click any augment slot to copy the displayed augment there.  ' +
                    'When you\'re finished, just click the Done button (where Clone used to be)';
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