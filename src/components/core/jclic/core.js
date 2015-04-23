var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function JclicBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"resourcepath":null, "position" : [200,200], "size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  JclicBox.super_.call(this,objectdata);
  this.resourcepath = objectdata.resourcepath;
}

util.inherits(JclicBox,CBobject);

JclicBox.prototype.editorView = function editorView() {
  var aux = JclicBox.super_.prototype.editorView.call(this);
  var jclicelement = $(window.document.createElement('object'))
                    .attr('type','application/x-java-applet;version=1.3')
                    .attr('classid','java:JClicApplet')
                    .attr('archive','jclicapplet.jar,jclic.jar,activities.jar,utilities.jar,jclicxml.jar,jmfhandlers.jar,intl.jar,qt60.jar,qt61.jar,soundspi.jar');
  var params = [];
  params.push($(window.document.createElement('param')).attr('name','codebase').attr('value',"."));
  params.push($(window.document.createElement('param')).attr('name','activitypack').attr('value','kandinsky.jclic.zip'));

  jclicelement.css('height','100%');
  jclicelement.css('width','100%');
  jclicelement.append(params);
  aux.children('.cbcontainer').append(jclicelement);
  return aux;
};

JclicBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='jclicdialog'><input id='jclicpath' type='file' /><button id='action'>Insert</button></div>");
  dialog.children('#action').click(function(){
    updateJclicPath(dialog,that);
  });
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#jclicdialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

JclicBox.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;
  var tagTypes = {tags: ['EMBED']};
  
  if(tagTypes.tags.indexOf(node.tagName) > -1) score ++;

  return score;

//  return ['EMBED'];
}

JclicBox.prototype.importHTML = function importHTML(node, filePath){

  var fs = require('fs.extra');
  var path = require('path');
    try{
      
      var resourcepath = node.attributes.getNamedItem("activitypack") != null? node.attributes.getNamedItem("activitypack").value:"";
      var sourcePath = path.join(Project.Info.projectpath, "/rsrc/", path.basename(resourcepath));
      if(fs.existsSync(sourcePath))
        fs.renameSync(sourcePath, path.join(Project.Info.projectpath, "/rsrc/", path.basename(resourcepath).replace(".", Date.now().toString() + ".")));

      fs.copy(path.join(path.dirname(filePath), resourcepath), path.join(Project.Info.projectpath, "/rsrc/", path.basename(resourcepath)), function (err){
        if(err){
            console.log("Error copying JClic");
        }
      });

      var width = node.width;
      var height = node.height;
      var left = node.offsetLeft;
      var top = node.offsetTop;
      this.position = [top, left];
      this.activitypack = path.basename(resourcepath);
    }
    catch (err) {
        console.log('Errors in JClic');
    }
}

JclicBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  JclicBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};


function updateJclicPath(dialog,that){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    /*
     * get new file path
     */
    var dialogHTMLRaw = dialog.get()[0];
    var result = dialogHTMLRaw.querySelectorAll('#jclicpath');
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
    that.resourcepath = originalbasename;
}



//JclicBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new JclicBox();
};

exports.restore = function restore(objectdata) {
  return new JclicBox(objectdata);
};
*/

module.exports = JclicBox;
//@ sourceURL=jclic_core.js
