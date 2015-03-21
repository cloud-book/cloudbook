/**
 * @class Backend
 * @classdesc This class is responsible to manage all app. 
 */
function Backend() {
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

  /**
   * Path to workspace folder by default
   * @type {String}
   */
  Cloudbook.workspace = process.env['HOME'] + "/Cloudbook/";
  /**
   * File where store all project project metadata
   * @type {String}
   */
  Cloudbook.userconfigpath = Cloudbook.workspace + ".conf";

}

/**
 * Check exists workspace and userconfig. If any not exists, create it.
 */
Backend.prototype.prepareWorkspace = function prepareWorkspace() {
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
Backend.prototype.loadComponents = function loadComponents() {
  this.loadComponentsRecursive('./components');

};

/**
 * Go over components path to find components and append this components on Cloudbook.Actions with id
 * Also load extra scripts needed to components work fine
 * @param  {String} componentpath Path to load component
 */
Backend.prototype.loadComponentsRecursive = function loadComponentsRecursive(componentpath) {
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
Backend.prototype.loadSectionsObjects = function() {
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
Backend.prototype.loadComponentExtraScripts = function loadComponentExtraScripts(pluginpath,infobutton) {
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
Backend.prototype.loadComponentExtraCss = function loadComponentExtraCss(pluginpath, infobutton){
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
 * @return {String} Identifier initial section created by default  
 */
Backend.prototype.initSections = function initSections() {
  var that = this,
      CBStorage = application.storagemanager.getInstance(),
      auxcbsection = new Cloudbook.Sections['basic']();

  CBStorage.setRoot(auxcbsection);
  CBStorage.setSectionById(auxcbsection,'1');

  return this.appendNewSectionObject(Project.Data.Sections,'basic');
};


/**
 * Create new section and append into section indicate on method.
 * @param  {CBSection} cbsection   Object section where new section will be added
 * @param  {String} typesection Type of section to create
 * @return {String}             Identifier that section created
 */
Backend.prototype.appendNewSectionObject = function appendNewSectionObject(cbsection,typesection) {
  var cbsecid = CBUtil.uniqueId();
  var auxcbsection = new Cloudbook.Sections[typesection]();
  var CBStorage = application.storagemanager.getInstance();
  CBStorage.setSectionById(auxcbsection,cbsecid)
  cbsection.sections.push(auxcbsection);
  return cbsecid;
};


/**
 * Create new section and append into section indicate. This section is identifier string instead of CBSection object. 
 * @param  {String} cbuid       Section identifier where new section will be added
 * @param  {String} typesection Type of section to create.
 * @return {String}             Identifier that section created
 */
Backend.prototype.appendNewSectionObjectByUID = function appendNewSectionObjectByUID(cbuid,typesection) {
  var cbsecid = CBUtil.uniqueId();
  var auxcbsection = new Cloudbook.Sections[typesection]();
  var CBStorage = application.storagemanager.getInstance();
  CBStorage.setSectionById(auxcbsection,cbsecid)
  CBStorage.getSectionById(cbuid).sections.push(auxcbsection);
  return cbsecid;
};

/**
 * Load project from path. This method void project and discard not saved changes. 
 * @param  {String} projectPath 
 */
Backend.prototype.loadProject = function(projectPath) {
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

/**
 * Save project into path indicate. This function don't save binary files. This files are stored 
 * into folder created for this purpose on workspace folder.  
 * @param  {String} projectPath Path where project will be stored
 */
Backend.prototype.saveProject = function(projectPath) {
  var fs = require('fs');
  var objectProject = {};
  var CBStorage = application.storagemanager.getInstance();
  objectProject['name'] = "Nombre temporal";
  objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
  objectProject['data'] = {};
  objectProject['data']['sections'] = CBStorage.getRoot();
  var result_string = JSON.stringify(objectProject,null," ");
  fs.writeFile(projectPath,result_string);
};


/**
 * Empty project sections
 */
Backend.prototype.voidProject = function() {
  this.initSections();
};

/**
 * Empty targetcontent and render objects from section id indicate into targetcontent.
 * @param  {String} id Section id.
 */
Backend.prototype.loadContent = function loadContent(id){
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

/**
 * Replace subsections of a section by subsections indicate into argument. 
 * @param  {String} sectionid      Id of section
 * @param  {String[]} subsectionsids Id's subsections
 */
Backend.prototype.regenerateSubsection = function regenerateSubsection(sectionid,subsectionsids) {
  var CBStorage = application.storagemanager.getInstance();
  var section = CBStorage.getSectionById(sectionid);
  var listsubsections = [];
  subsectionsids.forEach(function(element){
    listsubsections.push(CBStorage.getSectionById(element));
  });
  section.sections = listsubsections;
};

/**
 * Create new project with its folder. Also add information into userconfig.
 * @param  {String} projectname Project name
 */
Backend.prototype.createProject = function createProject(projectname) {
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

/**
 * Check if project exists
 * @param  {String} projectname Project name
 * @return {Boolean}             True exists project, False not exists
 */
Backend.prototype.checkProjectExists = function checkProjectExists(projectname) {
  var fs = require('fs');
  if(fs.existsSync(Cloudbook.workspace + projectname)){
    return true;
  }
  return false;
};

/**
 * Return JSON object with user configuration and metadata from projects
 * @return {Object[]} JSON with user config
 */
Backend.prototype.getUserConfig = function getUserConfig() {
  var fs = require('fs');
  return JSON.parse(fs.readFileSync(Cloudbook.userconfigpath));
};

/**
 * Save user config on file system
 * @param  {Object[]} jsoninfo JSON with user config and projects metadata
 * @return {Boolean}          Success
 */
Backend.prototype.saveUserConfig = function saveUserConfig(jsoninfo) {
  var fs = require('fs');
  fs.writeFileSync(Cloudbook.userconfigpath,JSON.stringify(jsoninfo),{encoding:"utf-8"});
  return true;
};

/**
 * Update section name. 
 * @param  {String} name        New section name
 * @param  {String} cbsectionid Section identifier to update name.
 */
Backend.prototype.updateSectionName = function(name,cbsectionid) {
  var CBStorage = application.storagemanager.getInstance();
  x = CBStorage.getSectionById(cbsectionid);
  x.name = name;
  CBStorage.setSectionById(x,cbsectionid);
};

Backend.prototype.deleteSection = function(cbsectionid) {
  /**
   * @todo This method must delete binary files related with section and subsections
   */
  throw "Method not implemented";
};

/**
 * This namespace has singleton instance of Backend class
 * @namespace backend
 * @memberOf application
 */
CBUtil.createNameSpace('application.backend');
application.backend = CBUtil.singleton(Backend);
