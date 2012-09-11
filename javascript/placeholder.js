/**
 * Placeholder
 *
 * 对于 input 元素，如果不支持 placeholder 特性，则模拟之。
 */

var Placeholder = function() {
    var placeHolderClass = 'placehold';

    /**
     * 简单的事件绑定
     * @param {Node} obj DOM 元素.
     * @param {String} type 事件类型.
     * @param {Function} fn 事件处理函数.
     */
    function on(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        }
        else if (obj.attachEvent) {
            obj.attachEvent('on' + type, fn);
        }
    }


    /**
     * 测试是否支持 placeholder 特性
     */
    function support() {
        return 'placeholder' in document.createElement('input');
    }


    /**
     * 给一个 input 元素添加 placeholder 功能
     * 给 input 元素添加一个 placeholder 属性，并赋值
     * 若 html 中已有该属性，那么可只提供第一个参数，如果提供了第二个参数，那么将会覆盖预设的值。
     * 若没预设且没提供改值，那么则退出模拟。
     *
     * @param {Node} input 待处理的 input 元素.
     * @param {String} value 可选，placeholder 的 值.
     */
    function make(input, value) {
        value = value || getHolderValue(input);
        if (!value) return;

        setHolderValue(input, value);
        if (!support()) {
            simulatePlaceholder(input);
        }
    }


    /**
     * 使用 holder
     * 添加对应的 class 并修改值
     *
     * @param {Node} input 待处理的 input.
     */
    function takePlaceHold(input) {
        input.holding = true;
        input.className = trim(input.className + ' ' + placeHolderClass);
        input.value = getHolderValue(input);
    }


    /**
     * 移除字符串前后空白
     *
     * @param {String} str 待处理的字符串.
     * @return 移除左右空白后的字符串.
     */
    function trim(str) {
        if (String.prototype.trim) return str.trim();
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }


    /**
     * 对于不原生支持 placeholder 的浏览器，模拟实现
     */
    function simulatePlaceholder(input) {
        // 没值时，使用占位文字
        if (input.value == '') {
            takePlaceHold(input);
        }

        on(input, 'focus', function() {
            if (input.holding) {
                var cls = ' ' + input.className + ' ';
                input.value = '';
                input.className = trim(cls.replace(' ' + placeHolderClass + ' ', ''));
            }
        });

        on(input, 'blur', function() {
            if (input.value !== '') {
                input.holding = false;
            } else {
                takePlaceHold(input);
            }
        });
    }


    function getHolderValue(input) {
        return input.getAttribute('placeholder');
    }


    function setHolderValue(input, value) {
        input.setAttribute('placeholder', value);
    }


    return {
        support: support,
        make: make
    };
}();
