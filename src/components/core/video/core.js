var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function VideoBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"videopath":"/home/kbut/Escritorio/video.ogv", "position" : [200,200], "size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  VideoBox.super_.call(this,objectdata);
  this.videopath = objectdata.videopath;
}

util.inherits(VideoBox,CBobject);

VideoBox.prototype.editorView = function editorView() {
  var aux = VideoBox.super_.prototype.editorView.call(this);
  var videoelement = $(window.document.createElement('video')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',Project.Info.projectpath + "/rsrc/"+ this.videopath).attr('type','video/mp4');
  videoelement.css('height','100%');
  videoelement.css('width','100%');
  videoelement.append(source);
  aux.children('.cbcontainer').append(videoelement);
  return aux;
};

VideoBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='videodialog'><input id='videopath' type='file'/><button id='action'>Insert</button></div>");
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