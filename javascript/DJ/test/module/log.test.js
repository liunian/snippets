module('DJ.log');

test('DJ.log', function(){
    DJ.log('first log');
    DJ.log('second log');
    equal(2, DJ._log.length);
});
