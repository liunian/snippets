/**
 * Some functions about random
 */

// By James from http://www.xinotes.org/notes/note/515/
function randomString(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

// http://roshanbh.com.np/2008/09/get-random-number-range-two-numbers-javascript.html
function randomToN(maxVal, floatVal) {
    var randVal = Math.random() * maxVal;
    return typeof floatVal === 'undefined' ?
        Math.floor(randVal) : randVal.toFixed(floatVal);
}

function randomXToY(minVal, maxVal, floatVal) {
    var randVal = minVal + Math.random() * (maxVal - minVal);
    return typeof randVal === 'undefined' ?
        Math.floor(randVal) : randVal.toFixed(floatVal);
}

