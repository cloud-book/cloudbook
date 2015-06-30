function ExportHTMLSplited(){

}

ExportHTMLSplited.prototype.exportHTML = function exportHTML(destpath){
	var fsextra = require('fs-extra'),
		htmlinfo = {resources:[],items:{}};
	fsextra.ensureDirSync(destpath);
	this.renderSection(destpath,'root',htmlinfo);
	return htmlinfo;
}

ExportHTMLSplited.prototype.renderSection = function renderSection(destpath,sectiontorender,htmlinfo) {
	var storagemanager = application.storagemanager.getInstance(),
		fs = require('fs'),
		fsextra = require('fs-extra'),
		path = require('path'),
		pd = require('pretty-data').pd,
		content = "",
		that = this,
		filepath = sectiontorender + ".html";
	var section = storagemanager.getSectionById(sectiontorender);
	var template = fs.readFileSync('./templates/exporthtmlsplit/section.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	
	section.content.forEach(function(cbobjectid){
		var cbobject = storagemanager.getCBObjectById(cbobjectid);
		content += cbobject.htmlView()[0].outerHTML;
		var listscripts = Cloudbook.Actions[cbobject.idtype].metadata.external_scripts ? Cloudbook.Actions[cbobject.idtype].metadata.external_scripts.map(function(componentscript){return path.join(Cloudbook.Actions[cbobject.idtype].path,componentscript)}):[];
	});

	var salida = pd.xml(templatecompiled({content:content}));
	fs.writeFileSync(path.join(destpath,filepath),salida);

	section.sections.forEach(function(cbsectionid){
		that.renderSection(destpath,cbsectionid,htmlinfo);
	});
	fsextra.copySync(path.join(Project.Info.projectpath,'rsrc'),path.join(destpath,'rsrc'));
};