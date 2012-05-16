/**
 * @fileoverview test, add and remove class of an element.
 */
DJ.add({
    // prevent considering part of the element's class is the className
    // by adding space to element's class and search className before and after
    hasClass: function(element, className) {
        var s = ' ' + element.className + ' ';
        return s.indexOf(' ' + className + ' ') !== -1;
    },
    /** can add more than one class a time */
    addClass: function(element, className) {
        var res = DJ.trim(element.className),
            parts = className.split(/\s+/);

        DJ.each(parts, function(part) {
            if (! hasClass(element, part)) {
                res += ' ' + part;
            }
        });
        element.className = DJ.trim(res);
    },
    /** can remove more than one class a time */
    removeClass: function(element, className) {
        var res = element.className.split(/\s+/),
            parts = className.split(/\s+/);

        DJ.each(parts, function(part) {
            DJ.each(res, function(aRes, i) {
                if (aRes == part) {
                    res[i] = '';
                }
            });
        });
        element.className = res.join(' ');
    }
});
