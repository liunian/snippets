describe('DJ.selector', function(){
    it('select by id', function() {
        expect(DJ.$('#mocha')).to.equal(document.getElementById('mocha'));
    });

    it('select by tag', function() {
        expect(DJ.$('div')[0]).to.equal(DJ.$('#mocha'));
    });

    it('select by tag with contet', function() {
        var ele = document.createElement('div'),
            inn = document.createElement('div');

        document.body.appendChild(ele);
        ele.appendChild(inn);

        expect(DJ.$('div', ele)[0]).to.equal(inn);

        ele.removeChild(inn);
        document.body.removeChild(ele);
        inn = null;
        ele = null;
    });

    it('select by class', function() {
        var ele = document.createElement('div');
        ele.className = 'test-class';
        document.body.appendChild(ele);

        expect(DJ.$('.test-class')[0]).to.equal(ele);
        document.body.removeChild(ele);
        ele = null;
    });
});
