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
  this.typessuported = ["target","note","preknowledge", "case", "reflection", 
  "reading", "reflection", "activity","custom"];
  [CBI18n.gettext("target"),CBI18n.gettext("note"),CBI18n.gettext("custom"),
   CBI18n.gettext("preknowledge"), CBI18n.gettext("case"),CBI18n.gettext("reading"), 
   CBI18n.gettext("reflection"), CBI18n.gettext("activity")];
  var defaultvalues = {
    "text" : "Lorem Ipsum",
    "title" : "Foreknowledge",
    "position" : [200,200],
    "size" : [300,90],
    "idtype" : metadata['idtype'],
    "typebox" : this.typessuported[0],
    "customimage" : ""
  };
  
  objectdata = $.extend({},defaultvalues,objectdata);

  ForeknowledgeBox.super_.call(this,objectdata);
  this.title = objectdata.title;
  this.text = objectdata.text;
  this.size[1] = this.size[1] + 10;
  this.typebox = objectdata.typebox;
  this.customimage = objectdata.customimage;
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
  var titleimage = $(window.document.createElement('img'));
  var pathimage = "";
  if(that.typebox !== "custom"){
    pathimage = `${Cloudbook.UI.exportthemepath}/img/fkl_${that.typebox}.png` ;
  }
  else{
    pathimage = `${Project.Info.projectpath}/rsrc/noteimages/${that.customimage}`;
  }
  titleimage.attr('src',pathimage);
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
  return aux;
};


ForeknowledgeBox.prototype.pathImage = function pathImage(typebox) {
  if(typebox !== "custom"){
    return `${Cloudbook.UI.exportthemepath}/img/fkl_${typebox}.png` ;
  }
  else{
    return `${Project.Info.projectpath}/rsrc/noteimages/${this.customimage}`;
  }
};

ForeknowledgeBox.prototype.renderContent = function renderContent() {
  var text = $(window.document.createElement('div')).html(this.text)
                                                    .css('background-color',"#EBE3CC")
                                                    .css("padding","15px 15px")
                                                    .addClass('foreknowledgebox-text')
                                                    .addClass('field-editable');
  var titleimage = $(window.document.createElement('img'));
  var pathimage = "";

  if(this.typebox !== "custom"){
    pathimage = `theme/img/fkl_${this.typebox}.png` ;
  }
  else{
    pathimage = `rsrc/noteimages/${this.customimage}`;
  }
  titleimage.attr('src',pathimage);
  var title = $(window.document.createElement('span')).html(this.title)
                                                      .css('margin-left','15px')
                                                      .css('font-size','17px')
                                                      .css('font-weight','bold')
                                                      .addClass('field-editable')
                                                      .addClass('foreknowledgebox-title');
  var wrapper = $(window.document.createElement('div')).append([titleimage,title]).css('margin-top','5px');
  var fullbox = $(window.document.createElement('div')).attr('data-foreknowledgebox-id',this.uniqueid).append([wrapper,text]);
  return fullbox;
};



ForeknowledgeBox.prototype.htmlView = function htmlView() {
  var aux = ForeknowledgeBox.super_.prototype.htmlView.call(this);
  var fullbox = this.renderContent();
  aux.children('.cbcontainer').append(fullbox);
  return aux;
}

ForeknowledgeBox.prototype.pdfView = function pdfView() {
  var aux = ForeknowledgeBox.super_.prototype.pdfView.call(this);
  var fullbox = this.renderContent();
  aux.children('.cbcontainer').append(fullbox);
  return aux;
}

ForeknowledgeBox.prototype.epubView = function epubView() {
  var aux = this.pdfView(),
      path = require('path'),
      abspath = "",
      newpath = "";

  abspath = path.resolve(Cloudbook.UI.exportthemepath);
  if(that.typebox !== "custom"){
    newpath = `file://${abspath}/img/fkl_${that.typebox}.png` ;
  }
  else{
    newpath = `file://${Project.Info.projectpath}/rsrc/noteimages/${that.customimage}`;
  }
  aux.find("img").attr('src',newpath);
  return aux;
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
  var that = e.data.that,
      template = application.util.template.getTemplate(__module_path__+'/toolbar.hbs'),
      toolbar = $(template({identifier:selector})),
      foreknowledgebox = $("[data-foreknowledgebox-id='"+that.uniqueid+"']"),
      fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier','Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times','Times New Roman', 'Verdana'],
      fontTarget = $('[title=Font]').siblings('.dropdown-menu'),
      field = $(selector);

  $('body').append(toolbar);
  toolbarposition(foreknowledgebox.offset());
  $.each(fonts, function (idx, fontName) {
          fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
  });
  $('.dropdown-toggle').click(function(){$(this).siblings('.dropdown-menu').dropdown('toggle')})
        .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
        .keydown('esc', function () {this.value='';$(this).change();});
  
  field.wysiwyg({extracommandhandler:that.handlerExtraCommands});
  e.stopImmediatePropagation();
  foreknowledgebox.click(that.stopPropagation);
  document.execCommand('selectAll');
  toolbar.click(that.stopPropagation);
  $('body').click({that:that},that.disableEditMode);
};


ForeknowledgeBox.prototype.editButton = function editButton(e) {
  var dialog = ForeknowledgeBox.super_.prototype.editButton.call(this,e);
  var that = e.data.that;
  var image = $(document.createElement('img')).attr('id','imagetypefkl').css('max-height','50px').css('width','auto');
  var typefkl = $(document.createElement('select')).attr('id','typefkl');
  var inputfile = $(document.createElement('input')).attr('type','file').css('visibility','hidden').attr('id','custompath');
  
  image.attr('src',that.pathImage(that.typebox));

  that.typessuported.forEach(function(element){
    var valtemplates = {};
    valtemplates.value = element;
    var translatedelement = CBI18n.gettext(element);
    console.log(translatedelement);
    valtemplates.text = translatedelement.charAt(0).toUpperCase() + translatedelement.substring(1);
    if (valtemplates.value === that.typebox){
      typefkl.append(`<option value="${valtemplates.value}" selected>${valtemplates.text}</option>`);
    }
    else{
      typefkl.append(`<option value="${valtemplates.value}">${valtemplates.text}</option>`);
    }
  });
  typefkl.on('change',function(){
    if(this.value === 'custom'){
      $("#custompath").css('visibility','visible');
      $("#imagetypefkl").attr('src',"file://" + $("#custompath")[0].value);
    }
    else{
      $("#custompath").css('visibility','hidden');
      $("#imagetypefkl").attr('src',that.pathImage(this.value));
    }
  });
  inputfile.on('change',function(){
    $("#imagetypefkl").attr('src',"file://" + $("#custompath")[0].value);
  });
  dialog.children(".content").append([image,typefkl,inputfile]);
  dialog.callbacks.push(function(){
    updateimage(dialog,that);
  });
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
  var tagTypes = ['FKN'];
  
  if(tagTypes.indexOf(node.tagName) > -1) score ++;

  return score;
};

ForeknowledgeBox.prototype.HTMLtagNames = function HTMLtagNames(){
  return ['FKN'];
}
ForeknowledgeBox.prototype.importHTML = function importHTML(node, filePath){
  if(node.tagName != null)
    {
      this.text = $(node).data("text");
      this.title = $(node).data("title");
      this.typebox = $(node).data("typebox");
      ForeknowledgeBox.super_.prototype.importHTML.call(this,node);
      this.size = [800, 300];
      this.position = [0, top];
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
   jquerycbo.on("resize",function(event,ui){
     ui.size.height = jquerycbo.find('.cbcontainer').outerHeight(true) + 10 ;
   });
  //jquerycbo.find(".cbtextbox")[0].addEventListener('input',function(){jquerycbo.height(jquerycbo.find('.cbtextbox').outerHeight(true));});
  jquerycbo.height(jquerycbo.find('.cbcontainer').outerHeight(true) + 10 );
};

ForeknowledgeBox.prototype.getResourcesFiles = function getResourcesFiles() {
  if(this.typebox === 'custom'){
    return [this.customimage];
  }
  return [];
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
          e.stopPropagation();
        });
    });
    $('#inputWithHeader').each(function(idx,o){
        $(o).click(function(e){
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
	       .css('top',position.top - 64 + "px")
	       .css('left',position.left + "px");
  if(toolbar.height() > 40){
    toolbar.css('left','')
           .css('right','0px');
  }
}

function updateimage(dialog,reference){
  var type = dialog.find('#typefkl')[0];
  reference.typebox = type.value;
  if(type.value === 'custom'){
    var originalpath = dialog.find('#custompath')[0].value;
    var path = require('path');
    var fsextra = require('fs-extra');
    var originalbasename = path.basename(originalpath);
    fsextra.ensureDirSync(Project.Info.projectpath +"/rsrc/noteimages/");
    var finalpath = Project.Info.projectpath +"/rsrc/noteimages/"+originalbasename;
    while(true){
      try{
        fs.accessSync(finalpath);
        originalbasename = "0"+originalbasename;
        finalpath = Project.Info.projectpath + "/rsrc/noteimages/"+ originalbasename;
      }
      catch(e){
        break;
      }
    }
    fsextra.copySync(originalpath,finalpath);
    reference.customimage = originalbasename;
  }
}


module.exports = ForeknowledgeBox;
//@ sourceURL=text_core.js