function Controller(){

}

Controller.prototype.updateSectionName = function(name,cbsectionid) {
	var backend = application.backend.getInstance();
	var ui = application.ui.getInstance();
	backend.updateSectionName(name,cbsectionid);
	ui.updateSectionName(name,cbsectionid);
};

Controller.prototype.createProProject = function createProProject(name) {
	CBUtil.include("js/lib/gui/menu.js");
 	var backend = application.backend.getInstance()
 	var ui = application.ui.getInstance()
 	backend.createProject(name);


 	backend.loadSectionsObjects();
 	ui.renderActionsButtons();
 	ui.initSectionsPro();
};


Controller.prototype.createSimpleProject = function createSimpleProject(name) {
	// body...
};


CBUtil.createNameSpace('application.controller');
application.controller = CBUtil.singleton(Controller);