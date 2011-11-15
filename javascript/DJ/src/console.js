/**
 * a simple console for ie
 *
 * requires util.js
 */

window.console = typeof console !== 'undefined' ? console : function() {

    var panel,
        panelLog,
        panelInput;

    /**
     * create the console panel as first run
     */
    var _init = function() {
        panel = _createPanel();
        panelLog = _createPanelLog();
        panelInput = _createPanelInput();

        panel.appendChild(panelLog);
        panel.appendChild(panelInput);

        document.body.appendChild(panel);
    };

    var _createPanel = function() {
        var panel = document.createElement('div');
        panel.className = 'console-panel';
        return panel;
    };

    var _createPanelLog = function() {
        var panelLog = document.createElement('div');
        panelLog.className = 'console-log';

        return panelLog;
    };

    var _createPanelInput = function() {
        var input = document.createElement('div');
        input.className = 'console-input';

        return input;
    };

     _init();

    /**
     * append each log to the panel content
     */
    var appendLog = function(msg) {
        var perLog = document.createElement('div');
        perLog.className = 'console-log-line';
        perLog.innerHTML = msg;
        panelLog.appendChild(perLog);
    };

    var argType = function(arg) {
        return isBool(arg) ? 'bool' : isArray(arg) ?
            'array' : isElement(arg) ?
            'node' : isObject(arg) ?
            'object' : 'other';
    };

    /**
     * render an obj, here obj just means everything
     * According to the type, render as boolean, array and so on
     */
    var render = function(obj) {
        var result = '',
            objType = argType(obj);

        switch (objType) {
            case 'bool':
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
    
    /**
     * render an array
     *
     * the output will be [i1, i2, i3, ...]
     */
    var renderArray = function(arr) {
        var res = '[',
            l = arr.length,
            l1 = l - 1,
            i = 0,
            aRes = [];

        for (; i < l; i++) {
            aRes.push(render(arr[i]));
        }

        res += aRes.join(', ') + ']';
        return res;
    };

    /**
     * render a node
     *
     * output outerHTML of the node
     */
    var renderNode = function(node) {
        return outerHTML(node).replace(/</g, '&lt;');
    };

    /**
     * render an object, almost json
     *
     * the output will be {name1: value1, name2: value2, ...}
     */
    var renderObject = function(obj) {
        var res = '{',
            aRes = [];

        for (var i in obj) {
            aRes.push(i + ': ' + render(obj[i]));
        }

        res += aRes.join(', ') + '}';
        return res;
    };

    /**
     * render boolean
     *
     * output => true or false
     */
    var renderBoolean = function(bool) {
        return bool ? 'true' : 'false';
    };

    /**
     * render other types
     *
     * use toString to output
     */
    var renderDefault = function(obj) {
        return obj.toString();
    }

    /**
     * receive values, and the log them out
     *
     * can use comma to seperate input values
     */
    var log = function() {
        var renderedArgs = [],
            i = 0,
            result = '';
            il = arguments.length;

        for (; i < il; i += 1) {
            renderedArgs.push(render(arguments[i]));
        }

        result = renderedArgs.join('&nbsp;&nbsp;&nbsp;&nbsp;');
        appendLog(result);
    };

    /**
     * functions expose out
     */
    return {
        log: log
    };
}();
