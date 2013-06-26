describe('DJ.Ajax', function(){
    describe('DJ.Ajax.ajax', function(){
        it('DJ.Ajax.ajax success', function(done){
            DJ.Ajax.ajax('get', 'php/ajax.php', function(response, xhr, options){
                expect(response).to.equal('get/post ajax.php');
                expect(xhr.status).to.equal(200);
                done();
            });
        });

        it('DJ.Ajax.ajax failed', function(done){
            var t = 0;
            DJ.Ajax.post('php/ajax2.php?t=1', {
                success: function(response) {
                    t = 1;
                },
                error: function(xhr){
                    t = 2;
                    expect(xhr.status).to.equal(404);
                },
                complete: function(xhr, options){
                    expect(t).to.equal(2);
                    done();
                }
            });
        });

        // #2
        it('DJ.Ajax.ajax get with option data', function(done){
            DJ.Ajax.ajax('get', 'php/ajax.php', {
                data: {
                    t: 2
                },
                success: function(response) {
                    expect(response).equal('gt=2');
                    done();
                }
            });
        });

        // post nothing
        it('DJ.Ajax.ajax post nothing', function(done){
            DJ.Ajax.ajax('post', 'php/ajax.php', function(ret){
                expect(ret).equal('get/post ajax.php');
                done();
            });
        });
    });

    describe('DJ.Ajax shortcut', function(){
        it('DJ.Ajax.get success', function(done){
            var t = 0;
            DJ.Ajax.get('php/ajax.php?t=中2', {
                success: function(response){
                    expect(response).to.equal('gt=中2');
                    t = 1;
                },
                complete: function(xhr, options){
                    expect(t).to.equal(1);
                    done();
                }
            });
        });


        it('DJ.Ajax.post success', function(done){
            DJ.Ajax.post('php/ajax.php', {
                data: {
                    key: 't',
                    value: '国3'
                },
                success: function(response){
                    expect(response).to.equal('t=国3');
                    done();
                }
            });
        });
    });
});
