/**
 * @class ImportEPUB
 * @classdesc This class is responsible to make import data of EPUB files
 */
function ImportEPUB(){
	var sectionsToProcess = [];
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
 * @param  {Object} a JSON object with additional options
 * @return  {Boolean} indicates if it's first time to access
 */
function processSectionEPUB(sectionPath, sectionName, filePath, mainDir, element, options)//isFirst, hasTOC)
{

	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "", sectionPathwAnchor = "";
	var fs = require('fs');
	var importationHTML = application.importhtml.getInstance();
	var foundXML = true, foundComment = true, hasAnchor = false;
	var opt = $.extend({},options);

	sectionPathwAnchor = getSectionPath(sectionPath);
	hasAnchor  = (sectionPath.indexOf("#") != -1)?true:false;
	var dataSectionFile = fs.readFileSync(decodeURIComponent(filePath + mainDir + sectionPathwAnchor));
	var html = dataSectionFile.toString();
	html = removeExtraElements(html);

	if(opt.isFirst)
	{
		controller.updateSectionName(sectionName,Cloudbook.UI.selected.attr('data-cbsectionid'));		
		idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
		opt.isFirst = false;
	}
	else
	{
		idsection = controller.appendSection('root');
		controller.updateSectionName(sectionName,idsection);	
	}
	idsectionAux = idsection;
	var auxSection = sectionPath.split("#")[1] != undefined?"#" + sectionPath.split("#")[1]:undefined;
	var obj = auxSection != undefined? $.parseJSON('{"idtoprocess":"' + auxSection + '"}'): undefined;
	importationHTML.processHTML(html, filePath + mainDir + sectionPathwAnchor, idsection, obj);
	processSubSectionEPUB(filePath, mainDir, opt.hasTOC, element, idsectionAux);
	return opt.isFirst;
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
	var sectionPathAuxwAnchor = "", hasAnchorSubsection = false;
	if(lengthNavPoints != 0)
	{
		var childrenNavPoints  = hasTOC?$(element).children("navPoint"):$(element).children("ol[hidden!=''], li");
		childrenNavPoints.each(function()
		{
			var lengthNavPoints2 = hasTOC?$(element).children("navPoint").length:$(this).children("ol[hidden!=''], li").length; 
			if(hasTOC || (!hasTOC && (this.tagName != "ol"))){
				var sectionNameAux = hasTOC?$(this).find('navlabel')[0].textContent.trim():$(this).children("a").text();
				var sectionPathAux = hasTOC?$($(this).find('content')[0]).attr("src"):$(this).children("a").attr("href");
				sectionPathAuxwAnchor = getSectionPath(sectionPathAux);
				hasAnchorSubsection  = (sectionPathAux.indexOf("#") != -1)?true:false;
		  		var dataSubSectionFile = fs.readFileSync(decodeURIComponent(filePath + mainDir + sectionPathAuxwAnchor));
				var html2 = dataSubSectionFile.toString();
				html2 = removeExtraElements(html2);
				idsection = controller.appendSection(idsectionAux);
	  			controller.updateSectionName(sectionNameAux,idsection);	
	  			var auxSubSection = sectionPathAux.split("#")[1] != undefined?"#" + sectionPathAux.split("#")[1]:undefined;
				var objAux = auxSubSection != undefined? $.parseJSON('{"idtoprocess":"' + auxSubSection + '"}'): undefined;
				importationHTML.processHTML(html2, filePath + mainDir + sectionPathAux, idsection, objAux);
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
 * In addition saves toc into array of sections
 * @param  {String} path of the unzipped elements
 */
ImportEPUB.prototype.processPackageDataEPUB = function processPackageDataEPUB(filePath)
{
	var fs = require('fs');
	var idsection = "", idSectionAux = "", ncxFile = "";
	var ui = application.ui.core.getInstance();
	var isFirst = true;
	var fileIndex = getMainFile(filePath);
	var mainDir = (fileIndex.indexOf("/") != -1)? fileIndex.split("/")[0] + "/" : ""
	var hasAnchor = false;
	var counter = 0;
	var sectionName = "", sectionPath = "";
	sectionsToProcess = [];

	dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndex),{encoding:'utf8'});
	$(dataFile.toString()).find("manifest").children("item").each(function(){
		if($(this).attr("id") == "ncx") ncxFile =  $(this).attr("href");
	});

	if(ncxFile != "")
	{
		 fs.readFile(decodeURIComponent(filePath+ mainDir + ncxFile), function(err, data) {
	   	  	$(data.toString()).find("navMap").children("navPoint").each(function(){
		   	  	sectionName = $(this).find('navlabel')[0].textContent.trim();
		   	  	sectionPath = $($(this).find('content')[0]).attr("src");
		   	  	sectionsToProcess[sectionName] = {"sectionPath": sectionPath, "subsections":[]};
		   	  	$(this).children("navPoint").each(function(){
		   	  		var subSectionName = $(this).find('navlabel')[0].textContent.trim();
		   	  		var subSectionPath = $($(this).find('content')[0]).attr("src");
		   	  		sectionsToProcess[sectionName].subsections.push({"name":subSectionName, "sectionPath":subSectionPath});
		   	  	})
		   	  	var options = $.parseJSON('{"isFirst":'+ isFirst + ', "hasTOC":' + true + '}');
		 		isFirst = processSectionEPUB(sectionPath, sectionName, filePath, mainDir, this, options)//isFirst, true);
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
					sectionName = $(this).children("a").text();
	  	  			sectionPath = $(this).children("a").attr("href");
	  	  			sectionsToProcess[sectionName] = {"sectionPath": sectionPath, "subsections":[]};
	  	  			$(this).children("ol[hidden!='']").children("li").each(function(){
			   	  		var subSectionName = $(this).children("a").attr("href");
			   	  		var subSectionPath = $(this).children("a").text();
			   	  		sectionsToProcess[sectionName].subsections.push({"name":subSectionName, "sectionPath":subSectionPath});
			   	  	})
		   	  		var options = $.parseJSON('{"isFirst":'+ isFirst + ', "hasTOC":' + false + '}');
					isFirst = processSectionEPUB(sectionPath, sectionName, filePath, 
						mainDir + ((tocFile.indexOf("/") != 0)?tocFile.substring(0, tocFile.lastIndexOf("/"))+"/":""), this, options);//isFirst, false);
				});
			});
		});
	}
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}
CBUtil.createNameSpace('application.importepub');
application.importepub = CBUtil.singleton(ImportEPUB);