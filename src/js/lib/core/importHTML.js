/**
 * @class ImportHTML
 * @classdesc This class is responsible to make import operations of HTML Files
 * it loads TextTags
 */
function ImportHTML(){
	this.topValue = 0;
	this.blockText = "";
	this.textCandidates = getTextTags();
}

/**
 * This method is responsible for getting tags for each component
 * @param  {Object} node which tag is to be found
 * @result  {Object[]} array of possible candidates
 */
function getHTMLTags(node)
{
	var tag = node.tagName;
	var listactions = {};
	var x = Cloudbook.Actions;
	var keylist = Object.keys(x);
	var candidates = [];
	var score = 0;

	keylist.forEach(function(key){
		var aux = new x[key]['component'](); 
		var scoreElement = aux.HTMLtags(node);
		if(score < scoreElement)
		{  
			candidates = [];
			candidates.push(key);
			score = scoreElement;
		}
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
		if(x[key]['path'] ==='components/core/text') 
		candidates.push.apply(candidates, aux.HTMLtagNames());
	});
	return candidates;
}

/**
 * This method is responsible for extracting non-Text elements and processing them
 * It searches elements, process them and removes them from the code
 * @param  {Object} text to be processed
 * @param  {String} path of the element
 * @param  {String} id of section selected
 * @result  {String} text processed

 */
function extractElements(element, filePath, idsectionselected){

	try{
		$(element).find("img, iframe, video, audio, object").each(function(){
		  	processElementBlock($(this)[0], filePath, idsectionselected);
		  	this.outerHTML = "";
		});

		while(element.indexOf("<img") != -1)
			element = element.replace(element.substring(element.indexOf("<img"), element.indexOf(">", element.indexOf("<img"))+1), "");

		while(element.indexOf("<iframe") != -1)
			element = element.replace(element.substring(element.indexOf("<iframe"), element.indexOf("</iframe>")+9), "");

		while(element.indexOf("<video") != -1)
			element = element.replace(element.substring(element.indexOf("<video"), element.indexOf("</video>")+8), "");

		while(element.indexOf("<audio") != -1)
			element = element.replace(element.substring(element.indexOf("<audio"), element.indexOf("</audio>")+8), "");

		while(element.indexOf("<object") != -1)
			element = element.replace(element.substring(element.indexOf("<object"), element.indexOf("</object>")+9), "");
	}catch(e){}
	return element;
}

/**
 * This method is responsible for processing Text blocks
 * It creates an span element and insert it into a section
 * Before it process and delete images inside the text
 * @param  {String} content of the element
 * @param  {String} width of the element
 * @param  {String} height of the element
 * @param  {String} top of the element
 * @param  {String} left of the element
 * @param  {String} path of the imported project
 * @param  {String} id of section selected
 */
function processTextBlock(textValue, width, height, top, left, filePath, idsectionselected){

	var backend = application.backend.core.getInstance();

	textValue = extractElements(textValue, filePath, idsectionselected);
	var auxNode = $('<SPAN></SPAN>');
	auxNode.innerHTML = textValue;
	auxNode.tagName = 'SPAN';
	auxNode.clientWidth = width;
	auxNode.clientHeight = height;
	auxNode.offsetTop = top;
	auxNode.offsetLeft = left;
	processElementBlock(auxNode, filePath, idsectionselected)
}

/**
 * This method is responsible for processing element blocks
 * It searches the element and inserts it into a section
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 */
function processElementBlock(node, filePath, idsectionselected)
{
	var candidates = getHTMLTags(node);
	var backend = application.backend.core.getInstance();

	if(candidates.length > 0)
	{
		var element = new Cloudbook.Actions[candidates[0]]['component']();
		if(Cloudbook.Actions[candidates[0]].path.indexOf("core/text") != -1)
			node = extractElements(node, filePath, idsectionselected);
		element.importHTML(node, filePath);
		backend.appendCBObjectIntoSection(element, idsectionselected);
	}
}

/**
 * This method is responsible for reading block elements
 * It creates an element and inserts it into a section
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 * @param  {String} name of block element
 * @param  {String} id of section selected
 * @param  {Object} element to share data
 */
function processBlock(element, filePath, blockName, idsectionselected,that)
{
	var candidates;
	var backend = application.backend.core.getInstance();

	for(var node = element.firstChild; node; node = node.nextSibling){
		candidates = [];
		if(node.tagName != undefined)
		{
			switch(node.tagName)
			{
				case "SECTION":case "ARTICLE":case "NAV":case "DIV": case "ASIDE":case "MAIN":
					var width = node.clientWidth;
				    var height = node.clientHeight;
				    var left = node.offsetLeft;
				    var top = node.offsetTop;
				    var text = "";
					text = processBlock(node, filePath, node.tagName,idsectionselected,that);
					if(node.parentElement.tagName =="HEADER" || node.parentElement.tagName =="FOOTER" ||
						node.parentElement.nodeName == "BODY" || (node.parentElement.parentElement != null && 
							node.parentElement.parentElement.nodeName == "BODY") || (node.parentElement.parentElement != null &&
					    node.parentElement.parentNode.nodeName == "HTML") || node.parentElement.tagName =="HTML")
					{
						if(text != ""){
							processTextBlock(text, width, height, top, left, filePath, idsectionselected);
							that.blockText = "";
							text = "";
						}
					}
				break;
				case "HEADER": case "FOOTER":
					processBlock(node, filePath, null,idsectionselected,that);
				break;
				default:
					if( ($.inArray(node.tagName,that.textCandidates) > -1 )&& (blockName != null))
					{
						if(node.children.length ==1 && node.children[0].nodeName == "IMG" && node.childNodes.length == 1)
							processElementBlock(node.children[0], filePath, idsectionselected);
						else
							that.blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
					}
					else
					{
						if(node.children.length ==1 && node.children[0].nodeName == "IMG" && node.childNodes.length == 1)
							processElementBlock(node.children[0], filePath, idsectionselected);
						else
							processElementBlock(node, filePath, idsectionselected);
					}
				break;
			}
		}
		else
		{
			if(node.nodeType != 8 && node.nodeValue.trim().length > 0)
			{
				if(blockName != null)
					that.blockText  += "<SPAN>" + node.nodeValue + "</SPAN><br>";
				else
				{
					processTextBlock(node.nodeValue, width, height, top, left, filePath, idsectionselected);
					that.blockText = "";
					text = "";
				}
			}
		}
	}
	if(blockName != null)
		return that.blockText;
}
/**
 * This method is responsible for reading HTML main block contents
 * It creates one div and one iframe to load content and process content, 
 * finally removes two elements and loads content of selected section.
 * Content depends on the anchor and if there is, takes the section
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @param  {Object} a JSON object with additional options
 */
ImportHTML.prototype.processHTML = function processHTML(data, filePath, idsectionselected,options)
{
	var that = this;
	var opt = $.extend({},options);
	var controller = application.controller.getInstance();

	
	setTimeout(function(){
		var temp = $('<iframe id="tempImportHTML" width="100%" height="100%" ;/>');
		temp.css("position", "fixed").css("z-index","-1000");
		$("body").append(temp);
		temp.contents().find("html").html(data);
		$("body").append("<div id='layer' style='z-index:-500;background:#fff; position:fixed; top:0; width:100%;height:100%'></div>");
		var contenttoprocess = "";
		if (typeof options !== 'undefined'){
			if(typeof options.idtoprocess !== 'undefined'){
				if(temp.contents().find(options.idtoprocess)[0] == undefined){
					if(data.indexOf(options.idtoprocess.replace("#", "")) != -1){
						contenttoprocess = temp.contents().get()[0].children[0];
					}
				}else{
					contenttoprocess = temp.contents().find(options.idtoprocess)[0];
				}	
			}
			if(typeof options.isELP !== 'undefined'){
				contenttoprocess = temp.contents().get()[0].children[0].childNodes[1];
			}	
		}
		else{			
			if ( $('#tempImportHTML').contents().find("body").length == 0 ) {
				contenttoprocess = temp.contents().get()[0].children[0];
			}
			else{
				contenttoprocess = temp.contents().get()[0].children[0].childNodes[2];
			}
		}
		processBlock(contenttoprocess,filePath, null,idsectionselected,that);
		var ui = application.ui.core.getInstance();
		$('#tempImportHTML').remove();
		$('#layer').remove();
		ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
	}, 500);
	controller.renumberProject();

}
CBUtil.createNameSpace('application.importhtml');
application.importhtml = CBUtil.singleton(ImportHTML);