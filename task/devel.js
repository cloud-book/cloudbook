var NwBuilder = require('node-webkit-builder');
var ninjaConfig = require('../ninjaConfig.js');
var gutil = require('gulp-util');
var watch = require('watch');
var run = require('../task/run.js');

module.exports = function(cb) {
	process.argv.push("--devel=true");
	var nw = run();
	watch.watchTree(process.cwd()+ '/src', function (f, curr, prev) {
		    if (typeof f == "object" && prev === null && curr === null) {
		      // Finished walking the tree
		    } else if (prev === null) {
		      // f is a new file
		    } else if (curr.nlink === 0) {
		      // f was removed
		    } else {
		      nw.getAppProcess().kill();
		      nw = run();
		    }
	  	});
}