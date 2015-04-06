/**
 * Manager user config file
 * @class ConfigUserManager
 */
function ConfigUserManager(){
	/**
   * Path to workspace folder by default
   * @type {String}
   */
   Cloudbook.workspace = process.env['HOME'] + "/cloudbook-workspace/";
  /**
   * File where store all project project metadata
   * @type {String}
   */
   Cloudbook.userconfigpath = Cloudbook.workspace + ".conf";

}
ConfigUserManager.prototype.initialize = function initialize() {
	var fs = require('fs');
    if ( ! fs.existsSync(Cloudbook.userconfigpath) ){
    	this.saveUserConfig(this.emptyConfig());
  	}
};

ConfigUserManager.prototype.emptyConfig = function emptyConfig() {
	return {projects:[]};
};

ConfigUserManager.prototype.defaultProject = function defaultProject() {
	return {date:new Date(), name:"", path:""};
};

/**
 * Create initial information of project on userconfig 
 * @param  {String} projectname [description]
 */
ConfigUserManager.prototype.newProject = function newProject(projectname) {
  // Save project into userconfig
  var userconfig = this.getUserConfig();
  var tempproject = {name:projectname,path:Project.Info.projectpath};
  userconfig.projects.push($.extend(this.defaultProject(),tempproject));
  this.saveUserConfig(userconfig);
};

/**
 * Save user config on file system
 * @param  {Object[]} jsoninfo JSON with user config and projects metadata
 * @return {Boolean}          Success
 */
ConfigUserManager.prototype.saveUserConfig = function saveUserConfig(jsoninfo) {
  var fs = require('fs');
  fs.writeFileSync(Cloudbook.userconfigpath,JSON.stringify(jsoninfo,null,"\t"),{encoding:"utf-8"});
  return true;
};

/**
 * Return JSON object with user configuration and metadata from projects
 * @return {Object[]} JSON with user config
 */
ConfigUserManager.prototype.getUserConfig = function getUserConfig() {
  var fs = require('fs');
  return JSON.parse(fs.readFileSync(Cloudbook.userconfigpath));
};


ConfigUserManager.prototype.getLastProjects = function getLastProjects() {
	var allprojects = this.getUserConfig();
	return allprojects.projects.sort(function(a,b){return new Date(a.date) - new Date(b.date)});
};

CBUtil.createNameSpace('application.config.user');
application.config.user = CBUtil.singleton(ConfigUserManager);