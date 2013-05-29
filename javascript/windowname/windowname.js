/**
 * 无刷新跨域传输数据
 *
 * 如果是 get，使用 jsonp
 * 如果是 post，使用 window.name
 *
 * @param {String} url the url of the page which request
 * @param {Function} callback the function which handle the response, the response is window.name; if fail, set it to {error: 1}
 * @param {Object} [options] optional data, including following items
 *      [get]
 *      callbackTag: the callbackTag that let server known it's value is the callback name, default: 'callback'
 *      callbackName: the callback name, default: 'transfer_' + new Date().getTime()
 *
 *      [post]
 *      data: a key-value data to be posted
 *      localProxy: the local proxy file, if not set, use '/favicon.ico'
 *
 * @example
 *
 *  // this will be jsonp
 *  transfer('http://127.0.0.1/action.php', function(data) {
 *      console.log(data);
 *  });
 *
 *  // this will use window.name
 *  transfer('http://127.0.0.1/action.php', function(data) {
 *          console.log(data);
 *      },
 *      {
 *          data: {'key': 'happy'}
 *      }
 *  );
 */
function transfer(url, callback, options) {
    options = options || {};
    var data = options.data;
    var uuid = 'transfer_' + new Date().getTime();


    // No post data, use jsonp
    if(!data) {
        var callbackTag = options.callbackTag || 'callback';
        var callbackName = options.callbackName || uuid;
        window[callbackName] = callback;
        url += (url.indexOf('?') > 0 ? '&' : '?') + callbackTag + '=window.' + callbackName;

        var scr = document.createElement('script');
        scr.onload = function() {
            // when finish, clear and remove the script
            scr.onload = null;
            setTimeout(function(){
                scr.parentNode.removeChild(scr);
            }, 1);
        };
        scr.src = url;
        document.body.appendChild(scr);

        return;
    }

    // ================ use window.name for post method

    function createNamedElement (type, name) {
        var element = null;
        // Try the IE way; this fails on standards-compliant browsers
        try {
            element = document.createElement('<'+type+' name="'+name+'">');
        } catch (e) {
        }
        if (!element || element.nodeName != type.toUpperCase()) {
            // Non-IE browser; use canonical method to create named element
            element = document.createElement(type);
            element.name = name;
        }
        return element;
    }

    var frame = createNamedElement('iframe', uuid);
    var defaultName = 'cross.default.name';
    var done = false;

    var localProxy = options.localProxy || '/favicon.ico';

    // for post method
    var form, input, key;

    // when success get response by window.name, call callback
    function complete() {
        var data = frame.contentWindow.name;
        // if fail to fetch the name, make it error
        if(data == defaultName) data = '{"error": 1}';
        callback(data);
    }

    function isLocal() {
        var c = false;
        try {
            c = frame.contentWindow.location.host == location.host;
            // try to get location - if we can we're still local and have to wait some more...
        } catch (er) {
            // if we're at foreign location we're sure we can proceed
        }
        return c;
    }

    function clean() {
        frame.onreadystatechange = frame.onload = null;
        frame.parentNode.removeChild(frame);
        if(form) {
            form.parentNode.removeChild(form);
        }
    }

    // Give the frame a name to hide it from frames.length
    frame.name = uuid;

    // Hide frame. Avoid `display:none` to work with old Safari.
    frame.style.display = 'none';
    frame.style.position = 'fixed';
    frame.style.top = frame.style.left = '-10000px';

    // state:
    // 1: init
    // 2: set to request location
    // 3: response from request location
    var state = 1;

    // add mark tag
    data.windowname = 1;

    var onrequest = function() {
        try{
            // opera 的 frame 请求加载机制似有所不同，跳过了 state 为 1 的部分，直接进入 state 为 2 的情况；
            // 导致 form 改变 iframe 文档的 location 还没生效，保持为 blank
            if(frame.contentWindow.location.href == 'about:blank') return;
        } catch(e) {}

        if(state == 3) {
            if(!isLocal()) {
                // need to set back to local location in order to have grant to access window.name
                frame.contentWindow.location = localProxy;
            } else {
                // ie
                if(frame.readyState && frame.readyState.toLowerCase() != 'complete') return;

                complete();
                done = true;
                clean();
            }
        }

        if(state == 2) {
            frame.contentWindow.location = localProxy;
            state = 3;
        }
    };

    if (frame.onreadystatechange !== undefined) {
        frame.onreadystatechange = onrequest;
    } else {
        frame.onload = onrequest;
    }

    document.body.appendChild(frame);

    // use form to post data and put response into iframe
    form = document.createElement('form');
    form.style.display = 'none';
    // The form posts to the URL
    form.target = uuid;
    form.action = url;
    form.method = 'post';
    form.enctype = 'application/x-www-form-urlencoded';

    // Build form fields from data
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            input = document.createElement('input');
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);
    form.submit();

    state = 2;

    if(frame.contentWindow) {
        frame.contentWindow.name = 'cross.default.name';
    }
}
