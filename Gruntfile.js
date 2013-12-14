module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'javascript/*.js', 'javascript/DJ/src/*.js', 'javascript/DJ/component/*.js', 'javascript/DJ/test/module/*.js'],
            options: {
            }
        },
        mocha: {
            unit: {
                // use server path to test ajax
                // make the path right
                options: {
                    urls: ['http://localhost/github/snippets/javascript/DJ/test/index.html'],
                    run: true,
                    log: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', ['jshint', 'mocha']);
    grunt.registerTask('pre-commit', ['jshint', 'mocha']);
};
