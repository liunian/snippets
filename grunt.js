module.exports = function(grunt) {
    grunt.initConfig({
        lint: {
            all: ['grunt.js', 'javascript/*.js', 'javascript/DJ/src/*.js', 'javascript/DJ/component/*.js', 'javascript/DJ/test/module/*.js']
        },
        jshint: {
            options: {
            }
        }

    });

    grunt.registerTask('default', 'lint');
};
