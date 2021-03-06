describe('DJ.Cookie', function() {
    var has = DJ.Cookie.has,
        set = DJ.Cookie.set,
        get = DJ.Cookie.get;

    describe('DJ.Cookie.has', function() {
        it('should return false when testing the non-exist cookie',
            function() {
            expect(has('non_exist_cookie')).to.equal(false);
        });

        it('should return true after setting the exist_cookie',
            function() {
            set('exist_cookie', 'exist');
            expect(has('exist_cookie')).to.equal(true);
        });

    });

    describe('DJ.Cookie.set & get', function() {
        it('testing the setting cookie value', function() {
            expect(get('exist_cookie')).to.equal('exist');
        });

        it('set cookie with chinese', function() {
            var s1 = 'ab中文12';
            set('non_assii_cookie', s1);
            expect(get('non_assii_cookie')).to.equal(s1);
        });

        it('set cookie with expires, need see developer tool', function() {
            set('expire_cookie', 1, {expires: 2});
            set('expire_cookie_2', 1, {expires: 2});
            set('expire_cookie_3', 1, {expires: 2});
            expect(get('expire_cookie_2')).to.equal('1');

            // set time to -1 to remove it
            set('expire_cookie_2', 1, {expires: -1});
            expect(get('expire_cookie_2')).to.equal(null);

            // set the value to remove it
            set('expire_cookie_3', null);
            expect(get('expire_cookie_3')).to.equal(null);
        });

        it('set cookie with path and others, need to see developer tool', function() {
            set('path_cookie', 1, {path: '/'});
            set('secure_cookie', 1, {secure: true});
        });
    });

    describe('DJ.Cookie remove', function() {
        it('remove cookie set by test', function() {
            set('exist_cookie', null);
            set('non_assii_cookie', null);

            expect(has('exist_cookie')).to.equal(false);
            expect(has('non_assii_cookie')).to.equal(false);
        });
    });
});
