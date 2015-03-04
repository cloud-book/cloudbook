/************************
 *        Main          *
 ************************/

/*
 * Core is created in this moment by loadComponent function. This function is responsible load extra libs on components.
 * These libraries be load before 
 */

function Main(){

}


Main.prototype.run = function() {

	CBUtil = new Util();
	CBI18n = new Translator(require('./i18n/es.js'));


	this.core = new Core(this);
	this.ui = new UI(this);
	CBStorage = new StorageManager();

	this.core.prepareWorkspace();
	this.core.loadComponents();
	this.ui.loadTheme();


	var gui = require('nw.gui');

	if (gui.App.argv.length > 0 ){
		var path = require('path');
		var auxprojectpath = path.resolve(gui.App.argv[0]);
	}
	else{
		var fs = require('fs');
		this.ui.showIntro(JSON.parse(fs.readFileSync(Cloudbook.workspace + ".conf")));
	}	
};

Main.prototype.createProProject = function(name) {

	  CBUtil.include("js/lib/gui/menu.js");
	  if( ! this.core.createProject(name)) {
	  	
	  }

	  this.core.loadSectionsObjects();
	  
	  this.core.renderActionsButtons();
	  this.core.initSections();

};

Main.prototype.createSimpleProject = function(name) {
	
};

var main = new Main();
main.run();