/**
 * @class ImportPackage
 * @classdesc This class is responsible to make import operations of SCORM, EPUB and IMS Files
 */
function ImportPackage(){}

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
	var epub2html = require('epub3tohtml');
	var htmlData;

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


/**
 * This method is responsible for getting the name of main EPUB internal file 
 * @param  {String} path of the EPUB File
 * @return {String} name of main file
 */
function getMainFile(filePath)
{
	var fs = require('fs');
	var dataFile = fs.readFileSync(filePath+"META-INF/container.xml",{encoding:'utf8'});
	var fileIndex = $($(dataFile.toString()).find("rootfiles").children("rootfile")[0]).attr("full-path");
	return fileIndex;
}

/**
 * This method is responsible for getting section Path without anchor
 * @param  {String} path of the element
 * @return {String} path without anchor
 */
function getSectionPath(sectionPath)
{
	if(sectionPath.indexOf("#") != -1)
		sectionPath = sectionPath.split("#")[0];
	return sectionPath;
}

/**
 * This method is responsible for removing comments and xml info of an HTML
 * @param  {String} content of HTML
 * @return {String} HTML with elements removed
 */
 function removeExtraElements(html){
	
	var foundXML = true, foundComment = true;

	while(foundXML)
	{
		if(html.indexOf("<?xml") != -1)
			html = html.substr(html.indexOf("?>")+2, html.length);
		if(html.indexOf("<?xml") == -1) foundXML = false;
	}

	while(foundComment)
	{
		if(html.indexOf("<!--") != -1)
			html = html.replace(html.substring(html.indexOf("<!--"), html.indexOf("-->")+3),"");
		if(html.indexOf("<!--") == -1) foundComment = false;
	}
	return html;
}

/**
 * This method is responsible for processing a section of an EPUB file
 * @param  {String} path of section file
 * @param  {String} name of section file
 * @param  {String} temporary path
 * @param  {String} dir of main files
 * @param  {Object} element with data of section
 * @param  {Boolean} indicates if it's first time to access
 * @param  {Boolean} indicates if section is included in toc.ncx
 * @return  {Boolean} indicates if it's first time to access
 */
function processSectionEPUB(sectionPath, sectionName, filePath, mainDir, element, isFirst, hasTOC)
{

	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "";
	var fs = require('fs');
	var importationHTML = application.importhtml.getInstance();
	var foundXML = true, foundComment = true;

	sectionPath = getSectionPath(sectionPath);
	var dataSectionFile = fs.readFileSync(decodeURIComponent(filePath + mainDir + sectionPath));
	var html = dataSectionFile.toString();
	html = removeExtraElements(html);

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
	importationHTML.processHTML(html, filePath + mainDir + sectionPath, idsection);
	processSubSectionEPUB(filePath, mainDir, hasTOC, element, idsectionAux);
	return isFirst;
}

/**
 * This method is responsible for processing subsections of an EPUB file
 * In case of not getting TOC, process elements of list
 * @param  {String} path of section file
 * @param  {String} name of section file
 * @param  {String} temporary path
 * @param  {String} dir of main files
 * @param  {Object} element with data of section
 * @param  {Boolean} indicates if it's first time to access
 * @param  {Boolean} indicates if section is included in toc.ncx
 * @return  {Boolean} indicates if it's first time to access
 */
function processSubSectionEPUB(filePath, mainDir, hasTOC, element, idsectionAux){

	var lengthNavPoints = hasTOC?$(element).children("navPoint").length:$(element).children("ol, li").length; 
	var controller = application.controller.getInstance();
	var importationHTML = application.importhtml.getInstance();
	if(lengthNavPoints != 0)
	{
		var childrenNavPoints  = hasTOC?$(element).children("navPoint"):$(element).children("ol[hidden!=''], li");
		childrenNavPoints.each(function()
		{
			var lengthNavPoints2 = hasTOC?$(element).children("navPoint").length:$(this).children("ol[hidden!=''], li").length; 
			if(hasTOC || (!hasTOC && (this.tagName != "ol"))){
				var sectionNameAux = hasTOC?$(this).find('navlabel')[0].textContent.trim():$(this).children("a").text();
				var sectionPathAux = hasTOC?$($(this).find('content')[0]).attr("src"):$(this).children("a").attr("href");
				sectionPathAux = getSectionPath(sectionPathAux);
		  		var dataSubSectionFile = fs.readFileSync(decodeURIComponent(filePath + mainDir + sectionPathAux));
				var html2 = dataSubSectionFile.toString();
				html2 = removeExtraElements(html2);
				idsection = controller.appendSection(idsectionAux);
	  			controller.updateSectionName(sectionNameAux,idsection);	
				importationHTML.processHTML(html2, filePath + mainDir + sectionPathAux, idsection);
			}
			if(!hasTOC && (this.tagName == "ol"))
				idsection = idsectionAux;
			if(lengthNavPoints2 != 0)
				processSubSectionEPUB(filePath, mainDir, hasTOC, this, idsection);
		})								  	  			
	}
}
/**
 * This method is responsible for reading EPUB data
 * It reads first container.xml and search ncx element (TOC) and searches toc element
 * In addition it removes references inf navPoints (marked with #)
 * @param  {String} path of the unzipped elements
 */
function processPackageDataEPUB(filePath)
{
	var fs = require('fs');
	var idsection = "", idSectionAux = "", ncxFile = "";
	var ui = application.ui.core.getInstance();
	var isFirst = true;
	var fileIndex = getMainFile(filePath);
	var mainDir = (fileIndex.indexOf("/") != -1)? fileIndex.split("/")[0] + "/" : ""
	var hasAnchor = false;
	var sectionsToProcess = [];
	var counter = 0;

	dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndex),{encoding:'utf8'});
	$(dataFile.toString()).find("manifest").children("item").each(function(){
		if($(this).attr("id") == "ncx") ncxFile =  $(this).attr("href");
	});

	if(ncxFile != "")
	{
		 fs.readFile(decodeURIComponent(filePath+ mainDir + ncxFile), function(err, data) {
	   	  	$(data.toString()).find("navMap").children("navPoint").each(function(){
		   	  	var sectionName = $(this).find('navlabel')[0].textContent.trim();
		   	  	var sectionPath = $($(this).find('content')[0]).attr("src");
		 		isFirst = processSectionEPUB(sectionPath, sectionName, filePath, mainDir, this, isFirst, true);
		 	});
		 });
	}
	else
	{
		fs.readFile(decodeURIComponent(filePath + fileIndex), function(err, data) {
			tocFile = ($(data.toString()).find("manifest").children("item#toc").length != 0)?$(data.toString()).find("manifest").children("item#toc").attr("href"):$($(data.toString()).find("manifest").children("item#nav")).attr("href");
			fs.readFile(decodeURIComponent(filePath+ mainDir + tocFile), function(err1, data1) {
				$($.parseXML((data1.toString()))).find('nav').each(function(){if($(this).attr("epub:type") == "toc") tocList = $(this);});
				tocList.children("ol").children("li").each(function(){ 
					var sectionName = $(this).children("a").text();
	  	  			var sectionPath = $(this).children("a").attr("href");
					isFirst = processSectionEPUB(sectionPath, sectionName, filePath, 
						mainDir + ((tocFile.indexOf("/") != 0)?tocFile.substring(0, tocFile.lastIndexOf("/"))+"/":""), this, isFirst, false);
				});
			});
		});
	}
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);