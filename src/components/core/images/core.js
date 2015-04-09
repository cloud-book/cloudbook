var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function ImageBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"imgpath":"./themes/editor/default/img/1.png", "position" : [200,200]};
  objectdata.idtype = metadata['idtype'];
  ImageBox.super_.call(this,objectdata);
  this.imgpath = objectdata.imgpath;
}

util.inherits(ImageBox,CBobject);

ImageBox.prototype.editorView = function editorView() {
  var aux = ImageBox.super_.prototype.editorView.call(this);
  var imgelement = $(window.document.createElement('img')).attr('src', this.imgpath);
  imgelement.css('height','100px');
  imgelement.css('width','auto');
  aux.append(imgelement);
  return aux;
};

ImageBox.prototype.importHTML = function importHTML(){
  return ['IMG', 'FIGURE'];
}

ImageBox.prototype.add_callback = function add_callback(jquerycbo,objectcbo) {
  ImageBox.super_.prototype.add_callback.call(this,jquerycbo,objectcbo);
};

ImageBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='imagedialog'><button>Insertar</button></div>");
  dialog.dialog({modal:true,dialogClass: "no-close",closeOnEscape: false});
  $("#imagedialog button").on('click',function(){controllerClass.addCBIbjectIntoSection(that.editorView(),that);dialog.dialog('close')});
};

//ImageBox.add_callback =  CBobject.add_callback;
/*
exports.add = function add() {
  return new ImageBox();
};

exports.restore = function restore(objectdata) {
  return new ImageBox(objectdata);
};
*/
module.exports = ImageBox;