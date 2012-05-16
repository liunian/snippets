/**
 * Collect some snippets
 *
 * @author dengjij@gmail.com
 * @version 1.0
 */
var DJ = {
    version: 1.0
};


/**
 *  add modules
 *
 *  can take two parameters: moduleName, module content;
 *  or take a key-value object to add more than one per time
 *
 *  2012-05-16 export 是保留字，在 ie6 下将会报错
 */
DJ.add= function() {
    var args = arguments;
    // if module Name, module
    if (args.length == 2) {
        DJ[args[0]] = args[1];
    } else if (args.length == 1 &&
        Object.prototype.toString.call(args[0]) == '[object Object]') {
        var obj = args[0];
        for (var name in obj) {
            DJ[name] = obj[name];
        }
    }
};
