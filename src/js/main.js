/************************
 *        Main          *
 ************************/

/*
 * Core is created in this moment by loadComponent function. This function is responsible load extra libs on components.
 * These libraries be load before 
 */

 function Main(){

 	$(document).ready(function(){
 		$('body').layout({
 			applyDefaultStyles:true,
 			north:{
 				resizable:false,
 				closable:false,
 				size: 40

 			},
 			south:{
 				resizable:false,
 				cssReq:{height:"2px"},
 				initClosed:true
 			},
 			west:{
 				size:200
 			}
 		});
 	});
 }


 Main.prototype.run = function() {

 	var core = base.core.getInstance();
 	var ui = base.ui.getInstance();

 	core.prepareWorkspace();
 	core.loadComponents();
 	ui.loadTheme();


 	var gui = require('nw.gui');

 	if (gui.App.argv.length > 0 ){
 		var path = require('path');
 		var auxprojectpath = path.resolve(gui.App.argv[0]);
 	}
 	else{
 		var fs = require('fs');
 		ui.showIntro();
 	}	
 };

 Main.prototype.createProProject = function(name) {

 	CBUtil.include("js/lib/gui/menu.js");
 	var core = base.core.getInstance()
 	var ui = base.ui.getInstance()
 	core.createProject(name);


 	core.loadSectionsObjects();
 	ui.renderActionsButtons();
 	ui.initSectionsPro();

 };

 Main.prototype.createSimpleProject = function(name) {
 	
 	
 };

 CBUtil.createNameSpace('base.main');
 base.main = CBUtil.singleton(Main);




 var main = base.main.getInstance();
 main.run();