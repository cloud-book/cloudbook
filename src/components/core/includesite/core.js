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
  var iframeelement = $(window.document.createElement('iframe')).attr('src',Project.Info.projectpath + "/rsrc/"+ this.url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  var cliclayer = $(window.document.createElement('div')).addClass('cbcliclayer');
  aux.children('.cbcontainer').append([iframeelement,cliclayer]);
  return aux;
};

IncludeSite.prototype.htmlView = function htmlView() {
  var aux = IncludeSite.super_.prototype.htmlView.call(this);
  // Bug, Firefox flash don't support transform attribute
  aux.css('transform','');
  var iframeelement = $(window.document.createElement('iframe')).attr('src',"rsrc/"+this.url );
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  aux.append(iframeelement);
  return aux;
}

IncludeSite.prototype.pdfView = function pdfView() {
  var aux = IncludeSite.super_.prototype.pdfView.call(this);
  var fsextra = require('fs-extra');
  var path = require('path');
  var pathtosavefile = Project.Info.projectpath + "/pdfextrafiles/"+this.uniqueid + "/";
  var copyfolder = path.dirname(this.url);
  var linktopdf = "pdfextrafiles/"+this.uniqueid+"/"+path.basename(this.url)
  var stringtopdf = CBI18n.gettext("Click to view resource");
  /**
   * Create folder to resources and copy inside these
   */
  fsextra.mkdirsSync(pathtosavefile);
  fsextra.copySync(Project.Info.projectpath + "/rsrc/"+ copyfolder + "/.",pathtosavefile);
  
  return aux.append("<a href='"+linktopdf+"'>"+stringtopdf+"</a>");
}

IncludeSite.prototype.epubView =function epubView(){
  var aux = IncludeSite.super_.prototype.epubView.call(this);
  var stringtoepub = CBI18n.gettext("Includesite component is not compatible with EPUB 2 format");
  return aux.append(stringtoepub);

}

IncludeSite.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;
  var tagTypes = ['IFRAME'];
  
  if(tagTypes.indexOf(node.tagName) > -1)
    score ++;
  return score;
}

IncludeSite.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  IncludeSite.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};

IncludeSite.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='includesitedialog'><input id='url' type='file'/><button id='save'>"+ CBI18n.gettext("Insert") +"</button></div>");
  dialog.dialog({dialogClass: "cbdialog",width: 356,modal:true,close:function(){$(this).remove()}});
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

IncludeSite.prototype.getResourcesFiles = function getResourcesFiles() {
  var path = require('path');
  var folder = path.dirname(this.url);
  return getAllFiles(path.join(Project.Info.projectpath,"/rsrc/",folder),path.join(Project.Info.projectpath,"/rsrc/"));
};



IncludeSite.prototype.editButton = function editButton(e) {
  var dialog = IncludeSite.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.children(".content").append("<input id='url' type='file'/>");
  dialog.dialog("option","width",356);
  dialog.callbacks.push(function(){
    copySite($("#url").val(),that);
  });
};

function getAllFiles(orig,toremove){
        var listfiles = [];
        var finallist = [];
        var path = require('path');
        var fs = require('fs');
        listfiles = fs.readdirSync(orig).map(function(file){ return path.join(orig,file)});
        listfiles.forEach(function(file){
                var stat = fs.statSync(file);
                if (stat.isDirectory()){
                        finallist = finallist.concat(getAllFiles(file,toremove));
                }
                finallist.push(file.replace(toremove,''));
        });
        return finallist;
}


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
    fsextra.copySync(basedir+"/.",resourcepath);

    /*
     * update component file
     */
    that.url = that.uniqueid + "/" + originalbasename;
}




module.exports = IncludeSite;
//@ sourceURL=url_core.js