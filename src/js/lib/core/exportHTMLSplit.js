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
	var storagemanager = application.storagemanager.getInstance();
	var section = storagemanager.getSectionById(sectiontorender);
	var fs = require('fs');
	var path = require('path');
	var filepath = sectiontorender + ".html";
	var template = fs.readFileSync('./templates/exporthtmlsplit/section.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	var content = "";
	var that = this;
	
	application.util.template.compile(template);
	section.content.forEach(function(cbobjectid){
		var cbobject = storagemanager.getCBObjectById(cbobjectid);
		content += cbobject.htmlView()[0].outerHTML;
	});
	var salida = templatecompiled({content:content});
	fs.writeFileSync(path.join(destpath,filepath),salida);
	section.sections.forEach(function(cbsectionid){
		that.renderSection(destpath,cbsectionid,htmlinfo);
	})
};