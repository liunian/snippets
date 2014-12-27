describe('DJ.Ajax', function(){

    var defaultAjaxRes = 'get/post ajax';
    /**
     *
     * @param request {FakeXMLHttpRequest}
     */
    function simulateResponse(request) {
        var ret = defaultAjaxRes,
            args;

        switch (request.method) {
            case 'get':
                args = params(request.url);
                if (args.t !== undefined) {
                    ret = 'gt=' + args.t;
                }
                break;
            case 'post':
                args = params(request.requestBody || '');
                if (args.key !== undefined && args.value !== undefined) {
                    ret = args.key + '=' + args.value;
                }
                break;
        }

        return ret;
    }

    /**
     *
     * @param str {String}
     */
    function params(str) {
        var searchIndex = str.indexOf('?');
        if (searchIndex !== -1) {
            str = str.substr(searchIndex + 1);
        }

        var list = str.split('&');
        var ret = {};

        list.forEach(function(item) {
            var kv = item.split('=');
            var k = decodeURIComponent(kv[0]),
                v = kv[1] ? decodeURIComponent(kv[1]) : '';

            if (!ret[k]) {
                ret[k] = v;
            } else {
                if (Object.prototype.toString.call(ret[k]) == '[object Array]') {
                    ret[k].push(v);
                } else {
                    ret[k] = [ret[k], v];
                }
            }
        });

        return ret;
    }


    var XHR, xhr;

    // seems beforeEach is called with each assert ?!!
    beforeEach(function() {
        XHR = sinon.useFakeXMLHttpRequest();
        XHR.onCreate = function(x) {
            xhr = x;
        };
    });
    afterEach(function() {
        if (typeof XHR.restore === 'function') {
            XHR.restore();
        }
    });

    describe('DJ.Ajax.ajax', function(){
        it('DJ.Ajax.ajax success', function(){
            var cb = sinon.spy();

            DJ.Ajax.ajax('get', 'php/ajax.php', cb);
            xhr.respond(200, {'Content-type': 'text/html'}, simulateResponse(xhr));
            expect(cb.calledWith(defaultAjaxRes)).to.be.ok();
        });

        it('DJ.Ajax.ajax failed', function(){
            var successCb = sinon.spy(),
                errorCb = sinon.spy(),
                completeCb = sinon.spy();

            DJ.Ajax.post('php/ajax.php', {
                success : successCb,
                error   : errorCb,
                complete: completeCb
            });
            xhr.respond(404);

            expect(successCb.notCalled).to.be.ok();
            expect(errorCb.calledOnce).to.be.ok();
            expect(completeCb.calledOnce).to.be.ok();
            expect(xhr.status).to.equal(404);
        });

        // #2
        it('DJ.Ajax.ajax get with option data', function(){
            var cb = sinon.spy();

            DJ.Ajax.ajax('get', 'php/ajax.php', {
                data: {
                    t: 2
                },
                success: cb
            });
            xhr.respond(200, {'Content-type': 'text/html'}, simulateResponse(xhr));

            expect(cb.calledWith('gt=2')).to.be.ok();
        });

        // post nothing
        it('DJ.Ajax.ajax post nothing', function(){
            var cb = sinon.spy();

            DJ.Ajax.ajax('post', 'php/ajax.php', cb);
            xhr.respond(200, {'Content-type': 'text/html'}, simulateResponse(xhr));

            expect(cb.calledWith(defaultAjaxRes)).to.be.ok();
        });
    });

    describe('DJ.Ajax shortcut', function(){
        it('DJ.Ajax.get success', function(){
            var successCB = sinon.spy(),
                completeCB = sinon.spy();

            DJ.Ajax.get('php/ajax.php?t=中2', {
                success: successCB,
                complete: completeCB
            });
            xhr.respond(200, {'Content-type': 'text/html'}, simulateResponse(xhr));

            expect(successCB.calledWith('gt=中2')).to.be.ok();
            expect(successCB.calledOnce).to.be.ok();
            expect(completeCB.calledOnce).to.be.ok();
        });


        it('DJ.Ajax.post success', function(){
            var successCB = sinon.spy();

            DJ.Ajax.post('php/ajax.php', {
                data: {
                    key: 't',
                    value: '国3'
                },
                success: successCB
            });
            xhr.respond(200, {'Content-type': 'text/html'}, simulateResponse(xhr));

            expect(successCB.calledWith('t=国3')).to.be.ok();
            expect(successCB.calledOnce).to.be.ok();
        });
    });
});
