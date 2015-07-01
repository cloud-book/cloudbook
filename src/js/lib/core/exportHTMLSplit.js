function ExportHTMLSplited(){

}

ExportHTMLSplited.prototype.exportHTML = function exportHTML(destpath){
	var fsextra = require('fs-extra'),
		path = require('path'),
		htmlinfo = {resources:[],items:{}};
	fsextra.ensureDirSync(destpath);
	htmlinfo.items.root = {};
	this.renderSection(destpath,'root',htmlinfo.items.root);
	// copy files from rsrc
	fsextra.copySync(path.join(Project.Info.projectpath,'rsrc'),path.join(destpath,'rsrc'));
	// copy files from components
	htmlinfo.items = htmlinfo.items.root.sections.items;
	return htmlinfo;
}

ExportHTMLSplited.prototype.renderSection = function renderSection(destpath,cbsectionid,htmlinfo) {
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

	section.content.forEach(function(cbobjectid){
		var cbobject = storagemanager.getCBObjectById(cbobjectid);

		templateinfo.content += cbobject.htmlView()[0].outerHTML;
		if (cbobject.triggerHTMLView){
			templateinfo.content += "<script>" + cbobject.triggerHTMLView() + "</script>";
		}
		htmlinfo.depends.push(cbobject.idtype);
		
	});

	htmlinfo.depends = $.unique(htmlinfo.depends);
	htmlinfo.depends = htmlinfo.depends.filter(function(componentcode){
		var found = false;
		if (Cloudbook.Actions[componentcode].metadata.external_scripts){
			templateinfo.scripts = templateinfo.scripts.concat(Cloudbook.Actions[componentcode].metadata.external_scripts);
			found = true;
		}

		if (Cloudbook.Actions[componentcode].metadata.external_css){
			templateinfo.styles = templateinfo.styles.concat(Cloudbook.Actions[componentcode].metadata.external_css);
			found = true;
		}
		return found;
	});



	var salida = pd.xml(templatecompiled(templateinfo));
	fs.writeFileSync(path.join(destpath,filepath),salida);

	section.sections.forEach(function(tempcbsectionid){
		htmlinfo.sections.items["I" + tempcbsectionid] = {};
		that.renderSection(destpath,tempcbsectionid,htmlinfo.sections.items["I" + tempcbsectionid]);
	});
	
};