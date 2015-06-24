var NwBuilder = require('node-webkit-builder');
var ninjaConfig = require('../ninjaConfig.js');
var gutil = require('gulp-util');

module.exports = function(cb) {

	if(process.argv.indexOf("--devel=true") >=0 ){
		ninjaConfig.argv.push('--devel=true');
	}
	if (!ninjaConfig.debug)
		ninjaConfig.argv.push('--debug=true');

	ninjaConfig.argv.push('--remote-debugging-port=9222');
	var nw = new NwBuilder(ninjaConfig);

	nw.on('log', gutil.log);
	nw.on('stdout',console.log);
	nw.on('stderr',function(b){
		console.log(b.toString('utf8'));
	});
	nw.run(cb);
	return nw;

}
