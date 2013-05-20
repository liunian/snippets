module.exports = function(grunt) {
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'javascript/*.js', 'javascript/DJ/src/*.js', 'javascript/DJ/component/*.js', 'javascript/DJ/test/module/*.js',
                  'javascript/windowname/windowname.js'
            ]
        },
        jshint: {
            options: {
            }
        },
        mocha: {
            unit: {
                // use server path to test ajax
                // make the path right
                src: ['http://localhost/snippets/javascript/DJ/test/index.html'],
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
