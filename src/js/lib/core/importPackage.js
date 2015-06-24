/**
 * @class ImportPackage
 * @classdesc This class is responsible to make import operations of SCORM, EPUB, IMS y EXE Files
 */
function ImportPackage(){}

/**
 * This method is responsible for reading SCORM, EPUB, IMS and ELP content (Metadata + Data)
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

	fs2.emptyDirSync(tempPath);
	if(fileType == "EPUB" && zip.file("META-INF/container.xml") != null){  
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
		if(fileType == "ELP"){     
		     if(zipEntry.name === "contentv3.xml" || zipEntry.name ==="contentv2.xml") {
		     	exists = true;
		     	exists2 = true; 
		     }
		}
		if (zipEntry.name.indexOf("/") != -1) 
			if(!fs2.existsSync(tempPath + zipEntry.name.substring(0,zipEntry.name.lastIndexOf("/")))) 
				fs2.mkdirpSync(tempPath + zipEntry.name.substring(0,zipEntry.name.lastIndexOf("/")));

        if(!zipEntry.dir)
	     {
	         var content = zip.files[zipEntry.name].asNodeBuffer();
	         var dest = path.join(tempPath, zipEntry.name);
		     fs.writeFileSync(dest, content);
	     }
	});

	if(exists)
		processPackageMetaData(fileType, tempPath, filePath);

	if(exists2){
		switch(fileType)
		{
			case "EPUB": application.importepub.getInstance().processPackageDataEPUB(tempPath); break;
			case "ELP": application.importelp.getInstance().processPackageDataELP(tempPath); break;
			default: processPackageData(tempPath, fileType); break;
		}
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
	var epub2html = require('epub3tohtml');
	var htmlData;

	switch(fileType)
	{
		case "SCORM":
		case "ELP":
			if (fs.existsSync(tempPath+"imslrm.xml")){
				fs.readFile(tempPath+"imslrm.xml", function(err, data) {
				  	application.importmetadata.getInstance().loadMetadata(data.toString());
				});
			};
		break;
		case "IMS":
			fs.readFile(tempPath+"imsmanifest.xml", function(err, data) {
			  	application.importmetadata.getInstance().loadIMSMetadata(data.toString());
			});
		break;
		case "EPUB":
			epub2html.parse(filePath, function (err, epubData) {
				htmlData = epub2html.convertMetadata(epubData);
				application.importmetadata.getInstance().loadEPUBMetadata(htmlData.htmlMetas);
			});
		break;
	}
}


/**
 * This method is responsible for processing content of a section
 * It builds the name and the content of a section
 * @param  {Object} node to be processed
 * @param  {String} id of resource
 * @param  {String} id of section processed
 * @param  {String} path of the elements
 */
 function processSection(element, resourceID, idsection, filePath)
{

	var href = element.parents().find("resource[identifier='" + resourceID + "']").attr("href");
	application.controller.getInstance().updateSectionName(href.split(".")[0],idsection);	
	var html = $.parseHTML(fs.readFileSync(filePath + href).toString());
	application.importhtml.getInstance().processHTML(html, filePath + href, idsection);
}

/**
 * This method is responsible for processing children sections
 * It reads section and if there isn't id process subsections
 * @param  {String} id of section processed
 * @param  {Object} node to be processed
 * @param  {String} path of the elements
 */
 function processChildrenData(idsection, element, filePath, fileType)
{
	var idSectionParent = "", html = "", href = "", idSectionPreParent = "";
	var importationHTML = application.importhtml.getInstance();
	var controller = application.controller.getInstance();

	idSectionPreParent = idsection;
	idsection = controller.appendSection(idsection);
	idSectionParent = idsection;
	processSection(element, $(element.children("item")[0]).attr("identifierref"), idSectionParent, filePath);

	element.children("item:gt(0)").each(function(){
		if( this.attributes['identifierref'] != undefined){
			if(fileType == "SCORM")
				idsection = controller.appendSection(idSectionParent);
			else
				idsection = controller.appendSection(idSectionPreParent);
			processSection($(this), this.attributes['identifierref'].value, idsection, filePath);
			if(fileType == "IMS" && $(this).children("item").length > 0)
			{
				processChildrenData(idsection, $(this), filePath, fileType);
			}
		}
		else
		{
			processChildrenData(idSectionParent, $(this), filePath, fileType);
		}
	})
}

/**
 * This method is responsible for reading SCORM/IMS data
 * It reads files to be included and creates sections for each one
 * @param  {String} path of the unzipped elements
 */
function processPackageData(filePath, fileType)
{
	var fs = require('fs');
	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "", idSectionRoot = "";
	var ui = application.ui.core.getInstance();
	var children = "";

	var importationHTML = application.importhtml.getInstance();
	fs.readFile(filePath+"imsmanifest.xml", function(err, data) {
			if(fileType == "IMS"){
				idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
				processSection($($(data.toString()).children()[0]), $(data.toString()).find("item:first").attr("identifierref"), idsection, filePath);
				idSectionRoot = idsection;
	  	  	}
			$(data.toString()).find("item:first").children("item").each(function(){
				if($(this).attr("identifierref") != undefined){
		  	  		var href = $(this).parents().find("resource[identifier='" + this.attributes['identifierref'].value + "']").attr("href");
		  	  		html = $.parseHTML(fs.readFileSync(filePath + href).toString());
		  	  		if(href =="index.html"){
	  					idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
	  					idSectionRoot = idsection;
	  				}else{
	  					idsection = controller.appendSection(idSectionRoot);
	  				}
  					controller.updateSectionName(href.split(".")[0],idsection);		
					importationHTML.processHTML(html, filePath + href, idsection);
					if(fileType == "IMS" && $(this).children("item").length > 0)
					{
						processChildrenData(idsection, $(this), filePath, fileType);
					}
				}
				else
				{
					idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
					idSectionAux = idsection;
					processChildrenData(idsection, $(this), filePath, fileType);
					idsection = idSectionAux;
				}
			});
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}


CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);