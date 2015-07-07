/**
 * @class ImportPackage
 * @classdesc This class is responsible to make import operations of SCORM, EPUB, IMS y EXE Files
 */
function ImportPackage(){}

/**
 * This method is responsible for reading SCORM, EPUB, IMS and ELP content (Metadata + Data)
 * It assures existence of key files (imslrm and imsmanifest) and extracts all zip file
 * In addition, in case of IMS/SCORM, it detects if there is any metadata file
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
	var metadataFile = "";

	fs2.emptyDirSync(tempPath);
	if(fileType == "EPUB" && zip.file("META-INF/container.xml") != null){  
		exists = true;
		exists2 = true;
	}

	$.each(zip.files, function (index, zipEntry) {
		if((fileType == "IMS") && (zipEntry.name === "imsmanifest.xml"))
		    exists2 = true;
		if((fileType == "SCORM") && (zipEntry.name === "imsmanifest.xml"))
		    exists2 = true;
		if(fileType == "ELP"){     
		     if(zipEntry.name === "contentv3.xml" || zipEntry.name ==="contentv2.xml")
		     	exists2 = true;
		     if(zipEntry.name === "imslrm.xml"){
		     	exists = true;
		     	metadataFile = zipEntry.name; 
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

		     if((fileType == "IMS" || fileType == "SCORM") && zipEntry.name === "imsmanifest.xml")
		     {
		     	$(content.toString()).find("metadata").children().each(function(){
		     		if(this.tagName == "ADLCP:LOCATION"){
		     			exists = true;	
		     			metadataFile = this.innerHTML;
		     		} 
		     	})
		     	if(exists == false){
		     		exists = true;
		     		metadataFile = null;
		     	}
		     }
	     }
	});

	if(exists)
		processPackageMetaData(fileType, tempPath, filePath, metadataFile);

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
 * @param  {String} name of the metadata file
 */
function processPackageMetaData(fileType, tempPath, filePath, metadataFileName)
{

	var fs = require('fs');
	var epub2html = require('epub3tohtml');
	var htmlData;

	switch(fileType)
	{
		case "SCORM":
		case "IMS":
		case "ELP":
			if (fs.existsSync(tempPath+metadataFileName)){
				fs.readFile(tempPath+metadataFileName, function(err, data) {
				  	application.importmetadata.getInstance().loadMetadata(data.toString());
				});
			}
			else{
				fs.readFile(tempPath+"imsmanifest.xml", function(err, data) {
				  	application.importmetadata.getInstance().loadIMSMetadata(data.toString());
				});
			}
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
 * This method is responsible for adapt paths of imgs 
 * @param  {String} code to be processed
*/
function changeImagePath(htmlCode, filePath)
{
	filePath = filePath == undefined?"":filePath;

	$(htmlCode).find("img").each(function(){
		if(($(this).attr("src").indexOf(Project.Info.projectpath) == -1) && ($(this).attr("src").indexOf("http") == -1))
			$(this).attr("src", Project.Info.projectpath + "/rsrc/" + filePath+ "/" + $(this).attr("src"));			
	});
}

/**
 * This method is responsible for load resources of each element
 * @param  {String} element to be processed
 * @param  {String} name of resource
*/
function loadElementResources(element, filter)
{
	var fsextra = require('fs-extra');
	var path = require('path');
	var tempPath = "/tmp/cloudbook/";

	var childrenFiles = element.parents().find("resource[identifier='" + filter + "']").children("file");
	childrenFiles.each(function(){
		var auxPath = $(this).attr("href");
	        fsextra.copySync(path.join(tempPath, auxPath), path.join(Project.Info.projectpath, "/rsrc/", auxPath));
	});
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
	changeImagePath(html);
	loadElementResources(element, resourceID);
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
	var iseXeChildren = false;

	idSectionPreParent = idsection;
	idsection = controller.appendSection(idsection);
	idSectionParent = idsection;
	processSection(element, $(element.children("item")[0]).attr("identifierref"), idSectionParent, filePath);
	iseXeChildren = element.parents().find("organizations").attr("default").substr(0,3) == "eXe";

	element.children("item:gt(0)").each(function(){
		if( this.attributes['identifierref'] != undefined){
			if(fileType == "SCORM" && iseXeChildren)
				idsection = controller.appendSection(idSectionParent);
			else
				idsection = controller.appendSection(idSectionPreParent);
			processSection($(this), this.attributes['identifierref'].value, idsection, filePath);
			loadElementResources($(this), $(this).attr("identifierref"));
			if(/*fileType == "IMS" &&*/ $(this).children("item").length > 0)
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
	var fsextra = require('fs-extra')
	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "", idSectionRoot = "";
	var ui = application.ui.core.getInstance();
	var children = "";
	var tempPath = "/tmp/cloudbook/";
	var path = require("path");
	var items, iseXe = false, isCloudBook = false;
	var existsAnotherIndex = false, isFirst = true;

	var importationHTML = application.importhtml.getInstance();
	fs.readFile(filePath+"imsmanifest.xml", function(err, data) {
			if(fileType == "IMS"){
				idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
				processSection($($(data.toString()).children()[0]), $(data.toString()).find("item:first").attr("identifierref"), idsection, filePath);
				idSectionRoot = idsection;
	  	  	}
	  	  	iseXe = $(data.toString()).find("organizations").attr("default").substr(0,3) == "eXe";
	  	  	isCloudBook = $(data.toString()).find("organizations").attr("default").substr(0,9) == "Cloudbook";
	  	  	if(iseXe)
				items = ($(data.toString()).find("item:first").children("item").length == 0)?$(data.toString()).find("item:first"):$(data.toString()).find("item:first").children("item");
			else
	  	  		items = $(data.toString()).find("organization").children("item");
			items.each(function(){
				if($(this).attr("identifierref") != undefined){
					loadElementResources($(this), $(this).attr("identifierref"));
		  	  		var href = $(this).parents().find("resource[identifier='" + this.attributes['identifierref'].value + "']").attr("href");
		  	  		html = $.parseHTML(fs.readFileSync(filePath + href).toString());
		  	  		if(isFirst){
		  	  			if(!existsAnotherIndex)
	  						idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
	  					else
	  						idsection = controller.appendSection('root');
	  					idSectionRoot = idsection;
	  					existsAnotherIndex = true;
	  					isFirst = false;
	  				}else{
	  					if(iseXe)
	  						idsection = controller.appendSection(idSectionRoot);
	  					else
	  						idsection = controller.appendSection('root');
	  				}
  					controller.updateSectionName(href.split(".")[0],idsection);
					changeImagePath(html, path.dirname(href));
					importationHTML.processHTML(html, filePath + href, idsection);
					if($(this).children("item").length > 0)
					{
						processChildrenData(idsection, $(this), filePath, fileType);
					}
				}
				else
				{
					if(iseXe || isCloudBook){
						idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
						idSectionAux = idsection;
						processChildrenData(idsection, $(this), filePath, fileType);
						idsection = idSectionAux;
					}
				}
			});
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}


CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);