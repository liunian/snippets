module('DJ.data');

(function() {
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

    test('DJ.getData', function() {
        var t = new testHelper(),
            ele = t.ele;
        
        equal(DJ.getData(t, 'key'), null);

        t.tearDown();
    });

    test('DJ.setData', function() {
         var t = new testHelper(),
            ele = t.ele;
       
        DJ.setData(t, 'key', 'name');
        DJ.setData(t, 'key2', 'name2');
        DJ.setData(t, 'key3', 3);

        equal(DJ.getData(t, 'key2'), 'name2');
        equal(DJ.getData(t, 'key'), 'name');
        equal(DJ.getData(t, 'key3'), 3);
        equal(DJ.getData(t, 'key0'), null);

        t.tearDown();

    });

    test('DJ.removeData', function() {
         var t = new testHelper(),
            ele = t.ele;
       
        DJ.setData(t, 'key', 'name');
        DJ.setData(t, 'key2', 'name2');
        DJ.setData(t, 'key3', 3);

        DJ.removeData(t, 'key2');
        equal(DJ.getData(t, 'key2'), null);
        equal(DJ.getData(t, 'key3'), 3);

        t.tearDown();
    });
})();
