describe('DJ.class', function(){
    var testHelperClass = function() {
        this.setUp();
        return this;
    };
    testHelperClass.prototype = {
        setUp: function() {
            this.ele = document.createElement('div');
            this.ele.className = 'a ab ba bac a-a-a';
            document.body.appendChild(this.ele);
        },
        tearDown: function() {
            document.body.removeChild(this.ele);
            delete this.ele;
        }
    };

    describe('DJ.hasClass', function() {
        it('hasClass', function(){
            var c = new testHelperClass(),
                ele = c.ele;

            expect(DJ.hasClass(ele, 'a')).to.equal(true);
            expect(DJ.hasClass(ele, 'b')).to.equal(false);
            expect(DJ.hasClass(ele, 'ac')).to.equal(false);
            expect(DJ.hasClass(ele, 'a-a-a')).to.equal(true);
            expect(DJ.hasClass(ele, 'a-a')).to.equal(false);
            ele.className = '';
            expect(DJ.hasClass(ele, 'a')).to.equal(false);

            c.tearDown();
        });
    });

    describe('DJ.addClass', function() {
        it('add a new class will append it', function() {
            var c = new testHelperClass(),
                ele = c.ele;

            DJ.addClass(ele, 'b');
            expect(ele.className).to.equal('a ab ba bac a-a-a b');
            c.tearDown();
        });

        it('add a exist class will do nothing', function() {
            var c = new testHelperClass(),
                ele = c.ele;
            DJ.addClass(ele, 'a');
            expect(ele.className).to.equal('a ab ba bac a-a-a');
            c.tearDown();
        });

        it('add classes at one time(some exist)', function() {
            var c = new testHelperClass(),
                ele = c.ele;

            DJ.addClass(ele, 'b d a');
            expect(ele.className).to.equal('a ab ba bac a-a-a b d');
            c.tearDown();
        });
    });

    describe('DJ.removeClass', function() {
        it('remove an exist class', function() {
            var c = new testHelperClass(),
                ele = c.ele;

            // head
            DJ.removeClass(ele, 'a');
            expect(ele.className).to.equal('ab ba bac a-a-a');

            // last
            DJ.removeClass(ele, 'a-a-a');
            expect(ele.className).to.equal('ab ba bac');

            // inside
            DJ.removeClass(ele, 'ba');
            expect(ele.className).to.equal('ab bac');
            c.tearDown();
        });

        it('remove non-exist class will do nothing', function(){
            var c = new testHelperClass(),
                ele = c.ele;

            DJ.removeClass(ele, 'non-exist');
            expect(ele.className).to.equal('a ab ba bac a-a-a');
            c.tearDown();
        });

        it('remove more than one class at one time(exist or non-exist)', function(){
            var c = new testHelperClass(),
                ele = c.ele;

            DJ.removeClass(ele, 'a ba a-a-a non-exist');
            expect(ele.className).to.equal('ab bac');
            c.tearDown();
        });
    });
});
