function ExportHTMLSplited(){
	this.listscripts = ['js/lib_external/jquery','js/lib_external/jquery-hotkeys','js/lib_external/jquery-ui'];
}

ExportHTMLSplited.prototype.createSkel = function createSkel(listpaths) {
	var fsextra = require('fs-extra');
	listpaths.forEach(function(temppath){
		fsextra.ensureDirSync(temppath);
	});
};

ExportHTMLSplited.prototype.copyCommonScripts = function copyCommonScripts(destpath) {
	var fsextra = require('fs-extra'),
		fs = require('fs'),
		path = require('path'),
		listcommonscripts = [];
	    this.listscripts.forEach(function(rsrc){
		listfiles = fs.readdirSync(rsrc);
		listfiles.forEach(function(element){
			fsextra.copySync(path.join(rsrc,element),path.join(destpath,'js','lib_external',element));
			listcommonscripts.push(path.join('js','lib_external',element));
		});
	});
	return listcommonscripts;
};

ExportHTMLSplited.prototype.exportHTML = function exportHTML(destpath){
	
	return this.exportProject(destpath,'html');
}

ExportHTMLSplited.prototype.exportPDF = function exportPDF(destpath){
	var htmlinfo = this.exportProject(destpath,'pdf');
	return htmlinfo;
}



ExportHTMLSplited.prototype.getSkelList = function(rendermethod,destpath) {
	debugger;
	var path = require("path");
	if(rendermethod === "html" || rendermethod === "pdf"){
		return [destpath,path.join(destpath,'js'),path.join(destpath,'js','lib'),path.join(destpath,'js','lib_external'),path.join(destpath,'css'),path.join(destpath,'img'),path.join(destpath,'rsrc')];
	}
};

ExportHTMLSplited.prototype.copyComponentesResources = function(depends,destpath) {
	var fsextra = require("fs-extra"),
		path = require("path");
	Object.keys(depends).forEach(function(component){
		var filestocopy = [];
		if(Cloudbook.Actions[component].metadata.external_scripts){
			Cloudbook.Actions[component].metadata.external_scripts.forEach(function(element){
					var orig = path.join(Cloudbook.Actions[component].path,element);
					var dest = path.join(destpath,'js',element);
					fsextra.ensureDirSync(path.dirname(dest));
					fsextra.copySync(orig,dest);
				}
			);

		}
		if(Cloudbook.Actions[component].metadata.external_css){
			Cloudbook.Actions[component].metadata.external_css.forEach(function(element){
					var orig = path.join(Cloudbook.Actions[component].path,element);
					var dest = path.join(destpath,'css',element);
					fsextra.ensureDirSync(path.dirname(dest));
					fsextra.copySync(orig,dest);
				}
			);
		}
	});
};

ExportHTMLSplited.prototype.exportProject = function(dest,rendermethod) {
	
	var fsextra = require('fs-extra'),
		path = require('path'),
		listcommonscripts = [],
		htmlinfo = {depends:{},items:{},orderedsections:[]};

	this.createSkel(this.getSkelList(rendermethod,dest));
	listcommonscripts = this.copyCommonScripts(dest);
	htmlinfo.items.root = {};
	this.renderSection(dest,'root',htmlinfo.items.root,htmlinfo,rendermethod);

	//Sync rsrc to dest
	fsextra.copySync(path.join(Project.Info.projectpath,'rsrc'),path.join(dest,'rsrc'));
	this.copyComponentesResources(htmlinfo.depends,dest);
	
	htmlinfo.depends['CommonResource'] = listcommonscripts;

	// Remove root item
	htmlinfo.items = htmlinfo.items.root.sections.items;
	htmlinfo.orderedsections = htmlinfo.orderedsections.slice(1);
	fsextra.deleteSync(path.join(dest,'root.html'));
	
	if ( typeof Project.Info.LOM.tit_1 !=="undefined" && Project.Info.LOM.tit_1.title_1 ){
			htmlinfo["Title_Proyect"] = Project.Info.LOM.tit_1.title_1;
	}
	else{
			htmlinfo["Title_Proyect"] = "Cloudbook project";
	}
	htmlinfo['OrganizationID'] = 'Cloudbook-'+CBUtil.uniqueId();
	return htmlinfo;
};

/**
	rendermethod : [html,pdf,...]
*/
ExportHTMLSplited.prototype.renderSection = function renderSection(destpath,cbsectionid,htmlinfo,globalhtmlinfo,rendermethod) {
	var storagemanager = application.storagemanager.getInstance(),
		fs = require('fs'),
		fsextra = require('fs-extra'),
		path = require('path'),
		pd = require('pretty-data').pd,
		templateinfo = {content:"",scripts:[],styles:[]},
		that = this,
		filepath = cbsectionid + ".html";
	var section = storagemanager.getSectionById(cbsectionid);
	var template = fs.readFileSync('./templates/exporthtmlsplit/section.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	htmlinfo.title = section.name;
	htmlinfo.filename = filepath;
	htmlinfo.resourcecode = "R"+cbsectionid;
	htmlinfo.depends = [];
	htmlinfo.content = [];
	if (section.sections.length > 0){
		htmlinfo.sections = {code:"II" + cbsectionid ,items:{}};
	}

    //Lista de ficheros para exportar a pdf
   globalhtmlinfo.orderedsections.push(htmlinfo);

	
	var commonfiles = fs.readdirSync(path.join(destpath,'js','lib_external'));
	commonfiles.forEach(function(element){
		templateinfo.scripts.push(path.join('js','lib_external',element));
	});

	section.content.forEach(function(cbobjectid){
		var cbobject = storagemanager.getCBObjectById(cbobjectid);

	 templateinfo.content += cbobject[rendermethod+"View"]()[0].outerHTML;

	//	templateinfo.content += cbobject.htmlView()[0].outerHTML;
	

		htmlinfo.content = htmlinfo.content.concat(cbobject.getResourcesFiles().map(function(element){return path.join('rsrc',element)}));
		
		if(rendermethod === "html" || rendermethod==="pdf"){

			if (cbobject.triggerHTMLView){
				var auxpath = path.join('js',cbobject.uniqueid + ".js");
				htmlinfo.content.push(auxpath);
				fs.writeFileSync(path.join(destpath,auxpath),cbobject.triggerHTMLView());
				templateinfo.scripts.push(auxpath);
			}
		}

		htmlinfo.depends.push(cbobject.idtype);
		
	});

	htmlinfo.depends = $.unique(htmlinfo.depends);
	htmlinfo.depends = htmlinfo.depends.filter(function(componentcode){
		var found = false;
		var listdepends = [];
		if (Cloudbook.Actions[componentcode].metadata.external_scripts){

			templateinfo.scripts = templateinfo.scripts.concat(Cloudbook.Actions[componentcode].metadata.external_scripts.map(function(element){return path.join('js',element)}));
			listdepends = listdepends.concat(Cloudbook.Actions[componentcode].metadata.external_scripts.map(function(element){return path.join('js',element)}));
			found = true;
		}

		if (Cloudbook.Actions[componentcode].metadata.external_css){
			templateinfo.styles = templateinfo.styles.concat(Cloudbook.Actions[componentcode].metadata.external_css.map(function(element){return path.join('css',element)}));
			listdepends = listdepends.concat(Cloudbook.Actions[componentcode].metadata.external_css.map(function(element){return path.join('css',element)}));
			found = true;
		}
		if(found){
			globalhtmlinfo.depends[componentcode] = listdepends;
			return found;
		}
	});
	htmlinfo.depends.push("CommonResource");
	if(templateinfo.content === ""){
		templateinfo.content = "&nbsp;";
	}
	var salida = pd.xml(templatecompiled(templateinfo));
	fs.writeFileSync(path.join(destpath,filepath),salida);

	section.sections.forEach(function(tempcbsectionid){
		htmlinfo.sections.items["I" + tempcbsectionid] = {};
		that.renderSection(destpath,tempcbsectionid,htmlinfo.sections.items["I" + tempcbsectionid],globalhtmlinfo,rendermethod);
	});
	
	
};
CBUtil.createNameSpace('application.exports.exportHtml.split');
application.exports.exportHtml.split = CBUtil.singleton(ExportHTMLSplited);