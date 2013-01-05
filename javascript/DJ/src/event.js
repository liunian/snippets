/**
 * @fileoverview event handlers.
 *
 */
(function($) {
    var event = {
        on: null,
        off: null,
        stopBubble: null,
        preventDefault: null,
        /**
         * delegate event
         *
         * receive all the bubble event in interface element,
         * use the event.target or event.srcElement
         * to confirm if is the element needed, if true, run the function
         *
         * In this way, it has no power;
         * if with a powerful selector, then can pass targetEle selector to it;
         * in this way, it be powerful
         * workflow: each time, use the selector to get the valid targetEle,
         * if current element in the list, trigger
         */
        delegate: function(interfaceEle, selector, type, fn) {
            $.on(interfaceEle, type, function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (matchSelector(target, selector)) {
                    if(fn) {
                        fn.call(target, e);
                    }
                }
            });
        }
    };

    // do browser feature detected only once
    if (typeof window.addEventListener === 'function') {
        event.on = function(obj, type, fn) {
            obj.addEventListener(type, fn, false);
        };

        event.off = function(obj, type, fn) {
            obj.removeEventListener(type, fn, false);
        };

        event.stopBubble = function(e) {
            e.stopPropagation();
        };

        event.preventDefault = function(e) {
            e.preventDefault();
        };
    } else {
        event.on = function(obj, type, fn) {
            var wrapFn = function() {
                fn.call(obj, window.event);
            };
            obj.attachEvent('on' + type, wrapFn);
        };

        event.off = function(obj, type, fn) {
            obj.detachEvent('on' + type, fn);
        };

        event.stopBubble = function() {
            window.event.cancelBubble = true;
        };

        event.preventDefault = function() {
            window.event.returnValue = false;
        };
    }

    /**
     * only support #id, tagName, .className
     * and it's simple single, no combination
     */
    function matchSelector(ele, selector) {
        // if use id
        if (selector.charAt(0) === '#') {
            return ele.id === selector.slice(1);
        }

        // if use class
        if (selector.charAt(0) === '.') {
            return ' ' + ele.className + ' '.indexOf(' ' + selector.slice(1) + ' ') != -1;
        }

        // if use tagName
        return ele.tagName.toLowerCase() === selector.toLowerCase();
    }

    $.add(event);
    event = null;
})(DJ);
