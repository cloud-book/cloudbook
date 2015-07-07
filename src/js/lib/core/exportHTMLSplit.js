function ExportHTMLSplited(){
	this.listscripts = ['js/lib_external/jquery','js/lib_external/jquery-hotkeys','js/lib_external/jquery-ui'];
}

ExportHTMLSplited.prototype.createSkel = function(listpaths) {
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
	var fsextra = require('fs-extra'),
		path = require('path'),
		skel = [],
		listcommonscripts = [],
		htmlinfo = {depends:{},items:{}};

	skel = [destpath,path.join(destpath,'js'),path.join(destpath,'js','lib'),path.join(destpath,'js','lib_external'),path.join(destpath,'css'),path.join(destpath,'img'),path.join(destpath,'rsrc')];
	this.createSkel(skel);
	listcommonscripts = this.copyCommonScripts(destpath);
	htmlinfo.items.root = {};
	this.renderSection(destpath,'root',htmlinfo.items.root,htmlinfo.depends);


	// Hay que meter el titulo del proyecto en el htmlinfo titleproyect


	fsextra.copySync(path.join(Project.Info.projectpath,'rsrc'),path.join(destpath,'rsrc'));
	Object.keys(htmlinfo.depends).forEach(function(component){
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
	
	htmlinfo.depends['CommonResource'] = listcommonscripts;

	htmlinfo.items = htmlinfo.items.root.sections.items;
	fsextra.deleteSync(path.join(destpath,'root.html'));
	if(Project.Info.LOM.tit_1.title_1){
		htmlinfo["Title_Proyect"] = Project.Info.LOM.tit_1.title_1;
	}
	else{
		htmlinfo["Title_Proyect"] = "Cloudbook project";
	}
	return htmlinfo;
}

ExportHTMLSplited.prototype.renderSection = function renderSection(destpath,cbsectionid,htmlinfo,htmlinforesources) {
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

	
	var commonfiles = fs.readdirSync(path.join(destpath,'js','lib_external'));
	commonfiles.forEach(function(element){
		templateinfo.scripts.push(path.join('js','lib_external',element));
	});

	section.content.forEach(function(cbobjectid){
		var cbobject = storagemanager.getCBObjectById(cbobjectid);

		templateinfo.content += cbobject.htmlView()[0].outerHTML;

		htmlinfo.content = htmlinfo.content.concat(cbobject.getResourcesFiles().map(function(element){return path.join('rsrc',element)}));
		
		if (cbobject.triggerHTMLView){
			var auxpath = path.join('js',cbobject.uniqueid + ".js");
			htmlinfo.content.push(auxpath);
			fs.writeFileSync(path.join(destpath,auxpath),cbobject.triggerHTMLView());
			templateinfo.scripts.push(auxpath);
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
			htmlinforesources[componentcode] = listdepends;
			return found;
		}
	});
	htmlinfo.depends.push("CommonResource");

	var salida = pd.xml(templatecompiled(templateinfo));
	fs.writeFileSync(path.join(destpath,filepath),salida);

	section.sections.forEach(function(tempcbsectionid){
		htmlinfo.sections.items["I" + tempcbsectionid] = {};
		that.renderSection(destpath,tempcbsectionid,htmlinfo.sections.items["I" + tempcbsectionid],htmlinforesources);
	});
	
};