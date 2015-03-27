/**
 * This class contain all commons and generic functions to call other specific functions from other class. 
 * For example, updateSectionName function is a function to update section name. For this purpose must call
 * methods from backend and ui. With this method, on application only call this method and this will call
 *  all needed functions  
 */
function Controller(){

}

/**
 * Update section name 
 * @param  {String} name        New section name
 * @param  {String} cbsectionid Section id to rename
 */
Controller.prototype.updateSectionName = function(name,cbsectionid) {
	var backend = application.backend.getInstance();
	var ui = application.ui.getInstance();
	backend.updateSectionName(name,cbsectionid);
	ui.updateSectionName(name,cbsectionid);
};

/**
 * Create new project on pro view.
 * @param  {String} name Project name
 */
Controller.prototype.createProProject = function createProProject(name) {
	CBUtil.include("js/lib/gui/menu.js");
 	var backend = application.backend.getInstance()
 	var ui = application.ui.getInstance()
 	backend.createProject(name);
 	backend.loadSectionsObjects();
 	ui.renderActionsButtons();
 	ui.initSectionsPro();
};

/**
 * Delete section indicate. This method delete all files contained into sections and subsections
 * @param  {String} cbsectionid Section id to delete
 */
Controller.prototype.deleteSection = function(cbsectionid) {
	var backend = application.backend.getInstance();
	var ui = application.ui.getInstance();
	backend.deleteSection(cbsectionid);
	ui.deleteSection(cbsectionid);
};

Controller.prototype.createSimpleProject = function createSimpleProject(name) {
	throw "Method not implemented";
};

/**
 * This namespace has singleton instance of Controller class
 * @namespace controller
 * @memberOf application
 */
CBUtil.createNameSpace('application.controller');
application.controller = CBUtil.singleton(Controller);