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
   * Version of cloudbook
   * @type String
   */
  Cloudbook.version = require('./package.json').version;
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
    if(description.hasOwnProperty('disabled') && description.disabled){
      return 0;
    }
    Cloudbook.Actions[description.idtype] = {};
    Cloudbook.Actions[description.idtype]['path'] = componentpath;
    Cloudbook.Actions[description.idtype]['component'] = CBUtil.req(path.join(componentpath,'core.js'));
    Cloudbook.Actions[description.idtype]['metadata'] = description;
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
      CBStorage.setSectionById(tempsection,cbsectionid);
    });

    projectdata.data.objects.forEach(function(cbobject){
      var cbobjectid = cbobject[0];
      var rawobject = cbobject[1];
      var x = new Cloudbook.Actions[rawobject.idtype]['component'](rawobject);
      CBStorage.setCBObjectById(x,cbobjectid);

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
  objectProject['info'] = Project.Info;
  objectProject['cloudbook'] = {};
  objectProject['cloudbook']['version'] = Cloudbook.version;
  objectProject['data'] = {};
  objectProject['data']['sections'] = [];
  objectProject['data']['objects'] = [];
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
  var listkeys = CBStorage.getRootObject();
  listkeys.forEach(function(id){
    var auxobject = CBStorage.getCBObjectById(id);
    auxobject.componentversion = Cloudbook.Actions[auxobject.idtype]['metadata'].version;
    objectProject['data']['objects'].push([id,auxobject]);
  });
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
  var x = CBStorage.getSectionById(cbsectionid);
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

Backend.prototype.appendCBObjectIntoSection = function appendCBObjectIntoSection(cbobject,cbsectionid) {
  var CBStorage = application.storagemanager.getInstance();
  CBStorage.setCBObjectById(cbobject,cbobject.uniqueid);
  var section = CBStorage.getSectionById(cbsectionid);
  section.content.push(cbobject.uniqueid);
  CBStorage.setSectionById(section,cbsectionid);
};


Backend.prototype.removeCBObjectById = function removeCBObjectById(cbsectionid,cbobjectid) {
  var CBStorage = application.storagemanager.getInstance();
  var section = CBStorage.getSectionById(cbsectionid);
  section.content.splice(section.content.indexOf(cbobjectid),1);
  CBStorage.setSectionById(section,cbsectionid);
  CBStorage.deleteCBObjectById(cbobjectid);
};

Backend.prototype.modifyObjectLevelLayer = function modifyObjectLevelLayer(cbobjectid,level) {
  var CBStorage = application.storagemanager.getInstance();
  var cbobject = CBStorage.getCBObjectById(cbobjectid);
  cbobject.levellayer = level;
  CBStorage.setCBObjectById(cbobject);
};

Backend.prototype.checkUpstreamVersion = function checkUpstreamVersion(){
  var that = this;
  $.get("https://github.com/cloud-book/cloudbook/raw/master/src/package.json",function(data){
    var upstreampackage = JSON.parse(data);
    if (upstreampackage.version > Cloudbook.version ){
      var dialog = $("<div></div>").addClass("newversionavailable").html(CBI18n.gettext("New version available :") + upstreampackage.version);
      dialog.dialog({
          position:{my:"right bottom", at:"right bottom",of: window},
          show:{effect:"slide",direction:"right"},
          hide:{effect:"slide",direction:"right"},
          open:function(){setTimeout(function(){dialog.dialog('close')},2500)}
        });
    }
  });
};

Backend.prototype.cloneCBObject = function(cbobjectid,cbsectionid) {
  var storagemanager = application.storagemanager.getInstance();
  var clone = JSON.parse(JSON.stringify(storagemanager.getCBObjectById(cbobjectid)));
  var cbclone = new Cloudbook.Actions[clone.idtype]['component'](clone);
  cbclone.cloneTrigger();
  this.appendCBObjectIntoSection(cbclone,cbsectionid);
  return cbclone.uniqueid;
};

Backend.prototype.cloneSection = function(cbsectionid,parentsection,needle) {
  var storagemanager = application.storagemanager.getInstance();
  var controller = application.controller.getInstance();
  var section = storagemanager.getSectionById(cbsectionid);
  var that = this;
  var args = [parentsection,section.idtype];
  if (needle) {
    args.push(needle);
    args.push(1);
  }
  var newcbsectionid = this.appendNewSectionObjectByUID.apply(this,args);
  section.content.forEach(function(auxcbobjectid){
    controller.cloneCBObject(auxcbobjectid,newcbsectionid);
  });
  var listsections = section.sections.map(function(auxcbsectionid){
    return that.cloneSection(auxcbsectionid,newcbsectionid);
  });
  var auxsection = storagemanager.getSectionById(newcbsectionid);
  auxsection.sectsions = listsections;
  storagemanager.setSectionById(auxsection,newcbsectionid);
};

/**
 * This namespace has singleton instance of Backend class
 * @namespace backend
 * @memberOf application
 */
CBUtil.createNameSpace('application.backend.core');
application.backend.core = CBUtil.singleton(Backend);
