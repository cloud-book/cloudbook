var globule = require('globule');
var jsxgettext = require('jsxgettext');
var fs = require('fs');


module.exports = function(cb){

	var paths = ["src/**/*.*js",
				 "src/templates/*.*hbs",
				 "src/**/*.hbs",
				 "!src/node_modules/**/*.js",
				 "!src/js/lib_external/**/*.js",
				 "!src/**/lib_external/**/*.hbs"];



	files = jsxgettext.generateFromHandlebars({mifichero:fichero}).shift();
	files['otro'] = fs.readFileSync('importMetadata.js',{encoding:});

	jsxgettext.generate(files,{});
}