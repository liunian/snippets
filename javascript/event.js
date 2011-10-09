/**
 *    Some event functions from others or mine
 *    @author dengjij@gmail.com
 */

/**
 *  Simple add / remove event from PPK
 */
function bind(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
	}
	else if (obj.attachEvent) {
		obj.attachEvent('on' + type, fn);
	}
}

function unbind(obj, type, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type, fn, false);
	}
	else if (obj.detachEvent) {
		obj.detachEvent('on' + type, fn);
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



/**
 * delegate event
 *
 * receive all the bubble event in interface element, use the event.target or event.srcElement
 * to confirm if is the element needed, if true, run the function
 *
 * In this way, it has no power; 
 * if with a powerful selector, then can pass targetEle selector to it; in this way, it be powerful
 * workflow: each time, use the selector to get the valid targetEle, if current element in the list, trigger
 */
function delegate(interfaceEle, targetEle, type, fn){
	bind(interfaceEle, type, function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		if(target == targetEle){
			fn && fn.call(target, e);
			preventDefault(e);
			stopBubble(e);
		}
	});
}
