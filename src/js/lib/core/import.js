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
    	case "ODT_DOC_DOCX": processODTFile(content, filetype); break;
    	case "SCORM": processSCORMFile(filePath); break;
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
 * This method is responsible for reading SCORM file content
 * First look into the file to check the content and then loads content and metadata information
 * and reads ims metadata to take the order of elements
 * @param  {String} path of the file
 */
function processSCORMFile(filePath)
{
	var fs = require('fs');
	fs.readFile(filePath, function(err, data) {
		if (err) throw err;
		var importSCORM = application.importscorm.getInstance();
		importSCORM.processSCORM(data, filePath);
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
		importationHTML.processHTML(html, filePath);
    });  
};

/**
 * This method is responsible for reading ODT, DOC, DOCX content
 * @param  {String} path of the file
 * @param  {String} type of the file
 */
function processODTFile(content, fileType)
{


	$page = $(content);
/*		$.each($page, function(index, element){
			var tempSection = [];
			switch(element.tagName)
			{
				case "DIV": 
					$.each($(element).children(), function(index1, element1){
						console.log(index1 + " " + element1.tagName + " " + $(element1).text());
					});
				break;
				case "P":
				case "H1":
				case "H2":
				case "A":
					console.log(index + " " + element.tagName + " " + $(element).text());
				break;
				default:
					console.log(index + " " + element.tagName + " " + $(element).text());
				break;
			}
		});*/
};
CBUtil.createNameSpace('application.importation');
application.importation = CBUtil.singleton(Import);


