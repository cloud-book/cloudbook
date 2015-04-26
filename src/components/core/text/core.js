var Project = window.Project;  
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

/**
 * Class textbox 
 * @class TextBox
 * @extends CBObject
 * @param {Object} objectdata 
 * @param {String} objectdata.text Text object
 */

function TextBox(objectdata){
  var loremipsum = "En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. ";
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"text":loremipsum, "position" : [200,200],'size':[300,80]};
  objectdata.idtype = metadata['idtype'];
  TextBox.super_.call(this,objectdata);
  this.text = objectdata.text;
}

util.inherits(TextBox,CBobject);

TextBox.prototype.editorView = function editorView() {
  var aux = TextBox.super_.prototype.editorView.call(this);
  var textboxcontent = $(window.document.createElement('div'))
  					.html(this.text)
  					.attr('data-textbox-id',this.uniqueid)
  					.addClass('cbtextbox')
            .css('padding','5px')
  					// .css('height','100%')
  					// .css('width','100%')
            .dblclick({that:this},this.editButton);
  aux.children('.cbcontainer').append(textboxcontent);
  return aux;
};

TextBox.prototype.htmlView = function htmlView() {
  var aux = TextBox.super_.prototype.htmlView.call(this);
  var textboxcontent = $(window.document.createElement('div'))
            .html(this.text)
            .attr('data-textbox-id',this.uniqueid)
            .addClass('cbtextbox')
            .css('padding','5px');
  aux.children('.cbcontainer').append(textboxcontent);
  return aux;
}

TextBox.prototype.pdfView = function pdfView() {
  var aux = TextBox.super_.prototype.pdfView.call(this);
  var textboxcontent = $(window.document.createElement('div'))
            .html(this.text)
            .attr('data-textbox-id',this.uniqueid)
            .addClass('cbtextbox')
            .css('padding','5px');
  aux.children('.cbcontainer').append(textboxcontent);
  return aux;
}


TextBox.prototype.editButton = function editButton(e) {
  var that = e.data.that;
  var template = application.util.template.getTemplate(__module_path__+'/toolbar.hbs');
  var toolbar = $(template({identifier:"[data-textbox-id='"+that.uniqueid+"']"}));
  var textbox = $('[data-textbox-id="'+that.uniqueid+'"]');
  $('body').append(toolbar);
  toolbarposition(textbox.offset());
  var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
            'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
            'Times New Roman', 'Verdana'],
            fontTarget = $('[title=Font]').siblings('.dropdown-menu');
  $.each(fonts, function (idx, fontName) {
          fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
  });
  $('.dropdown-toggle').click(function(){$(this).siblings('.dropdown-menu').dropdown('toggle')})
        .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});
  textbox.wysiwyg({extracommandhandler:that.handlerExtraCommands});
  e.stopImmediatePropagation();
  textbox.click(that.stopPropagation);
  document.execCommand('selectAll');
  toolbar.click(that.stopPropagation);
  $('body').click({that:that},that.disableEditMode);
};

TextBox.prototype.stopPropagation = function stopPropagation(event) {
	event.stopImmediatePropagation();
};


TextBox.prototype.disableEditMode = function(e) {
	var that = e.data.that;
	$('[data-textbox-id="'+that.uniqueid+'"]').removeAttr('contentEditable').unbind('click',that.stopPropagation);
	$(".cbtextbox-toolbar").remove();
	$('body').unbind('click',that.disableEditMode);
	var CBStorage = application.storagemanager.getInstance();
	var aux = CBStorage.getCBObjectById(that.uniqueid);
	aux.text = $('[data-textbox-id="'+that.uniqueid+'"]').html();
};

TextBox.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;
  var tagTypes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'UL', 'OL', 'A', 'SPAN', 'LABEL', 'BUTTON', 'INPUT', 'ADDRESS', 'BLOCKQUOTE', 'DL', 'TABLE',
  'BR','DT', 'FORM', 'DETAILS', 'SELECT', 'Q', 'RUBY', 'TEXTAREA'];
  
  if(tagTypes.indexOf(node.tagName) > -1) score ++;

  return score;
};

TextBox.prototype.HTMLtagNames = function HTMLtagNames(){
  return ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'UL', 'OL', 'A', 'SPAN', 'LABEL', 'BUTTON', 'INPUT', 'ADDRESS', 'BLOCKQUOTE', 'DL', 'TABLE',
  'BR','DT', 'FORM', 'DETAILS', 'SELECT', 'Q', 'RUBY', 'TEXTAREA'];
}
TextBox.prototype.importHTML = function importHTML(node, filePath){
  if(node.tagName != null)
    {
      var text = "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
      TextBox.super_.prototype.importHTML.call(this,node);
      this.text = text;
    }
    else
    {
      var text = node;
      var top = 0;
      this.text = text;
      this.size = [800, 300];
      this.position = [0, top];
    }
}

TextBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
	TextBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
	jquerycbo.on('drag',function(event,ui){toolbarposition(ui.offset)});
  jquerycbo.on("resize",function(event,ui){
    ui.size.height = jquerycbo.find('.cbtextbox').outerHeight(true);
  });
};

TextBox.prototype.handlerExtraCommands = function handlerExtraCommands(command) {
  if(command === "table"){
    console.log("Ejecutando el codigo de tablas");
  }
};


function toolbarposition(position){
	var toolbar = $(".cbtextbox-toolbar");
	toolbar.css('position','fixed')
	       .css('top',position.top - 60 + "px")
	       .css('left',position.left + "px");
}



module.exports = TextBox;
//@ sourceURL=text_core.js
