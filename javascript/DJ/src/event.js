/**
 * @fileoverview event handlers
 *
 */
(function() {
    DJ.export({
        /**
         *  Simple add / remove event from PPK
         */
        bind: function (obj, type, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(type, fn, false);
            }
            else if (obj.attachEvent) {
                obj.attachEvent('on' + type, fn);
            }
        },

        // do not remove all the functions if not offer type and fn;
        // Here is just some normal usage
        unbind: function (obj, type, fn) {
            if (obj.removeEventListener) {
                obj.removeEventListener(type, fn, false);
            }
            else if (obj.detachEvent) {
                obj.detachEvent('on' + type, fn);
            }
        },

        /**
         *  Stop event bubble, if ie, use e.cancelBubble = true; while other's following
         *  W3C standards, use e.stopPropagation().
         */
        stopBubble: function (e) {
            if (e && e.stopPropagation) {
                e.stopPropagation();
            }
            else {
                window.event.cancelBubble = true;
            }
        },

        /**
         *  Prevent event trigger the default event handler
         */
        preventDefault: function (e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            else {
                window.event.returnValue = false;
            }
        },



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
        delegate: function (interfaceEle, selector, type, fn) {
            DJ.bind(interfaceEle, type, function(e) {
                e = e || window.event;
                var target = e.target || e.srcElement;
                if (matchSelector(target, selector)) {
                    fn && fn.call(target, e);
                }
            });
        }
    });
   
    /**
     * only support #id, tagName, .className
     * and it's simple single, no combination
     */
    function matchSelector(ele, selector) {
        // if use id
        if(selector.charAt(0) === '#') {
            return ele.id === selector.slice(1);
        }

        // if use class
        if(selector.charAt(0) === '.') {
            return ' ' + ele.className + ' '.indexOf(' ' + selector.slice(1) + ' ') != -1;
        }

        // if use tagName
        return ele.tagName.toLowerCase() === selector.toLowerCase();
    }
})();
