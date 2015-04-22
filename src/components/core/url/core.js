var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function ExternalIframe(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"url":null, "position" : [200,200],"size":[640,480]};
  objectdata.idtype = metadata['idtype'];
  ExternalIframe.super_.call(this,objectdata);
  this.url = objectdata.url;
}

util.inherits(ExternalIframe,CBobject);

ExternalIframe.prototype.editorView = function editorView() {
  var aux = ExternalIframe.super_.prototype.editorView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var iframeelement = $(window.document.createElement('iframe')).attr('src', url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  aux.children('.cbcontainer').append(iframeelement);
  return aux;
};

ExternalIframe.prototype.htmlView = function htmlView() {
  var aux = ExternalIframe.super_.prototype.htmlView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var iframeelement = $(window.document.createElement('iframe')).attr('src', url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  aux.append(iframeelement);
  return aux;
}

ExternalIframe.prototype.pdfView = function pdfView() {
  var aux = ExternalIframe.super_.prototype.pdfView.call(this);
  var url = this.url !== null ? this.url : "http://lliurex.net";
  var iframeelement = $(window.document.createElement('iframe')).attr('src', url);
  iframeelement.css('height','100%');
  iframeelement.css('width','100%');
  aux.append(iframeelement);
  return aux;
}


ExternalIframe.prototype.importHTML = function importHTML(){
  return ['IFRAME'];
}

ExternalIframe.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  ExternalIframe.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
};

ExternalIframe.prototype.clickButton = function clickButton(controllerClass) {
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
    that.url = $("#url").val();
    controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};


ExternalIframe.prototype.editButton = function editButton(e) {
  var dialog = ExternalIframe.super_.prototype.editButton.call(this,e);
  var that = e.data.that;

  dialog.append("<input id='url' type='text' value='"+that.url+"'/>");
};

//ExternalIframe.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new ExternalIframe();
};

exports.restore = function restore(objectdata) {
  return new ExternalIframe(objectdata);
};
*/
module.exports = ExternalIframe;
//@ sourceURL=url_core.js