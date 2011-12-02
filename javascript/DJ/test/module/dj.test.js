module('DJ');

test('DJ.export', function(){
    DJ.export('t1', function(){
        return 1;
    });

    DJ.export({
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
