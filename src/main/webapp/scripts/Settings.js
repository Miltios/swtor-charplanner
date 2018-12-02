let Settings = (function()
{
    function Settings()
    {
        //declare vars
    }
    Settings.prototype.init = function()
    {
        //locate DOM elements?

        log('Settings initialized.');
    };
    Settings.prototype.getSpecFilter = function()
    {
        return 'mySpec'; //TODO:hard-code
    };
    Settings.prototype.getSpec = function()
    {
        return 'juggTank'; //TODO:hard-code
    };
    Settings.prototype.getClass = function()
    {
        return 'jugg';
    }
    return new Settings();
})();
declareReady('Settings.js', function(){Settings.init()});