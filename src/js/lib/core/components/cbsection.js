/**
 * Base object to create sections . This object storate others sections and cbobjects elements 
 * @class CBSection
 * @param {Object} dataobject
 * @param {String[]} dataobject.sections UID subsections inside this section
 * @param {CBObject[]} dataobject.content Elements available in this section
 * @param {String} dataobject.type Type of object. This info is usefull to restore when load project
 * @param {String} dataobject.name Secion name.
 * @param {String} objectdata.numbering Number of section. This number is similar to 1.1.3. Numeration
 */


function CBSection(dataobject){
	dataobject = typeof dataobject !== 'undefined' ? dataobject : {};
	this.sections = typeof dataobject.sections !== 'undefined' ? dataobject.sections : [];
	this.content = typeof dataobject.content !== 'undefined' ? dataobject.content : [];
	this.idtype = "basic";
	this.name = typeof dataobject.name !== 'undefined' ? dataobject.name : CBI18n.gettext("Section");
	this.numbering = typeof dataobject.numbering !== 'undefined' ? dataobject.numbering : "1";

}

CBSection.prototype.htmlView = function htmlView(id) {
	var html4render=$('<article></article>');
	if (id) {
		html4render.attr('id',id);
	}
	var tit=$('<section>'+this.name+'</section>');
	tit.attr('id','title');
	tit.addClass('centered');
	var content = [];
	var storage = application.storagemanager.getInstance();
	var exporthtml = application.exporthtml.core.getInstance();
	var fs = require('fs');
	var path = Project.Info.projectpath + "/rsrc/";
	this.content.forEach(function(objid,idx){ 
		var x = storage.getCBObjectById(objid);

		// Call exportHTMLResoureces
		if(x.__proto__.hasOwnProperty("triggerHTMLView")){
			var rawscriptout = x.triggerHTMLView();
			
			// fs.writeFile(path + objid+".js", rawscriptout , function(err) {
		 //    	if(err) {
		 //        	return console.log(err);
		 //    	}else{
		 //    		exporthtml.myhead.append('<script type="text/javascript" src="'+objid+'.js"></script>');
			// 		//exporthtml.files_to_copy.push("");
		 //    	}
			// });
			fs.writeFileSync(path + objid+".js", rawscriptout);
			exporthtml.myhead.append('<script type="text/javascript" src="js/'+objid+'.js"></script>');
		}


		content.push( x.htmlView());
	});
	//html4render.append(tit);
	content.forEach(function(a){ html4render.append(a) });

	return html4render;
}

module.exports = CBSection;
//@ sourceURL=cbsection.js