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
    Utilities.prototype.elHasAncestor = function(el, ancestor)
    {
        if(!el || el.parentNode === null || !ancestor)
        {
            return false;
        }
        if(el === ancestor)
        {
            return true;
        }
        let parent = el.parentNode;
        while(parent)
        {
            if(parent == ancestor)
            {
                return true;
            }
            parent = parent.parentNode;
        }
        return false;
    }
    return new Utilities();
})();
declareReady('Utilities.js', null);