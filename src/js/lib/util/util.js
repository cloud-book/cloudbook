/**
 * Common utilities to develop classes
 * @class Util
 */
function Util(){}

/**
 * Create global namespace. This namespace is available how goblal variable on window object.
 * If parents of base namespace not exists, it's created.
 * @param  {String} nameSpaceString full namespace
 */
Util.prototype.createNameSpace = function createNameSpace(nameSpaceString) {
	var names = nameSpaceString.split("."),
	parent = window,
	imax = names.length,
	i;
	//if any nameSpace level doesn't exist, create it
	for (i = 0; i < imax; i++) {
		if (!parent[names[i]]) {
			parent[names[i]] = {};
		}
		parent = parent[names[i]];
	}
};

/**
 * Return only folders from path. This can be relative or absolute path.
 * @param  {String} directorypath folder string
 * @return {String[]}               Names of folders
 */
Util.prototype.readOnlyDirectories = function readOnlyDirectories(directorypath) {
	var fs = require('fs');
	var path = require('path');
	var listfiles = fs.readdirSync(directorypath);
	var listfolders = [];
	listfiles.forEach(function (filename){
		var relativepath = path.join(directorypath,filename);
		if(fs.statSync(relativepath).isDirectory()){
			listfolders.push(filename);
		}
	});
	return listfolders;
};

Util.prototype.readdirRecursively = function readdirRecursively(orig) {
	return _readdirRecursively(orig);
};

function _readdirRecursively(orig){
	var listfiles = [];
    var finallist = [];
    var path = require('path');
    var fs = require('fs');
    listfiles = fs.readdirSync(orig).map(function(file){ return path.join(orig,file)});
    listfiles.forEach(function(file){
            var stat = fs.statSync(file);
            if (stat.isDirectory()){
                    finallist = finallist.concat(_readdirRecursively(file));
            }
            finallist.push(file);
    });
    return finallist;
}



/**
 * Get object from namespace by string
 * @param  {String} namespace String namespace 
 * @return {Object}           object 
 */
Util.prototype.getObjectFromString = function(namespace) {
        var x = namespace.split('.');
        var auxobj = window;
        for(i=0;i<x.length;i++){
                auxobj = auxobj[x[i]];
        }
        return auxobj;
};

/**
 * Simulate inheritance how other languages
 * @param  {Object} ctor      class 
 * @param  {Object} superCtor Class to extend
 */
Util.prototype.inherits = function inherits(ctor, superCtor) {
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
 * Work how require nodejs function. Get file and create object with content, but only that exported by module.exports or exports variable
 * @example <caption>mymodule.js</caption>
 * function foo(a,b){ return a + b}
 * function bar(a,b){ return a - b}
 * module.exports = { publicfunction : foo }
 * @example <caption>main.js</caption>
 * var util = new Util();
 * var mymodule = util.req('mymodule.js');
 * mymodule.publicfunction(1,2);
 * // return 3
 * @param  {String} filepath file module path 
 * @return {Object}          module export object
 */
Util.prototype.req = function req(filepath){
	var fs = require('fs');
	var path = require('path');
	var _mod = {};
	var __module_path__ = path.dirname(filepath) + "/";
	_mod.exports = {};
	miclase = fs.readFileSync(filepath,'utf-8');
	var _function_require = new Function('module','exports','__module_path__',miclase);
	_function_require(_mod,_mod.exports,__module_path__);
	return _mod.exports;
}
/**
 * Generate unique id with numbers and letters.
 * @return {String} UID
 */
Util.prototype.uniqueId = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});
};

/**
 * Is similar to req function, but this create node script and append into head document
 * @param  {'String'} path path script
 */
Util.prototype.include = function include(path) {
	var script = document.createElement('script');
	script.src = path;
	script.type = "text/javascript";
	document.head.appendChild(script);
};


/**
 * With this function apply singleton pattern. Get library by argument and return object that 
 * only has a function (getInstance). This function return instance class and if not exists create it.
 * @param  {Object} Library Module class
 * @return {Object}         Cbject class with getInstance function.
 */
Util.prototype.singleton = function singleton(Library) {
	var instance;
	function createInstance(){
		var object = new Library();
		return object;
	}
	return {getInstance: function(){
		if(!instance){
			instance = createInstance();
		}
		return instance;
	}};
};