/**
 * internal log with date time
 *
 * @author dengjij@gmail.com
 * @version 1.0
 *
 * @requires [dj.js]
 */

DJ.add('log', function() {
    // an array to store msg
    var _log = [];

    // msg's id, start from 1
    var id = 1;

    //  return a log's copy
    var copy = function(log) {
        if (log == undefined) return log;
        var res = {};

        res.id = log.id;
        res.time = log.time;
        res.msg = log.msg;

        return res;
    };

    // add a msg with id, time and it's content
    var add = function(msg) {
        _log.push({
            id: id++,
            time: new Date().getTime(),
            msg: msg
        });
    };

    // get a msg by index
   var get = function(index) {
        return copy(_log[index]);
   };

   var getById = function(id) {
        for (var i = _log.length - 1; i >= 0; i--) {
            if (_log[i].id == id) {
                return copy(_log[i]);
            }
        }
   };

   // return the first count logs by array
   var head = function(count) {
       count = count || 1;
       var res = [];
       for (var i = 0; i < count && i < _log.length; i++) {
           res.push(copy(_log[i]));
       }
       return res;
   };

   // return the last count log by array
   var tail = function(count) {
       count = count || 1;
       var res = [],
            i = _log.length - 1,
            c = 0;
        while ((i >= 0) && (c < count)) {
           res.unshift(copy(_log[i]));
           i--;
           c++;
       }
       return res;
   };

   // return the log(s) with strings
   var print = function(o) {
       var res = [];
       if (Object.prototype.toString.call(o) === '[object Array]') {
           for (var i = 0, l = o.length; i < l; i++) res.push(print(o[i]));
       } else {
           res.push('id: ' + o.id + '  time: ' + o.time + '  msg: ' + o.msg);
       }
       return res.join('\n');
   };

   // empty the logs
   var empty = function() {
       _log = [];
       id = 1;
   };

   // return the logs count
   var length = function() {
       return _log.length;
   };

    return {
        add: add,
        get: get,
        getById: getById,
        length: length,
        head: head,
        tail: tail,
        empty: empty,
        print: print
    };
}());
