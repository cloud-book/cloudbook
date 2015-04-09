var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function ImageBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"imgpath":null, "position" : [200,200],"size":[100,50]};
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
  aux.append(imgelement);
  return aux;
};

ImageBox.prototype.add_callback = function add_callback(jquerycbo,objectcbo) {
  ImageBox.super_.prototype.add_callback.call(this,jquerycbo,objectcbo);
};

ImageBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='imagedialog'><input id='imgpath' type='file'/><button id='action'>Insert</button></div>");
  dialog.children('#action').click(function(){
    updateImagePath(dialog,that);
  });
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#imagedialog button").on('click',function(){controllerClass.addCBObjectIntoSection(that.editorView(),that);dialog.dialog('close')});
};


ImageBox.prototype.editButton = function editButton(e) {
  var dialog = ImageBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.append("<input id='imgpath' type='file'/>");
  dialog.append("<input id='aspectratio' type='radio'/>");
  dialog.append("<input id='aspectratio' type='radio'/>");
  dialog.append("<input id='aspectratio' type='radio'/>");
  dialog.callbacks.push(function callbackEditButtonReplaceImageBox(){
    updateImagePath(dialog,that);
  })
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