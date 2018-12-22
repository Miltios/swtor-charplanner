let Utilities = (function()
{
    function Utilities()
    {
        //declare vars
    }
    Utilities.prototype.arrayMatch = function(arr1, arr2)
    {
        if(arr1 === null || arr2 === null)
        {
            return false;
        }
        for(let i=0; i<arr1.length; i++)
        {
            if(arr2.indexOf(arr1[i]) !== -1)
            {
                return true;
            }
        }
        return false;
    };
    return new Utilities();
})();
declareReady('Utilities.js', null);