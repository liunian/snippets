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
            fn._uuid = _uuid;
            eventsMap[_uuid++] = fn;
            obj.addEventListener(type, fn, false);
        };

        event.off = function(obj, type, fn) {
            obj.removeEventListener(type, fn, false);
            delete eventsMap[fn._uuid];
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
            fn._uuid = _uuid;
            eventsMap[_uuid++] = wrapFn;
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
     * @method fire 触发事件，这里仅是 mouseEvent
     * @param {Element} ele 触发事件的 dom 元素
     * @param {Strintg} type 事件类型，如 `mouseover` 和 `click` 等
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
            return ' ' + ele.className + ' '.indexOf(' ' + selector.slice(1) + ' ') != -1;
        }

        // if use tagName
        return ele.tagName.toLowerCase() === selector.toLowerCase();
    }

    $.add(event);
    event = null;
})(DJ);
