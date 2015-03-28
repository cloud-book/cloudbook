/**
 * Responsible class to manage all things related with GUI
 * @constructor
 */
function UI(){
}


/**
 * Load theme to apply all aplication. This function look for css/js folders and load all find.
 */
UI.prototype.loadTheme = function loadTheme(){
  var fs = require('fs');
  var path = require('path');
  Cloudbook.UI.themeeditorpath = path.join('themes','editor','default');

  var cssbasepath = path.join(Cloudbook.UI.themeeditorpath,'css');
  if(fs.existsSync(cssbasepath)){
    fs.readdirSync(cssbasepath).forEach(function(csspath){
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path.join(cssbasepath,csspath);
      document.head.appendChild(css);
    });
  }
  var scriptsbasepath = path.join(Cloudbook.UI.themeeditorpath,'js');
  if(fs.existsSync(scriptsbasepath)){
    fs.readdirSync(scriptsbasepath).forEach(function(jspath){
      CBUtil.include(path.join(scriptsbasepath,jspath))
    });
  }
}

/**
 * Create components buttons to append elements into selected section.
 * Here method call editorView and add_callback methods of CBObjects.
 * See
 * {@link CBObject#editorView} and
 * {@link CBObject.add_callback}
 */
 UI.prototype.renderActionsButtons = function renderActionsButtons(){

  if(!Cloudbook.UI.renderedActionsButtons){
    var that = this;
    var backend = application.backend.core.getInstance();
    var path = require('path');
    Object.keys(Cloudbook.Actions).forEach(function (component) {
      var componentpath = Cloudbook.Actions[component]['path'];
      var description = require("./" + path.join(componentpath,"metadata.json"));
      backend.loadComponentExtraCss(componentpath,description);
      $(Cloudbook.UI.navactions).append($(document.createElement('button'))
        .bind('click', function () {that.getCBObjectFromButton(component)})
        .addClass('btn').addClass('btn-default')
        .html(that.calculeButtonContent(componentpath, description)));
    });
  /**
   * Flag to detect if actions were rendered
   * @type {boolean}
   */
   Cloudbook.UI.renderedActionsButtons = true;
 }
}

/**
 * Create element from component. This include cbobject and rendered view on targetcontent.
 * When append rendered view on targetcontent then trigger add_callback function related with component
 * @param  {String} component Component idtype indicated on metadata file.
 */
 UI.prototype.getCBObjectFromButton = function getCBObjectFromButton(component) {
  var CBStorage = application.storagemanager.getInstance();
  var fullobject = new Cloudbook.Actions[component]['component']();
  var viewobject = $(fullobject.editorView());
  $(Cloudbook.UI.targetcontent).append(viewobject);
  fullobject.add_callback(viewobject,fullobject);
  var sectionWhereAppend = CBStorage.getSectionById(Cloudbook.UI.selected.attr('data-cbsectionid'));
  sectionWhereAppend.content.push(fullobject);
};

/**
 * On component metadata file may be field "icon" and "label". This fields are used to create action component button.
 * When user click this button, on targetcontent to been added an element.
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String} infobutton.icon relative icon path
 * @param  {String} infobutton.label Label button.
 * @result {String} Html code to be included on button tag
 */
 UI.prototype.calculeButtonContent = function calculeButtonContent(pluginpath, infobutton) {
  var result = "";
  var fs = require('fs');
  var path = require('path');
  if (infobutton.hasOwnProperty('icon')) {
    var iconpath = path.join(pluginpath,infobutton.icon);
    if (fs.existsSync(iconpath)) {
      result = '<img src="' + iconpath + '" />';
    }
  }
  if (infobutton.hasOwnProperty('label')) {
    result += "<div>"+infobutton.label+"</div>";
  }
  return result;
};






UI.prototype.initSectionsPro = function initSectionsPro() {
  var list = $(document.createElement('ul')).addClass("connectedSortable");
  $(Cloudbook.UI.navsections).html(list).attr('data-cbsectionid','root');
};

UI.prototype.createFirstSection = function createFirstSection() {
  var backend = application.backend.core.getInstance();
  var cbsecid = backend.createFirstSection();
  var son = this.createSectionProView(cbsecid);
  var list = $("[data-cbsectionid='root'] > ul");
  list.append(son);
  $($(son.children('.displaysection')).children('.divselector')).click();
  this.reloadSortable();
};


UI.prototype.reloadSortable = function reloadSortable(element){
  var that = this;
  var backend = application.backend.core.getInstance();
  $(".connectedSortable").sortable({
    placeholder: "ui-state-highlight",
    opacity:0.5,
    axis:"y",
    start:function(ev,ui){that.oldparent = ui.item.parent().parent().attr('data-cbsectionid');},
    stop:function(ev,ui){
      that.newparent = ui.item.parent().parent().attr('data-cbsectionid');
      if (that.oldparent !== that.newparent ){
        listoldparent = $("[data-cbsectionid=" + that.oldparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        listnewparent = $("[data-cbsectionid=" + that.newparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        backend.regenerateSubsection(that.oldparent,listoldparent.toArray());
        backend.regenerateSubsection(that.newparent,listnewparent.toArray());
      }
    },
    connectWith:".connectedSortable"}).disableSelection();
}


UI.prototype.createSectionProView = function createSectionProView(cbsecid) {

  var section = $(document.createElement('li')).addClass('cbsection');
  var CBStorage = application.storagemanager.getInstance();
  section.attr('data-cbsectionid',cbsecid);

  var displaysection = $(document.createElement('div')).addClass('displaysection');
  var textsection = $(document.createElement('div')).addClass('divselector');
  var actions = $(document.createElement('button')).html('+').attr('data-toggle','dropdown').attr('id',cbsecid);
  var subsections = $(document.createElement('ul')).addClass('subsections').addClass("connectedSortable");
  textsection.append($(document.createElement('div')).html(CBStorage.getSectionById(cbsecid).name).addClass('caption'));
  
  textsection.click({that:this},this.selectSection);
  actions.click({that:this},this.createMenu);
  displaysection.append([textsection,actions]);
  section.append([displaysection,subsections]);
  return section ;
};

UI.prototype.createMenu = function createMenu(e) {
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
		name:CBI18n.gettext('Delete'),
		fun: function(){
			that.dialogDeleteSection($(element).closest('[data-cbsectionid]').attr('data-cbsectionid'));
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



UI.prototype.createSectionPageView = function createSectionPageView(cbsecid) {

  var section = $(document.createElement('li')).addClass('cbsection');
  section.attr('data-cbsectionid',cbsecid);

  var thumbnail = $(document.createElement('div')).addClass('displaysection');

  var appendbefore = $(document.createElement('div')).addClass('appendbefore');
  var sectionimage = $(document.createElement('div')).addClass('divselector');
  var appendsubsection = $(document.createElement('div')).addClass('appendsubsection');
  var appendafter = $(document.createElement('div')).addClass('appendafter');
  var subsections = $(document.createElement('ul')).addClass('subsections').addClass("connectedSortable");

  appendbefore.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/add.png"));
  appendsubsection.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/subsection.png"));
  appendafter.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/add.png"));
  sectionimage.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/white.png"));


  appendbefore.click({that:this},this.appendBefore);
  appendsubsection.click({that:this},this.appendSubsection);
  appendafter.click({that:this},this.appendAfter);
  sectionimage.click({that:this},this.selectSection);

  thumbnail.append([appendbefore,sectionimage,appendsubsection,appendafter]);

  section.append([thumbnail,subsections]);
  return section ;
};




UI.prototype.appendBefore = function appendBefore(e){
  var CBStorage = application.storagemanager.getInstance();
  var that = e.data.that;
  var listparents = $(e.currentTarget).parents('.cbsection');
  var backend = application.backend.core.getInstance();
  var parent = null;
  if (listparents.length <2){
    parent = "root";
  }
  else{
    parent = $(listparents[1]).attr('data-cbsectionid');
  }
  var cbsecid = backend.appendNewSectionObjectByUID(parent,'basic');
  var son = that.createSectionProView(cbsecid);
  $(listparents[0]).before(son);
  that.reloadSortable();
  that.dialogUpdateSectionName(cbsecid);
}


UI.prototype.appendSubsection = function appendSubsection(e){
  var that = e.data.that;
  var CBStorage = application.storagemanager.getInstance();
  var parent = $(e.currentTarget).parents('.cbsection');
  var backend = application.backend.core.getInstance();
  var parentObjectSection = $(parent[0]).attr('data-cbsectionid');
  var cbsecid = backend.appendNewSectionObjectByUID(parentObjectSection,'basic');
  var newsection = that.createSectionProView(cbsecid);
  $(parent[0]).children("ul").append(newsection);
  that.reloadSortable();
  that.dialogUpdateSectionName(cbsecid);
}

UI.prototype.appendAfter = function appendAfter(e){
  var that = e.data.that;
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
  var cbsecid = backend.appendNewSectionObjectByUID(parentObjectSection,'basic');
  var son = that.createSectionProView(cbsecid);
  $(listparents[0]).after(son);
  that.reloadSortable();
  that.dialogUpdateSectionName(cbsecid);
}

UI.prototype.selectSection = function selectSection(e){
  var that = e.data.that;
  if (Cloudbook.UI.selected !== undefined){
    $(Cloudbook.UI.selected.children('.displaysection')).removeClass('sectionselected');
  }
  Cloudbook.UI.selected = $($(this).parents('.cbsection')[0]);
  Cloudbook.UI.selected.children('.displaysection').addClass('sectionselected');
  that.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

UI.prototype.loadContent = function loadContent(id){
  var CBStorage = application.storagemanager.getInstance();
  $(Cloudbook.UI.targetcontent).html("");
  var section = CBStorage.getSectionById(id);
  if (section !== undefined ){
    section.content.forEach(function (element){
      var x = element.editorView();
      $(Cloudbook.UI.targetcontent).append(x);
      element.add_callback(x,element);
    });
  }
}

UI.prototype.updateSectionName = function(name,cbsectionid) {
  $("li[data-cbsectionid='"+cbsectionid+"'] > div.displaysection > div.divselector").html("<div>"+name+"</div>");
};

UI.prototype.dialogUpdateSectionName = function dialogUpdateSectionName(cbsectionid) {
  var controller = application.controller.getInstance();
  var template = application.util.template.getTemplate('templates/updateSectionName.hbs');
  var dialog = $(template());
  dialog.find('button').click(function(){
  	var name = $('#sectionname').val();
  	controller.updateSectionName(name,cbsectionid);
  	dialog.dialog('close');
  	dialog.remove();
  });
  dialog.dialog({modal:true,dialogClass: "no-close",closeOnEscape: false});
}

UI.prototype.deleteSection = function deleteSection(cbsectionid) {
	$('[data-cbsectionid="'+cbsectionid+'"]').remove();
};


UI.prototype.dialogDeleteSection = function dialogDeleteSection(cbsectionid) {
	var controller = application.controller.getInstance();
	controller.deleteSection(cbsectionid);
};

UI.prototype.loadProject = function loadProject(path) {
  var CBStorage = application.storagemanager.getInstance();
  var root = CBStorage.getRoot();
  var that = this;
  this.initSectionsPro();
  var pool = [];
  pool = root.sections.map(function(el){return {parent:'root',identifier:el}});
  while(node = pool.shift()){
    var son = that.createSectionProView(node.identifier);
    $('[data-cbsectionid="'+node.parent+'"] > ul').append(son);
    var objraw = CBStorage.getSectionById(node.identifier);
    pool = pool.concat(objraw.sections.map(function(el){return {parent:node.identifier,identifier:el}}));
  }
  $("#navsections > ul > li:first-child > .displaysection .divselector").click();
};

UI.prototype.emptyTargetContent = function emptyTargetContent() {
  $(Cloudbook.UI.targetcontent).empty();
};

/**
 * This namespace has singleton instance of UI class
 * @namespace ui
 * @memberOf application
 */

CBUtil.createNameSpace('application.ui.core');
application.ui.core = CBUtil.singleton(UI);
