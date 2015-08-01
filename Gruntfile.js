/* global module */

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\n'
            },
            dist: {
                src: ['lib/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        yuidoc: {
            all: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
		url: '<%= pkg.homepage %>',
                options: {
		    exclude: 'build,dist,doc',
                    paths: ['./', 'lib/'],
                    outdir: 'doc/'
                }
            }
        },
        jshint: {
            all: ['lib/**/*.js']
        },
        
        mochacli: {
          options: {
            reporter: "nyan",
            ui: "tdd"
          },
          all: ["test/tests.js"]
        },        
    });

    grunt.loadNpmTasks("grunt-mocha-cli");
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('test', ['mochacli']);
    grunt.registerTask('jenkins', ['concat', 'jshint', 'mochacli', 'yuidoc']);
    grunt.registerTask('default', ['concat', 'jshint', 'mochacli', 'yuidoc']);
};
