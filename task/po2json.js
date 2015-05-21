var globule = require('globule');
var fs = require('fs');
var path = require('path');
var po2json = require('po2json');
var ninjaConfig = require('../ninjaConfig.js');

module.exports = function(cb){
	
	var allfiles = [],
		src = ['./po/**/*.po']
		dest = ninjaConfig.appDir + '/i18n/';

	allfiles = globule.find(src);
	allfiles.forEach(function(filepath){
		destpath = path.basename(filepath).slice(0,- 3) + ".js";
		var result = po2json.parseFileSync(filepath,{format:"jed1.x",pretty:false,stringify:true,"fallback-to-msgid":true});
		fs.writeFileSync(dest + destpath,"module.exports = " + result + ";",{encoding:'utf8'});
	});
}