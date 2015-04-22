var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function YoutubeBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"url":null, "position" : [200,200],"size":[100,50]};
  objectdata.idtype = metadata['idtype'];
  YoutubeBox.super_.call(this,objectdata);
  this.url = objectdata.url;
}

util.inherits(YoutubeBox,CBobject);

YoutubeBox.prototype.editorView = function editorView() {
  var aux = YoutubeBox.super_.prototype.editorView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var imgelement = $(window.document.createElement('iframe')).attr('src', url).attr('frameborder','0').attr('allowfullscreen','');
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
};

YoutubeBox.prototype.htmlView = function htmlView() {
  var aux = YoutubeBox.super_.prototype.htmlView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var imgelement = $(window.document.createElement('iframe')).attr('src', url).attr('frameborder','0').attr('allowfullscreen','');
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
}

YoutubeBox.prototype.pdfView = function pdfView() {
  var aux = YoutubeBox.super_.prototype.pdfView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var imgelement = $(window.document.createElement('iframe')).attr('src', url).attr('frameborder','0').attr('allowfullscreen','');
  imgelement.css('height','100%');
  imgelement.css('width','100%');
  aux.children('.cbcontainer').append(imgelement);
  return aux;
}


YoutubeBox.prototype.importHTML = function importHTML(){
  return ['IFRAME'];
}

YoutubeBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  YoutubeBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};

YoutubeBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='imagedialog'><input id='url' type='text'/><button id='save'>Insert</button></div>");
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  dialog.find('#url').keypress(function(e){
      if (e.which==13){
        var seccion = $('#url').val();
        if(seccion!=""){ 
          dialog.find('#save').click();
        }
      }
  });
  $("#imagedialog button").on('click',function(){
    that.url = parseYoutubeUrl($("#url").val());
    controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};


YoutubeBox.prototype.editButton = function editButton(e) {
  var dialog = YoutubeBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;
  dialog.append("<input id='url' type='text' value='"+that.url+"'/>");
  dialog.callback.push(function(){
    that.url = parseYoutubeUrl($("#url").val());
  });
};

function parseYoutubeUrl(url){
  var auxarguments = "?rel=0&amp;showinfo=0";
  var id = YouTubeGetID(url);
  return "https://www.youtube.com/embed/" +  id + "/"+ auxarguments;
}



/**
* Get YouTube ID from various YouTube URL
* @author: takien
* @url: http://takien.com
* For PHP YouTube parser, go here http://takien.com/864
*/
function YouTubeGetID(url){
  var ID = '';
  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if(url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  else {
    ID = url;
  }
    return ID;
}



//YoutubeBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new YoutubeBox();
};

exports.restore = function restore(objectdata) {
  return new YoutubeBox(objectdata);
};
*/
module.exports = YoutubeBox;
//@ sourceURL=youtube_core.js