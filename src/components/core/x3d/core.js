var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function x3d(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"modelpath":null, "position" : [200,200],"size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  x3d.super_.call(this,objectdata);
  this.modelpath = objectdata.modelpath;
}

util.inherits(x3d,CBobject);

x3d.prototype.editorView = function editorView() {
  var aux = x3d.super_.prototype.editorView.call(this);
  var modelpath = this.modelpath !== null ? Project.Info.projectpath + "/rsrc/"+ this.modelpath : __module_path__ + "box.x3d";
  
  //Project.Info.projectpath + "/rsrc/"+ this.modelpath
  
    //var inlineurl = $(window.document.createElement('Inline')).attr('url', 'rsrc/'+modelpath).attr('solid', 'false');
    
    // Mirar en: http://x3dom.org/docs-old/components/index.html
    // http://x3dom.org/docs-old/components/index.html
    
    
    
    
    /*var inlineurl = $(window.document.createElement('Inline')).attr('url', '/tmp/scene.x3d');
    console.log(inlineurl);
    var viewpoint = $(window.document.createElement('viewpoint')).attr('position', '1.11255 0.30231 1.39884').attr('orientation','-0.27505 0.95696 0.09264 0.55979');
    var scene= $(window.document.createElement('scene')).attr('id', 'scene');
    var x3delement = $(window.document.createElement('x3d')).attr('id', 'x3d');
    
    $(scene).append(viewpoint);
    $(scene).append(inlineurl);
    $(x3delement).append(scene);
    
    $(x3delement).css("width", "500").css("height", "500");
    
    // Provant posar-lo a pel
    $("#targetcontent").append(x3delement);
  
  //aux.children('.cbcontainer').append(x3delement);
  return aux;*/
    
    
  
    var inlineurl = $(window.document.createElement('Inline')).attr('url', '/tmp/scene.x3d');
    console.log(inlineurl);
    var viewpoint = $(window.document.createElement('viewpoint')).attr('position', '1.11255 0.30231 1.39884').attr('orientation','-0.27505 0.95696 0.09264 0.55979');
    var scene= $(window.document.createElement('scene')).attr('id', 'scene');
    var x3delement = $(window.document.createElement('x3d')).attr('id', 'x3d');
    
    $(scene).append(viewpoint);
    $(scene).append(inlineurl);

    $(x3delement).css("width", "500").css("height", "500")

    $(x3delement).append(scene);

    $("#targetcontent").append(x3delement);
  
  
  
};

x3d.prototype.HTMLtags = function HTMLtags(node){
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

x3d.prototype.importHTML = function importHTML(node, filePath){
//  var Project = window.Project;
  var fs = require('fs-extra');
  var path = require('path');

    if(node.tagName == "FIGURE")
      node = node.firstElementChild;

    try{
      
      var modelpath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:"";
      if(node.tagName == "OBJECT")
        modelpath = node.hasAttribute("data")? node.attributes['data'].nodeValue:"";
      x3d.super_.prototype.importHTML.call(this,node);

      var aux = this.copyresource(path.join(path.dirname(filePath),modelpath));
      this.modelpath = path.basename(aux);
    }
    catch (err) {
        console.log('Errors in Image' + err);
    }
  }

x3d.prototype.htmlView = function htmlView() {
  /*var aux = x3d.super_.prototype.htmlView.call(this);
//  var imagepath = this.modelpath !== null ? "rsrc/"+ this.modelpath : __module_path__ + "default.png";
  var imagepath = this.modelpath !== null ? this.modelpath : __module_path__ + "default.png";
  var imgelement = $(window.document.createElement('img')).attr('src', 'rsrc/'+imagepath);
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;*/
}

x3d.prototype.pdfView = function pdfView() {
  var aux = x3d.super_.prototype.pdfView.call(this);
  var imagepath = this.modelpath !== null ? "rsrc/"+ this.modelpath : __module_path__ + "default.png";
  var imgelement = $(window.document.createElement('img')).attr('src', imagepath);
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
}

x3d.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  var that=this;
  
  x3d.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
  // Getting container width and height
  /*var WIDTH = jquerycbo.innerWidth(), HEIGHT = jquerycbo.innerHeight();
  objectcbo.renderer.setSize(WIDTH, HEIGHT);
  objectcbo.camera.aspect = WIDTH / HEIGHT;*/
  
  
  
        // Create an event listener that resizes the renderer with the browser window.
	jquerycbo.on('resize', function() {    
        //var WIDTH = jquerycbo.innerWidth(), HEIGHT = jquerycbo.innerHeight();
        /*objectcbo.renderer.setSize(WIDTH, HEIGHT);
		objectcbo.camera.aspect = WIDTH / HEIGHT;
		objectcbo.camera.updateProjectionMatrix();*/
      });
    
    
};

x3d.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='imagedialog'><input id='modelpath' type='file'/><button id='action'>" + CBI18n.gettext("Insert") +"</button></div>");
  dialog.children('#action').click(function(){
    updateImagePath(dialog,that);
  });
  dialog.dialog({dialogClass: "cbdialog",
    width: 356,
    modal:true,close:function(){$(this).remove()}});
  $("#imagedialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

x3d.prototype.editButton = function editButton(e) {
  var dialog = x3d.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.children(".content").append("<input id='modelpath' type='file'/>");
  dialog.dialog("option","width",356);
  dialog.callbacks.push(function callbackEditButtonReplacex3d(){
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
    var result = dialogHTMLRaw.querySelectorAll('#modelpath');
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
    that.modelpath = originalbasename;
}


//x3d.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new x3d();
};

exports.restore = function restore(objectdata) {
  return new x3d(objectdata);
};
*/
module.exports = x3d;
//@ sourceURL=x3d_core.js
