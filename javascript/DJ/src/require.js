/**
 * Here just require a script and excute a callback if it exist
 *
 * Advanced usage may be required such as require an array urls, queue control
 *
 * These funcions can be found in LazyloadJs or LABjs
 */
DJ.export('require', function(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = script.onreadystatechange = function() {
        if (script.readyState && script.readyState != 'loaded' &&
            script.readyState != 'complete') {
            return false;
        }
        script.onload = script.onreadystatechange = null;
        callback && callback();
    };

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
});

/*
 // from:https://gist.github.com/603980
 // HOWTO: load LABjs itself dynamically!
// inline this code in your page to load LABjs itself dynamically,
// if you're so inclined.

(function (global, oDOC, handler) {
    var head = oDOC.head || oDOC.getElementsByTagName("head");

    function LABjsLoaded() {
        // do cool stuff with $LAB here
    }

    // loading code borrowed directly from LABjs itself
    setTimeout(function () {
        if ("item" in head) { // check if ref is still a live node list
            if (!head[0]) { // append_to node not yet ready
                setTimeout(arguments.callee, 25);
                return;
            }
            // reassign from live node list ref to pure node ref
            // -- avoids nasty IE bug where changes to DOM invalidate
            // live node lists
            head = head[0];
        }
        var scriptElem = oDOC.createElement("script"),
            scriptdone = false;
        scriptElem.onload = scriptElem.onreadystatechange = function () {
            if ((scriptElem.readyState &&
                scriptElem.readyState !== "complete" &&
                scriptElem.readyState !== "loaded") || scriptdone) {
                return false;
            }
            scriptElem.onload = scriptElem.onreadystatechange = null;
            scriptdone = true;
            LABjsLoaded();
        };
        scriptElem.src = "/path/to/LAB.js";
        head.insertBefore(scriptElem, head.firstChild);
    }, 0);

    // required: shim for FF <= 3.5 not having document.readyState
    if (oDOC.readyState == null && oDOC.addEventListener) {
        oDOC.readyState = "loading";
        oDOC.addEventListener("DOMContentLoaded", handler = function () {
            oDOC.removeEventListener("DOMContentLoaded", handler, false);
            oDOC.readyState = "complete";
        }, false);
    }
})(window, document);
*/

