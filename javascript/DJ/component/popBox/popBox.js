/**
 *  A simple snippets use to create popup box.
 *
 *  @requires [dj.js, util.js, event.js]
 *  @author dengjij@gmail.com
 */

/**
 * Constructor of the popBox object.
 * @param {Object} option : optional settings to create a popBox.
 *
 * @option {String} title : title of popup box, default: null
 *
 * @option {String} content : main content of popup box, html or text,
 *      default: 'This is a popup box'
 *
 * @option {String} width : the popup box's width, default : 350px
 *
 * @option {Boolean} closeButton : whether show the close button or not,
 *      default: true
 *
 * @option {Number} closeDelay : million seconds before auto close, if set this
 *      value, it will auto close, default: 0
 *
 * @option {String} boxClass : the classname of the popup box, used for css,
 *      default: 'popBox'
 *
 * @option {Boolean} okButton : whether show the ok button or not, default: false
 *
 * @option {Boolean} cancelButton : whether show the cancel button or not, default: false
 *
 * @option {function} okCallback : call when click the okButton, default: empty function
 *
 * @option {function} cancelCallback : call when click the cancelCallback, default: empty function
 *
 */
var popBox = function(option) {
    this.option = {
        title: null,
        content: 'This is a popup box',
        width: '350px',
        withOverlay: true,
        zIndex: 800,
        closeButton: true,
        closeDelay: 0,
        boxClass: 'popBox',
        okButton: false,
        okCallback: function() {},
        cancelButton: false,
        cancelCallback: function() {}
    };
    if (option) {
        DJ.extend(this.option, option);
    }
    this.init();
};

/**
 *  functions of the popBox object
 */
popBox.prototype = {
    init: function() {
        this.create();
        this.bind();
        this.show();
    },
    bind: function() {
        var self = this,
        op = self.option;

        if (op.okEle) {
            op.okEle.onclick = function(e) {
                e = e || window.event;
                self.ok();
                DJ.preventDefault(e);
            };
        }

        if (op.cancelEle) {
            op.cancelEle.onclick = function(e) {
                e = e || window.event;
                self.cancel();
                DJ.preventDefault(e);
            };
        }

        if (op.closeEle) {
            op.closeEle.onclick = function(e) {
                e = e || window.event;
                // make close button as cancel
                self.cancel();
                DJ.preventDefault(e);
            };
        }

        // auto close
        if (op.closeDelay) {
            var delay = parseInt(op.closeDelay, 10);
            setTimeout(function() {
                self.close();
            },
            delay);
        }

    },
    hideOverlay: function() {
        if (this.option.withOverlay) {
            this.overlay.close();
            delete this.overlay;
        }
    },
    create: function() {
        var self = this,
        op = self.option;
        var ele = document.createElement('div');
        ele.className = op.boxClass;
        var html = '';

        if (op.title || op.closeButton) {
            html += '<div class="dHead">';

            if (op.title) {
                html += '<span class="title">' + op.title + '</span>';
            }

            html += '<a href="javascript:;" class="close">x</a></div>';
        }

        html += '<div class="dBody">' + op.content + '</div>';
        if (op.okButton || op.cancelButton) {
            html += '<div class="dBottom clearfix">';
            if (op.cancelButton) {
                html += '<a href="javascript:;" class="btn iCancel">取消</a>';
            }
            if (op.okButton) {
                html += '<a href="javascript:;" class="btn iOk">确定</a>';
            }
            html += '</div>';
        }

        ele.innerHTML = html;

        /* store the element*/
        op.ele = ele;
        var alinks = ele.getElementsByTagName('a');
        for (var i = 0, l = alinks.length; i < l; i++) {
            var a = alinks[i];
            if (DJ.hasClass(a, 'close')) {
                op.closeEle = a;
            } else if (DJ.hasClass(a, 'iOk')) {
                op.okEle = a;
            } else if (DJ.hasClass(a, 'iCancel')) {
                op.cancelEle = a;
            }
        }

        if (op.withOverlay) {
            this.overlay = new overlay({'clickToHide': false, 'show': false});
        }
    },
    close: function() {
        document.body.removeChild(this.option.ele);
        this.hideOverlay();
        delete this.option;
        delete this.ele;
        delete this.closeEle;
        delete this.okEle;
        delete this.cancelEle;
    },
    ok: function() {
        var self = this,
        op = self.option;
        if (op.okCallback) {
            op.okCallback();
        }
        self.close();
    },
    cancel: function() {
        var self = this,
        op = self.option;
        if (op.cancelCallback) {
            op.cancelCallback();
        }
        self.close();
    },
    show: function() {
        var op = this.option,
        winWidth, winHeight, body = (document.compatMode && document.compatMode.toLowerCase() == 'css1compat') ? document.documentElement : document.body;
        // get windows' client width
        winWidth = window.innerWidth || body.clientWidth;

        // get windows' client height
        winHeight = window.innerHeight || body.clientHeight;

        document.body.appendChild(this.option.ele);

        var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;

        op.ele.style.width = op.width;

        var top = scrollTop + (winHeight - op.ele.offsetHeight) / 2;
        var left = (winWidth - op.ele.offsetWidth) / 2;

        op.ele.style.position = 'absolute';
        op.ele.style.zIndex = op.zIndex;
        op.ele.style.top = top + 'px';
        op.ele.style.left = left + 'px';

        this.overlay.show();
    }
};
