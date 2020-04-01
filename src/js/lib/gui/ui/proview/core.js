function ProView(){

}

ProView.prototype.initSections = function initSections() {
  var list = $(document.createElement('ul')).addClass("connectedSortable");
  $(Cloudbook.UI.navsections).html(list).attr('data-cbsectionid','root');
  var x = document.createElement('div');
  var y = document.createElement('img');
  y.src = 'rsrc/lliurex-logo.svg';
  x.appendChild(y);
  x.id = "lliurexlogo";
  document.querySelector(Cloudbook.UI.navsections).appendChild(x);
};

ProView.prototype.createFirstSection = function createFirstSection() {
  var backend = application.backend.core.getInstance();
  var cbsecid = backend.createFirstSection();
  var son = this.createSectionView(cbsecid);
  var list = $("[data-cbsectionid='root'] > ul");
  list.append(son);
  $($(son.children('.displaysection')).children('.divselector')).click();
  this.reloadSortable();
 
};


ProView.prototype.reloadSortable = function reloadSortable(element){
  var that = this;
  var cbsecid,
      oldorder;  
  
 
  var backend = application.backend.core.getInstance();
  var controller = application.controller.getInstance();
  $(".connectedSortable").sortable({
    placeholder: "ui-state-highlight",
    opacity:0.5,
    axis:"y",
    start:function(ev,ui){
      var CBStorage=application.storagemanager.getInstance();
      that.oldparent = ui.item.parent().parent().attr('data-cbsectionid');
      var parentold=CBStorage.getSectionById(that.oldparent);
      that.cbsecid=ui.item.attr('data-cbsectionid');
      that.oldorder=parentold.sections.indexOf(that.cbsecid) + 1 ;
    },
    stop:function(ev,ui){
      that.newparent = ui.item.parent().parent().attr('data-cbsectionid');
      if (that.oldparent !== that.newparent ){
        listoldparent = $("[data-cbsectionid=" + that.oldparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        listnewparent = $("[data-cbsectionid=" + that.newparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        backend.regenerateSubsection(that.oldparent,listoldparent.toArray());
        backend.regenerateSubsection(that.newparent,listnewparent.toArray());
      }else{
        listnewparent = $("[data-cbsectionid=" + that.newparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        backend.regenerateSubsection(that.newparent,listnewparent.toArray());
      }
      controller.numberMoveSection(that.oldparent, that.newparent,that.cbsecid,that.oldorder);
    },
    
    connectWith:".connectedSortable"}).disableSelection();

}

ProView.prototype.redrawNumbering = function redrawNumbering() {
  var i,node,parent,numbering,CBStorage;
  var listnumberings = $("#navsections .numbering");
  for(i=0;i< listnumberings.length; i++){
    node = listnumberings[i];

    parent = node.closest("[data-cbsectionid]");
    CBStorage = application.storagemanager.getInstance();
    var x = $(parent).attr("data-cbsectionid");
    numbering = CBStorage.getSectionById(x).numbering;
    $(node).html(numbering);
  }
};

ProView.prototype.getFormatSectionName = function(cbsecid) {
  var cbsection, CBStorage;
  CBStorage = application.storagemanager.getInstance();
  cbsection = CBStorage.getSectionById(cbsecid);
  return '<div class="caption"><div class="numbering">' + cbsection.numbering + "</div><div> " + cbsection.name + "</div></div>";
};


ProView.prototype.createSectionView = function createSectionView(cbsecid) {

  var section = $(document.createElement('li')).addClass('cbsection');
  var CBStorage = application.storagemanager.getInstance();
  var that = this;
  section.attr('data-cbsectionid',cbsecid);

  var displaysection = $(document.createElement('div')).addClass('displaysection');
  var textsection = $(document.createElement('div')).addClass('divselector');
  var actions = $(document.createElement('button')).html('+').attr('data-toggle','dropdown').attr('id',cbsecid);
  var subsections = $(document.createElement('ul')).addClass('subsections').addClass("connectedSortable");
  textsection.append($(document.createElement('div')).html(that.getFormatSectionName(cbsecid)));
  
  textsection.click({that:this},this.selectSection);
  textsection.dblclick({that:this},this.doubleClick);
  actions.click({that:this},this.createMenu);
  displaysection.append([textsection,actions]);
  section.append([displaysection,subsections]);
  return section ;
};

ProView.prototype.doubleClick=function doubleClick(e){
        
  var that = e.data.that;
	var actualcbsectionid = $(e.currentTarget).closest('[data-cbsectionid]').attr('data-cbsectionid');
	that.dialogUpdateSectionName(actualcbsectionid);
      
};

ProView.prototype.createMenu = function createMenu(e) {
	var that = e.data.that;
	var element = $(e.currentTarget);
	element.contextMenu([
	{
		name: CBI18n.gettext('Insert before'),
		fun:function(){that.appendBefore(e)}
	},
	{
		name:CBI18n.gettext('Insert after'),
		fun:function(){that.appendAfter(e)}
	},
	{
		name:CBI18n.gettext('Insert subsection'),
		fun:function(){that.appendSubsection(e)}
	},
  {
    name:CBI18n.gettext('Duplicate section'),
    fun:function(){
      var section = $(element).closest('[data-cbsectionid]').get();
      that.duplicateSection(section);
    }
  },
	{
		name:CBI18n.gettext('Delete'),
		fun: function(){
      var section = $(element).closest('[data-cbsectionid]');
      var parentid = $(section).parent().closest('[data-cbsectionid]').attr('data-cbsectionid');
      var sectionid = section.attr('data-cbsectionid');
			that.dialogDeleteSection(sectionid,parentid);
		}
	},
	{
		name:CBI18n.gettext('Edit'),
		fun: function(){
			that.dialogUpdateSectionName($(element).closest('[data-cbsectionid]').attr('data-cbsectionid'));
		}
	}]);
	element.trigger('click.contextMenu',[e]);
};



ProView.prototype.appendBefore = function appendBefore(e){
  var CBStorage = application.storagemanager.getInstance();
  var controller = application.controller.getInstance();
  var that = e.data.that;
  var actualcbsectionid = $(e.currentTarget).closest('[data-cbsectionid]').attr('data-cbsectionid');
  var listparents = $(e.currentTarget).parents('.cbsection');
  var backend = application.backend.core.getInstance();
  var parent = null;
  if (listparents.length <2){
    parent = "root";
  }
  else{
    parent = $(listparents[1]).attr('data-cbsectionid');
  }
  var cbsecid = backend.appendNewSectionObjectByUID(parent,'basic',actualcbsectionid);
  var son = that.createSectionView(cbsecid);
  $(listparents[0]).before(son);
  that.reloadSortable();
  controller.numberSection(cbsecid,parent);
  that.dialogUpdateSectionName(cbsecid);
  
}


ProView.prototype.appendSubsection = function appendSubsection(e){
  var that = e.data.that;
  var CBStorage = application.storagemanager.getInstance();
  var controller = application.controller.getInstance();
  var parent = $(e.currentTarget).parents('.cbsection');
  var backend = application.backend.core.getInstance();
  var parentObjectSection = $(parent[0]).attr('data-cbsectionid');
  var cbsecid = backend.appendNewSectionObjectByUID(parentObjectSection,'basic');
  var newsection = that.createSectionView(cbsecid);
  $(parent[0]).children("ul").append(newsection);

  that.reloadSortable();
  controller.numberSection(cbsecid,parentObjectSection);  
  that.dialogUpdateSectionName(cbsecid);
}

ProView.prototype.appendAfter = function appendAfter(e){
  var that = e.data.that;
  var actualcbsectionid = $(e.currentTarget).closest('[data-cbsectionid]').attr('data-cbsectionid');
  var controller = application.controller.getInstance();
  var CBStorage = application.storagemanager.getInstance();
  var backend = application.backend.core.getInstance();
  var listparents = $(e.currentTarget).parents('.cbsection');
  var parentObjectSection = null;
  if (listparents.length <2){
    parentObjectSection = "root";
  }
  else{
    parentObjectSection = $(listparents[1]).attr('data-cbsectionid');
  }
  var cbsecid = backend.appendNewSectionObjectByUID(parentObjectSection,'basic',actualcbsectionid,1);
  var son = that.createSectionView(cbsecid);
  $(listparents[0]).after(son);
  that.reloadSortable();
  controller.numberSection(cbsecid,parentObjectSection);
  that.dialogUpdateSectionName(cbsecid);
  
}

ProView.prototype.selectSection = function selectSection(e){
  var that = e.data.that;
  var changesectionevent = new Event('changesection',{
    'bubbles':true,
    'cancelable':true
  });
  changesectionevent.detail = {'element':this};
  var canceled = false;
  [].forEach.call(document.querySelectorAll(Cloudbook.UI.targetcontent + " .cbobject"),function(element){
    var auxcanceled = element.dispatchEvent(changesectionevent);
    if (!auxcanceled) canceled = true;
  });

  if (canceled) return;
  Cloudbook.UI.cbobjectselected = null;
  if (Cloudbook.UI.selected !== undefined){
    $(Cloudbook.UI.selected.children('.displaysection')).removeClass('sectionselected');
  }
  Cloudbook.UI.selected = $($(this).parents('.cbsection')[0]);
  Cloudbook.UI.selected.children('.displaysection').addClass('sectionselected');
  var ui = application.ui.core.getInstance();
  ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));

     
}

ProView.prototype.updateSectionName = function(name,cbsectionid) {
  var that = this;
  $("li[data-cbsectionid='"+cbsectionid+"'] > div.displaysection > div.divselector").html(that.getFormatSectionName(cbsectionid));
};


ProView.prototype.dialogUpdateSectionName = function dialogUpdateSectionName(cbsectionid) {
  var CBStorage = application.storagemanager.getInstance();

  var controller = application.controller.getInstance();
  var template = application.util.template.getTemplate('templates/updateSectionName.hbs');
  var valor = {sectionname:CBStorage.getSectionById(cbsectionid).name};
  var dialog = $(template(valor));

  dialog.find('button').click(function(){
  	var name = $('#sectionname').val();
  	controller.updateSectionName(name,cbsectionid);
  	dialog.dialog('close');
  	dialog.remove();
  });

  dialog.find('#sectionname').keyup(function(e){
      var seccion = $('#sectionname').val();
      if(seccion==""){
      	 
	      $("#validateindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
       	dialog.find('button').attr("disabled","disabled");		
		
      }else {
      	$("#validateindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
       	dialog.find('button').removeAttr("disabled");
   		
      }
   }).focus();

  dialog.find('#sectionname').keypress(function(e){
      if (e.which==13){
        var seccion = $('#sectionname').val();
      	if(seccion!=""){ 
         	dialog.find('button').click();
        }
      }
  });
  dialog.dialog({modal:true,dialogClass: "cbdialog",closeOnEscape: false});

}

ProView.prototype.deleteSection = function deleteSection(cbsectionid) {
  $('[data-cbsectionid="'+cbsectionid+'"]').remove();
  $(Cloudbook.UI.targetcontent).html("");
};


ProView.prototype.dialogDeleteSection = function dialogDeleteSection(cbsectionid,parentid) {
  var that=this;
  var dialog = $('<div><button id="delete">'+ CBI18n.gettext("Delete") +'</button><button id="cancel">'+ CBI18n.gettext("Cancel") +'</button></div>');
  dialog.children('#delete').click(function(){
    var CBStorage = application.storagemanager.getInstance();
    var parent=CBStorage.getSectionById(parentid); 
    var numbersection = parent.sections.indexOf(cbsectionid) + 1 ;
    var controller = application.controller.getInstance();
    var backend = application.backend.core.getInstance();
    controller.popSubsection(parentid,cbsectionid);
    controller.deleteSection(cbsectionid);
    controller.renumberSection (parentid,numbersection,'D');
    dialog.dialog('close');
  });  
  dialog.children('#cancel').click(function(){dialog.dialog('close');});
  dialog.dialog({dialogClass: "cbdialog",modal:true,close:function(){$(this).remove()}});

};

ProView.prototype.appendSectionToLastPosition = function(cbsectionid,parentid) {
  var that = this;
  var ui = application.ui.core.getInstance();
  var dest = $("[data-cbsectionid='"+parentid+"'] > ul").children(".cbsection:last");
  if (dest.length > 0 )
    dest.after(that.createSectionView(cbsectionid));
  else
    $("[data-cbsectionid='"+parentid+"'] > ul").append(that.createSectionView(cbsectionid));
  that.reloadSortable();
};

ProView.prototype.duplicateSection = function(htmlsectionelement) {
  var backend = application.backend.core.getInstance();
  var controller = application.controller.getInstance();
  var tempsection  = $(htmlsectionelement);
  var sectionid = tempsection.attr('data-cbsectionid');
  var parentsectionid = tempsection.parent().closest('[data-cbsectionid]').attr('data-cbsectionid');
  var newsectionid=controller.cloneSection(sectionid,parentsectionid,sectionid);
  controller.numberSection(newsectionid,parentsectionid);
  
};

ProView.prototype.appendSection = function(cbsectionid,parentid,needle,position) {
  var that = this;
  var section = that.createSectionView(cbsectionid);
  var CBStorage = application.storagemanager.getInstance();
  if(needle){
    $("[data-cbsectionid='"+needle+"']").after(section);
  }
  else{
    $("[data-cbsectionid='"+parentid+"'] > ul").append(section);
  }
  var cbsection = CBStorage.getSectionById(cbsectionid);
  cbsection.sections.forEach(function(subsectionid){
    that.appendSection(subsectionid,cbsectionid);
  });
  that.reloadSortable();
    
};



module.exports = ProView;
//@ sourceURL=file:///usr/share/cloudbook/src/js/lib/gui/proview/core.js
