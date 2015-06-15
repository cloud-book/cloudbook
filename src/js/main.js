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
 	if (options['_'].length > 0 ){
 		var path = require('path');
 		var auxprojectpath = path.resolve(options['_'][0]);
 	}
 	else{
 		var fs = require('fs');
 		var initialwizard = application.ui.initialwizard.core.getInstance();
 		initialwizard.showIntro();
 		var testplugin=require('./package.json');
 		var t=testplugin['chromium-args'].split(' ');
 		t=t[0];
 		if (t.indexOf('pepflash') != -1){
 			t=t.split('=');
 			t=t[1];
 			var fs = require('fs');
 			fs.exists(t,function(exists){ 
 				if (! exists) { 
 					fs.exists('/opt/google/chrome/PepperFlash/libpepflashplayer.so',function(exists){
 						if (exists){
 							if (confirm('Chrome instalado, desea copiar el plugin a '+t+'?')){
 								var path=t.split('libpep');
 								fs.mkdirSync(path[0]);
 								fs.createReadStream('/opt/google/chrome/PepperFlash/libpepflashplayer.so').pipe(fs.createWriteStream(t));
 							}else{
 								alert('Los componentes basados en flash no seran funcionales')
 							}
 						}else{
 							alert('Chrome no instalado, los componentes basados en flash no seran funcionales')
 						}
 					}) 
 				}else{
 					//alert('Plugin Flash encontrado, todos los componentes estan disponibles')
 				}
 			})
 		}
 	}	
 };

 CBUtil.createNameSpace('application.main');
 application.main = CBUtil.singleton(Main);

 var main = application.main.getInstance();
 main.run();
