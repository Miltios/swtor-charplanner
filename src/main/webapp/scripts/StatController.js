let StatController = (function()
{
    function StatController()
    {
        //declare vars
        this.statNames;
    }
    StatController.prototype.init = function()
    {
        this.statNames = {
            mastery: 'Mastery',
            endurance: 'Endurance',
            power: 'Power',
            crit: 'Critical Rating',
            alacrity: 'Alacrity Rating',
            accuracy: 'Accuracy Rating',
            defense: 'Defense Rating',
            absorption: 'Absorption Rating',
            shield: 'Shield Rating',
            presence: 'Presence'
        }

        log('StatController initialized.');
    };
    StatController.prototype.getStatName = function(stat)
    {
        if(!stat || !this.statNames.hasOwnProperty(stat))
        {
            return '';
        }
        return this.statNames[stat];
    }
    return new StatController();
})();
declareReady('StatController.js', function(){StatController.init();});