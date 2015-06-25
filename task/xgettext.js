var globule = require('globule'),
	jsxgettext = require('jsxgettext'),
	fs = require('fs'),
	_ = require('lodash'),
	path = require('path'),
	fileswithcontent = {};



function process_files(filepath){
	var generators = {
		'.ejs': jsxgettext.generateFromEJS,
		'.hbs': jsxgettext.generateFromHandlebars
		},
		ext = path.extname(filepath),
		content = "";

	content = fs.readFileSync(filepath,{encoding:'utf8'});

	if (ext !== '.js'){
		var args = {};
		args[filepath] = content;
		fileswithcontent = _.assign(fileswithcontent,generators[ext](args,{}).shift());
		return;
	}
	fileswithcontent[filepath] = content;
}



module.exports = function(cb){

	var paths = ["src/**/*.*js",
				 "src/templates/*.*hbs",
				 "src/**/*.hbs",
				 "!src/node_modules/**/*",
				 "!src/js/lib_external/**/*.js",
				 "!src/**/lib_external/**/*.hbs"],
		allpathfiles = [],
		dest = "po/cloudbook.pot";


	allpathfiles = globule.find(paths);
	allpathfiles.forEach(process_files);
	fs.writeFileSync(dest,jsxgettext.generate(fileswithcontent,{}),{encoding:'utf8'});
}
