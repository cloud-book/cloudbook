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
  var fsextra = require('fs-extra');
  var pathtosavefile = Project.Info.projectpath + "/pdfextrafiles/"+this.uniqueid + "/";
  var linktopdf = "pdfextrafiles/"+this.uniqueid+"/"+this.videopath;
  var stringtopdf = CBI18n.gettext("Click to view a video");
  /**
   * Create folder to resources and copy inside these
   */
  fsextra.mkdirsSync(pathtosavefile);
  fsextra.copySync(Project.Info.projectpath + "/rsrc/"+ this.videopath,pathtosavefile+this.videopath);
  
  return aux.append("<a href='"+linktopdf+"'>"+stringtopdf+"</a>");  
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
  var dialog = $("<div id='videodialog'><input id='videopath' type='file' accept='.mp4,.ogg,.webm' /><button id='action'>"+ CBI18n.gettext("Insert") +"</button></div>");
  dialog.children('#action').click(function(){
    updateVideoPath(dialog,that);
  });
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#videodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

VideoBox.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;

  var tagTypes = [{'VIDEO':''}, {'OBJECT':['video/mp4', 'video/ogg', 'video/webm']}];

  for(var i=0;i<tagTypes.length;i++){
        var obj = tagTypes[i];
        for(var key in obj){
            if(key == node.tagName){
              score++;
              if(node.hasAttributes() && node.hasAttribute('type'))
                if(node.attributes["type"] != undefined)
                  if(obj[key].indexOf(node.attributes["type"].nodeValue)> -1)
                  score++;
            }
        }
    }

  return score;
}

VideoBox.prototype.importHTML = function importHTML(node, filePath){
    //  var Project = window.Project;
    var path = require('path');
    var type = "";
    try{
      VideoBox.super_.prototype.importHTML.call(this,node);
      if(node.tagName == "VIDEO")
      {
        if (node.innerHTML.indexOf("src=")!=-1)
          videopath = node.innerHTML.split('src="')[1].split(" ")[0].replace('"','');
        if (node.innerHTML.indexOf("type=")!=-1)
        {
          type = node.innerHTML.split('type="')[1].trim().replace(">","").replace('"','');
        }
      }
      if(node.tagName == "OBJECT")
      {
        videopath = node.hasAttribute("data")? node.attributes['data'].nodeValue:"";
        type = node.attributes.getNamedItem("type") != null? node.attributes.getNamedItem("type").value:"";
      }
      var aux = path.basename(this.copyresource(path.join(path.dirname(filePath), videopath)));
      this.videopath = path.basename(aux);

    }
    catch (err) {
      console.log('Errors in Video ' + err);
    }

};
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
