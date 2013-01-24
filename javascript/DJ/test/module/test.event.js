describe('DJ.event', function() {
    function createEle() {
        var ele = document.createElement('div');
        document.body.appendChild(ele);
        return ele;
    }

    describe('DJ.on', function() {
        it('click dblclick', function() {
            var ele = createEle();
            var res = 0;
            DJ.on(ele, 'click', function(e) {
                res = 1;
            });
            DJ.fire(ele, 'click');
            expect(res).to.equal(1);

            DJ.on(ele, 'dblclick', function(e) {
                res = 2;
            });
            DJ.fire(ele, 'dblclick');
            expect(res).to.equal(2);

            ele.parentNode.removeChild(ele);
            ele = null;
        });

        it('mouseover mouseout', function(){
            var ele = createEle();
            var res = 0;

            // mouseover
            DJ.on(ele, 'mouseover', function(e) {
                res = 3;
            });
            DJ.fire(ele, 'mouseover');
            expect(res).to.equal(3);
            // mouseout

            ele.parentNode.removeChild(ele);
            ele = null;
        });

        it('mouseenter mouseleave', function(){
            var ele = createEle();
            var res = 0;

            // mouseenter
            DJ.on(ele, 'mouseenter', function(e) {
                res = 3;
            });
            DJ.fire(ele, 'mouseenter');
            expect(res).to.equal(3);

            // mouseleave
            DJ.on(ele, 'mouseleave', function(e) {
                res = 3;
            });
            DJ.fire(ele, 'mouseleave');
            expect(res).to.equal(3);

            ele.parentNode.removeChild(ele);
            ele = null;
        });
    });

    describe('DJ.off', function() {
        it('remove named function', function() {
            var ele = createEle();
            var res = 0;
            function cfn() {
                res = 1;
            }
            DJ.on(ele, 'click', cfn);
            DJ.fire(ele, 'click');
            expect(res).to.equal(1);

            res = 0;
            DJ.off(ele, 'click', cfn);
            expect(res).to.equal(0);

            document.body.removeChild(ele);
            ele = null;
        });
    });

    describe('DJ.stopPropagation', function() {
        it('should be 1 if not stopPropagation', function() {
            var ele1 = createEle(),
                ele2 = createEle(),
                res = 0;

            function f1() {
                res = 1;
            }

            function f2() {
                res = 2;
            }

            document.body.appendChild(ele1);
            ele1.appendChild(ele2);

            DJ.on(ele1, 'click', f1);
            DJ.on(ele2, 'click', f2);

            DJ.fire(ele2, 'click');
            expect(res).to.equal(1);

            DJ.off(ele1, 'click', f1);
            DJ.off(ele2, 'click', f2);
            ele1.removeChild(ele2);
            document.body.removeChild(ele1);
            ele1 = null;
            ele2 = null;
        });

        it('should be 2 if stopPropagation', function() {
            var ele1 = createEle(),
                ele2 = createEle(),
                res = 0;

            function f1() {
                res = 1;
            }

            function f2(e) {
                res = 2;
                e.stopPropagation();
            }

            document.body.appendChild(ele1);
            ele1.appendChild(ele2);

            DJ.on(ele1, 'click', f1);
            DJ.on(ele2, 'click', f2);

            DJ.fire(ele2, 'click');
            expect(res).to.equal(2);

            DJ.off(ele1, 'click', f1);
            DJ.off(ele2, 'click', f2);

            ele1.removeChild(ele2);
            document.body.removeChild(ele1);
            ele1 = null;
            ele2 = null;
        });
    });

    describe('DJ.preventDefault', function() {
        it('should not change url if preventDefault', function() {
            var l = location.href;

            var link = document.createElement('a');
            link.href = '####';
            link.innerHTML = 'test';
            document.body.appendChild(link);

            var res = 0;

            function f(e) {
                e.preventDefault();
                res = 1;
            }

            DJ.on(link, 'click', f);
            DJ.fire(link, 'click');

            expect(res).to.equal(1);
            expect(location.href).to.equal(l);

            DJ.off(link, 'click', f);
            document.body.removeChild(link);
            link = null;
        });
    });

    describe('DJ.delegate', function() {
        it('delegate', function(){
            var w = createEle(),
                fra = document.createDocumentFragment(),
                res = '';

            function f(e) {
                res = this.innerHTML;
            }

            var n;
            for(var i = 0; i < 3; i++) {
                n = document.createElement('p');
                n.className = 'delegate';
                n.innerHTML = i;
                fra.appendChild(n);
            }
            w.appendChild(fra);

            DJ.delegate(w, '.delegate', 'click', f);

            DJ.fire(w.childNodes[0], 'click');
            expect(res).to.equal('0');
            DJ.fire(w.childNodes[1], 'click');
            expect(res).to.equal('1');
            DJ.fire(w.childNodes[2], 'click');
            expect(res).to.equal('2');

            DJ.off(w, 'click', f);
            w.parentNode.removeChild(w);
            w.innerHTML = '';
            w = null;
        });
    });
});
