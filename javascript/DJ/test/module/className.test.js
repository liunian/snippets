module('className');
(function(){
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

    test('DJ.hasClass', function() {
        var c = new testHelperClass(),
            ele = c.ele;

        equal(DJ.hasClass(ele, 'a'), true);
        equal(DJ.hasClass(ele, 'b'), false);
        equal(DJ.hasClass(ele, 'ac'), false, 'false even though ac is part of bac');
        equal(DJ.hasClass(ele, 'a-a-a'), true);
        equal(DJ.hasClass(ele, 'a-a'), false);
        ele.className = '';
        equal(DJ.hasClass(ele, 'a'), false);

        c.tearDown();
    });

    test('DJ.addClass', function() {

    });

    test('DJ.removeClass', function() {

    });
})();
