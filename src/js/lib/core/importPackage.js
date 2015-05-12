/**
 * @class ImportPackage
 * @classdesc This class is responsible to make import operations of SCORM, EPUB and IMS Files
 */
function ImportPackage(){}

/**
 * This method creates a directory and deletes before if it exists
 * @param  {String} path of the directory	
*/
function createDir(tempPath)
{
	var fs = require('fs');

	if(!fs.existsSync(tempPath))
		fs.mkdirSync(tempPath);
	else
	{
		deleteFolderRecursive(tempPath);
	  	fs.mkdirSync(tempPath);
	}
}

/**
 * This method is responsible for reading SCORM, EPUB and IMS content (Metadata + Data)
 * It assures existence of key files (imslrm and imsmanifest) and extracts all zip file
 * @param  {String} content of the SCORM/IMS/EPUB file
 * @param  {String} path of the SCORM/IMS/EPUB element
 * @param  {String} type of package
 */
ImportPackage.prototype.processPackage = function processPackage(data, filePath, fileType)
{
	var exists = false;
	var exists2 = false;
	var zip = new JSZip(data);
	var fs = require('fs');
	var fs2 = require('fs-extra');
	var path = require("path");
	var tempPath = "/tmp/cloudbook/";

	createDir(tempPath);

	if(fileType == "EPUB" && zip.file("OEBPS/content.opf") != null){  
		exists = true;
		exists2 = true;
	}

	$.each(zip.files, function (index, zipEntry) {
		if(fileType == "IMS"){
		     if(zipEntry.name === "imsmanifest.xml"){
		     	exists = true;
		     	exists2 = true;
		     } 
		}
		if(fileType == "SCORM"){     
		     if(zipEntry.name === "imslrm.xml") exists = true;
		     if(zipEntry.name === "imsmanifest.xml") exists2 = true; 
		}
		if(fileType == "EPUB"){
			if (zipEntry.name.indexOf("/") != -1) 
				if(!fs2.existsSync(tempPath + zipEntry.name.substring(0,zipEntry.name.lastIndexOf("/")))) 
					fs2.mkdirpSync(tempPath + zipEntry.name.substring(0,zipEntry.name.lastIndexOf("/")));
		}
		else
		{
	        if (zipEntry.name.indexOf("/") != -1) { 
		       		if(!fs.existsSync(tempPath + zipEntry.name.split("/")[0])) fs.mkdirSync(tempPath + zipEntry.name.split("/")[0]);     
		     }
	     }
         var content = zip.files[zipEntry.name].asNodeBuffer();
         var dest = path.join(tempPath, zipEntry.name);
	     fs.writeFileSync(dest, content);
	});

	if(exists)
		processPackageMetaData(fileType, tempPath, filePath);

	if(exists2){
		if(fileType != "EPUB")
			processPackageData(tempPath);
		else
			processPackageDataEPUB(tempPath);
	}
}

/**
 * This method is responsible for reading SCORM/IMS metadata
 * It reads metadata and loads it into array
 * @param  {String} type of package
 * @param  {String} temporary path
 * @param  {String} path of the SCORM/IMS/EPUB element
 */
function processPackageMetaData(fileType, tempPath, filePath)
{

	var fs = require('fs');
	var epub2html = require('epub2html');

	switch(fileType)
	{
		case "SCORM":
			fs.readFile(tempPath+"imslrm.xml", function(err, data) {
			  	application.importmetadata.getInstance().loadMetadata(data.toString());
			});
		break;
		case "IMS":
			fs.readFile(tempPath+"imsmanifest.xml", function(err, data) {
			  	application.importmetadata.getInstance().loadIMSMetadata(data.toString());
			});
		break;
		case "EPUB":
			var htmlData;
			epub2html.parse(filePath, function (err, epubData) {
				htmlData = epub2html.convertMetadata(epubData);
				application.importmetadata.getInstance().loadEPUBMetadata(htmlData.htmlMetas);
			});
		break;
	}
}

/**
 * This method deletes recursively a folder
 * @param  {String} path of directory
 */
function deleteFolderRecursive(path) {
	var fs = require('fs');
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { 
                deleteFolderRecursive(curPath);
            } else { 
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/**
 * This method is responsible for reading SCORM/IMS data
 * It reads files to be included and creates sections for each one
 * @param  {String} path of the unzipped elements
 */
function processPackageData(filePath)
{
	var fs = require('fs');
	var backend = application.backend.core.getInstance();
	var controller = application.controller.getInstance();
	var idsection = "";
	var ui = application.ui.core.getInstance();

	var importationHTML = application.importhtml.getInstance();
	fs.readFile(filePath+"imsmanifest.xml", function(err, data) {
	  	  	$(data.toString()).find("resource").each(function(){
		  		$.each(this.attributes, function(i, attrib){
		  			if(attrib.name == "href"){
						$.get(filePath + attrib.value, function(html) {
			  				if(attrib.value =="index.html")
			  				{
			  					controller.updateSectionName(attrib.value.split(".")[0],Cloudbook.UI.selected.attr('data-cbsectionid'));		
			  					idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
			  				}
			  				else
			  				{
			  					idsection = controller.appendSection('root')
				  				controller.updateSectionName(attrib.value.split(".")[0],idsection);	
			  				}
							importationHTML.processHTML(html, filePath + attrib.value, idsection);
						}); 
					}
		  		});
			});
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

/**
 * This method is responsible for reading EPUB data
 * It reads files to be included and creates sections for each one
 * In addition it removes references inf navPoints (marked with #)
 * @param  {String} path of the unzipped elements
 */
function processPackageDataEPUB(filePath)
{
	var fs = require('fs');
	var backend = application.backend.core.getInstance();
	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "";
	var ui = application.ui.core.getInstance();
	var isFirst = true, isFirst2 = true;
	var idFirstSection = "";

	var importationHTML = application.importhtml.getInstance();
	fs.readFile(filePath+"OEBPS/toc.ncx", function(err, data) {
	  	  	$(data.toString()).find("navMap").children("navPoint").each(function(){

	  	  		var sectionName = $(this).find('navlabel')[0].textContent.trim();
	  	  		var sectionPath = $($(this).find('content')[0]).attr("src");

	  	  		if(sectionPath.indexOf("#") == -1)
	  	  		{
					$.get(filePath + "OEBPS/" + sectionPath, function(html) {
		  				if(isFirst)
		  				{
		  					controller.updateSectionName(sectionName,Cloudbook.UI.selected.attr('data-cbsectionid'));		
		  					idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
		  					isFirst = false;
		  				}
		  				else
		  				{
		  					idsection = controller.appendSection('root');
			  				controller.updateSectionName(sectionName,idsection);	
		  				}
		  	  			idsectionAux = idsection;
		  				if(html.indexOf("<?xml") != -1)
		  					html = html.substr(html.indexOf("?>")+2, html.length);
						importationHTML.processHTML(html, filePath + "OEBPS/" + sectionPath, idsection);
					});
		  	  		if($(this).children("navPoint").length != 0)
		  	  		{
						$(this).children("navPoint").each(function()
						{
							var sectionNameAux = $(this).find('navlabel')[0].textContent.trim();
  	  						var sectionPathAux = $($(this).find('content')[0]).attr("src");

							if(sectionPathAux.indexOf("#") == -1)
				  	  		{
				  	  			$.get(filePath + "OEBPS/" + sectionPathAux, function(html2) {
				  					idsection = controller.appendSection(idsectionAux);
					  				controller.updateSectionName(sectionNameAux,idsection);	
					  				if(html2.indexOf("<?xml") != -1)
					  					html2 = html2.substr(html2.indexOf("?>")+2, html2.length);
									importationHTML.processHTML(html2, filePath + "OEBPS/" + sectionPathAux, idsection);
								});
			  	  			}
						})								  	  			
		  	  		}
				}
			});
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);