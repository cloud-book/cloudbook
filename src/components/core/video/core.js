var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');
var mime = require("./"+__module_path__ + 'lib_external/mime');

function VideoBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"videopath":null,"videoformat":"video/mp4", "position" : [200,200], "size":[250,100]};
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

VideoBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='videodialog'><input id='videopath' type='file' accept='.mp4,.ogg,.webm' /><button id='action'>Insert</button></div>");
  dialog.children('#action').click(function(){
    updateVideoPath(dialog,that);
  });
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#videodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

VideoBox.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;
  var tagTypes = {tags: ['VIDEO']};
  
  if(tagTypes.tags.indexOf(node.tagName) > -1) score ++;

  return score;

  //return ['VIDEO'];
}

VideoBox.prototype.importHTML = function importHTML(node, filePath){

//  var Project = window.Project;
  var fs = require('fs-extra');
  var path = require('path');

     try{
      
       if (node.innerHTML.indexOf("src=")!=-1){
        videopath = node.innerHTML.split('src="')[1].split(" ")[0].replace('"','');

        var basename = path.basename(videopath);
        var sourcePath = path.join(Project.Info.projectpath, "/rsrc/", basename);

        while(true){
          if(!fs.existsSync(sourcePath)){
              break;
          }
          basename = 0 + basename;
          sourcePath = path.join(Project.Info.projectpath, "/rsrc/", basename);
        }
        fs.copySync(path.join(path.dirname(filePath), videopath),sourcePath);
        var width = node.clientWidth;
        var height = node.clientHeight;
        var left = node.offsetLeft;
        var top = node.offsetTop;
        this.position = [left, top];
        this.videopath = basename;
        if(width != 0 && height != 0)
          this.size = [width,height];
        else
        {
          if(node.hasAttributes())
          {
            if(node.attributes['width'] != undefined) 
              width = node.attributes['width'].nodeValue;
            if(node.attributes['height'] != undefined)
              height = node.attributes['height'].nodeValue;   
            if(width != 0 && height != 0)
              this.size = [width,height];
          }
        }
      }
    }
    catch (err) {
        console.log('Errors in Video');
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