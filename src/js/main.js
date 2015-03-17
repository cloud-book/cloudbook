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

 	var backend = application.backend.getInstance();
 	var ui = application.ui.getInstance();

 	backend.prepareWorkspace();
 	backend.loadComponents();
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

 CBUtil.createNameSpace('application.main');
 application.main = CBUtil.singleton(Main);




 var main = application.main.getInstance();
 main.run();