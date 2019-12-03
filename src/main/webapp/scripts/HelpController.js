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
        this.display('welcome', false);

        this.addHoverTip(document.getElementById('calcStatAlacrity'), 'alacTiers');
        this.addHoverTip(document.getElementById('autofillGearButton'), 'autofill');
    };
    HelpController.prototype.display = function(msgType, isTransient)
    {
        let msg = '';
        switch(msgType)
        {
            case 'welcome':
            {
                msg = 'Welcome to the SWTOR charplanner!  Set your class and other info in the top left menu, and then click a gear slot to get started.<br/><br/>' +
                        'By default, the site assumes that you have all datacrons, companions, and class buffs.  You can change all of these settings to more closely match your situation.';
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
                    'If the item is moddable, you can also click the individual mods to swap them out.  You can also edit stat values for a mod if it doesn\'t quite match what you have in-game.<br /><br />' +
                    'Click the "clear slot" button if you wish to remove this item.';
                break;
            }
            case 'alacTiers':
            {
                msg = 'Each alacrity tier reduces the length of your global cooldown (GCD) by 0.1 seconds.  The tiers are as follows:<br/>' +
                    '-Tier 1 (1.5s): 0.00% to 7.142% (0 to 1212*)<br/>' +
                    '-Tier 2 (1.4s): 7.143% to 15.384% (1213 to 3205*)<br/>' +
                    '-Tier 3 (1.3s): 15.385% and higher (3206*)<br/>' +
                    'As far as GCD reduction goes, there is no benefit to getting additional alacrity unless it moves you up to the next tier.  ' +
                    'Try to stay as close to the cutoffs as possible without going below them.<br/></br/>' +
                    '<span class="footnote">*Percentages are always accurate; raw numbers are only accurate if your spec doesn\'t have an alacrity buff.</span>';
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
                    'To make it easier to fine-tune your stats without extra clicking, augments are not actually tied to gear items, and you can even add augments to empty gear slots.';
                break;
            }
            case 'augClone':
            {
                msg = 'You are now in Augment Clone mode.  Click any augment slot to copy the displayed augment there.  ' +
                    'When you\'re finished, just click the Done button (where Clone used to be)';
                break;
            }
            case 'autofill':
            {
                msg = 'The autofill button will automatically choose armor and weapons appropriate to your current spec, using the maximum item rating configured in the bottom left.  ' +
                        'It will not autofill "left-side" gear (relics, implants, and earpiece).<br/><br/>' +
                        'You can still make changes after autofilling; it\'s just a convenience function to save time in getting started.'
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
        el.addEventListener('mouseover', function(event)
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