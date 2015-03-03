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
      },
      jsxgettext:{
          test:{
            files : [{src:["src/**/*.*js","!src/node_modules/**/*.js"],dest:'./po/cloudbook.pot'}]
          }
      },
      po2json:{
        options:{
          format: 'jed1.x',
          nodeJs: true
        },
        all:{
          src:['./po/**/*.po'],
          dest:'src/i18n/'
        }
      }
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-jsxgettext');
  grunt.loadNpmTasks('grunt-po2json');

  // Default task(s).
  grunt.registerTask('default', ['jsdoc']);
  grunt.registerTask('xgettext', ['jsxgettext']);
  grunt.registerTask('po', ['po2json']);
  grunt.registerTask('production', ['jsdoc','po2json']);

};
