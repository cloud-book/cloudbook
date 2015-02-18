module.exports = function(grunt) {

  grunt.initConfig({
      jsdoc : {
          dist : {
              src: ['src/**/*.js'], 
              options: {

                  configure: "conf.json",
		  destination: "src/doc/"
              }
          }
      }
  });

  grunt.loadNpmTasks('grunt-jsdoc');

  // Default task(s).
  grunt.registerTask('default', ['jsdoc']);

};
