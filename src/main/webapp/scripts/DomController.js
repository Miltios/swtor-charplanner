let DomController = (function()
{
    function DomController()
    {
        //declare vars
    }
    DomController.prototype.init = function()
    {
        log('DomController initialized.');
    }
    return new DomController();
})();
declareReady('DomController.js', DomController.init);