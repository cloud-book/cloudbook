/**
 * Application namespace
 * @namespace application
 */

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
 			enableCursorHotkey:false,
 			north:{
 				resizable:false,
 				closable:false,
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


/**
 * Main function to load application
 */
 Main.prototype.run = function run() {

 	var backend = application.backend.core.getInstance();
 	var ui = application.ui.core.getInstance();


 	CBUtil.createNameSpace('application.util.template');
 	application.util.template = CBUtil.req('js/lib_external/handlebars/handlebars.js');
 	application.util.template.getTemplate = function getTemplate(path){
 		var fs = require('fs');
 		if(fs.existsSync(path)){
	 		var template = fs.readFileSync(path,{encoding:'utf8'});
	  		return application.util.template.compile(template);
 		}
 		else{
 			throw "Path " + path + " not exists";
 		}
 	};
 	application.util.template.registerHelper('gettext',function(str){return CBI18n.gettext(str);});


 	backend.prepareWorkspace();
 	backend.loadComponents();
	backend.checkUpstreamVersion();
 	ui.loadTheme();
 	ui.loadExportTheme('default');
 	

 	var gui = require('nw.gui');
 	var minimist = require('minimist');
	var options = minimist(gui.App.argv);
	if(options.devel){
		var cloudbookwindow = require('nw.gui').Window.get();
		cloudbookwindow.moveTo(0,cloudbookwindow.y);
		var devwindow = require('nw.gui').Window.get().showDevTools();
		
		devwindow.moveTo(cloudbookwindow.x + cloudbookwindow.width, cloudbookwindow.y);
	}
 	if (options['_'].length > 0 ){
 		var path = require('path');
 		var auxprojectpath = path.resolve(options['_'][0]);
                var controller = application.controller.getInstance();
                controller.loadProject(auxprojectpath);
 	}
 	else{
 		var fs = require('fs');
 		var initialwizard = application.ui.initialwizard.core.getInstance();
 		initialwizard.showIntro();
		var testplugin=require('./package.json');
 	}	
 };

 CBUtil.createNameSpace('application.main');
 application.main = CBUtil.singleton(Main);

 var main = application.main.getInstance();
 main.run();
