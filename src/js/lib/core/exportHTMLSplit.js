function ExportHTMLSplited(){

}

ExportHTMLSplited.prototype.export(destpath){
	var fsextra = require('fs-extra'),
		htmlinfo = {
			resources:[],
			items:{}
		};
	fsextra.ensureDirSync(destpath);
	that.renderSection(destpath,'root',htmlinfo);
	return htmlinfo;
}

ExportHTMLSplited.prototype.renderSection = function(destpath,sectiontorender,htmlinfo) {
	var storagemanager = application.storagemanager.getInstance();
	var section = storagemanager.getSectionById(sectiontorender);
	var filepath = section.idtype + ".html";
	var template = fs.readFileSync('./templates/exporthtmlsplit/section.hbs',{encoding:'utf8'});
	application.util.template.compile(template);
	section.content.forEach(function(cbobjectid){
		var cbobject = storagemanager.getCBObjectById(cbobjectid);
		
	});
};