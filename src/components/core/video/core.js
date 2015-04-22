var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');
var mime = require("./"+__module_path__ + 'lib_external/mime');

function VideoBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"videopath":null,"videoformat":"video/mp4", "position" : [200,200], "size":[640,480]};
  objectdata.idtype = metadata['idtype'];
  VideoBox.super_.call(this,objectdata);
  this.videopath = objectdata.videopath;
  this.videoformat = objectdata.videoformat;
}

util.inherits(VideoBox,CBobject);

VideoBox.prototype.editorView = function editorView() {
  var aux = VideoBox.super_.prototype.editorView.call(this);
  var videoelement = $(window.document.createElement('video')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',Project.Info.projectpath + "/rsrc/"+ this.videopath).attr('type',this.videoformat);
  videoelement.css('height','100%');
  videoelement.css('width','100%');
  videoelement.append(source);
  aux.children('.cbcontainer').append(videoelement);
  return aux;
};

VideoBox.prototype.htmlView = function htmlView() {
  var aux = VideoBox.super_.prototype.htmlView.call(this);
  var videoelement = $(window.document.createElement('video')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',Project.Info.projectpath + "/rsrc/"+ this.videopath).attr('type',this.videoformat);
  videoelement.css('height','100%');
  videoelement.css('width','100%');
  videoelement.append(source);
  aux.children('.cbcontainer').append(videoelement);
  return aux;
}

VideoBox.prototype.pdfView = function pdfView() {
  var aux = VideoBox.super_.prototype.pdfView.call(this);
  var videoelement = $(window.document.createElement('video')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',Project.Info.projectpath + "/rsrc/"+ this.videopath).attr('type',this.videoformat);
  videoelement.css('height','100%');
  videoelement.css('width','100%');
  videoelement.append(source);
  aux.children('.cbcontainer').append(videoelement);
  return aux;
}

VideoBox.prototype.editButton = function editButton(e) {
  var dialog = VideoBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.append("<input id='videopath' type='file'/>");
  dialog.callbacks.push(function callbackEditButtonReplaceVideoBox(){
    updateVideoPath(dialog,that);
  })
};


VideoBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='videodialog'><input id='videopath' type='file' accept='.mp4,.ogg,.webm' /><button id='action'>Insert</button></div>");
  dialog.children('#action').click(function(){
    updateVideoPath(dialog,that);
  });
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#videodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

VideoBox.prototype.importHTML = function importHTML(){
  return ['VIDEO'];
}

VideoBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  VideoBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};


function updateVideoPath(dialog,that){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    /*
     * get new file path
     */
    var dialogHTMLRaw = dialog.get()[0];
    var result = dialogHTMLRaw.querySelectorAll('#videopath');
    var originalpath = result[0].value;

    /*
     * Copy file to workspace
     */

    var originalbasename = path.basename(originalpath);
    var finalpath = Project.Info.projectpath +"/rsrc/"+originalbasename;
    while(true){
      try{
        fs.accessSync(finalpath);
        originalbasename = "0"+originalbasename;
        finalpath = Project.Info.projectpath + "/rsrc/"+ originalbasename;
      }
      catch(e){
        break;
      }
    }
    fsextra.copySync(originalpath,finalpath);
    that.videoformat = mime.lookup(finalpath);
    /*
     * update component file
     */
    that.videopath = originalbasename;
}



//VideoBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new VideoBox();
};

exports.restore = function restore(objectdata) {
  return new VideoBox(objectdata);
};
*/

module.exports = VideoBox;
//@ sourceURL=video_core.js