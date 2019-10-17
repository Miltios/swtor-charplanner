/* Class for developer shortcuts, called directly from console.  Main functionality should never be dependent on this file. */
let Dev = (function()
{
    function Dev()
    {
        //declare vars
    }
    Dev.prototype.resetDb = function()
    {
        let password = prompt('Please enter password');
        fetch("request/updatedata", {
            method:'POST',
            body:password
        }).then(res => res.json())
        .then(json => {
            if(json.success)
            {
                console.log('Completed successfully.');
                if(json.message)
                {
                    console.log('\t' + json.message);
                }
            }
            else
            {
                console.log('Call failed!');
                console.log('Error: ' + json.error);
            }
        });
    };
    Dev.prototype.resetLimiter = function()
    {
        let password = prompt('Please enter password');
        fetch("request/resetlimiter", {
            method:'POST',
            body:password
        }).then(res => res.json())
        .then(json => {
            if(json.success)
            {
                console.log('Completed successfully.');
                if(json.message)
                {
                    console.log('\t' + json.message);
                }
            }
            else
            {
                console.log('Call failed!');
                console.log('Error: ' + json.error);
            }
        });
    };
    return new Dev();
})();
declareReady('Dev.js', null);