/**
 * @fileoverview ajax
 *
 * usage: DJ.Ajax(method, url, options)
 * for get and post shortcuts, DJ.Ajax.get(url, options) & DJ.Ajax.post(url, options)
 *
 */
(function($) {
    var Ajax = {};

    function createXHR () {
        return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }


    function serialize(o) {
        var list = [],
            i;
        for(i in o) {
            if(o.hasOwnProperty(i)){
                list.push(encodeURIComponent(i) + '=' + encodeURIComponent(o[i]));
            }
        }

        return list.join('&');
    }

    function adjustOptions(options) {
        var op = DJ.extend({}, options);

        if(op.async === undefined) op.async = true;

        // serialize to string
        if(DJ.isObject(op.data)){
            op.data = serialize(op.data);
        } else if(op.data === undefined) {
            op.data = null;
        }

        return op;
    }

    function ajax(method, url, options) {
        method = method.toLowerCase();

        // if the third parameter is a function, make it an object
        if(Object.prototype.toString.call(options) === '[object Function]') {
            options = {
                'success': options
            };
        }

        // return a new shadow / modified clone, with origin unchange
        var op = adjustOptions(options);

        // if set data for get method, append it to the url
        if(op.data && method == 'get') {
            url = url + (url.indexOf('?') === -1 ? '?' : '&') + op.data;
            op.data = null;
        }

        var xhr = createXHR();
        xhr.open(method, url, op.async);

        if(method == 'post') {
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }

        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200 || xhr.status == 304){
                    if(options.success) {
                        op.success(xhr.responseText, xhr, op);
                    }
                } else {
                    if(options.error) {
                        op.error(xhr, op);
                    }
                }

                if(options.complete) {
                    op.complete(xhr, op);
                }
            }
        };

        xhr.send(op.data);
    }

    Ajax.ajax = ajax;
    Ajax.post = function(url, options){
        ajax('post', url, options);
    };
    Ajax.get = function(url, options){
        ajax('get', url, options);
    };

    DJ.add('Ajax', Ajax);
})(DJ);
