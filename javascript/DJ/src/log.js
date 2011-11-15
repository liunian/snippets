/**
 * internal log with date time
 *
 * @author dengjij@gmail.com
 * @version 1.0
 *
 * @requires [dj.js]
 */



DJ.log = function(msg){
    // an array to store msg
    if (!DJ._log) DJ._log = [];

    DJ._log.push({
        id: DJ._log.length,
        time: new Date().getTime(),
        msg: msg
    });
};
