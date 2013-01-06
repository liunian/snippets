describe('DJ.event', function() {
    function createEle() {
        var ele = document.createElement('div');
        document.body.appendChild(ele);
        return ele;
    }

    describe('DJ.on', function() {
        it('on', function() {
            var ele = createEle();
            DJ.on(ele, 'click', function(e) {

            });
        });
    });

    describe('DJ.off', function() {
    });

    describe('DJ.stopBubble', function() {
    });

    describe('DJ.preventDefault', function() {
    });

    describe('DJ.delegate', function() {
        
    });
});
