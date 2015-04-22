var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function IncludeSite(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"url":null, "position" : [200,200],"size":[640,480]};
  objectdata.idtype = metadata['idtype'];
  IncludeSite.super_.call(this,objectdata);
  this.url = objectdata.url;
}

util.inherits(IncludeSite,CBobject);

IncludeSite.prototype.editorView = function editorView() {
  var aux = IncludeSite.super_.prototype.editorView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var iframeelement = $(window.document.createElement('iframe')).attr('src', url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  var cliclayer = $(window.document.createElement('div')).addClass('cbcliclayer');
  aux.children('.cbcontainer').append([iframeelement,cliclayer]);
  return aux;
};

IncludeSite.prototype.htmlView = function htmlView() {
  var aux = IncludeSite.super_.prototype.htmlView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var iframeelement = $(window.document.createElement('iframe')).attr('src', url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  aux.append(iframeelement);
  return aux;
}

IncludeSite.prototype.pdfView = function pdfView() {
  var aux = IncludeSite.super_.prototype.pdfView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var iframeelement = $(window.document.createElement('iframe')).attr('src', url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  aux.append(iframeelement);
  return aux;
}


IncludeSite.prototype.importHTML = function importHTML(){
  return ['IFRAME'];
}

IncludeSite.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  IncludeSite.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};

IncludeSite.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='includesitedialog'><input id='url' type='text'/><button id='save'>Insert</button></div>");
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  dialog.find('#url').keypress(function(e){
      if (e.which==13){
        var seccion = $('#url').val();
        if(seccion!=""){ 
          dialog.find('#save').click();
        }
      }
  });
  $("#includesitedialog button").on('click',function(){
    
    copySite($("#url").val(),that);
    controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};


IncludeSite.prototype.editButton = function editButton(e) {
  var dialog = IncludeSite.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.append("<input id='url' type='text' value='"+that.url+"'/>");
  dialog.callbacks.push(function(){
    
    copySite($("#url").val(),that);
  });
};

function copySite(orig,that){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    /*
     * get new file path
     */
    var originalbasename = path.basename(orig);
    var resourcepath = Project.Info.projectpath +"/rsrc/"+ that.uniqueid + "/";

    while(true){
      try{
        fs.accessSync(resourcepath);
        fsextra.remove(resourcepath)
      }
      catch(e){
        break;
      }
    }
    fsextra.mkdirsSync(resourcepath);
    var basedir = path.dirname(orig);
    fsextra.copySync(basedir+".",resourcepath);

    /*
     * update component file
     */
    that.url = resourcepath + originalbasename;
}




module.exports = IncludeSite;
//@ sourceURL=url_core.js