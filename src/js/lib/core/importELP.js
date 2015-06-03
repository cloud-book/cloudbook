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
 * This method is responsible for search type of component and
 * add it to the project
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
 * This method is responsible for processing Text and Generic iDevices
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
function processTextIdevice(node, filePath, idsection)
{
	var newNode = "";
	var type = node.children().find("string[value='class_']").next().attr("value");

	node.children().find("unicode").each(function(){
		if($(this).prev().attr("value") == "content_w_resourcePaths")
		{
			newNode = (newNode == "")?$("<p></p>"):newNode;
			newNode.tagName = "P";
			newNode.innerHTML = (newNode.innerHTML == undefined)?"":newNode.innerHTML;
			newNode.innerHTML += $(this).attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"");
		}
		if(node.attr("class") == "exe.engine.genericidevice.GenericIdevice"){
			if($(this).prev().attr("value") == "_title")
			{
				newNode = (newNode == "")?$("<h1></h1>"):newNode;
				newNode.innerHTML = (newNode.innerHTML == undefined)?"":newNode.innerHTML;
				newNode.innerHTML += "<h1>" + $(this).attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"") + "</h1>";
			}
		}
	});
	return newNode;
}

/**
 * This method is responsible for processing External Web Url iDevices
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
function processExternalUrlIdevice(node, filePath, idsection)
{
	var auxNode = node.find('string[value="url"]').next();
	var newNode = $("<iframe />");
	newNode.attr("src", auxNode.attr("value"));
	newNode.tagName = "IFRAME";
	newNode.innerHTML = newNode[0].outerHTML;
	return newNode;
}

/**
 * This method is responsible for processing MultiSelect and MultiChoice iDevices
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
function processMultiIdevice(node, filePath, idsection)
{
	var tagName = (node.attr("class") == "exe.engine.multiselectidevice.MultiSelectIdevice")?"PSM":"PEM";
	var childrenClass = (node.attr("class") == "exe.engine.multiselectidevice.MultiSelectIdevice")?"instance[class='exe.engine.field.SelectOptionField']":
	"instance[class='exe.engine.field.QuizOptionField']";
	var newNode = "", auxNode = "";
	var options = [];
	var i = 0;

	auxNode = node.children().find("string[value='block question']").next().next();
	newNode = (tagName == "PSM")?$("<psm />"):$("<pem />");
	newNode.innerHTML = (tagName == "PSM")?"<psm ":"<pem ";
	newNode.data("description", auxNode.attr("value").replace("<p>","").replace("</p>", ""));
	newNode.innerHTML += "data-description='" + newNode.data("description") + "' "; 
	newNode.tagName = tagName;			
 	newNode.innerHTML +='data-questions="['; 
 	node.children().find(childrenClass).each(function()
	{
		var reply = $(this).find("string[value='content_w_resourcePaths']").next().attr("value").replace("<p>","").replace("</p>", "");
		var correct = ($(this).find("string[value='isCorrect']").next().attr("value") == "1")?true:false; 
		var checkedCorrect = (correct == "1")?"checked":"";
		var weight = (correct == "1")?100:0;
		newNode.innerHTML += "{'text':'" + reply + "', 'answer':'opt" + i + "', 'select':" + correct;
		newNode.innerHTML += (tagName == "PSM")?", 'checked':'" + checkedCorrect + "'},": ", 'checked':true, 'weight':" + weight +  "},";
		if(tagName == "PSM"){
			options.push({"text":reply, "correct": correct });
		}
		else
		{
			options.push({"text":reply, "answer": "opt" + i , "select": correct, "checked": true, "weight":weight});	
		}
		i++;
	}); 
	newNode.innerHTML += ']" /> ';
	newNode.innerHTML = newNode.innerHTML.replace(',]', ']')	
	newNode.data("questions", options);
	return newNode;
}

/**
 * This method is responsible for processing True/False iDevices
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
function processTrueFalseIdevice(node, filePath, idsection)
{
	var tagName = "PVF";
	var newNode = "";
	var options = [];

	var childrenClass = 'instance[class="exe.engine.truefalseidevice.TrueFalseQuestion"]';
	var auxNode = node.find(childrenClass).find('string[value="content_w_resourcePaths"]').next();
	newNode = $("<pvf />");
	newNode.innerHTML = "<pvf ";
	newNode.data("description", auxNode.attr("value").replace("<p>","").replace("</p>", ""));
	newNode.innerHTML += "data-description='" + newNode.data("description") + "' "; 
	newNode.tagName = tagName;			
 	newNode.innerHTML +='data-questions="['; 
	var correct = ($(node).find("string[value='isCorrect']").next().attr("value") == "1")?true:false; 
	var weightTrue = (correct == "1")?100:0;
	var weightFalse = (correct == "0")?100:0;
	options.push({"text":CBI18n.gettext("True"), "answer": "opt0", "select": correct, "checked": true, "weight":weightTrue});	
	options.push({"text":CBI18n.gettext("False"), "answer": "opt1", "select": correct, "checked": true, "weight":weightFalse});	
	newNode.data("questions", options);
	newNode.innerHTML += "{'text':'" + CBI18n.gettext("True") + "', 'answer':'opt0', 'select':" + correct + ", 'checked':true, 'weight': " + weightTrue +"},"
	newNode.innerHTML += "{'text':'" + CBI18n.gettext("False") + "', 'answer':'opt1', 'select':" + !correct + ", 'checked':true, 'weight': " + weightFalse +'}]" />';
	return newNode;
}

/**
 * This method is responsible for processing List and Cloze iDevices
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
 function processFillIdevice(node, filePath, idsection)
{
	var isCloze = node.attr("class") == "exe.engine.clozeidevice.ClozeIdevice";
	var newNode = "", auxNode = "";
	auxNode = node.children().find("string[value='block instructions']").next().next();
	newNode = isCloze?$("<fgp />"):$("<drop />");
	newNode.innerHTML = isCloze?"<fgp ":"<drop ";
	newNode.data("description", auxNode.attr("value").replace("<p>","").replace("</p>", ""));
	newNode.data("caseSensitive", isCloze?node.find('string[value="checkCaps"]').next().attr("value"):"0");
	newNode.innerHTML += 'data-description="' + newNode.data("description") + '" '; 
	newNode.innerHTML += 'data-caseSensitive="' + newNode.data("caseSensitive") + '" '; 

	newNode.tagName = isCloze?"FGP":"DROP";
	auxNode = isCloze? node.children().find("instance[class='exe.engine.field.ClozeField']"): node.children().find("instance[class='exe.engine.listaidevice.ListaField']");
	var auxValue = auxNode.find("string[value='_encodedContent']").next().attr("value");
	var pos = -1, cont = 0;
	if(!isCloze){
		do
		{
			pos = auxValue.indexOf("<u>", pos+1);
			if(pos != -1)
			{
				auxValue = auxValue.replace("<u>", "<span data-gap-select='gap" + cont +"'>").replace("</u>", "</span>");
				cont = cont + 1;
			}
		}while(pos != -1)
		newNode.data("activitytext", auxValue);
		newNode.innerHTML += 'data-activitytext="' + auxValue + '" '; 
	}
	else{
		 newNode.data("activitytext", auxNode.find("string[value='content_w_resourcePaths']").next().attr("value")
		 	.replace(/<u>/g, "<span data-gap-fill='gap'>").replace(/u>/g,"span>"));
		 newNode.innerHTML += 'data-activitytext="' + auxNode.find("string[value='content_w_resourcePaths']").next().attr("value")
			.replace(/<u>/g, "<span data-gap-fill='gap'>").replace(/u>/g,"span>") + '" '; 
	}	
	newNode.data("words", isCloze?[]: auxNode.find('string[value="otras"]').next().attr("value").split("|"));
	newNode.data("fieldsNumber", cont);
	newNode.innerHTML += 'data-words="' + newNode.data("words") + '" '; 
	newNode.innerHTML += 'data-fieldsNumber="' + newNode.data("fieldsNumber") + '" '; 
	newNode.innerHTML += isCloze?"></fgp>":"></drop>";
	return newNode;
}

/**
 * This method is responsible for processing each type of node
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of element
 */
 function processELPNode(node, filePath, idsection)
{
	var nodeContent = "";
	switch(node.attr("class"))
	{
		case "exe.engine.freetextidevice.FreeTextIdevice":
		case "exe.engine.genericidevice.GenericIdevice":
			nodeContent = processTextIdevice(node, filePath, idsection);
		break;
		case "exe.engine.externalurlidevice.ExternalUrlIdevice":
			nodeContent = processExternalUrlIdevice(node, filePath, idsection);
		break;
		case "exe.engine.clozeidevice.ClozeIdevice":
		case "exe.engine.listaidevice.ListaIdevice":
			nodeContent = processFillIdevice(node, filePath, idsection);
		break;
		case "exe.engine.multiselectidevice.MultiSelectIdevice":
		case "exe.engine.multichoiceidevice.MultichoiceIdevice":
			nodeContent = processMultiIdevice(node, filePath, idsection);
		break;
		case "exe.engine.truefalseidevice.TrueFalseIdevice":
			nodeContent = processTrueFalseIdevice(node, filePath, idsection);
		break;
	}
	return nodeContent;
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
	var contentSection = "";
	var temp = $('<iframe id="tempImportELP" width="100%" height="100%" ;/>');
	var importationHTML = application.importhtml.getInstance();

	temp.css("position", "fixed").css("z-index","-1000");
	$("body").append(temp);
	$("body").append("<div id='layer' style='z-index:-500;background:#fff; position:fixed; top:0; width:100%;height:100%'></div>");

	if(node.prop("tagName") == "LIST" && node.prev().attr("value") == "idevices"){
	    node.children().each(function(){
	    	//processELPNode($(this), filePath, idsection)
	    	var contentSection = processELPNode($(this), filePath, idsection);
	    	if(contentSection != undefined)
				temp.contents().find("html").append(contentSection.innerHTML);
		});
		var options = $.parseJSON('{"isELP":'+ true + '}');
		importationHTML.processHTML($("#tempImportELP").contents().find("html").html(), filePath, idsection, options);
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
					temp.contents().html("");
				    $(this).children().each(function(){
						//processELPNode($(this), filePath, idsectionAux);
						var contentSection = processELPNode($(this), filePath, idsectionAux);
						temp.contents().find("html").append(contentSection.innerHTML);					
					});
					var options = $.parseJSON('{"isELP":'+ true + '}');
					importationHTML.processHTML($("#tempImportELP").contents().find("html").html(), filePath, idsectionAux, options);
				}
				if($(this).prop("tagName") == "LIST" && $(this).prev().attr("value") == "children"){
					processChildren($(this), idsectionAux, filePath);
				}									
			});
		});
	}
	$('#tempImportELP').remove();
	$('#layer').remove();
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