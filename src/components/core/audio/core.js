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
  var source = $(window.document.createElement('source')).attr('src','file:///'+Project.Info.projectpath + "/rsrc/"+ this.audiopath).attr('type',this.audioformat);
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
  audioelement.append(source);
  aux.children('.cbcontainer').append([audioelement]);
  return aux;
}

AudioBox.prototype.pdfView = function pdfView() {
  var aux = AudioBox.super_.prototype.pdfView.call(this);
  var fsextra = require('fs-extra');
  var pathtosavefile = Project.Info.projectpath + "/pdfextrafiles/"+this.uniqueid + "/";
  var linktopdf = "pdfextrafiles/"+this.uniqueid+"/"+this.audiopath;
  var stringtopdf = CBI18n.gettext("Click to listen a sound");
  /**
   * Create folder to resources and copy inside these
   */
  fsextra.mkdirsSync(pathtosavefile);
  fsextra.copySync(Project.Info.projectpath + "/rsrc/"+ this.audiopath, pathtosavefile+this.audiopath);

  aux.append("<a href='"+linktopdf+"'>"+stringtopdf+"</a>");
  return aux;
}

AudioBox.prototype.epubView = function epubView() {
  var aux = AudioBox.super_.prototype.epubView.call(this);
  var stringtoepub = CBI18n.gettext("Audio component is not compatible with EPUB 2 format");
  aux.append(stringtoepub);
  return aux;
}



AudioBox.prototype.editButton = function editButton(e) {
  var dialog = AudioBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.children(".content").append("<input id='audiopath' type='file'/>");
  dialog.dialog("option","width",356);
  dialog.callbacks.push(function callbackEditButtonReplaceAudioBox(){
    updateAudioPath(dialog,that);
  })
};



AudioBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='audiodialog'><input id='audiopath' type='file' accept='.mp3,.ogg,.wav' /><button id='action'>"+ CBI18n.gettext("Insert") +"</button></div>");
  dialog.children('#action').click(function(){
    updateAudioPath(dialog,that);
  });
  dialog.dialog({
    dialogClass: "cbdialog",
    modal:true,
    width: 356,
    close:function(){$(this).remove()}
  });
  $("#audiodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

AudioBox.prototype.HTMLtags = function HTMLtags(node){

  var score = 0;
  var tagTypes = [{'AUDIO':''}, {'OBJECT':['audio/basic', 'audio/mp3', 'audio/ogg', 'audio/wav']}];

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

AudioBox.prototype.importHTML = function importHTML(node, filePath){
  var fs = require('fs-extra');
  var path = require('path');

  if(node.tagName == "AUDIO")
    node = node.firstElementChild;

    try{

      AudioBox.super_.prototype.importHTML.call(this,node);
      this.audioformat = node.attributes.getNamedItem("type") != null? node.attributes.getNamedItem("type").value:this.audioformat;

      var audiopath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:
      node.attributes.getNamedItem("href") != null?node.attributes.getNamedItem("href").value:"";
      if(node.tagName == "OBJECT")
        audiopath = node.hasAttribute("data")? node.attributes['data'].nodeValue:"";

      var finalpath = this.copyresource(path.join(path.dirname(filePath),audiopath));
      
      this.audiopath = path.basename(finalpath);
    }
    catch (err) {
        console.log('Errors in Audio: ' + err);
    }
}

AudioBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  AudioBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};

AudioBox.prototype.getResourcesFiles = function getResourcesFiles() {
  return [this.audiopath];
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
