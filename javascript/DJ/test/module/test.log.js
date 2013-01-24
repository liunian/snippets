describe('DJ.log', function() {
    var testHelper = testHelper || {};

    testHelper.addLog = function(){
        DJ.log.add('first log');
        DJ.log.add('second log');
    };

    describe('DJ.log.length', function() {
        it('should be 0 when empty', function() {
            DJ.log.empty();
            expect(DJ.log.length()).to.equal(0);
        });
    });

    describe('DJ.log.add', function(){
        it('add 2 logs', function() {
            DJ.log.empty();
            testHelper.addLog();

            expect(DJ.log.length()).to.equal(2);

            DJ.log.empty();
        });
    });

    describe('DJ.log.get', function(){
        it("return first log's msg", function(){
            DJ.log.empty();
            testHelper.addLog();
            expect(DJ.log.get(0).msg).to.equal('first log');
            DJ.log.empty();
        });
        it('get non-exist log will return undefined', function() {
            DJ.log.empty();
            testHelper.addLog();
            expect(DJ.log.get(3)).to.equal(undefined);
            DJ.log.empty();
        });
    });

    describe('DJ.log.getById', function(){
        it('getById', function() {
            DJ.log.empty();
            testHelper.addLog();

            expect(DJ.log.getById(2).msg).to.equal('second log');
            expect(DJ.log.getById(3)).to.equal(undefined);

            DJ.log.empty();
        });
    });


    describe('DJ.log.head', function() {
        it('.head() will return an array with given size log inside it, if no argument, only the first one', function(){
            DJ.log.empty();
            testHelper.addLog();

            expect(DJ.log.head()[0].id).to.equal(1);
            expect(DJ.log.head(2)[1].id).to.equal(2);

            DJ.log.empty();
        });
    });

    describe('DJ.log.tail', function() {
        it('the same as head, but from the end', function() {
            DJ.log.empty();
            testHelper.addLog();

            expect(DJ.log.tail()[0].id).to.equal(2);
            expect(DJ.log.head(2)[1].id).to.equal(2);

            DJ.log.empty();
        });
    });
});
