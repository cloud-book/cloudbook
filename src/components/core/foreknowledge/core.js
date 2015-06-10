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

function ForeknowledgeBox(objectdata){
  var defaultvalues = {
    "text" : "Lorem Ipsum",
    "title" : "Foreknowledge",
    "position" : [200,200],
    "size" : [300,90],
    "idtype" : metadata['idtype']
  };
  objectdata = $.extend({},defaultvalues,objectdata);

  ForeknowledgeBox.super_.call(this,objectdata);
  this.title = objectdata.title;
  this.text = objectdata.text;
  this.size[1] = this.size[1] + 10;
}

util.inherits(ForeknowledgeBox,CBobject);

ForeknowledgeBox.prototype.editorView = function editorView() {
  var that = this;
  var aux = ForeknowledgeBox.super_.prototype.editorView.call(this);
  var text = $(window.document.createElement('div')).html(this.text)
                                                    .css('background-color',"#EBE3CC")
                                                    .css("padding","15px 15px")
                                                    .addClass('foreknowledgebox-text')
                                                    .addClass('field-editable');
  text.dblclick({that:this},this.editText);
  var titleimage = $(window.document.createElement('img')).attr('src',Project.Info.projectpath +"/rsrc/noteimages/foreknowledge.png");
  var title = $(window.document.createElement('span')).html(this.title)
                                                      .css('margin-left','15px')
                                                      .css('font-size','17px')
                                                      .css('font-weight','bold')
                                                      .addClass('field-editable')
                                                      .addClass('foreknowledgebox-title');
  title.dblclick({that:this},this.editTitle);
  var wrapper = $(window.document.createElement('div')).append([titleimage,title]).css('margin-top','5px');
  var fullbox = $(window.document.createElement('div')).attr('data-foreknowledgebox-id',that.uniqueid).append([wrapper,text]);
  aux.children('.cbcontainer').append(fullbox);
  setTitleImage();
  return aux;
};

ForeknowledgeBox.prototype.htmlView = function htmlView() {
  var aux = ForeknowledgeBox.super_.prototype.htmlView.call(this);
  var textboxcontent = $(window.document.createElement('div'))
            .html(this.text)
            .attr('data-textbox-id',this.uniqueid)
            .addClass('cbtextbox')
            .css('padding','5px');
  aux.children('.cbcontainer').append(textboxcontent);
  return aux;
}

ForeknowledgeBox.prototype.pdfView = function pdfView() {
  var aux = ForeknowledgeBox.super_.prototype.pdfView.call(this);
  var textboxcontent = $(window.document.createElement('div'))
            .html(this.text)
            .attr('data-textbox-id',this.uniqueid)
            .addClass('cbtextbox')
            .css('padding','5px');
  aux.children('.cbcontainer').append(textboxcontent);
  return aux;
}

ForeknowledgeBox.prototype.epubView = function epubView() {
   return this.pdfView();
}


ForeknowledgeBox.prototype.editTitle = function editTitle(e) {
  var that = e.data.that;
  that.editField(e,"[data-foreknowledgebox-id='"+that.uniqueid+"'] .foreknowledgebox-title");
};

ForeknowledgeBox.prototype.editText = function editText(e) {
  var that = e.data.that;
  that.editField(e,"[data-foreknowledgebox-id='"+that.uniqueid+"'] .foreknowledgebox-text");
};

ForeknowledgeBox.prototype.editField = function editField(e,selector) {
  var that = e.data.that;
  var template = application.util.template.getTemplate(__module_path__+'/toolbar.hbs');
  var toolbar = $(template({identifier:selector}));
  var foreknowledgebox = $("[data-foreknowledgebox-id='"+that.uniqueid+"']");
  $('body').append(toolbar);
  toolbarposition(foreknowledgebox.offset());
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
  var field = $(selector);
  field.wysiwyg({extracommandhandler:that.handlerExtraCommands});
  e.stopImmediatePropagation();
  foreknowledgebox.click(that.stopPropagation);
  document.execCommand('selectAll');
  toolbar.click(that.stopPropagation);
  $('body').click({that:that},that.disableEditMode);
};


ForeknowledgeBox.prototype.editButton = function editButton(e) {
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

ForeknowledgeBox.prototype.stopPropagation = function stopPropagation(event) {
	event.stopImmediatePropagation();
};


ForeknowledgeBox.prototype.disableEditMode = function(e) {
	var that = e.data.that;
  if(document.getSelection().getRangeAt(0).toString().length === 0){
    $("[data-foreknowledgebox-id='"+that.uniqueid+"']").unbind('click',that.stopPropagation);
  	$('[data-foreknowledgebox-id="'+that.uniqueid+'"] .field-editable').removeAttr('contentEditable');
  	$(".cbtextbox-toolbar").remove();
  	$('body').unbind('click',that.disableEditMode);
  	var CBStorage = application.storagemanager.getInstance();
  	var aux = CBStorage.getCBObjectById(that.uniqueid);
  	aux.text = $('[data-foreknowledgebox-id="'+that.uniqueid+'"] .foreknowledgebox-text').html();
    aux.title = $('[data-foreknowledgebox-id="'+that.uniqueid+'"] .foreknowledgebox-title').html();
    CBStorage.setCBObjectById(aux,that.uniqueid);
  }
};

ForeknowledgeBox.prototype.HTMLtags = function HTMLtags(node){
  var score = 0;
  var tagTypes = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'UL', 'OL', 'A', 'SPAN', 'LABEL', 'BUTTON', 'INPUT', 'ADDRESS', 'BLOCKQUOTE', 'DL', 'TABLE',
  'BR','DT', 'FORM', 'DETAILS', 'SELECT', 'Q', 'RUBY', 'TEXTAREA'];
  
  if(tagTypes.indexOf(node.tagName) > -1) score ++;

  return score;
};

ForeknowledgeBox.prototype.HTMLtagNames = function HTMLtagNames(){
  return ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'SPAN', 'UL', 'OL', 'A', 'SPAN', 'LABEL', 'BUTTON', 'INPUT', 'ADDRESS', 'BLOCKQUOTE', 'DL', 'TABLE',
  'BR','DT', 'FORM', 'DETAILS', 'SELECT', 'Q', 'RUBY', 'TEXTAREA'];
}
ForeknowledgeBox.prototype.importHTML = function importHTML(node, filePath){
  if(node.tagName != null)
    {
      var text = "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
      ForeknowledgeBox.super_.prototype.importHTML.call(this,node);
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

ForeknowledgeBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
	ForeknowledgeBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
	jquerycbo.on('drag',function(event,ui){toolbarposition(ui.offset)});
 //  jquerycbo.on("resize",function(event,ui){
 //    ui.size.height = jquerycbo.find('.cbtextbox').outerHeight(true);
 //  });
 //  jquerycbo.find(".cbtextbox")[0].addEventListener('input',function(){jquerycbo.height(jquerycbo.find('.cbtextbox').outerHeight(true));});
 //  jquerycbo.height(jquerycbo.find('.cbtextbox').outerHeight(true));
};

ForeknowledgeBox.prototype.handlerExtraCommands = function handlerExtraCommands(command) {
  var tablevalues=[];
  var fullSize=0;
  var withheader=0;
  if(command === "marcar"){
    $('#tablemenuRow a,#tablemenuCol a').each(function(idx,o){
        $(o).click(function(e){
          e.stopPropagation();
          if ($(this).parent().hasClass('active')){
            $(this).parent().removeClass('active');
          }else{
            $(this).parent().addClass('active');
          }
        });
    });
    $('#inputFullSize').each(function(idx,o){
        $(o).click(function(e){
//          debugger;
          e.stopPropagation();
        });
    });
    $('#inputWithHeader').each(function(idx,o){
        $(o).click(function(e){
//          debugger;
          e.stopPropagation();
        });
    });
    $('#tablemenuButton').click(function(){
      $(this).parent().find('li.active a').each(function(idx,o){
          tablevalues.push($(o).text());
      });
      if($('#inputFullSize').is(':checked')){
        fullSize=1;
      }
      if($('#inputWithHeader').is(':checked')){
        withheader=1;
      }
      //clean fields
      $('#tablemenuRow a,#tablemenuCol a ').each(function(idx,o){
          $(this).parent().removeClass('active');
      });
      $('#inputFullSize').each(function(idx,o){
        $(o).click(function(){
          $(this).prop('checked',false);
        });
      });
      $('#inputWithHeader').each(function(idx,o){
        $(o).click(function(){
          $(this).prop('checked',false);
        });
      });
      document.execCommand('insertHTML', 0, createTable(tablevalues[0],tablevalues[1],fullSize,withheader));
    });
  }
};

function createTable(row,col,tableclass,header){
  var k=1;
  if (tableclass){
    var t=$("<table class='fullsize'></table>");
  }else{
    var t=$('<table></table>');
  }
  if(header){
    t.append('<thead><tr></tr></thead>');
    for(var i = 0; i < col; i++){ 
      t.find('tr').append('<th>'+(k++)+'</th>');
    }
  }
  t.append('<tbody>');
  for(var i = 0; i < row; i++) {
    t.append('<tr></tr>');
    
    if(header){
      var u=i+1;
    }else{
      var u=i;
    }

    for(var j = 0; j < col; j++) {
        $(t).find('tr').eq(u).append('<td>'+(k++)+'</td>');
        $(t).find('tr').eq(u).find('td').eq(j).attr('data-row',i).attr('data-col', j);
    }
  }
  t.append('</tbody>');  
  return t[0].outerHTML;
}

function toolbarposition(position){
	var toolbar = $(".cbtextbox-toolbar");
	toolbar.css('position','fixed')
	       .css('top',position.top - 60 + "px")
	       .css('left',position.left + "px");
  if(toolbar.height() > 40){
    toolbar.css('left','')
           .css('right','0px');
  }
}

function setTitleImage(){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    var finalpath = Project.Info.projectpath +"/rsrc/noteimages/foreknowledge.png";
    try{
      fsextra.mkdirsSync(path.dirname(finalpath));
    }
    catch(e){
    }
    try{
      fsextra.copySync("./"+__module_path__ + "/rsrc/titleimage.png",finalpath);
    }
    catch(e){
    }
}

module.exports = ForeknowledgeBox;
//@ sourceURL=text_core.js
