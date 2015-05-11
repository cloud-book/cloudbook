/**
 * @class Import
 * @classdesc This class is responsible to make all import operations and loads languages into array
 */
function Import(){}

/**
 * This method is responsible for importing HTML5 files
 * @param  {String} path of the file
 * @param  {String} type of the file
 */
Import.prototype.loadFile = function loadFile(projectname,filePath, fileType) {
  var content = "";
  var fs = require('fs');
  if (fs.existsSync(filePath)){
  	var controller = application.controller.getInstance();
  	controller.createProProject(projectname);
    switch(fileType)
    {
    	case "HTML": processHTMLFile(filePath); break;
    	case "ODT_DOC_DOCX": processODTFile(filePath, fileType); break;
    	case "SCORM": processPackageFile(filePath, fileType); break;
    	case "EPUB": processPackageFile(filePath, fileType); break;
    	case "IMS": processPackageFile(filePath, fileType); break;
    }
  };
  
};

/**
 * This method is responsible for reading xml Metadata LOM-ES file
 * @param  {String} path of the file
 */

Import.prototype.importMetadata = function importMetadata(filePath)
{
	var fs = require('fs');	

	fs.readFile(filePath, function(err, data) {
		if (err) throw err;
	  	var importMetadata = application.importmetadata.getInstance();
		importMetadata.loadMetadata(data.toString());
	});
}

/**
 * This method is responsible for reading SCORM and IMS file content
 * First look into the file to check the content and then loads content and metadata information
 * and reads ims metadata to take the order of elements
 * @param  {String} path of the file
 * @param  {String} type of the file
 */
function processPackageFile(filePath, fileType)
{
	var fs = require('fs');
	fs.readFile(filePath, function(err, data) {
		if (err) throw err;
		var importPackage = application.importpackage.getInstance();
		importPackage.processPackage(data, filePath, fileType);
	});

};

/**
 * This method is responsible for reading HTML file content
 * First look into the file to check the content and then loads content and metadata information
 * and reads ims metadata to take the order of elements
 * @param  {String} path of the file
 */
function processHTMLFile(filePath)
{
	$.get(filePath, function(html) {
		var importationHTML = application.importhtml.getInstance();
		importationHTML.processHTML(html, filePath, Cloudbook.UI.selected.attr('data-cbsectionid'));
    });  
};

/**
 * This method is responsible for reading ODT, DOC, DOCX content
 * @param  {String} path of the file
 * @param  {String} type of the file
 */
function processODTFile(filePath, fileType)
{
	var fs = require('fs');
	fs.readFile(filePath, function(err, data) {
		if (err) throw err;
		var HTMLdata = epub2html.convertmetadata()
			//console.log($(data).html());
//		$(data).children().each(function(){
//			console.log($(this).html());
//		});
		//console.log(data.toString());
	});

};

CBUtil.createNameSpace('application.importation');
application.importation = CBUtil.singleton(Import);


