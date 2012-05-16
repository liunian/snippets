/**
 * @fileoverview 简单的选择气，仅支持单个的id/tag/class，
 * 但对于tag和class，可以附带一个context来指定从哪开始，
 * 对于class，还可以指定查找的tag。
 * 即，id的话是一个参数，tag是2个参数，class是3个参数。
 * 多于限定的参数没影响，因为不参与运算。
 * 参数的顺序依次是：selector, context, tagName（多存在时）.
 *
 */
(function() {
    var _slice = Array.prototype.slice;

    function realArray(c) {
        try {
            return _slice.call(c);
        } catch (e) {
            var ret = [], i=0, len=c.length;
            for(; i < len; i++) {
                ret[i] = (c[i]);
            }
            return ret;
        }
    }

    function $id(id) {
       return document.getElementById(id);
    }

    function $tag(tag, context) {
        context = context || document;
        return realArray(context.getElementsByTagName(tag));
    }

    /**
     * from: http://www.dustindiaz.com/getelementsbyclass
     */
    function $class(className, context, tag) {
        var classElements = [],
            context = context || document,
            tag = tag || '*';

        var els = context.getElementsByTagName(tag);
        for (var i = 0, ele; ele = els[i]; i++) {
            if (DJ.hasClass(ele, className)) {
                classElements.push(ele);
            }
        }
        return classElements;
    }

    DJ.add('$', function() {
        var undefined,
            args = arguments,
            f = args[0],
            i = f.charAt(0),
            s = f.substr(1);

        if (f == undefined) return;

        return i == '#' ? $id(s) :
           i == '.' ? $class(s, args[1], args[2]) :
           $tag(f, args[1]);
    });
})();
