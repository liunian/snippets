/**
 *    Some event functions from others or mine
 *    @author dengjij@gmail.com
 */

/**
 *  Simple add / remove event from PPK
 */
function bind(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	}
	else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}

function unbind(obj, evt, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(evt, fn, false);
	}
	else if (obj.detachEvent) {
		obj.detachEvent('on' + evt, fn);
	}
}

/**
 *  Stop event bubble, if ie, use e.cancelBubble = true; while other's following
 *  W3C standards, use e.stopPropagation().
 */
function stopBubble(e) {
	if (e && e.stopPropagation) {
		e.stopPropagation();
	}
	else {
		window.event.cancelBubble = true;
	}
}

/**
 *  Prevent event trigger the default event handler
 */
function preventDefault(e) {
	if (e && e.preventDefault) {
		e.preventDefault();
	}
	else {
		window.event.returnValue = false;
	}
}


// Some thing wrong after

/**
 * delegate event
 *
 * receive all the bubble event in interface element, use the event.target or event.srcElement
 * to confirm if is the element needed, if true, run the function
 */
function delegate(interfaceEle, targetEle, evt, fn){
	//bind(interfaceEle, evt, fuction(
	evt = evt || window.event;
	var target = evt.target || evt.srcElement;
	if(target == targetEle){
		fn && fn(evt);
		preventDefault(evt);
		stopBubble(evt);
	}
}


/**
 * implement the $.one in jquery in a simple way
 *
 */
function one(obj, evt, fn){
	obj['on' + evt] = function(evt){
		
	};
}
