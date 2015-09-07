/**
 * @class ImportEPUB
 * @classdesc This class is responsible to make import data of EPUB files
 */
function ImportEPUB(){}

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
	
	var foundXML = true, foundComment = true, foundScript = true;

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

	while(foundScript)
	{
		if(html.indexOf("<script") != -1)
			html = html.replace(html.substring(html.indexOf("<script"), html.indexOf("</script>")+9),"");
		if(html.indexOf("<script") == -1) foundScript = false;
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
ImportEPUB.prototype.processSectionEPUB = function processSectionEPUB(sectionPath, sectionName, filePath, mainDir, element, options)
{

	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "", sectionPathwAnchor = "";
	var fs = require('fs');
	var importationHTML = application.importhtml.getInstance();
	var foundXML = true, foundComment = true;
	var opt = $.extend({},options);
	var html = "", obj;
	var that = this;

	sectionPathwAnchor = getSectionPath(sectionPath);
	html = fs.readFileSync(decodeURIComponent(filePath + mainDir + sectionPathwAnchor)).toString();

	if(sectionPathwAnchor != sectionPath){
		try{
			html = processPathWithAnchor(html, opt, sectionPath);
			obj = $.parseJSON('{"isELP":'+ true + '}');
		}
		catch(ex){}
		$('#tempImportEPUB').remove();
		$('#layerEPUB').remove();
	}

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
	importationHTML.processHTML(html, filePath + mainDir + sectionPathwAnchor, idsection, obj);
	that.processSubSectionEPUB(filePath, mainDir, opt.hasTOC, element, idsectionAux);
	return opt.isFirst;
}

/**
 * This method is responsible for processing path with anchors
 * @param  {String} content of html file
 * @param  {Object} a JSON object with additional options
 * @param  {String} name of section 
 * @return  {Boolean} html filtered
 */
 function processPathWithAnchor(htmlContent, opt, sectionPath)
{
	var HtmlSplitter = require('htmlsplitter');
	var temp = "", tempImport = $('<iframe id="tempImportEPUB" width="100%" height="100%" ;/>');
	var html = "";
	var docFrag = document.createDocumentFragment();
	var div = document.createElement('div');				

	tempImport.css("position", "fixed").css("z-index","-1000");
	$("body").append(tempImport);
	$("body").append("<div id='layerEPUB' style='z-index:-500;background:#fff; position:fixed; top:0; width:100%;height:100%'></div>");

	temp = $(document.createElement('HTML')).html(htmlContent)[0];

	if(opt.nextSectionPath != "undefined" && opt.nextSectionPath.indexOf("#") != -1){
		if(opt.nextSectionPath.split('#')[0] != getSectionPath(sectionPath))
			HtmlSplitter.splitFromTo(temp, docFrag, "#" + sectionPath.split('#')[1], "#" + sectionPath.split('#')[1]);
		else
			HtmlSplitter.splitFromTo(temp, docFrag, "#" + sectionPath.split('#')[1], "#" + opt.nextSectionPath.split('#')[1]);
	}
	else
		HtmlSplitter.splitFromTo(temp, docFrag, "#" + sectionPath.split('#')[1], "#" + sectionPath.split('#')[1]);

	div.appendChild( docFrag.cloneNode(true));
	html = div.innerHTML;

	tempImport.contents().find("html").html(html);
	html = tempImport.contents().find("html").html();
	return html;
}
/**
 * This method is responsible for processing subsections of an EPUB file
 * In case of not getting TOC, process elements of list
 * @param  {String} path of section file
 * @param  {String} name of section file
 * @param  {String} temporary path
 * @param  {String} dir of main files
 * @param  {Object} element with data of section
 */
ImportEPUB.prototype.processSubSectionEPUB = function processSubSectionEPUB(filePath, mainDir, hasTOC, element, idsectionAux){

	var lengthNavPoints = hasTOC?$(element).children("navPoint").length:$(element).children("ol, li").length; 
	var controller = application.controller.getInstance();
	var importationHTML = application.importhtml.getInstance();
	var sectionPathAuxwAnchor = "", obj2;
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
		  		var dataSubSectionFile = fs.readFileSync(decodeURIComponent(filePath + mainDir + sectionPathAuxwAnchor));
				var html2 = dataSubSectionFile.toString();

				if(sectionPathAux != sectionPathAuxwAnchor){ 
					if(!hasTOC)
						var nextSubSectionPath = $(this).find("li:first-child").length == 0? $(this).next("li").length == 0?$(this).parent().parent().next("li").length == 0?"undefined":$(this).parent().parent().next("li").children("a").attr("href"):$(this).next().children("a").attr("href"):$(this).find("li:first-child").children("a").attr("href");
					else
						var nextSubSectionPath = $(this).children("navPoint").length == 0? $(this).next("navPoint").length == 0?$(this).parent().next("navPoint").length == 0?$(element).parent().next().length == 0?"undefined":
					$(element).parent().next().children("content").attr("src"):$(this).parent().next("navPoint").children("content").attr("src"):$(this).next("navPoint").children("content").attr("src"):$(this).children("navPoint").children("content").attr("src");
					//console.log("Actual:" + $(this).children("content").attr("src") + " Siguiente:" + nextSubSectionPath);
					//console.log("Actual:" + $(this).children("a").attr("href") + " Siguiente:" + nextSubSectionPath);
			  		var options = $.parseJSON('{"nextSectionPath":"' + nextSubSectionPath + '"}');
			  		try{
						html2 = processPathWithAnchor(html2, options, sectionPathAux);
						obj2 = $.parseJSON('{"isELP":'+ true + '}');
					}catch(ex){}
					$('#tempImportEPUB').remove();
					$('#layerEPUB').remove();
				}

				html2 = removeExtraElements(html2);
				idsection = controller.appendSection(idsectionAux);
	  			controller.updateSectionName(sectionNameAux,idsection);	
				importationHTML.processHTML(html2, filePath + mainDir + sectionPathAux, idsection, obj2); 
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
 * It reads ncx File and process depending on this file
 * @param  {String} path of the unzipped elements
 */
ImportEPUB.prototype.processPackageDataEPUB = function processPackageDataEPUB(filePath)
{
	var fs = require('fs');
	var ncxFile = "";
	var ui = application.ui.core.getInstance();
	var fileIndex = getMainFile(filePath);
	var mainDir = (fileIndex.indexOf("/") != -1)? fileIndex.split("/")[0] + "/" : ""
	that = this;

	dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndex),{encoding:'utf8'});
	ncxFile = $(dataFile.toString()).find("manifest").children('item[id^="ncx"]').attr("href") == undefined? 
	$(dataFile.toString()).find('[id^="ncx"]').attr("href"): $(dataFile.toString()).find('[id^="ncx"]').attr("href");

	if(ncxFile != undefined)
		that.processncxFile(filePath, mainDir, ncxFile);
	else
		that.processTOCFile(filePath, fileIndex, mainDir);

	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

/**
 * This method is responsible for reading ncxFiles
 * It reads navs and process them, getting previous and next node for each of them
 * @param  {String} path of the unzipped elements
 * @param  {String} main dir of unzipped elements
 * @param  {String} name of the ncxFile
 */
ImportEPUB.prototype.processncxFile = function processncxFile(filePath, mainDir, ncxFile)
{
	var fs = require('fs');
	var sectionName = "", sectionPath = "";
	var isFirst = true;
	var that = this;

	var data = fs.readFileSync(decodeURIComponent(filePath+ mainDir + ncxFile));
  	$(data.toString()).find("navMap").children("navPoint").each(function(){
	  	sectionName = $(this).find('navlabel')[0].textContent.trim();
	  	sectionPath = $($(this).find('content')[0]).attr("src");
	  	$(this).children("navPoint").each(function(){
	  		var subSectionName = $(this).find('navlabel')[0].textContent.trim();
	  		var subSectionPath = $($(this).find('content')[0]).attr("src");
	  	})
	  	var nextNode = $(this).next().find("content").attr("src") == undefined?$($(this).children("navPoint")[0]).children("content").attr("src"):$(this).next().find("content").attr("src");
	  	//var prevNode = $(this).prev().find("content").attr("src") == undefined?$($(this).children("navPoint")[0]).children("content").attr("src"):$(this).prev().find("content").attr("src");
	  	var options = $.parseJSON('{"isFirst":'+ isFirst + ', "hasTOC":' + true + ', "nextSectionPath":"' + nextNode 
	  		/*+ '", "prevSectionPath":"' + prevNode*/ + '"}');
	  		//console.log("Anterior:" + prevNode + " Posterior:" + nextNode);
		isFirst = that.processSectionEPUB(sectionPath, sectionName, filePath, mainDir, this, options);
	});
}
/**
 * This method is responsible for reading TOC Files
 * It reads navs and process them, getting previous and next node for each of them
 * @param  {String} path of the unzipped elements
 * @param  {String} name of the TOC file
 * @param  {String} main dir of unzipped elements
 */
ImportEPUB.prototype.processTOCFile = function processTOCFile(filePath, fileIndex, mainDir)
{
	var fs = require('fs');
	var tocFile = "";
	var sectionName = "", sectionPath = "";
	var isFirst = true;
	var that = this;

	var data = fs.readFileSync(decodeURIComponent(filePath + fileIndex));
	tocFile = ($(data.toString()).find("manifest").children("item#toc").length != 0)?$(data.toString()).find("manifest").children("item#toc").attr("href"):$($(data.toString()).find("manifest").children("item#nav")).attr("href");
	var data1 = fs.readFileSync(decodeURIComponent(filePath+ mainDir + tocFile));
	$($.parseXML((data1.toString()))).find('nav').each(function(){if($(this).attr("epub:type") == "toc") tocList = $(this);});
	tocList.children("ol").children("li").each(function(){ 
		sectionName = $(this).children("a").text();
  			sectionPath = $(this).children("a").attr("href");
  			$(this).children("ol[hidden!='']").children("li").each(function(){
   	  		var subSectionName = $(this).children("a").attr("href");
   	  		var subSectionPath = $(this).children("a").text();
   	  	})
   	  	var nextNode =  $(this).next().length == 0?$(this).children("ol").length == 0?"undefined":$(this).children("ol").children(":first-child").children("a").attr("href"):$(this).next().children("a").attr("href");
  		//var prevNode = $(this).prev().length == 0?$(this).parent("li").length == 0?"undefined":$(this).parent("li").children("a").attr("href"):$(this).prev().children("a").attr("href");
  		var options = $.parseJSON('{"isFirst":'+ isFirst + ', "hasTOC":' + false + ', "nextSectionPath":"' + nextNode 
  		/*+ '", "prevSectionPath":"' + prevNode */+ '"}');
	  	//console.log("Anterior:" + prevNode + " Posterior:" + nextNode);
		isFirst = that.processSectionEPUB(sectionPath, sectionName, filePath, 
			mainDir + ((tocFile.indexOf("/") != 0)?tocFile.substring(0, tocFile.lastIndexOf("/"))+"/":""), this, options);
	});
}

CBUtil.createNameSpace('application.importepub');
application.importepub = CBUtil.singleton(ImportEPUB);