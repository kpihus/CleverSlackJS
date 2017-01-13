var grunt = require('grunt');
require('load-grunt-tasks')(grunt);

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');

grunt.initConfig({
  babel: {
    options: {
      sourceMaps: true
    },
    dist: {
      files: [{
        "expand": true,
        "cwd": "src/",
        "src": ["**/*.js"],
        "dest": "dist/"
      }]
    }
  },
  copy: {
    main: {
      files: [{expand: true, cwd: 'src/', src: ['**/*.json', '**/*.html','.env'], dest: 'dist/'}],
    }
  },
  clean: ['./dist'],
  watch: {
    scripts: {
      files: ['src/**/*'],
      tasks: ['copy', 'babel'],
      options: {
        spawn: false
      }
    }
  }
});


grunt.registerTask('build', ['clean', 'babel', 'copy']);
grunt.registerTask('default', ['build', 'watch']);