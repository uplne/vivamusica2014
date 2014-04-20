/**
 * Vivamusica GruntFile
 * @version 0.0.1
 */
module.exports = function(grunt) {

    // load all grunt tasks
    require('matchdep').filterDev(['grunt-*', '!grunt-cli']).forEach(grunt.loadNpmTasks);

    grunt.initConfig({

        /**
        * Read package.json
        */
        pkg: grunt.file.readJSON('package.json'),

        /**
        * Set banner
        */
        banner: '/**\n' +
        '<%= pkg.title %> - <%= pkg.version %>\n' +
        '<%= pkg.homepage %>\n' +
        'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
        'License: Enjoy. Live long and prosper.\n' +
        '*/\n',

        dir: {
            js: 'static/js',
            css: 'static/css',
            sass: 'static/sass',
            img: 'static/images',
            views: 'static/views'
        },

        /**
        * Compress .jpg/.png
        * @github.com/gruntjs/grunt-contrib-imagemin
        */
        imagemin: {
          dist: {
            options: {
                optimizationLevel: 3,
                progressive: true
            },
            files: [{
              expand: true, // Enable dynamic expansion.
              cwd: '<%= dir.img %>/', // Src matches are relative to this path.
              src: '{,*/}*.{png,jpg,jpeg}', // Actual pattern(s) to match.
              dest: '<%= dir.img %>/' // Destination path prefix.
            }]
          }
        },

        /**
        * JSHint
        * @github.com/gruntjs/grunt-contrib-jshint
        */
        jshint: {
            all: [
                '<%= dir.js %>/server/*.js',
                'Grunfile.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        /**
        * Concatenate
        * @github.com/gruntjs/grunt-contrib-concat
        */
        concat: {
            options: {
                stripBanners: true,
                banner: '<%= banner %>'
            },

            js: {
                rc: '<%= jshint.files %>',
                dest: '<%= dir.js %>/<%= pkg.name %>.js'
            },
        },

        // Server side unit tests
        mochacli: {
            options: {
                ui: "tdd",
                reporter: "spec",
                timeout: "15000"
            },

            unit: {
                src: ["tests/unit/**/*.js"]
            }
        },

        // Client tests with requirejs
        mocha_phantomjs: {
            all: ['tests/client/**/*.html']
        },

        /**
         * Compile SASS
         */
        sass: {
            dev: {
                options: {
                    style: 'expanded',
                    trace: true,
                    sourcemap: true,
                    debugInfo: true
                },
                expand: true,
                cwd: '<%= dir.sass %>/',
                src: ['*.scss', '!_*.scss'],
                dest: '<%= dir.css %>',
                ext: '.css'
            },
            build: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                expand: true,
                cwd: '<%= dir.sass %>/',
                src: ['*.scss', '!_*.scss'],
                dest: '<%= dir.css %>',
                ext: '.css'
            }
        },

        /**
        * Minify
        * @github.com/gruntjs/grunt-contrib-uglify
        */
        uglify: {
            // Uglify options
            options: {
                banner: '<%= banner %>'
            },

            // Minify js files in static/js/
            dist: {
                src: ['<%= concat.js.dest %>'],
                dest: '<%= dir.js %>/<%= pkg.name %>.min.js'
            },
        },

        autoprefixer: {
            dev: {
                options: {
                    browsers: ['last 2 versions', 'ie 8', 'ie 9']
                },
                expand: true,
                flatten: true,
                src: '<%= dir.css %>/*.css',
                dest: '<%= dir.css %>/'
            }
        },

        // The watch command watches a given set of files and runs a task when one of them changes.
        watch: {
            //Automatic compilation of SASS changes
            sass: {
                files: ['<%= dir.sass %>/**/*.scss'],
                tasks: ['sass:dev', 'notify:sass']
            },

            // Add vendor prefixes
            prefix: {
                files: ['<%= dir.sass %>/**/*.scss'],
                tasks: ['autoprefixer:dev', 'notify:prefix'],
                options: {
                    livereload: true
                }
            },

            server: {
                files: ['.rebooted'],
                options: {
                    livereload: true
                }
            },

            /**
             * If any system files changes reload browser.
             * Requires webkit browser extension.
             */
            livereload: {
                files: [
                    '<%= dir.img %>/*.{png,jpg,gif,svg}',
                    '<%= dir.js %>/**/*.js',
                    '<%= dir.views %>/**/*.hbs'
                ],
                options: {
                    livereload: true
                }
            }
        },

        /**
        * Nodemon
        * @github.com/ChrisWren/grunt-nodemon
        */
        nodemon: {
            dev: {
                script: 'index.js',
                options: {
                    nodeArgs: ['--debug'],
                    env: {
                        PORT: '1985'
                    },
                    // omit this property if you aren't serving HTML files and
                    // don't want to open a browser tab on start
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // refreshes browser when server reboots
                        nodemon.on('restart', function () {
                            // Delay before server listens on port
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });

                        /*setTimeout(function() {
                            require('grunt-open')('http://localhost:1955');
                        }, 1000);*/
                    }
                }
            }
        },

        open: {
            dev: {
              path: 'http://localhost:1985',
              app: 'Google Chrome'
            }
        },

        // In order to run the Karma watcher and the SASS watchers concurrently, we need to run this task
        concurrent: {
            dev: {
                tasks: ['watch', 'nodemon'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },

        notify: {
            dev: {
                options: {
                    message: "Dev changes complete."
                }
            },

            build: {
                options: {
                    message: "Build complete."
                }
            },

            sass: {
                options: {
                    message: "SASS compiled."
                }
            },

            prefix: {
                options: {
                    message: "Autoprefixer finished."
                }
            }
        }
    });

    grunt.registerTask('test-server', 'Run unit tests - mocha', [
        'mochacli:unit'
    ]);

    grunt.registerTask('test-client', ['mocha_phantomjs']);

    grunt.registerTask('dev', [
        'concurrent:dev',
        'notify:dev'
    ]);

    grunt.registerTask('prefix', ['autoprefixer:dev']);

    grunt.registerTask('build', [
        'jshint',
        'concat:js',
        'uglify',
        'sass:build',
        'imagemin',
        'notify:build'
    ]);
};
