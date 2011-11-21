module('DJ.log');

var testHelper = testHelper || {};

testHelper.addLog = function(){
    DJ.log.add('first log');
    DJ.log.add('second log');
};

test('DJ.log.add', function(){
    DJ.log.empty();

    testHelper.addLog();

    equal(DJ.log.length(), 2);

    DJ.log.empty();
});

test('DJ.log.get', function(){
    DJ.log.empty();

    testHelper.addLog();

    equal(DJ.log.length(), 2);

    equal(DJ.log.get(0).msg, 'first log');
    equal(DJ.log.get(3), undefined);

    DJ.log.empty();
});

test('DJ.log.getById', function(){
    DJ.log.empty();

    testHelper.addLog();

    equal(DJ.log.getById(2).msg, 'second log');
    equal(DJ.log.getById(3), undefined);

    DJ.log.empty();
});

test('DJ.log.length', function() {
    DJ.log.empty();
    
    testHelper.addLog();
    equal(DJ.log.length(), 2);
    
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
