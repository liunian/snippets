module('DJ');

test('DJ.add', function(){
    DJ.add('t1', function(){
        return 1;
    });

    DJ.add({
        t2: function(){
            return 2;
        },
        t3: function() {
            return 3;
        }
    });

    equal(DJ.t1(), 1);
    equal(DJ.t2(), 2);
    equal(DJ.t3(), 3);
});
