/**
 * @fileoverview event handlers.
 *
 */
(function($) {
    // event fn id
    var _uuid = 1;
    // event maps, key is _uuid, value is fn
    var eventsMap = {};

    var event = {
        on: null,
        off: null,
        /**
         * delegate event(only support single selector)
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
                if (matchSelector(e.target, selector)) {
                    if(fn) {
                        fn.call(e.target, e);
                    }
                }
            });
        }
    };

    // do browser feature detected only once
    if (typeof window.addEventListener === 'function') {
        event.on = function(obj, type, fn) {
            var wrapFn = function(event) {
                var e = extendEvent(event);
                fn.call(obj, e);
            };
            fn._uuid = _uuid;
            eventsMap[_uuid++] = wrapFn;
            obj.addEventListener(type, wrapFn, false);
        };

        event.off = function(obj, type, fn) {
            obj.removeEventListener(type, fn, false);
            delete eventsMap[fn._uuid];
        };
    } else {
        event.on = function(obj, type, fn) {
            var wrapFn = function() {
                var e = extendEvent(window.event);
                fn.call(obj, e);
            };
            fn._uuid = _uuid;
            eventsMap[_uuid++] = wrapFn;
            obj.attachEvent('on' + type, wrapFn);
        };

        event.off = function(obj, type, fn) {
            obj.detachEvent('on' + type, fn);
        };
    }

    /**
     * @method fire 触发事件，这里仅是 mouseEvent
     * @param {Element} ele 触发事件的 dom 元素
     * @param {String} type 事件类型，如 `mouseover` 和 `click` 等
     */
    event.fire = function fireEvent(ele, type) {
        var doc = document,
            e;

        // ie9 及其后支持 DOM3 的 createEvent 和 dispatchEvent 了
        // http://msdn.microsoft.com/zh-cn/library/ff975304.aspx
        // http://msdn.microsoft.com/zh-cn/library/ff975459.aspx
        // https://developer.mozilla.org/en-US/docs/DOM/document.createEvent
        if(typeof doc.createEvent === 'function') {
            e = doc.createEvent('MouseEvents');
            e.initMouseEvent(type, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            ele.dispatchEvent(e);
        } else {
            ele.fireEvent('on' + type, doc.createEventObject());
        }
    };

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
            return (' ' + ele.className + ' ').indexOf(' ' + selector.slice(1) + ' ') != -1;
        }

        // if use tagName
        return ele.tagName.toLowerCase() === selector.toLowerCase();
    }

    /**
     * extend event object, such as stopPropagation, preventDefault etc.
     */
    function extendEvent(e) {
        if (typeof window.addEventListener === 'function') {
        } else {
            e.stopPropagation = function() {
                e.cancelBubble = true;
            };

            e.preventDefault = function() {
                e.returnValue = false;
            };
        }
        if (!e.target && e.srcElement) {
            e.target = e.srcElement;
        }
        return e;
    }

    $.add(event);
    event = null;
})(DJ);
