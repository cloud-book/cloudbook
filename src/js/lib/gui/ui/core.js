/**
 * Responsible class to manage all things related with GUI
 * @constructor
 */
function UI(){
  this.sectionmanager = null;
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
  var controller = application.controller.getInstance();
  fullobject.clickButton(controller);
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

  return result;
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

UI.prototype.loadProject = function loadProject(path) {
  var CBStorage = application.storagemanager.getInstance();
  var root = CBStorage.getRoot();
  var that = this;
  this.setSectionManager('Pro');
  this.sectionmanager.initSections();
  var pool = [];
  pool = root.sections.map(function(el){return {parent:'root',identifier:el}});
  while(node = pool.shift()){
    var son = that.sectionmanager.createSectionView(node.identifier);
    $('[data-cbsectionid="'+node.parent+'"] > ul').append(son);
    var objraw = CBStorage.getSectionById(node.identifier);
    pool = pool.concat(objraw.sections.map(function(el){return {parent:node.identifier,identifier:el}}));
  }
  $("#navsections > ul > li:first-child > .displaysection .divselector").click();
};

UI.prototype.emptyTargetContent = function emptyTargetContent() {
  var targetcontent = $(Cloudbook.UI.targetcontent);
  targetcontent.get()[0].removeEventListener('click',this.removeSelectElement);
  targetcontent.get()[0].addEventListener('click',this.removeSelectElement);
  targetcontent.empty();
};

UI.prototype.removeSelectElement = function removeSelectElement(event) {
  Cloudbook.UI.cbobjectselected.removeClass('selected');
};


UI.prototype.setSectionManager = function(type) {
  if( type === "Pro" ){
    var promanager = CBUtil.req('js/lib/gui/ui/proview/core.js');
    this.sectionmanager = new promanager();
  }
  else{
    var simplemanager = CBUtil.req('js/lib/gui/ui/simpleview/core.js');
    this.sectionmanager = new simplemanager();
  }
};

UI.prototype.setTitleName = function(text) {
  document.title = text + " - CloudBook" ;
};


/**
 * This namespace has singleton instance of UI class
 * @namespace ui
 * @memberOf application
 */
CBUtil.createNameSpace('application.ui.core');
application.ui.core = CBUtil.singleton(UI);
