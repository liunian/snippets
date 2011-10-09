/**
 * create overlay
 * @author dengjij@gmail.com
 * @requires util.js
 *
 */

var overlay = function(option){
     this.option = {
         className : 'overlay',
         background : 'black',
         opacity : 0.5,
         zIndex: 100,
         show: true
     };
     updateObj(this.option, option);
     this.init();
};

overlay.prototype = {
    init: function(){
        var op = this.option;
        var con = document.createElement('div');
        con.className = op.className;

        con.style.display = op.show ? 'block' : 'none';
        con.style.background = op.background;
        con.style.opacity = op.opacity;
        con.style.zIndex = op.zIndex;
        con.style.position = 'fixed';
        con.style.left = 0;
        con.style.top = 0;
        con.style.width = '100%';
        con.style.height = '100%';

        document.body.appendChild(con);

        this.content = con;

        return this;
    },
    show: function(){
        this.content.style.display = 'block';
    },
    hide: function(){
        this.content.style.display = 'none';
    },
    close: function(){
        document.body.removeChild(this.content);
        this.content = null;
		delete this.content;
        delete this.option;
    }
};
