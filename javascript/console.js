/**
 * a simple console for ie
 *
 * requires util.js
 */

var console = function(console) {
	if (typeof console !== 'undefined') {
		return console;
	}

	var panel; 

	/**
	 * create the console panel as first run
	 */
	var _init = function() {
		var panel = document.createElement('div');
		panel.className = 'consoleLog';
		panel.style.cssText = '; position: absolute; top: 0; right: 0; background:rgb(223,223,223); color:#333; width: 600px; height: 200px; overflow:auto';
		document.body.appendChild(panel);
		return panel;
	};

	panel = _init();

	/**
	 * append each log to the panel content
	 */
	var appendLog = function(msg) {
		var perLog = document.createElement('div');
		perLog.innerHTML = msg;
		panel.appendChild(perLog);
	};

	var argType = function(arg){
		return isBool(arg) ? 'bool' : isArray(arg) ? 'array' : isElement(arg) ? 'node' : isObject(arg) ? 'object' : 'other';
	};

	/**
	 * render an obj
	 */
	var render = function(obj){
		var result = '',
			objType = argType(obj);

		switch(objType){
			case "bool": 
				result += renderBoolean(obj);
				break;
			case 'array':
				result += renderArray(obj);
				break;
			case 'node':
				result += renderNode(obj);
				break;
			case 'object': 
				result += renderObject(obj);
				break;
			case 'other':
			default:
				result += renderDefault(obj);
				break;
		}
		return result;
	};

	var renderArray = function(arr){

	};

	var renderNode = function(node){
		return outerHTML(node).replace(/</g, '&lt;');
	};

	var renderObject = function(obj){

	};

	var renderBoolean = function(bool){
		return bool ? 'true' : 'false';
	};

	var renderDefault = function(obj){
		return obj;
	}

	var log = function() {
		var renderedArgs = [],
			i = 0,
			result = '';
			il = arguments.length;

		for (; i < il; i += 1) {
			renderedArgs.push(render(arguments[i]));
		}

		result = renderedArgs.join('\n');
		appendLog(result);
	};

	return {
		log: log
	}
} (console);
