var topValue = 0;
var blockText = "";
/**
 * @class ImportHTML
 * @classdesc This class is responsible to make import operations of HTML Files
 */
function ImportHTML(){}

/**
 * This method is responsible for processing Text elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML node
 */
/*function processText(idsectionselected,node)
{
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var textTags = new textBox().HTMLtags();

	var backend = application.backend.core.getInstance();

	if(node.tagName != null)
	{
		var text = "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
		var width = node.width;
		var height = node.height;
		var left = node.offsetLeft;
		//var top = node.offsetTop;
		textElement = new textBox({"text":text, "position" : [left, topValue]});
		topValue = topValue + parseInt(textElement.size[1]);
		backend.appendCBObjectIntoSection(textElement,idsectionselected);
		return true;
	}
	else
	{
		textElement = new textBox({"text":node, "position" : [0,topValue], "size" : [800, 300]});
		topValue = topValue + parseInt(textElement.size[1]);
		backend.appendCBObjectIntoSection(textElement,idsectionselected);
		return false;
	}
}*/

/**
 * This method is responsible for processing Image elements
 * It creates a section, includes inside all elements and copies images into project folder
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
/*function processImage(idsectionselected,node, filePath){

	var imageBox = CBUtil.req("../src/components/core/images/core.js");
	var imageTags = new imageBox().HTMLtags();
	var Project = window.Project;
	var fs = require('fs.extra');
	var path = require('path');

	var backend = application.backend.core.getInstance();
		if(node.tagName == "FIGURE")
			node = node.firstElementChild;
		try{
			
			var imgpath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:"";
			var sourcePath = path.join(Project.Info.projectpath, "/rsrc/", path.basename(imgpath));
			if(fs.existsSync(sourcePath))
				fs.renameSync(sourcePath, path.join(Project.Info.projectpath, "/rsrc/", path.basename(imgpath).replace(".", Date.now().toString() + ".")));

			fs.copy(path.join(path.dirname(filePath), imgpath), path.join(Project.Info.projectpath, "/rsrc/", path.basename(imgpath)), function (err){
				if(err){
						console.log("Error copying image");
				}
			});

			var text = node.attributes.getNamedItem("alt") != null? node.attributes.getNamedItem("alt").value:"";
			var width = node.width;
			var height = node.height;
			var left = node.offsetLeft;
			var top = node.offsetTop;
			image = new imageBox({"text":text, "position" : [left, topValue], "imgpath":filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath});
			topValue = topValue + parseInt(image.size[1]);
			backend.appendCBObjectIntoSection(image,idsectionselected);
		}
		catch (err) {
		    console.log('Errors in Image');
		}
		return true;
}*/
/**
 * This method is responsible for processing video elements
 * It creates a section,  includes inside all elements and copies video into folder
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
/*function processVideo(idsectionselected,node, filePath){

	var videoBox = CBUtil.req("../src/components/core/video/core.js");
	var videoTags = new videoBox().HTMLtags();
	var fs = require('fs.extra');
	var path = require('path');
	var videopath = "";

	var backend = application.backend.core.getInstance();
		var imgpath = "";
		try{
			if (node.innerHTML.indexOf("src=")!=-1){
				var videopath = node.innerHTML.split('src="')[1].split(" ")[0].replace('"','');
				var sourcePath = path.join(Project.Info.projectpath, "/rsrc/", path.basename(videopath));

				if(fs.existsSync(sourcePath))
					fs.renameSync(path.join(Project.Info.projectpath, "/rsrc/", path.basename(videopath)), path.join(Project.Info.projectpath, "/rsrc/", 
						path.basename(videopath).replace(".", Date.now().toString() + ".")));

						fs.copy(path.join(path.dirname(filePath), videopath), path.join(Project.Info.projectpath, "/rsrc/", path.basename(videopath)), function (err){
							if(err){
									console.log("Error copying video");
							}
					});
			}
			var width = node.width;
			var height = node.height;
			var left = node.offsetLeft;
			var top = node.offsetTop;
			video = new videoBox({"position" : [left, topValue], "videopath":filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath});
			topValue = topValue + parseInt(video.size[1]);
			backend.appendCBObjectIntoSection(video,idsectionselected);
		}
		catch (err) {
		    console.log(err + 'Errors in Video');
		}
		return true;
}*/

/**
 * This method is responsible for getting tags for each component
 * @param  {String} tag to be found
 * @result  {Object[]} array of possible candidates
 */
function getHTMLTags(tag)
{
	var listactions = {};
	var x = Cloudbook.Actions;
	var keylist = Object.keys(x);
	var candidates = [];

	keylist.forEach(function(key){
		var aux = new x[key]['component'](); 
		listactions[key] = aux.HTMLtags();

	});
	keylist.forEach(function(key){
		if(listactions[key].indexOf(tag)> -1){ candidates.push(key)} 
	});
	return candidates;
}

/**
 * This method is responsible for getting tags for text component
 * @param  {String} tag to be found
 * @result  {Object[]} array of possible candidates
 */
function getTextTags()
{
	var listactions = {};
	var x = Cloudbook.Actions;
	var keylist = Object.keys(x);
	var candidates = [];

	keylist.forEach(function(key){
		var aux = new x[key]['component'](); 
		listactions[key] = aux.HTMLtags();
	});
	keylist.forEach(function(key){
		if(x[key]['path'] == 'components/core/text'){ candidates.push(key)} 
	});

	return candidates;
}

/**
 * This method is responsible for reading block elements
 * It creates an element and insert it into a section
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 * @param  {String} name of block element
 */
function processBlock(element, filePath, blockName, idsectionselected)
{
	var candidates;
	var backend = application.backend.core.getInstance();
	var textCandidates = getTextTags();

	for(var node = element.firstChild; node; node = node.nextSibling){
		candidates = [];
		if(node.tagName != undefined)
		{
			switch(node.tagName)
			{
				case "SECTION":case "ARTICLE":case "NAV":case "DIV": case "FOOTER":case "ASIDE":
					var text = processBlock(node, filePath, node.tagName);
					var auxNode = $('<SPAN>' + text +'</SPAN>');
					auxNode.tagName = 'SPAN';
					candidates = getHTMLTags(auxNode.tagName);
					element = new Cloudbook.Actions[candidates[0]]['component']();
					element.importHTML(auxNode, filePath);
					backend.appendCBObjectIntoSection(element, Cloudbook.UI.selected.attr('data-cbsectionid'));
					blockText = "";
					text = "";
					topValue = topValue + 100;
				break;
				default:
					if($.inArray(node.tagName,textCandidates) && (blockName != null))
					{
						blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + "><br>";
					}
					else
					{
						candidates = getHTMLTags(node.tagName);
						element = new Cloudbook.Actions[candidates[0]]['component']();
						node.top = topValue;
						topValue = topValue + node.height;
						element.importHTML(node, filePath);
						backend.appendCBObjectIntoSection(element, Cloudbook.UI.selected.attr('data-cbsectionid'));
					}
				break;
				
			/*	case "SECTION":case "ARTICLE":case "NAV":case "DIV": case "FOOTER":case "ASIDE":
					var text = processBlock(node, filePath, node.tagName, idsectionselected);
					console.log(node.tagName + " "  + text);
					if(text !="")
						processText(idsectionselected,text);
					blockText = "";
				break;
				default:
					if($.inArray(node.tagName, textTags) != -1)
					{
						if(blockName != null)
								blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + "><br>";
						else
								processText(idsectionselected,node);
					}else
					{
						if($.inArray(node.tagName, imageTags) != -1){
							processImage(idsectionselected,node, filePath)
						}
						else{
							if($.inArray(node.tagName, videoTags) != -1){
								processVideo(idsectionselected,node,filePath);
							}
						}
					}
				break;*/
			}
		}
	}
	if(blockName != null)
		return blockText;
}
/**
 * This method is responsible for reading HTML main block contents
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 */
ImportHTML.prototype.processHTML = function processHTML(data, filePath)
{
	//var juice = require('juice');
	//var cheerio = require('cheerio');

	//var result = juice.juiceFile(filePath, "", function(err, html){
	//var cheerioData = cheerio.load(html);
		//console.log(cheerioData.html());
		//var includeHTML = $(cheerioData.html());
	var includeHTML = $(data);
	var idsectionselected = Cloudbook.UI.selected.attr('data-cbsectionid');
	$.each(includeHTML, function(index, element){
		switch(element.tagName)
		{
			case "HEADER":case "DIV":case "SECTION":case "ARTICLE":case "FOOTER":case "ASIDE":
				processBlock(element, filePath, null,idsectionselected);
			break;
			
		}
	});
	var ui = application.ui.core.getInstance();
	ui.loadContent(idsectionselected);
}
CBUtil.createNameSpace('application.importhtml');
application.importhtml = CBUtil.singleton(ImportHTML);