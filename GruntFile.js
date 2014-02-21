/**
 * Vivamusica GruntFile
 * @version 0.0.1
 */

var javascriptModules = 'static/js/*.js';

module.exports = function(grunt) {
    grunt.initConfig({

        // Lint Javascript files to check for style guide violations
        jshint: {
            config: {
                'jshintrc': true
            },
            modules: [
                javascriptModules
            ]
        },

        // Define Karma test runner configuration
        karma: {
            // Run unit test automation
            unit: {
                configFile: 'karma.conf.js',
                autoRun: true
            }
        },

        /**
         * The SASS command contains two configuration sets - one for the themes subfolder, and one for the main
         * stylesheets.
         *
         * noCache is set to true for both due to a bug: https://github.com/gruntjs/grunt-contrib-sass/issues/63
         * When this bug is fixed, we should remove this option
         */
        sass: {
            main:{
                options:{
                    style: 'compressed',
                    noCache: true                 // Currently required due to Github issue 63
                },
                expand: true,
                cwd: 'static/sass/',
                src: ['*.scss', '!_*.scss'],
                dest: 'static/css',
                ext: '.css'
            }
        },

        // The watch command watches a given set of files and runs a task when one of them changes.
        watch: {
            //Automatic compilation of SASS changes
            sass: {
                files: ['static/sass/**/*.scss'],
                tasks: ['sass:main','notify'],
                options: {
                    // TODO - automatically disable on production
                    livereload: true
                }
            },
            livereload: {
                files: [
                    //'static/{,*/}*.{css,js,png,jpg,gif,svg}'
                    'static/js/**/*.js',
                    'static/views/**/*.hbs'
                ],
                options: {
                    livereload: true
                }
            }
        },

        // In order to run the Karma watcher and the SASS watchers concurrently, we need to run this task
        concurrent: {
            dev: {
                options: {
                    logConcurrentOutput: true
                },
                tasks: ['watch', 'karma:unit']
            }
        },

        notify: {
            watch: {
                options: {
                    message: "SASS finished."
                }
            }
        }
    });

    /**
     * Load all NPM tasks
     */
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-notify');

    /**
     * Run full suite of unit tests via browserset
     * @description usage: grunt test-browser
     * @see karma.conf.js - browsers
     */
    grunt.registerTask("test-browser", ["karma:unit"]);

    /**
     * Compile main site SCSS & Themes
     *
     * @description usage: grunt compile-sass
     */
    grunt.registerTask('compile-sass', ['sass:main']);

    /**
     * Run the Karma continuous browser test & sass watcher
     *
     * @description usage: grunt watcher
     */
    grunt.registerTask('watcher', ['concurrent:dev']);

    /**
     * Lint recently changed files. This is not yet included in the main 'watcher' command.
     *
     * @description usage: grunt lint
     */
    grunt.registerTask('lint', ['newer:jshint:modules']);
};
