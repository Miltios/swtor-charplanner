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
    };
    StatController.prototype.getStatChanges = function(item1, item2)
    {
        let changes = {};
        if(item1 === null || item2 === null)
        {
            return changes;
        }
        let stats1 = item1.getStats();
        let stats2 = item2.getStats();
        for(let statName in stats1)
        {
            if(stats1.hasOwnProperty(statName))
            {
                let diff;
                if(stats2.hasOwnProperty(statName))
                {
                    diff = stats2[statName] - stats1[statName];
                }
                else
                {
                    diff = 0 - stats1[statName];
                }
                changes[statName] = diff;
            }
        }
        for(let statName in stats2)
        {
            if(stats2.hasOwnProperty(statName) && !changes.hasOwnProperty(statName))
            {
                changes[statName] = stats2[statName];
            }
        }
        return changes;
    };
    return new StatController();
})();
declareReady('StatController.js', function(){StatController.init();});