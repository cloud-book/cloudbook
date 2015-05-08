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
 * This method is responsible for processing Text blocks
 * It creates an span element and insert it into a section
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

	var auxNode = $('<SPAN></SPAN>');
	auxNode.innerHTML = textValue;
	auxNode.tagName = 'SPAN';
	auxNode.clientWidth = width;
	auxNode.clientHeight = height;
	auxNode.offsetTop = top;
	auxNode.offsetLeft = left;
	candidates = getHTMLTags(auxNode);
	element = new Cloudbook.Actions[candidates[0]]['component']();
	element.importHTML(auxNode, filePath);
	backend.appendCBObjectIntoSection(element, idsectionselected);
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
		element = new Cloudbook.Actions[candidates[0]]['component']();
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
					    node.parentElement.parentNode.nodeName == "HTML"))
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
						if(node.children.length >0 && node.children[0].nodeName == "IMG")
							processElementBlock(node.children[0], filePath, idsectionselected);
						else
							that.blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
					}
					else
					{
						processElementBlock(node, filePath, idsectionselected);
					}
				break;
			}
		}
		else
		{
			if(node.nodeValue.trim().length > 0)
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
 * finally removes two elements and loads content of selected section
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 */
ImportHTML.prototype.processHTML = function processHTML(data, filePath, idsectionselected)
{
	var that = this;
	var includeHTML = $(data);

	setTimeout(function(){
		var temp = $('<iframe id="tempImportHTML" width="100%" height="100%" ;/>');
		temp.css("position", "fixed").css("z-index","-1000");
		$("body").append(temp);
		temp.contents().find("html").html(data);
		$("body").append("<div id='layer' style='z-index:-500;background:#fff; position:fixed; top:0; width:100%;height:100%'></div>");

		processBlock($('#tempImportHTML').contents().find("body").length == 0? temp.contents().get()[0].children[0]:temp.contents().get()[0].children[0].childNodes[2],
		 filePath, null,idsectionselected,that);
		var ui = application.ui.core.getInstance();
		$('#tempImportHTML').remove();
		$('#layer').remove();
		ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
	}, 500);
}
CBUtil.createNameSpace('application.importhtml');
application.importhtml = CBUtil.singleton(ImportHTML);