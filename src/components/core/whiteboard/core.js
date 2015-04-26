var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function WhiteboardBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"position" : [200,200], "size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  WhiteboardBox.super_.call(this,objectdata);
}

util.inherits(WhiteboardBox,CBobject);

WhiteboardBox.prototype.editorView = function editorView() {
  var aux = WhiteboardBox.super_.prototype.editorView.call(this);
  var whiteboardelement = $(window.document.createElement('canvas')).addClass('whiteboard').attr('id','whiteboard'+this.uniqueid);
  var template = fs.readFileSync("./"+__module_path__ + 'toolbar.hbs',{encoding:'utf8'});
  var toolbar = application.util.template.compile(template)();
  aux.children('.cbcontainer').append([toolbar,whiteboardelement]);
  return aux;
};

WhiteboardBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  WhiteboardBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
  var handler = new WhiteBoardHelper('whiteboard'+this.uniqueid);
  handler.run(handler);
  var buttons = jquerycbo.find(".whiteboardtoolbar [data-command]");
  // var x = jquerycbo.find(".whiteboardtoolbar [data-command='draw']");
  // x.click(function(event) {
  //   handler.draw(handler);
  // });
  buttons.each(function(idx,button){
    $(button).click(function(){
      var aux = $(button).attr('data-command');
      handler[aux](handler);
    });
  });
};

WhiteboardBox.prototype.htmlView = function htmlView() {
  var aux = WhiteboardBox.super_.prototype.htmlView.call(this);
  var audioelement = $(window.document.createElement('audio')).attr('controls','');
  var source = $(window.document.createElement('source')).attr('src',"rsrc/"+ this.audiopath).attr('type',this.audioformat);
  audioelement.css('height','100%');
  audioelement.css('width','100%');
  audioelement.append(source);
  aux.children('.cbcontainer').append([audioelement]);
  return aux;
}

WhiteboardBox.prototype.pdfView = function pdfView() {
  var aux = WhiteboardBox.super_.prototype.pdfView.call(this);
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

WhiteboardBox.prototype.editButton = function editButton(e) {
  var dialog = WhiteboardBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.append("<input id='audiopath' type='file'/>");
  dialog.callbacks.push(function callbackEditButtonReplaceWhiteboardBox(){
    updateAudioPath(dialog,that);
  })
};



WhiteboardBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  // var dialog = $("<div id='audiodialog'><input id='audiopath' type='file' accept='.mp3,.ogg,.wav' /><button id='action'>Insert</button></div>");
  // dialog.children('#action').click(function(){
  //   updateAudioPath(dialog,that);
  // });
  // dialog.dialog({modal:true,close:function(){$(this).remove()}});
  controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);
};

WhiteboardBox.prototype.HTMLtags = function HTMLtags(node){

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

WhiteboardBox.prototype.importHTML = function importHTML(node, filePath){
  var fs = require('fs-extra');
  var path = require('path');

  if(node.tagName == "AUDIO")
    node = node.firstElementChild;

    try{

      WhiteboardBox.super_.prototype.importHTML.call(this,node);
      this.audioformat = node.attributes.getNamedItem("type") != null? node.attributes.getNamedItem("type").value:"";

      var audiopath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:"";
      if(node.tagName == "OBJECT")
        audiopath = node.hasAttribute("data")? node.attributes['data'].nodeValue:"";

      var finalpath = this.copyresource(path.join(path.dirname(filePath),audiopath));
      
      this.audiopath = path.basename(finalpath);
    }
    catch (err) {
        console.log('Errors in Audio: ' + err);
    }
}



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



//WhiteboardBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new WhiteboardBox();
};

exports.restore = function restore(objectdata) {
  return new WhiteboardBox(objectdata);
};
*/

module.exports = WhiteboardBox;
//@ sourceURL=whiteboard_core.js
