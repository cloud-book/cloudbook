var spawn = require('child_process').spawn;
var gulputil = require('gulp-util');

module.exports = function(cb){
	var child = spawn('node_modules/.bin/jsdoc',['src','-c','conf.json']);

	child.stdout.on('data',function(chunk){
		gulputil.log(chunk);
	})
;}