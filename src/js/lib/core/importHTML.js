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
function processText(idsectionselected,node)
{
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var textTags = new textBox().importHTML();
	var backend = application.backend.core.getInstance();
	if($.inArray(node.tagName, textTags) != -1)
	{
		var text = "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
		var width = node.width;
		var height = node.height;
		var left = node.offsetLeft;
		var top = node.offsetTop;

		text = new textBox({"text":text, "position" : [top,left]});
		backend.appendCBObjectIntoSection(text,idsectionselected);
		return true;
	}
	else
	{
		text = new textBox({"text":node, "position" : [0,0]});
		backend.appendCBObjectIntoSection(text,idsectionselected);
		return false;
	}
}

/**
 * This method is responsible for processing Image elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
function processImage(idsectionselected,node, filePath){

	var imageBox = CBUtil.req("../src/components/core/images/core.js");
	var imageTags = new imageBox().importHTML();
	var backend = application.backend.core.getInstance();
	if($.inArray(node.tagName, imageTags) != -1)
	{
		if(node.tagName == "FIGURE")
			node = node.firstElementChild;
		try{
			var imgpath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:"";
			var text = node.attributes.getNamedItem("alt") != null? node.attributes.getNamedItem("alt").value:"";
			var width = node.width;
			var height = node.height;
			var left = node.offsetLeft;
			var top = node.offsetTop;
			image = new imageBox({"text":text, "position" : [top,left], "imgpath":filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath});
			backend.appendCBObjectIntoSection(image,idsectionselected);
		}
		catch (err) {
		    console.log('Errors in Image');
		}
		return true;
	}
	else
		return false;
}
/**
 * This method is responsible for processing video elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
function processVideo(idsectionselected,node, filePath){

	var videoBox = CBUtil.req("../src/components/core/video/core.js");
	var videoTags = new videoBox().importHTML();
	var backend = application.backend.core.getInstance();
	if($.inArray(node.tagName, videoTags) != -1)
	{	
		var imgpath = "";
		try{
			if (node.innerHTML.indexOf("src=")!=-1) 
				imgpath = node.innerHTML.split('src="')[1].split(" ")[0].replace('"','');
			var width = node.width;
			var height = node.height;
			var left = node.offsetLeft;
			var top = node.offsetTop;

			video = new videoBox({"position" : [top,left], "videopath":filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath});
			backend.appendCBObjectIntoSection(video,idsectionselected);
		}
		catch (err) {
		    console.log('Errors in Video');
		}
		return true;
	}
	else
		return false;
}
/**
 * This method is responsible for reading block elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 * @param  {String} name of block element
 */
function processBlock(element, filePath, blockName, idsectionselected)
{
	var blockText = "";
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var textTags = new textBox().importHTML();
	var imageBox = CBUtil.req("../src/components/core/images/core.js");
	var imageTags = new imageBox().importHTML();
	var videoBox = CBUtil.req("../src/components/core/video/core.js");
	var videoTags = new videoBox().importHTML();
	for(var node = element.firstChild; node; node = node.nextSibling){
		if(node.tagName != undefined)
		{
			switch(node.tagName)
			{
				case "SECTION":case "ARTICLE":case "NAV":case "DIV": case "FOOTER":case "ASIDE":
					var text = processBlock(node, filePath, node.tagName);
					processText(idsectionselected,text);
					text = "";
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
				break;
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