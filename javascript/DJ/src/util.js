/**
 *    Here are some util functions
 *    @author dengjij@gmail.com
 */

DJ.add({

    /**
     *  A simple function to extend target with source
     *  @param {Object} target the object to extend.
     *  @param {Object} source the object to help extend target.
     *  @param {Boolean} override true to override, default true.
     *  @return {Object} returns the target after extended, needed by the target is an empty Object at begin
     */
    extend: function(target, source, override) {
        if (override === undefined) override = true;
        for (var item in source) {
            if(!source.hasOwnProperty(item)) continue;
            if (override || !(item in target)) {
                target[item] = source[item];
            }
        }
        return target;
    },

    /**
     * get an element's outerHTML
     * from:
     * http://stackoverflow.com/questions/1700870/how-do-i-do-outerhtml-in-firefox
     *
     * @param {Element} node the element to get outerHTML from.
     */
    outerHTML: function(node) {
        // if IE, Chrome take the internal method otherwise build one
        return node.outerHTML || (
            function(n) {
                var div = document.createElement('div'), h;
                div.appendChild(n.cloneNode(true));
                h = div.innerHTML;
                div = null;
                return h;
            })(node);
    },

    isObject: function(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    },

    /**
     * nodeType
     * 1: element node
     * 9: document node
     */
    isElement: function(o) {
        return o.nodeType && (o.nodeType == 1 || o.nodeType == 9);
    },

    isArray: function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },

    isFunction: function(o) {
        return Object.prototype.toString.call(o) == '[object Function]';
    },

    isBool: function(o) {
        //return Object.prototype.toString.call(o) === 'object Boolean]';
        return o === true || o === false;
    },
    each: function(obj, callback) {
        if (arguments.length != 2) {
            throw new Error('need an object/array and a function to be the parameter');
        }

        if (!DJ.isFunction(arguments[1])) {
            throw new Error('The parameter must be a function');
        }

        if (DJ.isArray(obj)) return DJ.arrayEach(obj, callback);
        if (DJ.isObject(obj)) return DJ.objectEach(obj, callback);
    },

    /**
     * add an each to array
     */
    arrayEach: function(arr, callback) {
        for (var i = 0, l = arr.length; i < l; i++) {
            callback.call(arr, arr[i], i, arr);
        }
    },

    objectEach: function(obj, callback) {
        for (var i in obj) {
            callback.call(obj, obj[i], i, obj);
        }
    },

    trim: function(str) {
        if (typeof String.prototype.trim === 'function') return str.trim();
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    },
    isIE6: function() {
        return (/msie 6/i).test(navigator.userAgent);
    },
    /**
     * escape html as htmlspecialchars in php with ENT_QUOTES(htmlspecial(unsafe, ENT_QUOTES))
     * from: http://stackoverflow.com/questions/1787322/htmlspecialchars-equivalent-in-javascript
     * a more completed version: https://raw.github.com/kvz/phpjs/master/functions/strings/htmlspecialchars.js
     **/
    escapeHtml: function(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});

