function Util(){}

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

Util.prototype.getObjectFromString = function(namespace) {
        var x = namespace.split('.');
        var auxobj = window;
        for(i=0;i<x.length;i++){
                auxobj = auxobj[x[i]];
        }
        return auxobj;
};

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
Util.prototype.uniqueId = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});
};

Util.prototype.include = function include(path) {
	var script = document.createElement('script');
	script.src = path;
	script.type = "text/javascript";
	document.head.appendChild(script);
};

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