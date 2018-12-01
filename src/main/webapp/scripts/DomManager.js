let DomManager = (function()
{
    function DomManager()
    {
        //declare vars
    }
    DomManager.prototype.init = function()
    {
        //locate DOM elements

        log('DomManager initialized.');
    }
    return new DomManager();
})();
declareReady('DomManager.js', DomManager.init);