module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'javascript/*.js', 'javascript/DJ/src/*.js', 'javascript/DJ/component/*.js', 'javascript/DJ/test/module/*.js'],
            options: {
            }
        },
        mocha: {
            unit: {
                options: {
                    urls: ['javascript/DJ/test/index.html'],
                    run: true,
                    log: true,
                    reporter: 'Nyan'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('test', ['mocha']);
    grunt.registerTask('pre-commit', ['jshint', 'test']);
    grunt.registerTask('default', ['pre-commit']);
};
