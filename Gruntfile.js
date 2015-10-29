/*global module:false*/
module.exports = function(grunt) {

  // Helper methods
  function sub (str) {
    return str.replace(/%s/g, LIBRARY_NAME);
  }

  function wrapModules (head, tail) {
    return head.concat(MODULE_LIST).concat(tail);
  }

  var LIBRARY_NAME = 'pjs';

  var SRC = [
    'src/**/*.js'
  ];

  var SRC_DEV = SRC;
  var SRC_DIST = SRC;

  // Gets inserted at the top of the generated files in dist/.
  var BANNER = [
      '/*! <%= pkg.name %> - v<%= pkg.version %> - ',
      '<%= grunt.template.today("yyyy-mm-dd") %> - <%= pkg.author %> */\n'
    ].join('');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jscs');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        options: {
          banner: BANNER
        },
        src: SRC_DIST,
        dest: sub('dist/%s.js')
      },
      dev: {
        options: {
          banner: BANNER
        },
        src: SRC_DEV,
        dest: sub('dist/%s.js')
      }
    },
    uglify: {
      dist: {
        files: (function () {
            // Using an IIFE so that the destination property name can be
            // created dynamically with sub().
            var obj = {};
            obj[sub('dist/%s.min.js')] = [sub('dist/%s.js')];
            return obj;
          } ())
      },
      options: {
        banner: BANNER
      }
    },
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: 'test/**/*.tests.js'
      }
    },
    jshint: {
      all_files: [
        'grunt.js',
        'src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
    	src: ['src/**/*.js', 'test/**/*.js'],
	options: {
	    config: '.jscsrc'
	}
    }
  });

  grunt.registerTask('test', [
      'jshint',
      'jscs',
      'jasmine'
    ]);
  grunt.registerTask('build', [
      'concat:dist',
      'uglify:dist',
      'concat:dev'
    ]);
};
