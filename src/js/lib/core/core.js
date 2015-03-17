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


  Cloudbook.workspace = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'] + "/Cloudbook/";
  Cloudbook.userconfigpath = Cloudbook.workspace + ".conf";

}


Core.prototype.prepareWorkspace = function prepareWorkspace() {
  var fs = require('fs');
  if ( ! fs.existsSync(Cloudbook.workspace)){
    fs.mkdirSync(Cloudbook.workspace);
  }
  if ( ! fs.existsSync(Cloudbook.userconfigpath) ){
    this.saveUserConfig({projects:[]});
  }
};

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
 * Initalize sections. This void Sections namespace and render initial section
 */
Core.prototype.initSections = function initSections() {
  var that = this;
  var CBStorage = base.storagemanager.getInstance();
  /**
   * List sections. See {@link CBSection}
   * @namespace Project.Data.Sections
   */
  
  var auxcbsection = new Cloudbook.Sections['basic']();

  CBStorage.setRoot(auxcbsection);
  CBStorage.setSectionById(auxcbsection,'1');

  return this.appendNewSectionObject(Project.Data.Sections,'basic');
};

Core.prototype.appendNewSectionObject = function appendNewSectionObject(cbsection,typesection) {
  var cbsecid = CBUtil.uniqueId();
  var auxcbsection = new Cloudbook.Sections[typesection]();
  var CBStorage = base.storagemanager.getInstance();
  CBStorage.setSectionById(auxcbsection,cbsecid)
  cbsection.sections.push(auxcbsection);
  return cbsecid;
};

Core.prototype.appendNewSectionObjectByUID = function appendNewSectionObjectByUID(cbuid,typesection) {
  var cbsecid = CBUtil.uniqueId();
  var auxcbsection = new Cloudbook.Sections[typesection]();
  var CBStorage = base.storagemanager.getInstance();
  CBStorage.setSectionById(auxcbsection,cbsecid)
  CBStorage.getSectionById(cbuid).sections.push(auxcbsection);
  return cbsecid;
};

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
  var CBStorage = base.storagemanager.getInstance();
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


Core.prototype.loadContent = function loadContent(id){
  var CBStorage = base.storagemanager.getInstance();
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

Core.prototype.regenerateSubsection = function regenerateSubsection(sectionid,subsectionsids) {
  var CBStorage = base.storagemanager.getInstance();
  var section = CBStorage.getSectionById(sectionid);
  var listsubsections = [];
  subsectionsids.forEach(function(element){
    listsubsections.push(CBStorage.getSectionById(element));
  });
  section.sections = listsubsections;
};

Core.prototype.createProject = function createProject(projectname) {
  var fs = require('fs');

  Project.Info.projectpath = Cloudbook.workspace + projectname;
  Project.Info.projectname = projectname;
  fs.mkdirSync(Project.Info.projectpath,0775);
  fs.mkdirSync(Project.Info.projectpath+"/rsrc",0775);
  // Save project into userconfig
  var userconfig = this.getUserConfig();
  var project = {}
  project.date = new Date();
  project.name = projectname;
  project.path = Project.Info.projectpath;
  userconfig.projects.push(project);
  this.saveUserConfig(userconfig);
};


Core.prototype.checkProjectExists = function checkProjectExists(projectname) {
  var fs = require('fs');
  if(fs.existsSync(Cloudbook.workspace + projectname)){
    return true;
  }
  return false;
};

Core.prototype.getUserConfig = function getUserConfig() {
  var fs = require('fs');
  return JSON.parse(fs.readFileSync(Cloudbook.userconfigpath));
};


Core.prototype.saveUserConfig = function saveUserConfig(jsoninfo) {
  var fs = require('fs');
  fs.writeFileSync(Cloudbook.userconfigpath,JSON.stringify(jsoninfo),{encoding:"utf-8"});
  return true;
};

Core.prototype.updateSectionName = function(name,cbsectionid) {
  var CBStorage = base.storagemanager.getInstance();
  x = CBStorage.getSectionById(cbsectionid);
  x.name = name;
  CBStorage.setSectionById(x,cbsectionid);
};



CBUtil.createNameSpace('base.core');
base.core = CBUtil.singleton(Core);
