/**
 * @module Cookie
 * @class Cookie
 *
 * cookies
 *
 * - Cookie.has
 * - Cookie.get
 * - Cookie.set
 *
 * use `document.cookie` can access all cookies in current domain
 * and path(or upper).
 *
 * Also use `document.cookie` to set or update **a cookie**,
 * the syntax is `document.cookie="a_key=a_value"`.
 *
 * The example up here is the simple way, the cookie will just exist
 * in current path and browser lifetime with the raw plain text.
 *
 * There are options like following:
 *
 *      * ;path=path (e.g., '/' and '/dir'), default to current path
 *      * ;domain=domain default to current host
 *      * ;expires=date-in-GMTString-format, default to session
 *      * ;secure only https or not
 *
 * Always encode the key and value, because of the differences
 * between different browsers will makes trouble.
 *
 * (references:http://www.w3help.org/zh-cn/causes/CP9001)
 * IE Chrome Opera 中，cookie 中可以保存 Unicode 字符；
 * Firefox 则会将中文字符内码将被转换为 Unicode 编码；
 * Safari 会忽略包含中文字符的键值对。
 *
 * According to http://mrcoles.com/blog/cookies-max-age-vs-expires/,
 * old ie does not support `max-age`
 *
 * Do not use `toGMTString` to format date but use `toUTCString`,
 * toGMTString is deprecated and should no longer be used,
 * it's only there for backwards compatibility.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/DOM/document.cookie
 *
 * requires: [DJ.js, util.js]
 */

(function($) {
    var cookie = {
        default_option: {
            path: '',
            domain: '',
            secure: false
        },
        set: function(key, value, options) {
            options = options || {};
            $.extend(options, cookie.default_option, false);

            /**
             * set the cookie and return it
             *
             * if the value is null, means remove it
             */
            if (value === null) {
                // set to yesterday
                options.expires = -1;
            }

            var expires = options.expires,
                path = options.path,
                domain = options.domain,
                secure = options.secure;

            /**
             * expires only support 2 types
             *
             * 1. number means exist how many days
             * 2. Date(default) the Date object
             */
            if (typeof expires === 'number') {
                var day = expires;
                expires = new Date();
                expires.setDate(expires.getDate() + day);
            }

            var res = [encodeURIComponent(key), '=', encodeURIComponent(value),
                expires ? '; expires=' + expires.toUTCString() : '',
                path ? '; path=' + path : '',
                domain ? '; domain=' + domain : '',
                secure ? '; secure' : ''
            ].join('');

            document.cookie = res;
            return res;
        },
        has: function(key) {
            return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
        },
        get: function(key) {
            if (!key || !cookie.has(key)) return null;
            var res = document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1');

            return decodeURIComponent(res);
        }
    };

    // export to $ namesapce
    $.add({
        Cookie: cookie
    });
})(DJ);
