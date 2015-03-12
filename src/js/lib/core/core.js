/**
 * @class Core
 * @classdesc This class is responsible to manage all app. 
 */
function Core() {
  /**
   * Root all project info
   * @namespace Project
   */
  CBUtil.createNameSpace('Project');
  /**
   * Root all cloudbook info
   * @namespace Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook');
  /**
   * Components are loaded
   * @namespace Actions
   * @memberOf Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook.Actions');
  /**
   * Sections are available
   * @namespace Sections
   * @memberOf Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook.Sections');
  /**
   * Ui information
   * @namespace UI
   * @memberOf Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook.UI');
  /**
   * Description of project. This contain authods, name project , etc
   * @namespace Info
   * @memberOf Project
   */
  CBUtil.createNameSpace('Project.Info');
  /**
   * Information of metadata Dublin Core
   * @namespace Info
   * @memberOf Project
   */
  CBUtil.createNameSpace('Project.Info.DublinCore');
  /**
   * Information of metadata LOM-ES
   * @namespace Info
   * @memberOf Project
   */
  CBUtil.createNameSpace('Project.Info.LOM');
  /**
   * All sections, subsections and components of project
   * @namespace Data
   * @memberOf Project
   */
  CBUtil.createNameSpace('Project.Data');

  /**
   * Define jquery selector where render CBObjects
   * @type {String}
   */
  Cloudbook.UI.targetcontent = '#targetcontent';
  /**
   * Define jquery selector where render components buttons
   * @type {String}
   */
  Cloudbook.UI.navactions = '#navactions';
  /**
   * Define jquery selector where render components buttons
   * @type {String}
   */
  Cloudbook.UI.navsections = '#navsections';
}


/**
 * Go over components path to find components and append this components on Project.Actions namespace. 
 */
Core.prototype.loadComponents = function loadComponents() {
  this.loadComponentsRecursive('./components');

};

/**
 * Go over components path to find components and append this components on Cloudbook.Actions with id
 * Also load extra scripts needed to components work fine
 * @param  {String} componentpath Path to load component
 */
Core.prototype.loadComponentsRecursive = function loadComponentsRecursive(componentpath) {
  var fs = require('fs');
  var path = require('path');
  var that = this;
  var metadatapath = path.join(componentpath,'metadata.json');
  if(fs.existsSync(metadatapath)){
    var description = require("./"+metadatapath);
    Cloudbook.Actions[description.idtype] = {};
    Cloudbook.Actions[description.idtype]['path'] = componentpath;
    Cloudbook.Actions[description.idtype]['component'] = CBUtil.req(path.join(componentpath,'core.js'));
    that.loadComponentExtraScripts(componentpath , description);
  }
  else{
    var listdirectories = CBUtil.readOnlyDirectories(componentpath);
    listdirectories.forEach(function(directory){
      that.loadComponentsRecursive(path.join(componentpath,directory));

    });
  }

};

/**
 * Load all sections available 
 */
Core.prototype.loadSectionsObjects = function() {
  Cloudbook.Sections = {};
  Cloudbook.Sections['basic'] = CBUtil.req('js/lib/core/cbsection/cbsection.js');
};


/**
 * Create components buttons to append elements into selected section.
 * Here method call editorView and add_callback methods of CBObjects. 
 * See 
 * {@link CBObject#editorView} and 
 * {@link CBObject.add_callback}
 */
Core.prototype.renderActionsButtons = function renderActionsButtons(){
    var that = this;
    var path = require('path');
    Object.keys(Cloudbook.Actions).forEach(function (component) {
      var componentpath = Cloudbook.Actions[component]['path'];
      var description = require("./" + path.join(componentpath,"metadata.json"));
      that.loadComponentExtraCss(componentpath,description);
      $(Cloudbook.UI.navactions).append($(document.createElement('button'))
          .bind('click', function () {that.getCBObjectFromButton(component)})
          .html(that.calculeButtonContent(componentpath, description)));
    });
}

/**
 * Create element from component. This include cbobject and rendered view on targetcontent. 
 * When append rendered view on targetcontent then trigger add_callback function related with component
 * @param  {String} component Component idtype indicated on metadata file.
 */
Core.prototype.getCBObjectFromButton = function getCBObjectFromButton(component) {
  var fullobject = new Cloudbook.Actions[component]['component']();
  var viewobject = $(fullobject.editorView());
  $(Cloudbook.UI.targetcontent).append(viewobject);
  fullobject.add_callback(viewobject,fullobject);
  var sectionWhereAppend = CBStorage.getSectionById(Cloudbook.UI.selected.attr('data-cbsectionid'));
  sectionWhereAppend.content.push(fullobject);
};


/**
 * On component metadata file may be field "external_scripts" . This field include libraries must be included on head file to work component fine.
 * This method is reponsible read metadata info to be include all files indicate on "external_scripts". This files are loaded 
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String[]} infobutton.external_scripts List paths to be included. This not support folders, only files.
 */
Core.prototype.loadComponentExtraScripts = function loadComponentExtraScripts(pluginpath,infobutton) {
  if (infobutton.hasOwnProperty('external_scripts')) {
      var fs = require('fs');
      var path = require('path');
      infobutton['external_scripts'].forEach(function(scriptpath){
        var script = fs.readFileSync("./"+ path.join(pluginpath,scriptpath),'utf8');
        eval(script);
      });
  } 
};


/**
 * On component metadata file may be field "external_css" . This field include style files that may be included to decorate component 
 * function or elements created by component . This method is reponsible read metadata info to be include all files indicate on "external_scripts". This files are loaded 
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String[]} infobutton.external_css List paths to be included. This not support folders, only files.
 */
Core.prototype.loadComponentExtraCss = function loadComponentExtraCss(pluginpath, infobutton){
  if (infobutton.hasOwnProperty('external_css')) {
      var head = document.getElementsByTagName('head')[0];
      infobutton['external_css'].forEach(function(csspath){
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = pluginpath + csspath;
        head.appendChild(css);
      }); 
  }
}


/**
 * On component metadata file may be field "icon" and "label". This fields are used to create action component button. 
 * When user click this button, on targetcontent to been added an element.
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String} infobutton.icon relative icon path 
 * @param  {String} infobutton.label Label button.
 * @result {String} Html code to be included on button tag
 */
Core.prototype.calculeButtonContent = function calculeButtonContent(pluginpath, infobutton) {
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

/**
 * Initalize sections. This void Sections namespace and render initial section
 */
Core.prototype.initSections = function initSections() {
  var that = this;
  /**
   * List sections. See {@link CBSection}
   * @namespace Project.Data.Sections
   */
  
  var auxcbsection = new Cloudbook.Sections['basic']();

  CBStorage.setRoot(auxcbsection);
  CBStorage.setSectionById(auxcbsection,'1');

  var son = this.getNewSectionObject(Project.Data.Sections,'basic');

  //jQuery.data($(Cloudbook.UI.navsections)[0],'cbsection',Project.Data.Sections);
  var list = $(document.createElement('ul')).addClass("connectedSortable");
  list.append(son);
  $(Cloudbook.UI.navsections).html(list).attr('data-cbsectionid','1');
  $($(son.children('.thumbnail')).children('.sectionimage')).click();
  this.reloadSortable();
};

Core.prototype.getNewSectionObject = function getNewSectionObject(cbsection,typesection) {

  var cbsecid = CBUtil.uniqueId();

  var auxcbsection = new Cloudbook.Sections[typesection]();
  
  CBStorage.setSectionById(auxcbsection,cbsecid)
  cbsection.sections.push(auxcbsection);

  var section = $(document.createElement('li')).addClass('cbsection');
  section.attr('data-cbsectionid',cbsecid);

  var thumbnail = $(document.createElement('div')).addClass('thumbnail');

  var appendbefore = $(document.createElement('div')).addClass('appendbefore');
  var sectionimage = $(document.createElement('div')).addClass('sectionimage');
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
  sectionimage.click({that:this},this.selectThumbnail);

  thumbnail.append([appendbefore,sectionimage,appendsubsection,appendafter]);

  section.append([thumbnail,subsections]);
  return section ;
};

Core.prototype.appendBefore = function appendBefore(e){
  var that = e.data.that;
  var listparents = $(e.currentTarget).parents('.cbsection');
  var parent = null;
  if (listparents.length <2){
    parent = CBStorage.getRoot();
  } 
  else{
    parent = CBStorage.getSectionById($(listparents[1]).attr('data-cbsectionid'));
  }
  var son = that.getNewSectionObject(parent,'basic');
  $(listparents[0]).before(son);
  that.reloadSortable();
}


Core.prototype.appendSubsection = function appendSubsection(e){
  var that = e.data.that;
  var parent = $(e.currentTarget).parents('.cbsection');
  var parentObjectSection = CBStorage.getSectionById($(parent[0]).attr('data-cbsectionid'));
  var newsection = that.getNewSectionObject(parentObjectSection,'basic');
  $(parent[0]).children("ul").append(newsection);
  that.reloadSortable();
}

Core.prototype.appendAfter = function appendAfter(e){
  var that = e.data.that;
  var listparents = $(e.currentTarget).parents('.cbsection');
  var parentObjectSection = null;
  if (listparents.length <2){
    parentObjectSection = CBStorage.getRoot();
  } 
  else{
    parentObjectSection = CBStorage.getSectionById($(listparents[1]).attr('data-cbsectionid'));
  }
  
  var son = that.getNewSectionObject(parentObjectSection,'basic');
  $(listparents[0]).after(son);
  that.reloadSortable();
}

Core.prototype.selectThumbnail = function selectThumbnail(e){
  var that = e.data.that;
  if (Cloudbook.UI.selected !== undefined){
    $(Cloudbook.UI.selected.children('.thumbnail')).removeClass('sectionselected');
  } 
  Cloudbook.UI.selected = $($(this).parents('.cbsection')[0]);
  Cloudbook.UI.selected.children('.thumbnail').addClass('sectionselected');
  that.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

/**
 * Load project from path. This method void project and discard not saved changes. 
 * @param  {String} projectPath 
 */
Core.prototype.loadProject = function(projectPath) {
  var fs = require('fs');
  if (fs.existsSync(projectPath)){
    var contentproject = fs.readFileSync(projectPath);
    var projectdata = JSON.parse(contentproject);
    this.voidProject();
    Project.Info.projectname = projectPath;
    projectdata.data.sections.forEach(function(section){
      var tempsection = [];
      section.forEach(function(element){
        tempsection.push(new Cloudbook.Actions[element['idtype']]['component'](element));
      });
      Project.Data.Sections.push(tempsection);
    });
  }
  
};


Core.prototype.saveProject = function(projectPath) {
  var fs = require('fs');
  var objectProject = {};
  objectProject['name'] = "Nombre temporal";
  objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
  objectProject['data'] = {};
  objectProject['data']['sections'] = CBStorage.getRoot();
  var result_string = JSON.stringify(objectProject,null," ");
  fs.writeFile(projectPath,result_string);
};

Core.prototype.voidProject = function() {
  this.initSections();
};


Core.prototype.loadTheme = function loadTheme(){
  var fs = require('fs');
  var path = require('path');
  Cloudbook.UI.themeeditorpath = path.join('themes','editor','default');
  var cssbasepath = path.join(Cloudbook.UI.themeeditorpath,'css');
  fs.readdirSync(cssbasepath).forEach(function(csspath){
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = path.join(cssbasepath,csspath);
    document.head.appendChild(css);
  });
}


Core.prototype.loadContent = function loadContent(id){
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


Core.prototype.reloadSortable = function reloadSortable(element){
  var that = this;
  $(".connectedSortable").sortable({
    start:function(ev,ui){that.oldparent = ui.item.parent().parent().attr('data-cbsectionid');},
    stop:function(ev,ui){
      that.newparent = ui.item.parent().parent().attr('data-cbsectionid');
      if (that.oldparent !== that.newparent ){
        listoldparent = $("[data-cbsectionid=" + that.oldparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        listnewparent = $("[data-cbsectionid=" + that.newparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        that.regenerateSubsection(that.oldparent,listoldparent.toArray());
        that.regenerateSubsection(that.newparent,listnewparent.toArray());
      }
    },
    connectWith:".connectedSortable"}).disableSelection();
}


Core.prototype.regenerateSubsection = function regenerateSubsection(sectionid,subsectionsids) {
  var section = CBStorage.getSectionById(sectionid);
  var listsubsections = [];
  subsectionsids.forEach(function(element){
    listsubsections.push(CBStorage.getSectionById(element));
  });
  section.sections = listsubsections;
};
