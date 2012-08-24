describe('DJ', function() {
    describe('DJ.add', function() {
        it('add one module', function() {
            DJ.add('add_t1', function() { return 1;});
            expect(DJ.add_t1()).to.be.equal(1);
        });

        it('add more than one modules', function() {
            DJ.add({
                add_t2: function() {
                    return 2;
                },
                add_t3: function() {
                    return 3;
                }
            });
            expect(DJ.add_t2()).to.be.equal(2);
            expect(DJ.add_t3()).to.be.equal(3);
        });
        it('add modules with parameters', function() {
            DJ.add({
                add_t4: function(a, b) {
                    return a + b;
                }
            });
            expect(DJ.add_t4(10, 20)).to.be.equal(30);
        });
    });
});
