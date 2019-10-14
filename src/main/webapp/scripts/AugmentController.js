let AugmentController = (function()
{
    function AugmentController()
    {
        this.copyMode = false;
        this.augToCopy = null;

        this.cbt;
        this.cab;
        this.sab;
    }
    AugmentController.prototype.init = function()
    {
        this.cbt = document.getElementById('charBodyTable');
        this.cab = document.getElementById('copyAugButton');
        this.sab = document.getElementById('saveAugButton');
    };
    AugmentController.prototype.toggleCopyMode = function()
    {
        if(this.copyMode)
        {
            this.copyMode = false;
            this.cbt.classList.remove('augment-copy-mode');
            this.cab.innerHTML = 'Clone';
            this.sab.disabled = false;
            this.augToCopy = null;
            HelpController.display('augPicker');
        }
        else
        {
            this.copyMode = true;
            this.cbt.classList.add('augment-copy-mode');
            this.cab.innerHTML = 'Done';
            this.sab.disabled = true;
            this.augToCopy = SlotManager.getCurrentSlot().getAugment();
            HelpController.display('augClone');
        }
    };
    AugmentController.prototype.setHasCurrent = function(hasCurrent)
    {
        if(hasCurrent)
        {
            this.cbt.classList.add('has-current-slot');
        }
        else
        {
            this.cbt.classList.remove('has-current-slot');
        }
    }
    AugmentController.prototype.isCopyMode = function()
    {
        return this.copyMode;
    };
    AugmentController.prototype.getAugmentToCopy = function()
    {
        return this.augToCopy;
    }
    return new AugmentController();
})();
declareReady('AugmentController.js', function(){AugmentController.init();});