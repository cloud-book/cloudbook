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
 * This method is responsible for renaming resources
 * @param  {Object} node to be processed
 * @return {String} node processed
 */
function renameResource(node)
{
	node.innerHTML = node.innerHTML.replace(/resources\//g, Project.Info.projectpath + "/rsrc/");//"cloudbook/");
	return node;
}

/**
 * This method is responsible for processing Text and Generic iDevices
 * It process references in content of iDevices
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
function processTextIdevice(node, filePath, idsection)
{
	var newNode = "", nodeAux = "";
	var type = node.attr("class");
	var title = "";

	if(type == "exe.engine.genericidevice.GenericIdevice" || type == "exe.engine.casestudyidevice.CasestudyIdevice" ||
		type == "exe.engine.reflectionidevice.ReflectionIdevice" || type == "exe.engine.notaidevice.NotaIdevice"){
		if($(node.children().find("unicode")[0]).prev().attr("value") == "_title")
			if ($(node.children().find("unicode")[0]).attr("value") != "Free Text")//{
				title = $(node.children().find("unicode")[0]).attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"");
	}
	else
		title = "";

	nodeAux = $(node.find("unicode[content='true']")[0]);
	if(nodeAux.length == 0 && ($(node).children().find("string[value='fields']").next().children()[0].tagName == "REFERENCE")){
		var refNumber = $($(node).children().find("string[value='fields']").next().children()[0]).attr("key");
		nodeAux = $(node).parents().find("instance[reference='" +  refNumber + "']").children().find("string[value='content_w_resourcePaths']").next();
	} 
	if(type == "exe.engine.field.TextAreaField")
	{
		if($($($(node).children()[0]).children('unicode[content="true"]')[0]).parent().children("string[value='_name']").next().attr("value") != "Free Text")
			title = $($($(node).children()[0]).children('unicode[content="true"]')[0]).parent().children("string[value='_name']").next().attr("value");
		nodeAux = $($($(node).children()[0]).children('unicode[content="true"]')[0]);
	}
	
	if(type == "exe.engine.freetextidevice.FreeTextIdevice" || type == "exe.engine.field.TextAreaField"){
		 newNode = (newNode == "")?$("<p></p>"):newNode;
		 newNode.tagName = "P";
		 newNode.innerHTML = (newNode.innerHTML == undefined)?"":newNode.innerHTML;
		 if(nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").trim().indexOf("<p") == 0)
		 	newNode.innerHTML += nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"");
		 else
		 	newNode.innerHTML += "<P>" + nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"") + "</P>";
	}else{
		newNode = (newNode == "")?$("<FKN></FKN>"):newNode;
		newNode.tagName = "FKN";
		newNode.innerHTML = "<fkn ";
		newNode.data("title", title);
		newNode.innerHTML += "data-title='" + title + "' "; 
		if($(node).attr("class") != "exe.engine.casestudyidevice.CasestudyIdevice"){
			newNode.data("text", nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/\'/g,'"'));
			newNode.innerHTML += "data-text='" + nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/\'/g,'"'); 
		}
		if(($(node.children().find('string[value="class_"]')) != undefined) && ($(node.children().find('string[value="class_"]')).next().attr("value") == "reading"))
		{
			newNode.innerHTML +=  $(node.find("unicode[content='true']")[1]).attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/\'/g,'"') + "</br>";
			newNode.data("text", newNode.data("text") + nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"").replace(/\'/g,'"'));
		}

		if(type == "exe.engine.casestudyidevice.CasestudyIdevice")
		{
			newNode.innerHTML += "data-text='" + $(node).children().find("string[value='storyTextArea']").next().children().find("unicode[content='true']").attr("value") + "<br>";
			newNode.data("text",  $(node).children().find("string[value='storyTextArea']").next().children().find("unicode[content='true']").attr("value") + "<br>");
			newNode.data("text", newNode.data("text") + nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,""));
			newNode.innerHTML += nodeAux.attr("value").replace(/(\\r\\n|\\n|\\r|\\t|\\n\\t)/gm,"") ; 
		}	

		newNode.innerHTML += "' ";
		switch(type)
		{
			case "exe.engine.notaidevice.NotaIdevice":
				typebox = "note";
			break;
			case "exe.engine.casestudyidevice.CasestudyIdevice":
				typebox = "case";
			break;
			case "exe.engine.reflectionidevice.ReflectionIdevice":
				typebox = "reflection";
			break;
			case "exe.engine.genericidevice.GenericIdevice":
				switch($(node).children().find("string[value='class_']").next().attr("value"))
				{
					case "preknowledge":
						typebox = "preknowledge";
					break;
					case "objectives":
						typebox = "target";
					break;
					case "activity":
						typebox = "activity";
					break;
					case "reading":
						typebox = "reading";
					break;
					default:
						typebox = "target";
					break;
				}
			break;
		}

		newNode.data("typebox", typebox);
		newNode.innerHTML += "data-typebox= '" + typebox + "' />"
	}

	renameResource(newNode);
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
	var isTest = (node.attr("class") == "exe.engine.quiztestidevice.TestQuestion");

	var childrenClass = (node.attr("class") == "exe.engine.multiselectidevice.MultiSelectIdevice")?"instance[class='exe.engine.field.SelectOptionField']":
	isTest?"instance[class='exe.engine.quiztestidevice.AnswerOption']":"instance[class='exe.engine.field.QuizOptionField']";
	var newNode = "", auxNode = "";
	var options = [];
	var i = 0, group = "";

	newNode = (tagName == "PSM")?$("<psm />"):$("<pem />");
	newNode.innerHTML = (tagName == "PSM")?"<psm ":"<pem ";

	if(!isTest)
		auxNode = node.children().find("string[value='block question']").next().next();
	else{
		auxNode = $(node.children().find("string[value='content_w_resourcePaths']")[0]).next();
		group = arguments[3];
		newNode.data("group", group);
		newNode.innerHTML += "data-group=" + group + " "; 
	}
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
	newNode.innerHTML = newNode.innerHTML.replace(/resources\//g, "")
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
	newNode.innerHTML = newNode.innerHTML.replace(/resources\//g, "")
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
		 newNode.data("activitytext", auxValue.replace(/<u>/g, "<span data-gap-fill='gap'>").replace(/u>/g,"span>"));
		 newNode.innerHTML += 'data-activitytext="' + auxValue.replace(/<u>/g, "<span data-gap-fill='gap'>").replace(/u>/g,"span>") + '" '; 
	}	
	newNode.data("words", isCloze?[]: auxNode.find('string[value="otras"]').next().attr("value").split("|"));
	newNode.data("fieldsNumber", cont);
	newNode.innerHTML += 'data-words="' + newNode.data("words") + '" '; 
	newNode.innerHTML += 'data-fieldsNumber="' + newNode.data("fieldsNumber") + '" '; 
	newNode.innerHTML += isCloze?"></fgp>":"></drop>";
	newNode.innerHTML = newNode.innerHTML.replace(/resources\//g, "")
	return newNode;
}

/**
 * This method is responsible for processing Quizz Tests
 * @param  {Object} node to be processed
 * @param  {String} path of the html element
 * @param  {String} id of section selected
 * @return {String} node content of iDevice
 */
 function processQuizTestIdevice(node, filePath, idsection)
{
	var title = $(node.children().find("unicode")[0]).attr("value");
	var newNode = "", tagName = "TEST";

	newNode = $("<test />");
	newNode.innerHTML = "";

	node.children().find("string[value='questions']").next().children().each(function(){
		auxContent = processMultiIdevice($(this), filePath, idsection, ImportELP.maxIdTest +1);
		newNode.innerHTML += auxContent.innerHTML;
	});

	newNode.innerHTML += "<test ";
	newNode.tagName = tagName;			
	newNode.data("description", "");
	newNode.innerHTML += "data-description='' "; 

	newNode.data("legend", node.children().find("string[value='_title']").next().attr("value"));
	newNode.innerHTML += "data-legend='" + newNode.data("legend") + "' "; 

	newNode.data("group", ImportELP.maxIdTest +1);
	newNode.innerHTML += 'data-group="' + (ImportELP.maxIdTest +1) + '" />';

	ImportELP.maxIdTest += 1;
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
		case "exe.engine.casestudyidevice.CasestudyIdevice":
		case "exe.engine.reflectionidevice.ReflectionIdevice":
		case "exe.engine.notaidevice.NotaIdevice":
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
		case "exe.engine.quiztestidevice.QuizTestIdevice":
			nodeContent = processQuizTestIdevice(node, filePath, idsection);
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
	var nodeToProcess = "", nodeReferenced = "";
	var isProcessed = false;
	var contentSection = "";

	temp.css("position", "fixed").css("z-index","-1000");
	$("body").append(temp);
	$("body").append("<div id='layer' style='z-index:-500;background:#fff; position:fixed; top:0; width:100%;height:100%'></div>");

	if(node.prop("tagName") == "LIST" && node.prev().attr("value") == "idevices"){
	    node.children().each(function(){
	    	var contentSection = processELPNode($(this), filePath, idsection);
	    	if(contentSection != undefined && contentSection.innerHTML != "<P></P>")
				$("#tempImportELP").contents().find("html").append(contentSection.innerHTML);
		});
		var options = $.parseJSON('{"isELP":'+ true + '}');
		if($("#tempImportELP").contents().find("html").html() != "<head></head><body></body>")
			importationHTML.processHTML($("#tempImportELP").contents().find("html").html(), filePath, idsection, options);
	}	

	if(node.prop("tagName") == "LIST" && node.prev().attr("value") == "children"){
		node.children().each(function(){
			$("#tempImportELP").contents().find("html").html("");
			if($(this).attr("key") != undefined)
				nodeToProcess = $(this).parents().find('instance[reference="' + $(this).attr("key") + '"]');
			else
				nodeToProcess = $(this);

			$(nodeToProcess.children()[0]).children().each(function(){
				isProcessed = false;
				if($(this).prop("tagName") == "UNICODE" && $(this).prev().attr("value") == "_title"){
					sectionName = $(this).attr("value");
					idsectionAux = controller.appendSection(idsection);
					controller.updateSectionName(sectionName,idsectionAux);
				}
				if($(this).prop("tagName") == "LIST" && $(this).prev().attr("value") == "idevices"){
				    $(this).children().each(function(){
				    	isProcessed = false;
				    	if(this.tagName == "REFERENCE"){
				    		nodeReferenced = $($($(this).parents().find("unicode[value='" +  
				    			$(this).attr("key") + "']").parent().children("string[value='top_anchors_linked_from_fields']").next().children()[0]).children().find("instance")[0]);
				    		if(nodeReferenced.length == 0){
				    			nodeReferenced = $(this).parents().find("instance[reference='" +  $(this).attr("key") + "']");
				    		}
				    		if(nodeReferenced.find($(this)).length != 0){
				    			if(nodeReferenced.children().length != 0){
				    				contentSection = processTextIdevice(nodeReferenced.children().parent().parent().parent(), filePath, idsectionAux);
				    				isProcessed = true;
				    			}
				    		}
				    	}
				    	else
				    		nodeReferenced = $(this);
				    	if(!isProcessed){
							contentSection = processELPNode(nodeReferenced, filePath, idsectionAux);
						}
						if(contentSection.innerHTML != "<P></P>")
							$("#tempImportELP").contents().find("html").append(contentSection.innerHTML);					
					});
					var options = $.parseJSON('{"isELP":'+ true + '}');
					importationHTML.processHTML($("#tempImportELP").contents().find("html").html(), filePath, idsectionAux, options);
				}
				if(($(this).prop("tagName") == "LIST") && ($(this).prev().attr("value") == "children") && ($(this).children().length != 0)){
					var idSectionAuxPrevious = idsectionAux;
					processChildren($(this), idsectionAux, filePath);
					idsectionAux = idSectionAuxPrevious;
				}
				if($(this).prop("tagName") == "INSTANCE"){
					var contentSection = processELPNode($(this), filePath, idsectionAux);
					$("#tempImportELP").contents().find("html").append(contentSection.innerHTML);	
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
	var fs = require('fs-extra');
	var path = require('path');
	var idsection = "", idsectionAux = "";
	var ui = application.ui.core.getInstance();
	var fileIndexv3 = "contentv3.xml"
	var fileIndexv2 = "contentv2.xml"
	var controller = application.controller.getInstance();
	var destpath = path.join(Project.Info.projectpath, "rsrc");
	ImportELP.maxIdTest = 1;

	if(fs.existsSync(decodeURIComponent(filePath+fileIndexv2),{encoding:'utf8'})) 
		dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndexv2),{encoding:'utf8'});
	else
		dataFile = fs.readFileSync(decodeURIComponent(filePath+fileIndexv3),{encoding:'utf8'});

	$($($(dataFile.toString()).children("dictionary")).children("dictionary")[0]).find("string[value='_storageName']").each(function(){
		if(fs.existsSync(destpath)) fs.copySync(path.join(filePath, $(this).next().attr("value")),path.join(destpath, $(this).next().attr("value")));
	});

	$($($(dataFile.toString()).children("dictionary")).children("dictionary")[0]).children("instance").children().children().each(function(){
		if($(this).prop("tagName") == "UNICODE" && $(this).prev().attr("value") == "_title"){
				sectionName = $(this).attr("value");
				controller.updateSectionName(sectionName,Cloudbook.UI.selected.attr('data-cbsectionid'));		
				idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
		}
		processChildren($(this), idsection, filePath);
	});
	var elpMetadata = $($($(dataFile.toString()).children("dictionary")).children("instance[class='exe.engine.package.DublinCore']")[0]);
	if(elpMetadata != undefined)
		application.importmetadata.getInstance().loadELPMetadata(elpMetadata);

	var elpLOMMetadata = $($($(dataFile.toString()).children("dictionary")).children("string[value='lomEs']")).next("instance[class='exe.engine.lom.lomsubs.lomSub']");
	if(elpLOMMetadata != undefined)
		application.importmetadata.getInstance().loadELPLOMMetadata(elpLOMMetadata);
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}
CBUtil.createNameSpace('application.importelp');
application.importelp = CBUtil.singleton(ImportELP);