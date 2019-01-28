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
    };
    Utilities.prototype.capitalizeFirstLetter = function(str)
    {
        if(!str)
        {
            return str;
        }
        return str.substring(0,1).toUpperCase() + str.substr(1);
    };
    Utilities.prototype.lowercaseFirstLetter = function(str)
    {
        if(!str)
        {
            return str;
        }
        return str.substring(0,1).toLowerCase() + str.substr(1);
    }
    return new Utilities();
})();
declareReady('Utilities.js', null);