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
		     if(zipEntry.name === "contentv3.xml" || zipEntry.name ==="contentv2.xml") exists2 = true; 
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
			default: processPackageData(tempPath); break;
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
			epub2html.parse(filePath, function (err, epubData) {
				htmlData = epub2html.convertMetadata(epubData);
				application.importmetadata.getInstance().loadEPUBMetadata(htmlData.htmlMetas);
			});
		break;
	}
}

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


CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);