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
function processText(node)
{
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var text = new textBox();
	var textTags = text.importHTML();

	if($.inArray(node.tagName, textTags) != -1)
	{
		var text = "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
		var width = node.width;
		var height = node.height;
		var left = node.offsetLeft;
		var top = node.offsetTop;

		text = new textBox({"text":text, "position" : [top,left]});
		var x = text.editorView();
		$(Cloudbook.UI.targetcontent).append(x);
		text.add_callback(x,text);
		//console.log("TEXT " + node.innerHTML + " " + node.tagName + " " + text + " " + width + " " + height + " " + top + " " + left );
		return true;
	}
	else
	{

		text = new textBox({"text":node, "position" : [0,0]});
		var x = text.editorView();
		$(Cloudbook.UI.targetcontent).append(x);
		text.add_callback(x,text);
		return false;
	}
}

/**
 * This method is responsible for processing Image elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
function processImage(node, filePath){

	var imageBox = CBUtil.req("../src/components/core/images/core.js");
	var image = new imageBox();
	var imageTags = image.importHTML();

	if($.inArray(node.tagName, imageTags) != -1)
	{	
		var imgpath = node.attributes.getNamedItem("src").value;
		var text = node.attributes.getNamedItem("alt").value;
		var width = node.width;
		var height = node.height;
		var left = node.offsetLeft;
		var top = node.offsetTop;

		image = new imageBox({"text":text, "position" : [top,left], "imgpath":filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath});
		var x = image.editorView();
		$(Cloudbook.UI.targetcontent).append(x);
		image.add_callback(x,image);

//		console.log("IMAGE " + node.tagName + " " + node.innerHTML + " " + imgpath + " " + text + " " + width + " " + height + " " + 
//		top + " " + left + node.style.width + " " + filePath.substring(0,filePath.lastIndexOf("/")));
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
function processVideo(node, filePath){

	var videoBox = CBUtil.req("../src/components/core/video/core.js");
	var video = new videoBox();
	var videoTags = video.importHTML();

	if($.inArray(node.tagName, videoTags) != -1)
	{	
		var imgpath = "";
		if (node.innerHTML.indexOf("src=")!=-1) 
			imgpath = node.innerHTML.split('src="')[1].split(" ")[0].replace('"','');
		var width = node.width;
		var height = node.height;
		var left = node.offsetLeft;
		var top = node.offsetTop;

		video = new videoBox({"position" : [top,left], "imgpath":filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath});
		var x = video.editorView();
		$(Cloudbook.UI.targetcontent).append(x);
		video.add_callback(x,video);

//		console.log("VIDEO " + node.tagName + " " + node.innerHTML + " " + imgpath + " " +  width + " " + height + " " + 
//		top + " " + left + node.style.width + " " + filePath.substring(0,filePath.lastIndexOf("/")) + "/"+imgpath);

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
function processBlock(element, filePath, blockName)
{
	var blockText = "";
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var text = new textBox();
	var textTags = text.importHTML();

	for(var node = element.firstChild; node; node = node.nextSibling){
		console.log(node.tagName + " " + blockName + " " + blockText + node.nodeName);
		if(node.tagName != undefined)
		{
			switch(node.tagName)
			{
				case "P":case "H1":case "H2":case "H3":case "H4":case "H5":case "H6":
				case "A":case "SPAN":case "UL":case "OL":case "LABEL":case "BUTTON":
				case "INPUT":case "ABBR":case "ADDRESS":case "BLOCKQUOTE":case "CANVAS":case "TABLE":
					if(blockName != null){
						blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + "><br>";
					}else{
						if(!processText(node)) processImage(node, filePath);
					}
				break;
				case "IMG":
					if(!processImage(node, filePath)) processText(node);
				break;
				break;
				case "SECTION":case "ARTICLE":case "NAV":case "DIV": case "FOOTER":case "ASIDE":
					var text = processBlock(node, filePath, node.tagName);
					processText(text);
					text = "";
				break;
				case "VIDEO":
					if(!processVideo(node,filePath)) processImage(node, filePath);
				break;
				default:
					if(blockName != null){
						blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + "><br>";
					}else{
						if(!processText(node)) processImage(node, filePath);
					}
				break;
			}
		}
	}

	if(blockName != null)
		return blockText;
}
/**
 * This method is responsible for reading HTML content
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 */
ImportHTML.prototype.processHTML = function processHTML(data, filePath)
{
	var includeHTML = $(data);

	$.each(includeHTML, function(index, element){
		switch(element.tagName)
		{
			case "HEADER":case "DIV":case "SECTION":case "ARTICLE":case "FOOTER":
				processBlock(element, filePath, null);
			break;
			case "P":case "H1":case "H2":case "A":
				//console.log(index + " " + element.tagName + " " + $(element).text() + " " );
			break;
		}
	});
}
CBUtil.createNameSpace('application.importhtml');
application.importhtml = CBUtil.singleton(ImportHTML);