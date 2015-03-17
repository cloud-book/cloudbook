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
      },
      nodewebkit: {
        options: {
            version:"0.11.6",
            platforms: ['linux32','linux64'],
            buildDir: './webkitbuilds', // Where the build version of my node-webkit app is saved
        },
        src: ['./src/**/*'] // Your node-webkit app
      },
  });

  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-jsxgettext');
  grunt.loadNpmTasks('grunt-po2json');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  // Default task(s).
  grunt.registerTask('default', ['jsdoc']);
  grunt.registerTask('xgettext', ['jsxgettext']);
  grunt.registerTask('po', ['po2json']);
  grunt.registerTask('production', ['jsdoc','po2json']);
  grunt.registerTask('build', ['nodewebkit']);

};
