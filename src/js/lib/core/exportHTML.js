/**
 * @class ExportHTML
 * @classdesc This class is responsible to make export operations of Data project
 */
function ExportHTML(){
	this.counters = {};
}

ExportHTML.prototype.getSections = function getSections(){
	var storage = application.storagemanager.getInstance();
	var main_sect = storage.getRoot();
	var sections = [];
	for (var i=0; i<main_sect.sections.length; i++){
		var section = storage.getSectionById(main_sect.sections[i]);
		sections.push(section);
	}
	return sections;
}

ExportHTML.prototype.do_html = function do_html(path){
	var myhead='<head>\
	<script type="text/javascript" src="jquery.js"></script>\
	<script type="text/javascript" src="jquery.layout.js"></script>\
	<script type="text/javascript" src="jquery-ui.min.js"></script>\
	<script type="text/javascript" src="core.js"></script>\
	<link rel="stylesheet" type="text/css" href="jquery-ui.min.css" />\
	<link rel="stylesheet" type="text/css" href="estilo.css" />\
	</head>';
	var sections=this.getSections();
	var aside='<aside class="ui-layout-west"><ol>';

	var files_to_copy = [];
/*	var h=$(myhead);

	for (var i=0; i<h.length; i++){
			if (h[i].nodeName == 'SCRIPT'){
				files_to_copy.push('js/lib_external/exporthtml/'+h[i].getAttribute('src'));
			}else{ 
				if (h[i].nodeName == 'LINK'){
					files_to_copy.push('js/lib_external/exporthtml/'+h[i].getAttribute('href'));
				}
			} 
	}
*/
	files_to_copy.push('js/lib_external/exporthtml/',path);
	for (var i = 0; i<sections.length; i++){
		aside=aside+'<li><a href="#data'+i+'">'+sections[i].name+'</a></li>';
	}
	aside=aside+'</ol></aside>';
	
	var content='<div class="ui-layout-center">';
	content=content+'<div class="ui-layout-content">';
	
	sections.forEach(function(obj,idx){ var JQobj=obj.htmlView('data'+idx); content += JQobj[0].outerHTML });

	content=content+'</div></div>';
	var footer='<footer class="ui-layout-south"><section><span class="left"><button> Prev </button></span>Footer section<span class="right"><button> Next </button></span></section></footer>';

	//Get images & scripts to copy
	var imgs = $(content).find('img');
	imgs.each(function(idx){files_to_copy.push(imgs[idx].getAttribute('src'))});
	//Change source url into exported objects
	content = this.rewriteSource(content);
	content = content[0].outerHTML;
	var total = this.formatXml('<!DOCTYPE html><html>'+myhead+'<body>'+aside+content+footer+'</body></html>');

	var fs = window.require('fs');
	fs.writeFile(path+"outfile.html", total , function(err) {
    	if(err) {
        	return console.log(err);
    	}else{
    		console.log("The file was saved!");
    	}
	});
	var that = this;
	files_to_copy.forEach(function(item){that.copyFileToPath(item,path)});
	
	return total;
}
ExportHTML.prototype.rewriteSource = function rewriteSource(html){
	console.log(html);

	var changed=$.grep($(html),function(o,idx){ 
		if($(o).find('img').length){ 
			var imgs=$(o).find('img'); 
			for (var i=0; i< imgs.length; i++){
				var im=$(imgs[i]) ; 
				var path=im.attr('src'); 
				path=path.replace(Project.Info.projectpath+'/rsrc/',''); 
				im.attr('src',path);
			}
		}	
		return true;  
	}); 
	console.log(changed);
	return changed;
}
ExportHTML.prototype.formatXml = function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }
 
        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }
 
        formatted += padding + node + '\r\n';
        pad += indent;
    });
 
    return formatted;
}

ExportHTML.prototype.copyFileToPath = function copyFileToPath(filename,path){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var fsextra2 = window.require('fs.extra');
    var pathUtil = window.require('path');


    /*
     * Copy file from project dir to export dir
     */
	fsextra.ensureDirSync(path);
    
    var stat=fs.statSync(filename);
    if (stat.isDirectory()){
    	fsextra2.copyRecursive(filename, path, 
    		function (err) {
  				if (err) {
    				console.log(err);
  				}
			}
		)
    }else{
    	var originalbasename = pathUtil.basename(filename);
	    if (filename == originalbasename){
		    var filename = Project.Info.projectpath +"/rsrc/";
		}
	  	if(! fsextra.existsSync(path+originalbasename)){
	    	fsextra.copySync(filename,path+originalbasename);
	    }
	}
}
CBUtil.createNameSpace('applicsecation.exporthtml');
application.exporthtml = CBUtil.singleton(ExportHTML);

var test = application.exporthtml.getInstance();
var export_html = function(){
	var fs = window.require('fs');
	if (! fs.existsSync(Project.Info.projectpath+"/exported",0775))
		fs.mkdirSync(Project.Info.projectpath+"/exported",0775);
	test.do_html(Project.Info.projectpath+"/exported/");	
}
console.log('Tip: to begin exportation to workspace, load project and run "export_html()" in console');
