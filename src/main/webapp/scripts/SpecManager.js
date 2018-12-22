let SpecManager = (function()
{
    function SpecManager()
    {
        //declare vars
        this.roleSpecMapping;
        this.roleClassMapping;
        this.classSpecMapping;
    }
    SpecManager.prototype.init = function()
    {
        //TODO:grab specs from DB?
        this.roleSpecMapping = {
            tank:['juggTank','sinTank','ptTank'],
            dps:['juggSust', 'juggBurst', 'sinBurst', 'sinSust', 'ptSust', 'ptBurst', 'mercBurst', 'mercSust', 'sorcBurst', 'sorcSust', 'opBurst', 'opSust', 'sniperBurst', 'sniperSust', 'sniperHybrid', 'maraSust', 'maraBurst', 'maraHybrid'],
            healer:['mercHealer','mercHealer','opHealer']
        }
        this.roleClassMapping = {
            tank:['jugg', 'sin', 'pt'],
            dps:['jugg', 'sin', 'pt', 'merc', 'sorc', 'op', 'sniper', 'mara'],
            healer:['merc', 'sorc', 'op']
        }
        this.classSpecMapping = {
            jugg: ['juggTank', 'juggSust', 'juggBurst'],
            sin: ['sinTank', 'sinBurst', 'sinSust'],
            pt: ['ptTank', 'ptSust', 'ptBurst'],
            merc: ['mercHealer', 'mercBurst', 'mercSust'],
            sorc: ['sorcHealer', 'sorcBurst', 'sorcSust'],
            op: ['opHealer', 'opBurst', 'opSust'],
            sniper: ['sniperBurst', 'sniperSust', 'sniperHybrid'],
            mara: ['maraSust', 'maraBurst', 'maraHybrid']
        }
        log('SpecManager initialized.');
    };
    SpecManager.prototype.specFitsRole = function(spec, role)
    {
        if(!spec ^ !role) //bitwise XOR.  We want to fail on nulls or blank strings, but if they're *both* null then they're equal
        {
            return false;
        }
        if(spec === role)
        {
            return true;
        }
        if(spec.toLowerCase() === ('all' + role.toLowerCase()))
        {
            return true;
        }
        if(role === 'all' || spec === 'all')
        {
            return true;
        }
        return this.roleSpecMapping[role].indexOf(spec) !== -1;
    };
    SpecManager.prototype.classFitsRole = function(className, role)
    {
        if(!className ^ !role)
        {
            return false
        }
        if(spec === role)
        {
            return true;
        }
        if(className.toLowerCase() === ('all' + role.toLowerCase()))
        {
            return true;
        }
        if(role === 'all' || spec === 'all')
        {
            return true;
        }
        return this.roleClassMapping[role].indexOf(className) !== -1;
    };
    SpecManager.prototype.specFitsClass = function(spec, className)
    {
        if(!spec ^ !className)
        {
            return false
        }
        if(spec === className)
        {
            return true;
        }
        if(role.toLowerCase() === ('all' + className.toLowerCase()))
        {
            return true;
        }
        if(spec === "all" || className === "all")
        {
            return true;
        }
        return this.classSpecMapping[className].indexOf(role) !== -1;
    };
    return new SpecManager();
})();
declareReady('SpecManager.js', function(){SpecManager.init()});