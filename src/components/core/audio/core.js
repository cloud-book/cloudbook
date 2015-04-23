var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');
var mime = require("./"+__module_path__ + 'lib_external/mime');

function AudioBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"audiopath":null,"audioformat":"audio/mpeg", "position" : [200,200], "size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  AudioBox.super_.call(this,objectdata);
  this.audiopath = objectdata.audiopath;
  this.audioformat = objectdata.audioformat;
}

util.inherits(AudioBox,CBobject);

AudioBox.prototype.editorView = function editorView() {
  var aux = AudioBox.super_.prototype.editorView.call(this);
  var audioelement = $(window.document.createElement('audio')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',Project.Info.projectpath + "/rsrc/"+ this.audiopath).attr('type',this.audioformat);
  audioelement.css('height','100%');
  audioelement.css('width','100%');
  audioelement.append(source);
  aux.children('.cbcontainer').append([audioelement]);
  return aux;
};

AudioBox.prototype.htmlView = function htmlView() {
  var aux = AudioBox.super_.prototype.htmlView.call(this);
  var audioelement = $(window.document.createElement('audio')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',"rsrc/"+ this.audiopath).attr('type',this.audioformat);
  audioelement.css('height','100%');
  audioelement.css('width','100%');
  audioelement.append(source);
  aux.children('.cbcontainer').append([audioelement]);
  return aux;
}

AudioBox.prototype.pdfView = function pdfView() {
  return "";
}

AudioBox.prototype.editButton = function editButton(e) {
  var dialog = AudioBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.append("<input id='audiopath' type='file'/>");
  dialog.callbacks.push(function callbackEditButtonReplaceAudioBox(){
    updateAudioPath(dialog,that);
  })
};



AudioBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='audiodialog'><input id='audiopath' type='file' accept='.mp3,.ogg,.wav' /><button id='action'>Insert</button></div>");
  dialog.children('#action').click(function(){
    updateAudioPath(dialog,that);
  });
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#audiodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

AudioBox.prototype.importHTML = function importHTML(){
  return ['AUDIO'];
}

AudioBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  AudioBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};


function updateAudioPath(dialog,that){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    /*
     * get new file path
     */
    var dialogHTMLRaw = dialog.get()[0];
    var result = dialogHTMLRaw.querySelectorAll('#audiopath');
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
    that.audioformat = mime.lookup(finalpath);
    /*
     * update component file
     */
    that.audiopath = originalbasename;
}



//AudioBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new AudioBox();
};

exports.restore = function restore(objectdata) {
  return new AudioBox(objectdata);
};
*/

module.exports = AudioBox;
//@ sourceURL=audio_core.js