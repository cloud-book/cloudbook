/**
 * @class ExportHTML
 * @classdesc This class is responsible to make export operations of Data project
 */
function ExportHTML(){
	this.files_to_copy = [];
	this.myhead = "";
}


ExportHTML.prototype.htmlHead = function() {
	this.myhead = $('<head></head>');
	this.myhead.append('<script type="text/javascript" src="js/jquery.js"></script>');
	this.myhead.append('<script type="text/javascript" src="js/jquery.layout.js"></script>');
	this.myhead.append('<script type="text/javascript" src="js/jquery-ui.min.js"></script>');
	this.myhead.append('<script type="text/javascript" src="js/core.js"></script>');
	this.myhead.append('<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css" />');
	this.myhead.append('<link rel="stylesheet" type="text/css" href="css/estilo.css" />');
};


function getSectionsOrdered(allsections,parentsection){
	var storage = application.storagemanager.getInstance();
	for (var i=0; i<parentsection.sections.length; i++){
		var section = storage.getSectionById(parentsection.sections[i]);
		section.__level = parentsection.__level + 1;
		allsections.push(section);
		getSectionsOrdered(allsections,section);
	}
}

ExportHTML.prototype.getAllNeededFiles = function getAllNeededFiles(all_types_used){
	var pathUtil = window.require('path');
	var types=Cloudbook.Actions;
	for (var i=0; i<all_types_used.length;i++){
		var datatype=types[all_types_used[i]];
		if (datatype.metadata.hasOwnProperty('external_css')){
			for (var k=0;k<datatype.metadata.external_css.length;k++){
				this.files_to_copy.push(datatype.path+'/'+datatype.metadata.external_css[k]);
				//Add element to head
				this.myhead.append('<link rel="stylesheet" type="text/css" href="css/'+pathUtil.basename(datatype.metadata.external_css[k])+'" />');
			}
		}
		if (datatype.metadata.hasOwnProperty('external_scripts')){
			for (var k=0;k<datatype.metadata.external_scripts.length;k++){
				this.files_to_copy.push(datatype.path+'/'+datatype.metadata.external_scripts[k]);
				//Add element to head
				this.myhead.append('<script type="text/javascript" src="js/'+pathUtil.basename(datatype.metadata.external_scripts[k])+'"></script>');
			}
		}
	}
}


ExportHTML.prototype.getSections = function getSections(){
	var storage = application.storagemanager.getInstance();
	var main_sect = storage.getRoot();
	var sections = [];
	main_sect.__level = 0;
	getSectionsOrdered(sections,main_sect);
	return sections;
}

ExportHTML.prototype.do_html = function do_html(path){

	this.files_to_copy = [];
	this.myhead = "";
	
	this.htmlHead();
	var sections= this.getSections();
	

	// Copy base javascript
	this.files_to_copy.push('js/lib_external/exporthtml/');

	//Determine what external component scripts need to load
	
	var sm=application.storagemanager.getInstance();
	var all_types_used = [];
	for (var i=0; i< sections.length;i++){
		var content_section=sections[i].content;
		for (var j=0; j<content_section.length; j++){
			var obj_into_section_type=sm.getCBObjectById(content_section[j]);
				if ($.inArray(obj_into_section_type.idtype,all_types_used) == -1)
					all_types_used.push(obj_into_section_type.idtype);
		}
	}

	this.getAllNeededFiles(all_types_used);
	

	var aside='<aside class="ui-layout-west"><ol>';
	for (var i = 0; i<sections.length; i++){
		aside=aside+'<li class="sectionlevel'+sections[i].__level+'"><a href="#data'+i+'">'+sections[i].name+'</a></li>';
	}
	aside=aside+'</ol></aside>';
	
	var content='<div class="ui-layout-center">';
	content=content+'<div class="ui-layout-content">';
	
	sections.forEach(function(obj,idx){ var JQobj=obj.htmlView('data'+idx); content += JQobj[0].outerHTML });

	content=content+'</div></div>';
	var footer='<footer class="ui-layout-south"><section><span class="left"><button>'+ CBI18n.gettext("Prev") + '</button></span>'+ CBI18n.gettext("Footer section")+'<span class="right"><button>'+ CBI18n.gettext("Next") +'</button></span></section></footer>';

	//copy project resources
	this.files_to_copy.push(Project.Info.projectpath + "/rsrc/");
	
	//Change source url into exported objects

	var total = this.formatXml('<!DOCTYPE html><html><meta charset="UTF-8"> '+this.myhead[0].outerHTML+'<body>'+aside+content+footer+'</body></html>');

	var fs = window.require('fs');
	fs.writeFile(path+"index.html", total , function(err) {
    	if(err) {
        	return console.log(err);
    	}else{
    		console.log("The file was saved!");
    	}
	});
	var that = this;
	this.files_to_copy.forEach(function(item){that.copyFileToPath(item,path)});
	return total;
}
/*ExportHTML.prototype.rewriteSource = function rewriteSource(html){
	//console.log(html);

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
	//console.log(changed);
	return changed;
}*/
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
    var pathUtil = window.require('path');


    /*
     * Copy file from project dir to export dir
     */
	fsextra.ensureDirSync(path);
    
    var stat=fs.statSync(filename);
    if (stat.isDirectory()){
    	//fsextra.copySync(filename, path);
    	this.copyFileFromDirToPath(filename,path);
    }else{
    	var originalbasename = pathUtil.basename(filename);
	    if (filename == originalbasename){
		    var filename = Project.Info.projectpath +"/rsrc/";
		}
	  	//if(! fsextra.existsSync(path+originalbasename)){
	    //	fsextra.copySync(filename,path+originalbasename);
	    //}
	    var slices = originalbasename.split('.');
		var ext = slices[slices.length -1];
		var fsextra = window.require('fs-extra');
		if (ext === 'js'){
			fsextra.ensureDirSync(path+'js');
			fsextra.copySync(filename,path+'js/'+originalbasename);
		}else{
			if (ext === 'css'){
				fsextra.ensureDirSync(path+'css');
				fsextra.copySync(filename,path+'css/'+originalbasename);
			}else{
				fsextra.copySync(filename,path+originalbasename);
			}
		}
	}
}
ExportHTML.prototype.copyFileFromDirToPath = function copyFileFromDirToPath(dir,path){
	var fs = window.require('fs');
	var filenames=fs.readdirSync(dir);
	for (var i=0; i<filenames.length; i++){
		var file = filenames[i];
		var slices = file.split('.');
		var ext = slices[slices.length -1];
		var fsextra = window.require('fs-extra');
		if (ext === 'js'){
			fsextra.ensureDirSync(path+'js');
			fsextra.copySync(dir+file,path+'js/'+file);
		}else{
			if (ext === 'css'){
				fsextra.ensureDirSync(path+'css');
				fsextra.copySync(dir+file,path+'css/'+file);
			}else{
				fsextra.ensureDirSync(path+'rsrc');
				fsextra.copySync(dir+file,path+'rsrc/'+file);
			}
		}
	}
	console.log(filenames);
}
CBUtil.createNameSpace('application.exporthtml.core');
application.exporthtml.core = CBUtil.singleton(ExportHTML);

var test = application.exporthtml.core.getInstance();
var export_html = function(){
	var fs = window.require('fs');
	if (! fs.existsSync(Project.Info.projectpath+"/exported",0775))
		fs.mkdirSync(Project.Info.projectpath+"/exported",0775);
	test.do_html(Project.Info.projectpath+"/exported/");	
}
console.log('Tip: to begin exportation to workspace, load project and run "export_html()" in console');
