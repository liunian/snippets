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

    test('DJ.log.getById', function(){
        DJ.log.empty();

        testHelper.addLog();

        equal(DJ.log.getById(2).msg, 'second log');
        equal(DJ.log.getById(3), undefined);

        DJ.log.empty();
    });


    test('DJ.log.head', function() {
        DJ.log.empty();

        testHelper.addLog();
        equal(DJ.log.head()[0].id, 1);
        equal(DJ.log.head(2)[1].id, 2);

        DJ.log.empty();
    });

    test('DJ.log.tail', function() {
        DJ.log.empty();

        testHelper.addLog();
        equal(DJ.log.tail()[0].id, 2);
        equal(DJ.log.head(2)[1].id, 2);

        DJ.log.empty();
    });
});
