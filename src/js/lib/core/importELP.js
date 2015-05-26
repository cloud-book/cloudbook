/**
 * @class ImportELP
 * @classdesc This class is responsible to make import data of ELP files
 */
function ImportELP(){}

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
 * This method is responsible for processing elements
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 */
function processElementELP(node, filePath, idsectionselected)
{
	var importationHTML = application.importhtml.getInstance();
	var backend = application.backend.core.getInstance();
	var candidates = getHTMLTags(node);

	if(candidates.length > 0)
	{
		element = new Cloudbook.Actions[candidates[0]]['component']();
		element.importHTML(node, filePath);
		backend.appendCBObjectIntoSection(element, idsectionselected);
	}
}

/**
 * This method is responsible for processing each type of node
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 */
 function processELPNode(node, filePath, idsection)
{
	switch(node.attr("class"))
	{
		case "exe.engine.freetextidevice.FreeTextIdevice":
		case "exe.engine.genericidevice.GenericIdevice":
			var type = node.children().find("string[value='class_']").next().attr("value");
			node.children().find("unicode").each(function(){
				if($(this).prev().attr("value") == "content_w_resourcePaths")
				{
					var newNode = $("<p>" + $(this).attr("value") + "</p>");
					newNode.tagName = "P";
					newNode.innerHTML = $(this).attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"");
					processElementELP(newNode, filePath, idsection)
				}
				if(node.attr("class") == "exe.engine.genericidevice.GenericIdevice"){
					if($(this).prev().attr("value") == "_title")
					{
						var newNode = $("<h1>" + $(this).attr("value") + "</h1>");
						newNode.tagName = "H1";
						newNode.innerHTML = $(this).attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"");
						processElementELP(newNode, filePath, idsection)
					}
				}
			});
		break;
		case "exe.engine.externalurlidevice.ExternalUrlIdevice":
			node.children().find("unicode").each(function(){
				if($(this).prev().attr("value") == "url")
				{
					var newNode = $("<iframe />");
					newNode.attr("src", $(this).attr("value"));
					newNode.tagName = "IFRAME";
					processElementELP(newNode[0], filePath, idsection)
				}
			});
		break;
		case "exe.engine.clozeidevice.ClozeIdevice":
			var newNode = "";
			node.children().find("unicode").each(function(){
				if($(this).prev().attr("value") == "content_w_resourcePaths")
				{
					newNode = $("<fgp />");
					newNode.attr("description", $(this).attr("value").replace("<p>","").replace("</p>", ""));
					newNode.tagName = "FGP";
				}
				if($(this).prev().attr("value") == "_encodedContent")
				{
					newNode.attr("activitytext", $(this).attr("value").replace(/<u>/g, '<span data-gap-fill="gap">').replace(/u>/g,"span>"));
					processElementELP(newNode, filePath, idsection)
				}
			});
		break;
	}
}

/**
 * This method is responsible for processing each node and its children
 * First it creates and renames subsection, after it processes their elements
 * and finally it processes its children
 * @param  {Object} node to be processed
 * @param  {String} id of section selected
 * @param  {String} path of the html element
 */
function processChildren(node, idsection, filePath)
{
	var controller = application.controller.getInstance();

	if(node.prop("tagName") == "LIST" && node.prev().attr("value") == "idevices"){
	    node.children().each(function(){
			processELPNode($(this), filePath, idsection);
		});
	}
	if(node.prop("tagName") == "LIST" && node.prev().attr("value") == "children"){
		node.children().each(function(){
			$($(this).children()[0]).children().each(function(){
				if($(this).prop("tagName") == "UNICODE" && $(this).prev().attr("value") == "_title"){
					sectionName = $(this).attr("value");
					idsectionAux = controller.appendSection(idsection);
					controller.updateSectionName(sectionName,idsectionAux);
				}
				if($(this).prop("tagName") == "LIST" && $(this).prev().attr("value") == "idevices"){
				    $(this).children().each(function(){
						processELPNode($(this), filePath, idsectionAux);
					});
				}
				if($(this).prop("tagName") == "LIST" && $(this).prev().attr("value") == "children"){
					processChildren($(this), idsectionAux, filePath);
				}									
			});
		});
	}	
}
/**
 * This method is responsible for reading ELP data
 * It reads first contentv2(3).xml and process all elements
 * @param  {String} path of the unzipped elements
 */
ImportELP.prototype.processPackageDataELP = function processPackageDataELP(filePath)
{
	var fs = require('fs');
	var idsection = "", idsectionAux = "";
	var ui = application.ui.core.getInstance();
	var fileIndexv3 = "contentv3.xml"
	var fileIndexv2 = "contentv2.xml"
	var controller = application.controller.getInstance();

	if(fs.existsSync(decodeURIComponent(filePath+fileIndexv2),{encoding:'utf8'})) 
		dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndexv2),{encoding:'utf8'});
	else
		dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndexv3),{encoding:'utf8'});

	$($($(dataFile.toString()).children("dictionary")).children("dictionary")[0]).children("instance").children().children().each(function(){
		if($(this).prop("tagName") == "UNICODE" && $(this).prev().attr("value") == "_title"){
				sectionName = $(this).attr("value");
				controller.updateSectionName(sectionName,Cloudbook.UI.selected.attr('data-cbsectionid'));		
				idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
		}
		processChildren($(this), idsection, filePath);
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}
CBUtil.createNameSpace('application.importelp');
application.importelp = CBUtil.singleton(ImportELP);