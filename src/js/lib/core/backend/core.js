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

}

/**
 * Check exists workspace and userconfig. If any not exists, create it.
 */
Backend.prototype.prepareWorkspace = function prepareWorkspace() {
  var fs = require('fs'),
      userConfig = application.config.user.getInstance();
  if ( ! fs.existsSync(Cloudbook.workspace)){
    fs.mkdirSync(Cloudbook.workspace);
  }
  userConfig.initialize();
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
  Cloudbook.Sections['basic'] = CBUtil.req('js/lib/core/components/cbsection.js');
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
        css.href = pluginpath + "/" + csspath;
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
      auxcbsection.name = "root";
      CBStorage.setRoot(auxcbsection);
  
};

Backend.prototype.createFirstSection = function createFirstSection() {
  return this.appendNewSectionObjectByUID('root','basic');
};

/**
 * Create new section and append into section indicate. This section is identifier string instead of CBSection object. 
 * @param  {String} cbparentuid       Section identifier where new section will be added
 * @param  {String} typesection Type of section to create.
 * @return {String}             Identifier that section created
 */
Backend.prototype.appendNewSectionObjectByUID = function appendNewSectionObjectByUID(cbparentuid,typesection,needle,movement) {
  var cbsonuid = CBUtil.uniqueId();
  var auxcbsection = new Cloudbook.Sections[typesection]();
  var CBStorage = application.storagemanager.getInstance();
  CBStorage.setSectionById(auxcbsection,cbsonuid);
  var parentsection = CBStorage.getSectionById(cbparentuid);
  if (needle !== undefined){
    var indexposition = parentsection.sections.indexOf(needle);
    if (movement !== undefined){
      indexposition += movement;
    }
    if(indexposition >= 0 ){
      parentsection.sections.splice(indexposition,0,cbsonuid);
    }
    else{
     parentsection.sections.splice(parentsection.sections.length,0,cbsonuid); 
    }
  }
  else{
    parentsection.sections.push(cbsonuid);
  }
  CBStorage.setSectionById(parentsection,cbparentuid);
  return cbsonuid;
};

/**
 * Load project from path. This method void project and discard not saved changes. 
 * @param  {String} projectPath 
 */
Backend.prototype.loadProject = function(projectPath) {
  var fs = require('fs');
  var path = require('path');
  if (fs.existsSync(projectPath)){
    var contentproject = fs.readFileSync(projectPath);
    var CBStorage = application.storagemanager.getInstance();
    var projectdata = JSON.parse(contentproject);

    Project.Info.projectpath = path.dirname(projectPath);
    Project.Info.projectname = projectdata.name;

    this.voidProject();
    Project.Info.projectname = projectPath;

    projectdata.data.sections.forEach(function(section){
      var cbsectionid = section[0];
      var rawsection = section[1];
      var tempsection = new Cloudbook.Sections[rawsection.idtype](rawsection);

      rawsection.content.forEach(function(element){
        var x = new Cloudbook.Actions[element['idtype']]['component'](element);
        tempsection.content.push(x);
      });
      CBStorage.setSectionById(tempsection,cbsectionid);
    });
  }
  
};

/**
 * Save project into path indicate. This function don't save binary files. This files are stored 
 * into folder created for this purpose on workspace folder.  
 * @param  {String} projectPath Path where project will be stored
 */
Backend.prototype.saveProject = function(projectfolder) {
  var fs = require('fs');
  var objectProject = {};
  var CBStorage = application.storagemanager.getInstance();
  var projectpath = projectfolder + "/project.cloudbook";
  objectProject['name'] = Project.Info.projectname;
  objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
  objectProject['data'] = {};
  objectProject['data']['sections'] = [];
  function walk(uid){
    var section = CBStorage.getSectionById(uid);
    return {obj: section, list: section.sections};
  }
  var root = CBStorage.getRoot();
  objectProject['data']['sections'].push(['root',root]);
  var pool = [];
  pool = pool.concat(root.sections);
  var identifier = null;
  var result = null;
  while(identifier = pool.pop()){
    result = walk(identifier);
    objectProject['data']['sections'].push([identifier,result.obj]);
    pool = pool.concat(result.list);
  }
  var result_string = JSON.stringify(objectProject,null," ");
  fs.writeFile(projectpath,result_string);
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
  section.sections = subsectionsids;
  CBStorage.setSectionById(section,sectionid);
};

/**
 * Create new project with its folder. Also add information into userconfig.
 * @param  {String} projectname Project name
 */
Backend.prototype.createProject = function createProject(projectname) {
  var fs = require('fs'),
      userconfig = application.config.user.getInstance();
  /**
   * Path project save all files
   * @type {String}
   */
  Project.Info.projectpath = Cloudbook.workspace + projectname;
  /**
   * Project name
   * @type {String}
   */
  Project.Info.projectname = projectname;
  fs.mkdirSync(Project.Info.projectpath,0775);
  fs.mkdirSync(Project.Info.projectpath+"/rsrc",0775);
  userconfig.newProject(projectname);
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

/**
 * Delete files all 
 * @param  {[type]} cbsectionid [description]
 * @return {[type]}             [description]
 */
Backend.prototype.deleteSection = function(cbsectionid) {
  /**
   * @todo This method must delete binary files related with section and subsections
   */
  var CBStorage = application.storagemanager.getInstance();
  var pool = [cbsectionid];
  while(tempcbsectionid = pool.shift()){
    section = CBStorage.getSectionById(tempcbsectionid);
    pool = pool.concat(section.sections);
    CBStorage.deleteSectionById(tempcbsectionid);
  }

};

Backend.prototype.popSubsection = function popSubsection(cbsectionid,cbsonid) {
  var CBStorage = application.storagemanager.getInstance();
  var section = CBStorage.getSectionById(cbsectionid);
  if (section !== undefined){
    section.sections.splice(section.sections.indexOf(cbsonid),1);
    CBStorage.setSectionById(section,cbsectionid);
  }
  
};

/**
 * This namespace has singleton instance of Backend class
 * @namespace backend
 * @memberOf application
 */
CBUtil.createNameSpace('application.backend.core');
application.backend.core = CBUtil.singleton(Backend);
