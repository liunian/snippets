describe('DJ.util', function() {
    describe('DJ.extend', function() {
        // normal
        it('should has the same value', function() {
            var t = {}, o = {a: 1};
            DJ.extend(t, o);
            expect(t).to.be.eql(o);
        });
        // override
        it('should override key a', function() {
            var t = {a: 1}, o = {a: 2, b: 3};
            DJ.extend(t, o);
            expect(t).to.be.eql(o);
        });
        // override => false
        it('should not override key a', function() {
            var t = {a: 1}, o = {a: 2, b: 3};
            DJ.extend(t, o, false);
            expect(t).to.be.eql({a: 1, b: 3});
        });

        // non-valid-key
        it('non-valid-key works too', function() {
            var t = {a: 1}, o = {a: 2, 'non-valid': 'other'};
            DJ.extend(t, o);
            expect(t).to.be.eql(o);
        });
    });

    describe('DJ.outerHTML', function() {
        it('outerHTML', function() {
            var d = document.createElement('div');
            d.className = 'outer';
            d.innerHTML = '<p>test outerHTML<span>a</span></p>';
            document.body.appendChild(d);

            var h = DJ.outerHTML(d);
            expect(h).to.be.equal('<div class="outer"><p>test outerHTML<span>a</span></p></div>');

            document.body.removeChild(d);
            d = null;
        });
    });

    describe('DJ.isObject', function() {
    });

    describe('DJ.isElement', function() {
    });

    describe('DJ.isArray', function() {
    });

    describe('DJ.isFunction', function() {
    });

    describe('DJ.isBool', function() {
    });

    describe('DJ.each', function() {
        it('all values in array should plus 1', function() {
            var arr = [1, 2, 3];
            var res = [];
            DJ.each(arr, function(v, i) {
                res[i] = v + 1;
            });
            expect(res).to.be.eql([2, 3, 4]);
        });

        it('all values in object should plus 2', function() {
            var obj = {a: 1, b: 2, c: 3},
                res = {};
            DJ.each(obj, function(v, k) {
                res[k] = v + 2;
            });
            expect(res).to.be.eql({a: 3, b: 4, c: 5});
        });
    });

    describe('DJ.trim', function() {
        it('trim whitespace before and after a string', function() {
            var str = '  \t\n something happened. \t\n  ';
            var res = DJ.trim(str);
            expect(res).to.be.equal('something happened.');
        });
    });

    describe('DJ.isIE6', function() {
    });

    describe('DJ.escapeHtml', function() {
        it('escape html special characters', function() {
            var str = '<div>1 < 2 && 3 > 2</div>';
            var res = DJ.escapeHtml(str);
            expect(res).to.be.equal('&lt;div&gt;1 &lt; 2 &amp;&amp; 3 &gt; 2&lt;/div&gt;');
        });
    });
});
