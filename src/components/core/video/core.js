var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function VideoBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"videopath":"/home/kbut/Escritorio/video.ogv", "position" : [200,200]};
  objectdata.idtype = metadata['idtype'];
  VideoBox.super_.call(this,objectdata);
  this.videopath = objectdata.videopath;
}

util.inherits(VideoBox,CBobject);

VideoBox.prototype.editorView = function editorView() {
  var aux = VideoBox.super_.prototype.editorView.call(this);
  var videoelement = $(window.document.createElement('video')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src','/home/kbut/Escritorio/video.ogv').attr('type','video/ogg');
  videoelement.append(source);
  aux.append(videoelement);
  return aux;
};

VideoBox.prototype.importHTML = function importHTML(){
  return ['VIDEO'];
}

VideoBox.prototype.add_callback = function add_callback(jquerycbo,objectcbo) {
  VideoBox.super_.prototype.add_callback.call(this,jquerycbo,objectcbo);
};
//VideoBox.add_callback =  CBobject.add_callback;
/*
exports.add = function add() {
  return new VideoBox();
};

exports.restore = function restore(objectdata) {
  return new VideoBox(objectdata);
};
*/

module.exports = VideoBox;