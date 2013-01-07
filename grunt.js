module.exports = function(grunt) {
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'javascript/*.js', 'javascript/DJ/src/*.js', 'javascript/DJ/component/*.js', 'javascript/DJ/test/module/*.js']
        },
        jshint: {
            options: {
            }
        },
        mocha: {
            unit: {
                src: ['javascript/DJ/test/index.html'],
                options: {
                    run: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha');

    grunt.registerTask('default', 'lint mocha');
    grunt.registerTask('pre-commit', 'lint mocha');
};
