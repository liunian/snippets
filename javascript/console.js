// This is just a "poor man's console" so we can test in IE6.
var console = (function (cn, undef) {
    
    function isBool(obj) {
        return obj === !!obj;
    }

    if (cn.log === undef) {
        cn.log = function () {
            var renderedArgs = [],
                i = 0,
                il = arguments.length;
            
            for (; i < il; i += 1) {
                if (isBool(arguments[i])) {
                    renderedArgs.push(arguments[i] ? 'true' : 'false');
                } else {
                    renderedArgs.push(arguments[i]);
                }
            }
            
            alert(renderedArgs.join('\n'));
            
        };
    }
    
    return cn;
    
}(typeof console === "undefined" ? {} : console));