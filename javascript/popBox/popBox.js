/**
 *  A simple snippets use to create popup box.
 *
 *  @requires [util.js, event.js]   
 *  @author dengjij@gmail.com
 */
 

/**
 * Constructor of the popBox object.
 * @param {Object} option : optional settings to create a popBox
 *
 * @option {String} title : title of popup box, default: null
 *
 * @option {String} content : main content of popup box, html or text,
 *      default: 'This is a popup box'
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
 * @option {function} okcallback : call when click the okButton, default: empty function
 *
 * @option {function} cancelCallback : call when click the cancelCallback, default: empty function
 *      
 */
var popBox = function(option){
    this.option = {
        title : null,
        content: 'This is a popup box',
        closeButton: true,
        closeDelay: 0,
        boxClass: 'popBox',
        okButton: false,
        okcallback: function(){},
        cancelButton: false,
        cancelCallback: function(){}
    };
    if(option){
        mergeObj(this.option, option);
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
            
        if(op.okEle){
            op.okEle.onclick = function(e){
                e = e || window.event;
                self.ok();
                stopDefault(e);
            };
        }
        
        if(op.cancelEle){
            op.cancelEle.onclick = function(e){
                e = e || window.event;
                self.cancel();
                stopDefault(e);
            };
        }
        
        if(op.closeEle){
            op.closeEle.onclick = function(e){
                e = e || window.event;
                self.close();
                stopDefault(e);
            };
        }
        
        // auto close
        if(op.closeDelay){
            var delay = parseInt(op.closeDelay, 10);
            setTimeout(function(){self.close();}, delay);
        }
    },
    create: function() {
        var self = this,
            op = self.option;
        var ele = document.createElement('div');
        ele.className = op.boxClass;
        var html = '';
        
        if(op.title || op.closeButton) {        
	        html += '<div class="dHead">';
	        
	        if(op.title){
	            html += '<span class="title">' + op.title + '</span>';
	        }
	        
	        html += '<a href="javascript:;" class="close">x</a></div>';
        }
        
        html += '<div class="dBody">' + op.content + '</div>';
        if(op.okButton || op.cancelButton){
            html += '<div class="dBottom clearfix">';
            if(op.cancelButton){
                html += '<a href="javascript:;" class="btn iCancel">取消</a>';
            }
            if(op.okButton){
                html += '<a href="javascript:;" class="btn iOk">确定</a>';
            }
            html += '</div>';
        }
        
        ele.innerHTML = html;
        
        /* store the element*/
        op.ele = ele;
        var alinks = ele.getElementsByTagName('a');
        for(var i=0, l= alinks.length; i < l; i++){
            var a = alinks[i];
            if(a.className.indexOf('close') != -1){
                op.closeEle = a;
            } else if(a.className.indexOf('iOk') != -1) {
                op.okEle = a;
            } else if(a.className.indexOf('iCancel') != -1){
                op.cancelEle = a;
            }
        }
    },
    close: function() {
        document.body.removeChild(this.option.ele);
    },
    ok: function(){
        var self = this,
            op = self.option;
        if(op.okcallback){
            op.okcallback();
        }
        self.close();
    },
    cancel: function(){
        var self = this,
            op = self.option;
        if(op.cancelCallback){
            op.cancelCallback();
        }
        self.close();
    },
    show: function(){
        var op = this.option,
            winWidth, winHeight,
            body = (document.compatMode&&document.compatMode.toLowerCase() == "css1compat")?document.documentElement:document.body;
        // get windows' client width
        if(window.innerWidth)
            winWidth=window.innerWidth;
        else if(body)
            winWidth=body.clientWidth;
        // get windows' client height
        if(window.innerHeight)
            winHeight=window.innerHeight;
        else if(body)
            winHeight = body.clientHeight;
            
        document.body.appendChild(this.option.ele);
        
        var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
        var top = scrollTop + (winHeight - op.ele.offsetHeight) / 2;
        var left = (winWidth - op.ele.offsetWidth) / 2;
        //console.log(winWidth, op.ele.offsetWidth, (winWidth- op.ele.offsetWidth)/2);
        //console.log(winHeight, op.ele.offsetHeight, (winHeight- op.ele.offsetHeight)/2);
        op.ele.style.position = 'absolute';
        op.ele.style.zIndex = 200;
        op.ele.style.top = top + 'px';
        op.ele.style.left = left + 'px';
        //console.log((winWidth- op.ele.offsetWidth)/2);
    }
};
