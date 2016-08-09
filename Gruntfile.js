module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          hostname: 'localhost',
          livereload: true,
          open: false
        }
      }
    },

    watch: {
      handlebars: {
        files: ['src/templates/**/*.hbs', 'src/templates/**/*.json', 'src/templates/layout.html '],
        tasks: 'handlebarslayouts'
      },
      sass: {
        files: ['src/styles/**/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['js']
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['build']
      },
      options: {
        livereload: true,
      }
    },

    handlebarslayouts: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/templates/',
          src: ['**/*.hbs', '!partials/*'],
          dest: 'dist/',
          ext: '.html',
        }],
        options: {
          partials: ['src/templates/partials/*.hbs', 'src/templates/layout.html'],
          basePath: 'src/templates/',
          modules: ['src/templates/helpers/helpers-*.js']
        }
      }
    },

    sass: {
      // All options for compression: nested, expanded, compact, compressed
      compressed: {
        options: {
          style: 'compressed',
          noCache: true
        },
        files: {
          'dist/assets/css/main.min.css': ['src/styles/main.scss']
        }
      },
      expanded: {
        options: {
          style: 'expanded',
          noCache: true
        },
        files: {
          'dist/assets/css/main.css': ['src/styles/main.scss']
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['> 1%']
          }),
        ]
      },
      dist: {
        src: 'dist/assets/css/main.min.css'
      }
    },

    jshint: {
      files: ['src/js/main.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    concat: {
      options: {
        separator: ';\n\n',
      },
      dist: {
        files: {
          'dist/assets/js/main.js': ['src/js/vendor/jquery.min.js', 'src/js/main.js']
        },
      },
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/main.min.js': ['dist/assets/js/main.js']
        }
      }
    },

    clean: {
      dist: {
        src: ['dist/']
      },
      temp: {
        src: ['temp/']
      }
    },

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: 'src/public/',
          src: ['**'],
          dest: 'dist/'
        }]
      }
    },

    // xml_sitemap: {
    //   custom_options: {
    //     options: {
    //       siteRoot: 'http://www.praktijkcentrumlochristi.be/',
    //       changefreq: 'weekly',
    //       priority: '0.8',
    //       dest: 'dist/'
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: 'dist/',
    //       src: ['**/*.html', '!**/google2dbd407974c11f6a.html'],
    //       dest: 'dist/sitemap.xml'
    //     }]
    //   }
    // },
    //
    // sitemap_xml: {
    //   options: {
    //     siteRoot: 'http://www.praktijkcentrumlochristi.be/',
    //     changefreq: 'weekly',
    //     priority: '0.8',
    //     dest: 'dist/'
    //   },
    //   files: [{
    //     cwd: 'dist/',
    //     src: '{,**/}*.html',
    //     dest: 'dist/sitemap.xml'
    //   }]
    // }

  });

  // load tasks
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-handlebars-layouts");
  grunt.loadNpmTasks('grunt-html-prettyprinter');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-sitemap-xml');
  // grunt.loadNpmTasks('grunt-xml-sitemap');

  // commands
  grunt.registerTask('default', ['build', 'serve']);
  grunt.registerTask('js', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('build', ['clean:dist', 'copy', 'handlebarslayouts', 'sass', 'postcss', 'js', 'clean:temp']);

};
