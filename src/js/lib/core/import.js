
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
Import.prototype.loadFile = function loadFile(filePath, fileType) {
  var content = "";
  var fs = require('fs');

  if (fs.existsSync(filePath)){

    switch(fileType)
    {
    	case "HTML": processHTMLFile(filePath); break;
    	case "ODT_DOC_DOCX": processODTFile(content, filetype); break;
    	case "SCORM": processSCORMFile(filePath); break;
    }
  };
};

/**
 * This method is responsible for reading SCORM file content
 * First look into the file to check the content and then loads content and metadata information
 * @param  {String} content of the file
 */
function processSCORMFile(filePath)
{
	var fs = require('fs');
	var exists = false;

	fs.readFile(filePath, function(err, data) {
	  if (err) throw err;
	  var zip = new JSZip(data);
	  $.each(zip.files, function (index, zipEntry) {     
	       if(zipEntry.name === "imslrm.xml") exists = true;        
	  });
	  if(exists)
	  {
	  	var xml = zip.file("imslrm.xml").asText();
	  	var importMetadata = application.importmetadata.getInstance();
		importMetadata.loadMetadata(xml);
	  }
	});

};

function processHTML(data)
{
	var includeHTML = $(data);
	console.log(includeHTML.html());
	var includeDiv = $("#include");
	includeDiv.text(data);
	console.log(includeDiv.html());
}
/**
 * This method is responsible for reading HTML5 content
 * @param  {String} path of the file
 */
function processHTMLFile(filePath)
{
	var includeDiv = "";
	var fs = require('fs');
	var content = "";

    Project.Info.projectname = filePath;

    var backend = application.backend.getInstance();		
 	backend.voidProject();

	$.get(filePath, function(html) {
		processHTML(html);
    });  


/*		$page = $(content);
		//console.log(fileType);
		//console.log(content);
		//$page.children().each(function(index, element){
			$.each($page, function(index, element){
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
			});
	//}*/
};

/**
 * This method is responsible for reading ODT, DOC, DOCX content
 * @param  {String} path of the file
 * @param  {String} type of the file
 */
function processODTFile(content, fileType)
{


	$page = $(content);
	console.log(fileType);
	console.log(content);

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


