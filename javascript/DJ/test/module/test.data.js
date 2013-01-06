describe('DJ.data', function() {
    var testHelper = function() {
        return this.setUp();
    };
    testHelper.prototype = {
        setUp: function() {
            this.ele = document.createElement('div');
            document.body.appendChild(this.ele);
        },
        tearDown: function() {
            document.body.removeChild(this.ele);
            delete this.ele;
        }
    };

    describe('DJ.setData', function() {
         var t = new testHelper(),
            ele = t.ele;

        it('return the data setted by setData', function() {
            DJ.setData(t, 'key', 'name');
            DJ.setData(t, 'key2', 'name2');
            expect(DJ.getData(t, 'key2')).to.equal('name2');
            expect(DJ.getData(t, 'key')).to.equal('name');
        });

        it('keep the data type', function() {
            DJ.setData(t, 'key3', 3);
            expect(DJ.getData(t, 'key3')).to.equal(3);
            expect(DJ.getData(t, 'key3')).to.not.equal('3');
        });

        it('get non-seeted data should return null', function(){
            expect(DJ.getData(t, 'key0')).to.equal(null);
        });

        t.tearDown();
    });

    describe('DJ.removeData', function() {
         var t = new testHelper(),
            ele = t.ele;
       
        DJ.setData(t, 'key2', 'name2');
        DJ.setData(t, 'key3', 3);
        DJ.removeData(t, 'key2');

        it('should be null after being removed', function(){
            expect(DJ.getData(t, 'key2')).to.equal(null);
        });

        it('but the others remains', function() {
            expect(DJ.getData(t, 'key3')).to.equal(3);
        });

        t.tearDown();
    });
});
