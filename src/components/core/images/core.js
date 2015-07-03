var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function ImageBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"imgpath":null, "position" : [200,200],"size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  ImageBox.super_.call(this,objectdata);
  this.imgpath = objectdata.imgpath;
}

util.inherits(ImageBox,CBobject);

ImageBox.prototype.editorView = function editorView() {
  var aux = ImageBox.super_.prototype.editorView.call(this);
  var imagepath = this.imgpath !== null ? Project.Info.projectpath + "/rsrc/"+ this.imgpath : __module_path__ + "default.png";
  var imgelement = $(window.document.createElement('img')).attr('src', imagepath);
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
};

ImageBox.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;
  var tagTypes = [{'IMG':''}, {'FIGURE':''}, {'OBJECT':['image/gif', 'image/jpeg', 'image/png', 'image/tiff']}];
  
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

ImageBox.prototype.importHTML = function importHTML(node, filePath){
//  var Project = window.Project;
  var fs = require('fs-extra');
  var path = require('path');

    if(node.tagName == "FIGURE")
      node = node.firstElementChild;

    try{
      
      var imgpath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:"";
      if(node.tagName == "OBJECT")
        imgpath = node.hasAttribute("data")? node.attributes['data'].nodeValue:"";
      ImageBox.super_.prototype.importHTML.call(this,node);

      var aux = this.copyresource(path.join(path.dirname(filePath),imgpath));
      this.imgpath = path.basename(aux);
    }
    catch (err) {
        console.log('Errors in Image' + err);
    }
  }

ImageBox.prototype.htmlView = function htmlView() {
  var aux = ImageBox.super_.prototype.htmlView.call(this);
//  var imagepath = this.imgpath !== null ? "rsrc/"+ this.imgpath : __module_path__ + "default.png";
  var imagepath = this.imgpath !== null ? this.imgpath : __module_path__ + "default.png";
  var imgelement = $(window.document.createElement('img')).attr('src', 'rsrc/'+imagepath);
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
}

ImageBox.prototype.pdfView = function pdfView() {
  var aux = ImageBox.super_.prototype.pdfView.call(this);
  var imagepath = this.imgpath !== null ? "rsrc/"+ this.imgpath : __module_path__ + "default.png";
  var imgelement = $(window.document.createElement('img')).attr('src', imagepath);
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
}

ImageBox.prototype.epubView = function epubView() {
  var aux = ImageBox.super_.prototype.epubView.call(this);
  var projectpath=Project.Info.projectpath;
  var imagepath = this.imgpath !== null ? "file://"+projectpath + "/rsrc/"+ this.imgpath : __module_path__ + "default.png";
  var imgelement = $(window.document.createElement('img')).attr('src', imagepath);
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
}

ImageBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  ImageBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};

ImageBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='imagedialog'><input id='imgpath' type='file'/><button id='action'>" + CBI18n.gettext("Insert") +"</button></div>");
  dialog.children('#action').click(function(){
    updateImagePath(dialog,that);
  });
  dialog.dialog({dialogClass: "cbdialog",
    width: 356,
    modal:true,close:function(){$(this).remove()}});
  $("#imagedialog button").on('click',function(){that.calculateDimensions(that);controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};
ImageBox.prototype.calculateDimensions = function calculateDimensions(that) {
  var sizeOf = require('image-size');
  var dim = sizeOf(Project.Info.projectpath+'/rsrc/'+that.imgpath);
  var newsize=(dim.height*this.size[0])/dim.width;
  this.size=[this.size[0],newsize];
};
ImageBox.prototype.editButton = function editButton(e) {
  var dialog = ImageBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.children(".content").append("<input id='imgpath' type='file'/>");
  dialog.dialog("option","width",356);
  dialog.callbacks.push(function callbackEditButtonReplaceImageBox(){
    updateImagePath(dialog,that);
  })
};

ImageBox.prototype.getResourcesFiles = function getResourcesFiles() {
  return [this.imgpath];
};

function updateImagePath(dialog,that){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    /*
     * get new file path
     */
    var dialogHTMLRaw = dialog.get()[0];
    var result = dialogHTMLRaw.querySelectorAll('#imgpath');
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
    that.imgpath = originalbasename;
}


//ImageBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new ImageBox();
};

exports.restore = function restore(objectdata) {
  return new ImageBox(objectdata);
};
*/
module.exports = ImageBox;
//@ sourceURL=images_core.js
