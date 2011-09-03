/**
 *    Here are some util functions
 *    @author dengjij@gmail.com
 */


/**
 *  A simple function to update old object with new object
 */
function updateObj(oldObj, newObj) {
    for (var item in newObj) {
        oldObj[item] = newObj[item];
    }
    return this;
}

/*
 * from: http://stackoverflow.com/questions/1700870/how-do-i-do-outerhtml-in-firefox
 */ 
function outerHTML(node){
    // if IE, Chrome take the internal method otherwise build one
    return node.outerHTML || (
        function(n){
            var div = document.createElement('div'), h;
            div.appendChild( n.cloneNode(true) );
            h = div.innerHTML;
            div = null;
            return h;
        })(node);
}

function isObject (o) {
    return Object.prototype.toString.call(o) === '[object Object]';
}

function isArray (o){
    return Object.prototype.toString.call(o) === '[object Array]';
};

function isBool (o){
    //return Object.prototype.toString.call(o) === 'object Boolean]';
    return o === !!o;
};