module('DJ.util');

var testHelper = testHelper || {};

test('DJ.extend', function() {
    var a = {},
        b = {'a' : 1},
        c = {'a' : 1, 'b' : 2};

    DJ.extend(a, {'a': 1});
    deepEqual(a, b);

    var z = DJ.extend({'a' : 0}, c);
    deepEqual(z, c);

    var y = DJ.extend({'a' : 0}, c, false);
    deepEqual(y, {'a': 0, 'b': 2});
});

test('DJ.each', function() {
    var arr = ['a', 'b', 'c'],
        obj = {'a': 1, 'b': 2, 'c': 3};
//   DJ.each(arr, function(i, j, k){console.log(i,j,k);}); 
//   DJ.each(obj, function(i, j, k){console.log(i,j,k);}); 
});
