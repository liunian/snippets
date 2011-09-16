/**
 *    Some event functions from others or mine
 *    @author dengjij@gmail.com
 */

/**
 *  Simple add / remove event from PPK
 */
function addEventSimple(obj, evt, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	}
	else if (obj.attachEvent) {
		obj.attachEvent('on' + evt, fn);
	}
}

function removeEventSimple(obj, evt, fn) {
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
