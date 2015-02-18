/**
 * pure javascript alternative to create inheritance
 * @param  {Object} ctor      Child constructor
 * @param  {Object} superCtor Parent object
 */
function inherits(ctor, superCtor) { // took this right from requrie('util').inherits
  ctor.super_ = superCtor;
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};


/**
 * Myrequire is a function to load modules from path. 
 * Differ with Nodejs require function on myrequire function create javascript library with window context. 
 * This is usefull to use browser javascript libraries.
 * Class / modules imported with this function must export with object mod.exports
 * @example 
 * funtion foo(){
 * 	console.log('foo');
 * }
 * mod.exports = foo;
 * @param  {String} filepath relative path to module
 * @return {Object}          Object with library loaded
 */
function myrequire(filepath){
	var fs = require('fs');
	var _mod = {};
	miclase = fs.readFileSync(filepath,'utf-8');
	var _function_require = new Function('mod',miclase);
	_function_require(_mod);
	return _mod.exports;
}