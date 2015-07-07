/*
	this config file is used to configure the nw-ninja envelope, not the app itself
*/
var rc = require('rc')

module.exports = rc('cloudbook-dev', {
	appDir: './src',
	files: './src/**/**', // use the glob format
    platforms: [ 'linux32','linux64'],
    buildDir: './webkitbuilds',
    buildType: 'default',
    version: 'v0.12.0',
    argv: process.argv.slice(2)
})
