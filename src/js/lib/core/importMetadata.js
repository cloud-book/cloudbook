languages = [];
/**
 * @class ImportMetadata
 * This class is created to load metadata data from SCORM/IMS/EPUB/EXE file
 */
function ImportMetadata(){
	  var fs = require('fs');
	  var data = JSON.parse(fs.readFileSync('js/lib/gui/languages.json', 'utf8'));
  	  data.forEach(function(languageelement){
	      var item = [languageelement.code, languageelement.name];
	      languages.push(item);
      });

}

/**
 * This method is responsible for saving language information into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element
 */
function saveLanguage(element, childrenName, arrayName, elementName)
{
	var i = 1;
	element.children(childrenName).each(function(){
		if(elementName != null)
		{
			Project.Info.LOM[arrayName+i] = {};
    		Project.Info.LOM[arrayName+i][elementName+i] = searchLanguage($(this).text());
    	}
	    else
	    {
    		Project.Info.LOM[arrayName+i] = searchLanguage($(this).text());
	    }
    	i++;
  	});
}

/**
 * This method is responsible for saving language information into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element
 */
function saveLanguageText(element, arrayName, elementName, i, epub)
{
	if(epub == null)
	{
		if(elementName != null)
		{
			Project.Info.LOM[arrayName+i] = {};
			Project.Info.LOM[arrayName+i][elementName+i] = searchLanguage(element.text());
		}
	    else
	    {
			Project.Info.LOM[arrayName+i] = searchLanguage(element.text());
	    }
	}
	else
	{
		if(elementName != null)
		{
			Project.Info.LOM[arrayName+i] = {};
			Project.Info.LOM[arrayName+i][elementName+i] = searchLanguage(element);
		}
	    else
	    {
			Project.Info.LOM[arrayName+i] = searchLanguage(element);
	    }
	}
}

/**
 * This method is responsible for saving data information into array namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element
 */
function saveDataText(element, childrenName, arrayName, elementName)
{
	element.children(childrenName).each(function(){
		if(elementName != null)
		{
			Project.Info.LOM[arrayName] = {};
    		Project.Info.LOM[arrayName][elementName] = $(this).text();
    	}
	    else
	    {
    		Project.Info.LOM[arrayName] = $(this).text();
	    }
  	});
}

/**
 * This method is responsible for saving data information into array namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element
 */
function saveDataText2(element, childrenName, arrayName, elementName)
{
		if(elementName != null)
		{
			Project.Info.LOM[arrayName] = {};
    		Project.Info.LOM[arrayName][elementName] = element.innerHTML;
    	}
	    else
	    {
    		Project.Info.LOM[arrayName] = element.innerHTML;
	    }
}


/**
 * This method is responsible for saving data information into array namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array
 * @param  {String} name of the element
 */
function saveDataArrayText(element, childrenName, arrayName, elementName)
{
	var i = 1;
	element.children(childrenName).each(function(){
  			Project.Info.LOM[arrayName+i] = {};
        	Project.Info.LOM[arrayName+i][elementName+i] = $(this).text();
        	i++;
  	});

}

/**
 * This method is responsible for saving data information into array namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array
 * @param  {String} name of the element
 */
function saveDataArrayText2(element, arrayName, elementName, i)
{
		Project.Info.LOM[arrayName+i] = {};
    	Project.Info.LOM[arrayName+i][elementName+i] = element[0].innerHTML;

}

/**
 * This method is responsible for saving data and language information into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 */
function saveDataLanguage(element, childrenName, arrayName, elementName1, elementName2, notclear)
{
	var i = 1;
	if(arrayName != null)
	{
		element.children(childrenName).each(function(){
	  			if(notclear == null){
		  			Project.Info.LOM[arrayName+i] = {};
		        	Project.Info.LOM[arrayName+i][elementName1+i] = $(this).text();
		        	Project.Info.LOM[arrayName+i][elementName2+i] = searchLanguage($(this).html().split('"')[1]);
	        	} 
	        	else
	        	{
		        	Project.Info.LOM[arrayName][elementName1] = $(this).text();
		        	Project.Info.LOM[arrayName][elementName2] = searchLanguage($(this).html().split('"')[1]);
	        	}
	        	i++;
	  	});
  	}else{
		element.children(childrenName).each(function(){
	        	Project.Info.LOM[elementName1+i] = $(this).text();
	        	Project.Info.LOM[elementName2+i] = searchLanguage($(this).html().split('"')[1]);
	        	i++;
	  	});
  	}
}

/**
 * This method is responsible for saving data and language information into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 */
function saveDataLanguageText(element, arrayName, elementName1, elementName2, notclear, i)
{
	if(arrayName != null)
	{
  			if(notclear == null)
	  			Project.Info.LOM[arrayName+i] = {};
	        	Project.Info.LOM[arrayName+i][elementName1+i] = element.innerHTML;
	        	Project.Info.LOM[arrayName+i][elementName2+i] = searchLanguage(element.outerHTML.split('"')[1]);
  	}else{
	        	Project.Info.LOM[elementName1+i] = element.innerHTML;
	        	Project.Info.LOM[elementName2+i] = searchLanguage(element.outerHTML.split('"')[1]);
  	}
}

/**
 * This method is responsible for saving data and language information into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 */
function saveDataLanguageEPUB(element1, element2, arrayName, elementName1, elementName2, notclear)
{
	if(arrayName != null)
	{
  			if(notclear == null)
	  			Project.Info.LOM[arrayName] = {};
	        	Project.Info.LOM[arrayName][elementName1] = element1;
	        	Project.Info.LOM[arrayName][elementName2] = searchLanguage(element2);
  	}else{
	        	Project.Info.LOM[elementName1] = element1;
	        	Project.Info.LOM[elementName2] = searchLanguage(element2);
  	}
}

/**
 * This method is responsible for saving data into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element of the dictionary with values
 * @param  {String} index of the array
 */
function saveDataValue(element, childrenName, arrayName, dictionaryName, index)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var i = 1;
	element.children(childrenName).each(function(){
		if(dictionaryName == null)
        	Project.Info.LOM[arrayName] = $(this).find("value").text();
        else{
        	if(index == null)
        		Project.Info.LOM[arrayName] = CBI18n.gettext($(this).find("value").text());
        	else	
	        	Project.Info.LOM[arrayName] = dictionary[dictionaryName][parseInt($(this).find("value").text())-1];
        	}
        i++;
	});
}

/**
 * This method is responsible for saving data into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element of the dictionary with values
 * @param  {String} index of the array
 */
function saveDataValueText(element, arrayName, dictionaryName, index)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var i = 1;
		if(dictionaryName == null)
        	Project.Info.LOM[arrayName] = 	$(element).children()[1].innerHTML;
        else{
        	if(index == null)
        		Project.Info.LOM[arrayName] = CBI18n.gettext($(element).children()[1].innerHTML);
        	else	
	        	Project.Info.LOM[arrayName] = dictionary[dictionaryName][parseInt($(element).children()[1].innerHTML)-1];
        	}
}

/**
 * This method is responsible for saving data into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String} name of the element 
 * @param  {String} indicates if the array is not cleared
 */
function saveDataArray(element, childrenName, arrayName, elementName, notclear){

	var i = 1;
	element.children(childrenName).each(function(){
		if(notclear == null)
		{ 
			Project.Info.LOM[arrayName+i] = {};
        	Project.Info.LOM[arrayName+i][elementName+i] = CBI18n.gettext($(this).find("value").text());
    	}
    	else
    	{
        	Project.Info.LOM[arrayName][elementName] = CBI18n.gettext($(this).find("value").text());
    	}
    	i++;
	});
}

/**
 * This method is responsible for saving data into namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String} name of the element 
 * @param  {String} indicates if the array is not cleared
 */
function saveDataArray2(element, arrayName, elementName, notclear, i){

	if(notclear == null)
	{ 
		Project.Info.LOM[arrayName+i] = {};
    	Project.Info.LOM[arrayName+i][elementName+i] = CBI18n.gettext(element.children[1].innerHTML);
	}
	else
	{
    	Project.Info.LOM[arrayName][elementName] = CBI18n.gettext(element.children[1].innerHTML);
	}
}

/**
 * This method is responsible for saving data into namespace with several elements
 * @param  {String} name of the array
 * @param  {String[]} array with element names and values
 * @param  {String} indicates if array will be cleared
 * @param  {String} name of the subarray
 */
function saveDataArrayValues(arrayName, elements, clear, subArrayName)
{
	if(clear != null) 
	{
		if(subArrayName != null)
		{
			Project.Info.LOM[arrayName][subArrayName] = {};
		}
		else
		{
			Project.Info.LOM[arrayName] = {};
		}
	}
	if(subArrayName != null)
	{
		elements.forEach(function(element){
			Project.Info.LOM[arrayName][subArrayName][element[0]] =  element[1];
		});		
	}else{
		elements.forEach(function(element){
			Project.Info.LOM[arrayName][element[0]] =  element[1];
		});
	}
}

/**
 * This method is responsible for saving contributions data
 * @param  {String} name of the array
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String} name of the subarray  (if exists)
 * @param  {String[]} array with element names and values
 * @param  {String} indicates if there is role element or not
 */
function saveContribution(element, childrenName, arrayName, subArrayName, elements, norole)
{
	var i = 1;
	element.children(childrenName).each(function(){

		var entity = $(this).children("entity").text().replace("BEGIN:VCARD", "").replace("END:VCARD","");
		var name = entity.split("FN:")[1].split("EMAIL")[0];
		var email = entity.split("INTERNET:")[1].split(" ")[0];
		var organization = entity.split("ORG:")[1];
		var date = $(this).children("date").text();
		if(norole == null)
		{
			var role = $(this).children("role:first-child").find("value").text();
			saveDataArrayValues(arrayName+i, [[elements[0]+i, CBI18n.gettext(role)], [elements[1]+i, name], [elements[2]+i, email], [elements[3]+i, organization], [elements[4]+i, date.split("T")[0]]], 1);
		}
		else
		{
			saveDataArrayValues(arrayName+i, [[elements[0]+i, name], [elements[1]+i, email], [elements[2]+i, organization], [elements[3]+i, date.split("T")[0]]], 1);
		}	

		var j = 1;
		var arrayElements = $(this).children("date").html().split("description")[1].split("</string>");
		arrayElements.pop();
		arrayElements.forEach(function(element){
			if(norole == null){
		  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j] = {};
		  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[5]+i+'_'+j] =  element.split('"')[2].replace(">","");
		  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[6]+i+'_'+j] = searchLanguage(element.split('"')[1]);
			}else{
				Project.Info.LOM[arrayName+i][elements[4]+i] =  element.split('"')[2].replace(">","");
				Project.Info.LOM[arrayName+i][elements[5]+i] = searchLanguage(element.split('"')[1]);
			}
		  j++;

		});
		if(norole != null){
			$(this).children("description").each(function(){
        	Project.Info.LOM[arrayName+i][elements[6]+i] = $(this).text();
        	Project.Info.LOM[arrayName+i][elements[7]+i] = searchLanguage($(this).html().split('"')[1]);
  		});
		}
	  	i++;
	});
}

/**
 * This method is responsible for saving contributions data
 * @param  {String} name of the array
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String} name of the subarray  (if exists)
 * @param  {String[]} array with element names and values
 * @param  {String} indicates if there is role element or not
 */
function saveContributionText(element, childrenName, arrayName, subArrayName, elements, norole, i)
{
	var role, entity, name, email, organization, date, descAnn, langAnn;

	$(element).children().each(function(){

		if(this.nodeName == "LOM:ROLE")
			role = this.children[1].innerHTML;
		if(this.nodeName == "LOM:ENTITY"){
			entity = this.innerHTML.replace("BEGIN:VCARD", "").replace("END:VCARD","");
			name = entity.split("FN:")[1].split("EMAIL")[0];
			email = entity.split("INTERNET:")[1].split(" ")[0];
			organization = entity.split("ORG:")[1];
		}
		if(this.nodeName == "LOM:DATE")
			date = this.children[0].innerHTML;
		if(this.nodeName == "LOM:DESCRIPTION"){
        	descAnn = this.children[0].innerHTML;
        	langAnn = searchLanguage($(this).children()[0].attributes["language"].value);
        }	
	});

	if(norole == null)
		saveDataArrayValues(arrayName+i, [[elements[0]+i, CBI18n.gettext(role)], [elements[1]+i, name], [elements[2]+i, email], [elements[3]+i, organization], [elements[4]+i, date.split("T")[0]]], 1);
	else{
		saveDataArrayValues(arrayName+i, [[elements[0]+i, name], [elements[1]+i, email], [elements[2]+i, organization], [elements[3]+i, date.split("T")[0]]], 1);	
		Project.Info.LOM[arrayName+i][elements[6]+i] = descAnn;
		Project.Info.LOM[arrayName+i][elements[7]+i] = langAnn;
	}
	if(date != null && norole == null)
	{
		var j = 1;
		$($(element).children()[2].children[1].children).each(function(){
			if(norole == null){
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j] = {};
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[5]+i+'_'+j] =  this.innerHTML;
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[6]+i+'_'+j] = searchLanguage(this.outerHTML.split('"')[1]);
			}else{
				Project.Info.LOM[arrayName+i][elements[4]+i] =  this.innerHTML;
				Project.Info.LOM[arrayName+i][elements[5]+i] = searchLanguage(this.outerHTML.split('"')[1]);
			}
			j++;
		})
	}
	else
	{
		$($(element).children()[2]).children().each(function(){
			if(norole == null){
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j] = {};
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[5]+i+'_'+j] =  this.innerHTML;
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[6]+i+'_'+j] = searchLanguage(this.outerHTML.split('"')[1]);
			}else{
				Project.Info.LOM[arrayName+i][elements[4]+i] =  this.innerHTML;
				Project.Info.LOM[arrayName+i][elements[5]+i] = searchLanguage(this.outerHTML.split('"')[1]);
			}
			j++;
		})
	}
}


/**
 * This method is responsible for saving contributions data
 * @param  {String} name of the array
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String[]} array with element names and values
 */
function saveDuration(element, childrenName, arrayName, elementsName)
{
	var i = 1;
	element.children(childrenName).each(function(){
			var arrayDate = processDate($(this).children("duration").html().replace("P", ""));
			if(arrayDate['P'] != null)
			{
			  	Project.Info.LOM[elementsName[0]] = arrayDate['P']['Y'] == null ?  0 : arrayDate['P']['Y'];
			  	Project.Info.LOM[elementsName[1]] = arrayDate['P']['M'] == null ?  0 : arrayDate['P']['M'];
			  	Project.Info.LOM[elementsName[2]] = arrayDate['P']['D'] == null ?  0 : arrayDate['P']['D'];
	  		}
			if(arrayDate['T'] != null)
			{
			  	Project.Info.LOM[elementsName[3]] = arrayDate['T']['H'] == null ?  0 : arrayDate['T']['H'];
			  	Project.Info.LOM[elementsName[4]] = arrayDate['T']['M'] == null ?  0 : arrayDate['T']['M'];
			  	Project.Info.LOM[elementsName[5]] = arrayDate['T']['S'] == null ?  0 : arrayDate['T']['S'];
			}
	   		$(this).children("description").each(function(){
	  			var arrayElements = $(this).html().split("</string>");
	  			arrayElements.forEach(function(element){
	  				if(element != "")
	  				{
					  	Project.Info.LOM[arrayName+i] = {};
				  		Project.Info.LOM[arrayName+i][elementsName[6]+i] = element.split('"')[2].replace('>', '');
					  	Project.Info.LOM[arrayName+i][elementsName[7]+i] = searchLanguage(element.split('"')[1]);
		  				i++;
	  				}
	  			});
	  		});
	});
}

/**
 * This method is responsible for saving contributions data
 * @param  {String} name of the array
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String[]} array with element names and values
 */
function saveDuration2(element, childrenName, arrayName, elementsName)
{
	var arrayDate = processDate(element[0].children[0].innerHTML.replace("P", ""));
	var i = 1;

	if(arrayDate['P'] != null)
	{
	  	Project.Info.LOM[elementsName[0]] = arrayDate['P']['Y'] == null ?  0 : arrayDate['P']['Y'];
	  	Project.Info.LOM[elementsName[1]] = arrayDate['P']['M'] == null ?  0 : arrayDate['P']['M'];
	  	Project.Info.LOM[elementsName[2]] = arrayDate['P']['D'] == null ?  0 : arrayDate['P']['D'];
		}
	if(arrayDate['T'] != null)
	{
	  	Project.Info.LOM[elementsName[3]] = arrayDate['T']['H'] == null ?  0 : arrayDate['T']['H'];
	  	Project.Info.LOM[elementsName[4]] = arrayDate['T']['M'] == null ?  0 : arrayDate['T']['M'];
	  	Project.Info.LOM[elementsName[5]] = arrayDate['T']['S'] == null ?  0 : arrayDate['T']['S'];
	}

	$(element[0].children[1]).children().each(function(){

	  	Project.Info.LOM[arrayName+i] = {};
  		Project.Info.LOM[arrayName+i][elementsName[6]+i] = this.innerHTML;
	  	Project.Info.LOM[arrayName+i][elementsName[7]+i] = searchLanguage(this.attributes["language"].value);
		i++;
	});
}

/**
 * This method is responsible for clearing metadata
 */
function clearMetadata()
{
	Project.Info.DublinCore = {};
	Project.Info.LOM = {};
}
/**
 * This method is responsible for reading EPUB metadata content (Dublin Core)
 * @param  {String} value of the file
 */
ImportMetadata.prototype.loadEPUBMetadata =  function loadEPUBMetadata(xml)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var titleEPUB = "", descriptionEPUB = "", dataIDElement = "", valueElement = "", subjectEPUB = "";
	arrayHTML = xml.split("/>");
	clearMetadata();

	arrayHTML.forEach(function(element){
		if(element.trim().length != 0)
		{
			var nameElement = element.split(" ")[1].replace('name="','').replace('"','').replace("DC.","");
			switch(nameElement)
			{
				case "identifier": Project.Info.DublinCore[nameElement] = element.split(" ")[2].replace('content="',"").replace('"','');break;
				case "title": case "description": case "subject":  case "creator": 
				case "publisher": case "contributor": case "type": case "source": case "relation": 
				case "coverage": case "rights":
					Project.Info.DublinCore[nameElement] = element.split('"')[3];
 				break;
				case "language": Project.Info.DublinCore[nameElement] = searchLanguage(element.split('"')[3]); break;
				case "format": Project.Info.DublinCore['formatData'] = element.split('"')[3];  break;
				case "date": 
					Project.Info.DublinCore[nameElement] = element.split('"')[3].split("T")[0]; 
				break;
			}
		}
	});
}

/**
 * This method is responsible for reading EPUB metadata content (Dublin Core)
 * @param  {String} value of the file
 */
ImportMetadata.prototype.loadELPMetadata =  function loadELPMetadata(node)
{
	$(node.children()[0]).children("string").each(function(){
		switch($(this).attr("value"))
		{
			case "identifier": case "title": case "description": case "creator": case "subject": 
			case "publisher": case "type": case "source": case "relation": case "rights": case "coverage": 
			case "date": 
				Project.Info.DublinCore[$(this).attr("value")] = $(this).next().attr("value"); 
			break;
			case "format":
				Project.Info.DublinCore['formatData'] = $(this).next().attr("value");
 			break;
			case "contributors":
				Project.Info.DublinCore['contributor'] = $(this).next().attr("value"); 
			break;
			case "language": 
				Project.Info.DublinCore[$(this).attr("value")] = searchLanguage($(this).next().attr("value")); 
			break;
		}
	})
}

/**
 * This method is responsible for reading IMS metadata content
 * @param  {String} path of the file
 */
ImportMetadata.prototype.loadIMSMetadata =  function loadIMSMetadata(xml)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	xmlDoc = $.parseXML(xml);
	var i = 1, j = 1, k = 1, l = 1, m = 1, n = 1, o = 1,p = 1, q = 1, r = 1;
	var type = "", nameReq = "", maxVer = "", minVer = "", lang ="", langTaxon = "", nameTaxon = "", idTaxon = "";

	clearMetadata();

	$(xml).find("metadata").each(function(){
		var metadata = $(this)[0].children[$(this)[0].children.length-1].children;
		$.each(metadata, function(){
			if(this.tagName =="LOM:GENERAL"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:IDENTIFIER"){
						saveDataArrayValues('cat_'+i, [['catalog_'+i, $(this)[0].children[0].textContent], ['entry_'+i, $(this)[0].children[1].textContent]], 1);
						i++;
					}
					if(this.tagName =="LOM:TITLE"){
						i = 1;
						$.each(this.children, function(){
							var lang = this.outerHTML.split("</lom:string>")[0].split('"')[1];
							var nameTitle = this.outerHTML.split("</lom:string>")[0].split('"')[2].replace(">", "");
							saveDataArrayValues('tit_'+i, [['title_'+i, nameTitle], ['titleLang_'+i, searchLanguage(lang)]], 1);		
							i++;
						});
					}
					if(this.tagName =="LOM:LANGUAGE"){
						saveLanguageText($(this),'idiom_','mainLang_', j);
						j++;
					};	
					if(this.tagName =="LOM:DESCRIPTION"){
						saveDataLanguageText($(this).children()[0], 'descGeneral_','Description_','descGeneralLang_', null, k);
						k++;
					};
					if(this.tagName =="LOM:KEYWORD"){
						saveDataLanguageText($(this).children()[0], 'keywordGeneral_','keywordGeneral1_','keywordGeneralLang_', null, l);
						l++;
					};				
					if(this.tagName =="LOM:COVERAGE"){
						saveDataLanguageText($(this).children()[0],'coverage_','coverage1_','coverageLang_', null, m);
						m++;
					};				
					if(this.tagName =="LOM:STRUCTURE"){
						saveDataValueText($(this), 'structuresGeneral_1','Structures');
					};				
					if(this.tagName =="LOM:AGGREGATIONLEVEL"){
						saveDataValueText($(this), 'aggregationLevels_1', 'Agregations', 1);
					};				
				});
			};
			i = 1, j = 1;
			if(this.tagName =="LOM:LIFECYCLE"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:VERSION"){
						$.each(this.children, function(){
							var lang = this.outerHTML.split("</lom:string>")[0].split('"')[1];
							var nameVersion = this.outerHTML.split("</lom:string>")[0].split('"')[2].replace(">", "");
							saveDataArrayValues('versionlifecycle_'+i, [['versionlifecycle1_'+i,nameVersion ], ['lifeCycleLang_'+i, searchLanguage(lang)]], 1);		
							i++;
						});
					}
					if(this.tagName =="LOM:STATUS"){
						saveDataValueText($(this), 'statusLifeCycle_1_1', 'Status');
					};				
					if(this.tagName =="LOM:CONTRIBUTE"){
				 		saveContributionText($(this), "contribute", 'contrLyfeCycle_', 'DIVdescContribLifeCycle_', ['rolesLifeCycle_','nameContribLifeCycle_', 'emailContribLifeCycle_',
			 			'organContribLifeCycle_', 'dateContribLifeCycle_', 'DescriptionContribLifeCycle_', 'ContribLifeCycleLang_'], null, j);
				 		j++;
					};
				});
			};
			i = 1, j = 1, k = 1;
			if(this.tagName =="LOM:METAMETADATA"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:IDENTIFIER"){
						saveDataArrayValues('catMetadata_'+i, [['metametadataCatalog_'+i, $(this)[0].children[0].textContent], ['metametadataEntry_'+i, $(this)[0].children[1].textContent]], 1);
						i++;
					}
					if(this.tagName =="LOM:METADATASCHEMA"){
						saveDataText2($(this)[0], 'metadataSchema', 'schemaMetametadataValue_1');
					}
					if(this.tagName =="LOM:LANGUAGE"){
						saveLanguageText($(this),'langMetametadataValue_', null, j);
						j++;
					};	
					if(this.tagName =="LOM:CONTRIBUTE"){
				 		saveContributionText($(this), "contribute", 'contrMetametadata_', 'DIVdescContribMetametadata_', ['rolesMetametadata_','nameContribMetametadata_', 'emailContribMetametadata_',
			 			'organContribMetametadata_', 'dateContribMetametadata_', 'DescriptionContribMetametadata_', 'ContribMetametadataLang_'], null, k);
				 		k++;
					};
				});
			};
			i = 1, j = 1, k = 1, l = 1, m = 1;
			if(this.tagName =="LOM:TECHNICAL"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:FORMAT"){
						saveDataArrayText2($(this), 'formatTechnical_', 'formatTechnicalValue_', i);
						i++;
					};
					if(this.tagName =="LOM:SIZE"){
						saveDataText2($(this)[0],"size", 'sizeTechnicalValue_1');
					}
					if(this.tagName =="LOM:LOCATION"){
						saveDataArrayText2($(this), 'locationTechnical_', 'locationTechnicalValue_', j);
						j++;
					}
					if(this.tagName =="LOM:REQUIREMENT"){
						$.each(this.children[0].children, function(){
							if(this.tagName == "LOM:TYPE")
								type = this.children[1].innerHTML;
							if(this.tagName == "LOM:NAME")
								nameReq = this.children[1].innerHTML;
							if(this.tagName == "LOM:MINIMUMVERSION")	
								minVer = this.innerHTML;
							if(this.tagName == "LOM:MAXIMUMVERSION")	
								maxVer = this.innerHTML;
						});
						saveDataArrayValues('requirementsTechnical_'+k,[['typeTechnicalReq_'+k, CBI18n.gettext(type)], ['nameTechnicalReq_'+k, 
							CBI18n.gettext(nameReq)], ['minVerTechnicalReq_'+k, minVer], ['versmaxTechnicalReq_'+k, maxVer]] ,1);
						k++;
					};
					if(this.tagName =="LOM:INSTALLATIONREMARKS"){
						$.each(this.children, function(){
							var lang = this.outerHTML.split("</lom:string>")[0].split('"')[1];
							var nameRem = this.outerHTML.split("</lom:string>")[0].split('"')[2].replace(">", "");
							saveDataArrayValues('installRemTech_'+l, [['installRemTechValue_'+l,nameRem ], ['LangRemTech_'+l, searchLanguage(lang)]], 1);		
							l++;
						});
					};
					if(this.tagName =="LOM:OTHERPLATFORMREQUIREMENTS"){
						$.each(this.children, function(){
							var lang = this.outerHTML.split("</lom:string>")[0].split('"')[1];
							var nameRem = this.outerHTML.split("</lom:string>")[0].split('"')[2].replace(">", "");
							saveDataArrayValues('requirementsRemTech_'+m, [['requirementsRemTechValue_'+m,nameRem ], ['LangOtherTech_'+m, searchLanguage(lang)]], 1);		
							m++;
						});
					};
					if(this.tagName =="LOM:DURATION"){
						saveDuration2($(this), "duration", 'descdurationDurTech_', ['durationYearsDurTech_1', 'durationMonthsDurTech_1', 'durationDaysDurTech_1','durationHoursDurTech_1',
						 'durationminutesDurTech_1', 'durationsecondsDurTech_1', 'DescriptionDurTech_', 'languageDescDurTech_']);
					};
				});
			};
			i = 1, j = 1, k = 1, l = 1, m = 1;
			if(this.tagName =="LOM:EDUCATIONAL"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:INTERACTIVITYTYPE")
						saveDataValueText($(this), 'intTypeEducationalValue_1','InterType');
					if(this.tagName =="LOM:LEARNINGRESOURCETYPE"){
						saveDataArray2($(this)[0], 'resourceTypeEducational_', 'resourceTypeEducationalValue_', null, i);	
						i++;
					}
					if(this.tagName =="LOM:INTERACTIVITYLEVEL")
						saveDataValueText($(this), 'levelIntEducationalValue_1','InteractivityLevel');
					if(this.tagName =="LOM:SEMANTICDENSITY")
						saveDataValueText($(this), 'levelDensEducationalValue_1','SemanticDensity');
					if(this.tagName =="LOM:INTENDEDENDUSERROLE"){
						saveDataArray2($(this)[0], 'endUserEducational_', 'endUserEducationalValue_', null, j);	
						j++;
					};
					if(this.tagName =="LOM:CONTEXT"){
						saveDataArray2($(this)[0], 'contextEducational_', 'contextEducationalValue_', null, k);	
						k++;
					};
					if(this.tagName =="LOM:TYPICALAGERANGE"){
						saveDataLanguageText($(this).children()[0], 'rangeAgeEducational_','rangeAgeEducationalValue_','languageRangeEducational_', null, l);
						l++;
					}
					if(this.tagName =="LOM:DIFFICULTY")
						saveDataValueText($(this), 'difficultyEducationalValue_1','Difficulty');
					if(this.tagName =="LOM:TYPICALLEARNINGTIME"){
						saveDuration2($(this), "typicalLearningTime", 'descLearningTimeEducational_', ['durationYearsEducational_1', 'durationMonthsEducational_1', 'durationDaysEducational_1','durationHoursEducational_1',
		 				'durationminutesEducational_1', 'durationsecondsEducational_1', 'DescriptionLearningEducational_', 'langDurationEducational_']);
					};
					if(this.tagName =="LOM:DESCRIPTION"){
						saveDataLanguageText($(this).children()[0], 'descEducationUse_','descEducationUseValue_','langDescrEducational_', null, m);
						m++;
					};
					if(this.tagName =="LOM:LANGUAGE"){
						saveLanguageText($(this),'languageEducationalUse_','languageEducationalUseValue_', n);
						n++;
					}
					if(this.tagName =="LOM:COGNITIVEPROCESS"){
						saveDataArray2($(this)[0], 'processcogEducational_', 'processcogEducationalValue_', null, o);	
						o++;
					};
				});
			};
			i = 1, j = 1;
			if(this.tagName =="LOM:RIGHTS"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:COST")
						saveDataValueText($(this), 'costRightsValue_1','Cost');
					if(this.tagName =="LOM:COPYRIGHTANDOTHERRESTRICTIONS")
						saveDataValueText($(this), 'copyrightRightsValue_1','AuthorRights');
					if(this.tagName =="LOM:COPYRIGHTANDOTHERRESTRICTIONS")
						saveDataValueText($(this), 'copyrightRightsValue_1','AuthorRights');
					if(this.tagName =="LOM:DESCRIPTION"){
						saveDataLanguageText($(this).children()[0], 'descRights_','descRightsValue_','descRightsLang_', null, i);
						i++;
					};
					if(this.tagName =="LOM:ACCESS"){
						saveDataValueText($(this).children()[0], 'accessTypeRights_1', 'Accesstype');
						saveDataLanguageText($($(this).children()[1]).children()[0], null, 'DescriptionAccessRights_', 'langAccessRights_', null, j);
						j++
					};
				});
			};
			if(this.tagName =="LOM:RELATION"){
				saveDataArrayValues('relationRelations_'+p,[['relationRelationsValue_'+p, CBI18n.gettext($($(this).children()[0]).children()[1].innerHTML)], ['catalogRelations_'+p, $($($(this).children()[1]).children()[0]).children()[0].innerHTML],
					['entryRelations_'+p, $($($(this).children()[1]).children()[0]).children()[1].innerHTML], ['DescriptionRelationRelations_'+p, $($($(this).children()[1]).children()[1]).children()[0].innerHTML], 
					['relationRelationsLang_'+p, searchLanguage($($($(this).children()[1]).children()[1]).children()[0].attributes["language"].value)]]  ,1);	  	
			  	p++;
			};
			if(this.tagName =="LOM:ANNOTATION"){
			 		saveContributionText($(this), "annotation", 'annotationAnnotations_', null, ['nameAnnotations_','emailAnnotations_', 'organAnnotations_','dateAnnotations_', 'DescriptionDateAnnotations_',
					 'langDateAnnotations_', 'DescriptionAnnotations_', 'LangAnnotations_'], 1, q);
				 		q++;

			};
			i = 1, j = 1, k = 1;
			if(this.tagName =="LOM:CLASSIFICATION"){
				$.each(this.children, function(){
					if(this.tagName =="LOM:PURPOSE")
						saveDataArray2($(this)[0], 'classificationsClassification_', 'typePurposeClassification_', null,r);
					if(this.tagName =="LOM:DESCRIPTION")
						saveDataLanguageText($(this).children()[0], 'classificationsClassification_', 'DescriptionTaxonClassification_', 'tituloLangTaxonClassification_', 1, r);	
					if(this.tagName =="LOM:KEYWORD")
					{
						var langKey = this.outerHTML.split("</lom:string>")[0].split('"')[1];
						var nameKey = this.outerHTML.split("</lom:string>")[0].split('"')[2].replace(">", "");
						saveDataArrayValues('classificationsClassification_'+r, [['KeywordTaxonClassification_'+r+"_"+j, nameKey], 
  						['titleLangKeywordTaxonClassification_'+r+"_"+j, searchLanguage(langKey)]], 1, 'DIVkeyClassification_'+r + "_" + j);
			        	j++;
			        }
					if(this.tagName =="LOM:TAXONPATH")
					{
						$.each(this.children, function(){
							if(this.tagName == "LOM:SOURCE")
								source = this.innerText;
							if(this.tagName == "LOM:TAXON"){
								lang = this.innerHTML.split('"')[1];
								nameTaxon = this.children[1].innerText;
								idTaxon = this.children[0].innerHTML; 
								langTaxon = this.children[1].innerHTML.split('"')[1];
								saveDataArrayValues('classificationsClassification_'+r, [['sourceNameClassification_'+r+"_"+k, source], 
									['langClassification_'+r+"_"+k, searchLanguage(lang)], 
									['nameTaxonClassification_'+r+"_"+k, nameTaxon], 
									['idTaxonClassification_'+r+"_"+k, idTaxon], 
									['langClassificationTaxon_'+r+"_"+k, searchLanguage(langTaxon)]], 1, 'DIVpathClassification_'+r + "_" + k);
									k++;
							}
						});

					}
				});
				r++;
			}
		});

	});	
}
/**
 * This method is responsible for reading metadata content
 * @param  {String} path of the file
 */
ImportMetadata.prototype.loadMetadata =  function loadMetadata(xml)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var i = 1;
  	
  	clearMetadata();
  	$(xml).find("general").each(function(){	
  		$(this).children("identifier").each(function(){
		  	saveDataArrayValues('cat_'+i, [['catalog_'+i, $(this).find("catalog").text()], ['entry_'+i, $(this).find("entry").text()]], 1);
		  	i++;
  		});
  		i = 1;
  		$(this).children("title").each(function(){
  			$(this).text().trim().split("</string>").forEach(function(element){
  				if(element != ""){
  					saveDataArrayValues('tit_'+i, [['title_'+i, element.split('"')[2].replace('>', '')], ['titleLang_'+i, searchLanguage(element.split('"')[1])]], 1);
	  				i++;
  				}
  			});
  		});
		saveLanguage($(this),'language','idiom_','mainLang_');
		saveDataLanguage($(this), 'description','descGeneral_','Description_','descGeneralLang_');
		saveDataLanguage($(this), 'keyword','keywordGeneral_','keywordGeneral1_','keywordGeneralLang_');
		saveDataLanguage($(this), 'coverage','coverage_','coverage1_','coverageLang_');
		saveDataValue($(this), 'structure', 'structuresGeneral_1','Structures');
		saveDataValue($(this), 'aggregationLevel', 'aggregationLevels_1', 'Agregations', 1);
  	});
	$(xml).find("lifecycle").each(function(){
  		i = 1;
   		$(this).children("version").each(function(){
  			$(this).html().trim().split("</string>").forEach(function(element){
  				if(element != "")
  				{
  					saveDataArrayValues('versionlifecycle_'+i, [['versionlifecycle1_'+i, element.split('"')[2].replace('>', '')], ['lifeCycleLang_'+i, searchLanguage(element.split('"')[1])]], 1)
	  				i++;
  				}
  			});
  		});
  		saveDataValue($(this), 'status', 'statusLifeCycle_1_1', 'Status');
 		saveContribution($(this), "contribute", 'contrLyfeCycle_', 'DIVdescContribLifeCycle_', ['rolesLifeCycle_','nameContribLifeCycle_', 'emailContribLifeCycle_',
 			'organContribLifeCycle_', 'dateContribLifeCycle_', 'DescriptionContribLifeCycle_', 'ContribLifeCycleLang_']);
	});
	i = 1;
	$(xml).find("metaMetadata").each(function(){
		$(this).children("identifier").each(function(){
		  	saveDataArrayValues('catMetadata_'+i, [['metametadataCatalog_'+i, $(this).find("catalog").text()], ['metametadataEntry_'+i, $(this).find("entry").text()]], 1);
		  	i++;
  		});
  		saveDataText($(this), 'metadataSchema', 'schemaMetametadataValue_1')
  		saveLanguage($(this),'language','langMetametadataValue_');
 		saveContribution($(this), "contribute", 'contrMetametadata_', 'DIVdescContribMetametadata_', ['rolesMetametadata_','nameContribMetametadata_', 'emailContribMetametadata_',
 			'organContribMetametadata_', 'dateContribMetametadata_', 'DescriptionContribMetametadata_', 'ContribMetametadataLang_']);
  	});
	$(xml).find("technical").each(function(){

		saveDataArrayText($(this), "format", 'formatTechnical_', 'formatTechnicalValue_');
		saveDataText($(this),"size", 'sizeTechnicalValue_1');
		saveDataArrayText($(this), "location", 'locationTechnical_', 'locationTechnicalValue_');
		i = 1;
  		$(this).children("requirement").each(function(){
			saveDataArrayValues('requirementsTechnical_'+i,[['typeTechnicalReq_'+i, CBI18n.gettext($(this).find("type").find("value").text())], ['nameTechnicalReq_'+i, CBI18n.gettext($(this).find("name").find("value").text())],
			['minVerTechnicalReq_'+i, $(this).find("minimumVersion").text()], ['versmaxTechnicalReq_'+i, $(this).find("maximumVersion").text()]]  ,1);
		  	i++;
		});
		i = 1;
   		$(this).children("installationRemarks").each(function(){
  			var arrayElements = $(this).html().trim().split("</string>");
  			arrayElements.forEach(function(element){
  				if(element != "")
  				{
  					saveDataArrayValues('installRemTech_'+i, [['installRemTechValue_'+i, element.split('"')[2].replace('>', '')], ['LangRemTech_'+i, searchLanguage(element.split('"')[1])]], 1);
	  				i++;
  				}
  			});
  		});
		i = 1;
   		$(this).children("otherPlatformRequirements").each(function(){
  			var arrayElements = $(this).html().trim().split("</string>");
  			arrayElements.forEach(function(element){
  				if(element != "")
  				{
					saveDataArrayValues('requirementsRemTech_'+i, [['requirementsRemTechValue_'+i, element.split('"')[2].replace('>', '')], ['LangOtherTech_'+i, searchLanguage(element.split('"')[1])]], 1);				  	
	  				i++;
  				}
  			});
  		});
		i = 1;
		saveDuration($(this), "duration", 'descdurationDurTech_', ['durationYearsDurTech_1', 'durationMonthsDurTech_1', 'durationDaysDurTech_1','durationHoursDurTech_1',
		 'durationminutesDurTech_1', 'durationsecondsDurTech_1', 'DescriptionDurTech_', 'languageDescDurTech_']);
	});
	$(xml).find("educational").each(function(){
		saveDataValue($(this), 'interactivityType', 'intTypeEducationalValue_1','InterType');
		saveDataArray($(this), "learningResourceType", 'resourceTypeEducational_', 'resourceTypeEducationalValue_')
  		saveDataValue($(this), 'interactivityLevel', 'levelIntEducationalValue_1', 'InteractivityLevel');
  		saveDataValue($(this), 'semanticDensity', 'levelDensEducationalValue_1', 'SemanticDensity');
		saveDataArray($(this), "intendedEndUserRole", 'endUserEducational_', 'endUserEducationalValue_')
		saveDataArray($(this), "context", 'contextEducational_', 'contextEducationalValue_')
		saveDataLanguage($(this), 'typicalAgeRange','rangeAgeEducational_','rangeAgeEducationalValue_','languageRangeEducational_');
		saveDataValue($(this), 'difficulty', 'difficultyEducationalValue_1', 'Difficulty');
		saveDuration($(this), "typicalLearningTime", 'descLearningTimeEducational_', ['durationYearsEducational_1', 'durationMonthsEducational_1', 'durationDaysEducational_1','durationHoursEducational_1',
		 'durationminutesEducational_1', 'durationsecondsEducational_1', 'DescriptionLearningEducational_', 'langDurationEducational_']);
		saveDataLanguage($(this), 'description','descEducationUse_','descEducationUseValue_','langDescrEducational_');
  		saveLanguage($(this),'language','languageEducationalUse_','languageEducationalUseValue_');
		saveDataArray($(this), "cognitiveProcess", 'processcogEducational_', 'processcogEducationalValue_')
   	});
	$(xml).find("rights").each(function(){
  		saveDataValue($(this), 'cost', 'costRightsValue_1', 'Cost');
  		saveDataValue($(this), 'copyrightAndOtherRestrictions', 'copyrightRightsValue_1', 'AuthorRights');
		saveDataValue($(this).children("access"), 'accessType', 'accessTypeRights_1', 'Accesstype');
		saveDataLanguage($(this).children("access"), "description", null, 'DescriptionAccessRights_', 'langAccessRights_')
  		saveDataLanguage($(this), 'description','descRights_','descRightsValue_','descRightsLang_');
	});
	i = 1;
	$(xml).find("relation").each(function(){
		saveDataArrayValues('relationRelations_'+i,[['relationRelationsValue_'+i, CBI18n.gettext($(this).find("kind").find("value").text())], ['catalogRelations_'+i, $(this).find("resource").find("identifier").find("catalog").text()],
			['entryRelations_'+i, $(this).find("resource").find("identifier").find("entry").text()], ['DescriptionRelationRelations_'+i, $(this).find("resource").find("description").text()], 
			['relationRelationsLang_'+i, searchLanguage($(this).find("resource").find("description").html().split('"')[1])]]  ,1);	  	
	  	i++;
	 });

	saveContribution($(xml), "annotation", 'annotationAnnotations_', null, ['nameAnnotations_','emailAnnotations_', 'organAnnotations_','dateAnnotations_', 'DescriptionDateAnnotations_',
	 'langDateAnnotations_', 'DescriptionAnnotations_', 'LangAnnotations_'], 1);

	i = 1;
	$(xml).find("classification").each(function(){
	  	Project.Info.LOM['classificationsClassification_'+i] = {};
		saveDataArray($(this), "purpose", 'classificationsClassification_'+i, 'typePurposeClassification_'+i, 1);
		saveDataLanguage($(this), "description", "classificationsClassification_"+i, "DescriptionTaxonClassification_"+i, "tituloLangTaxonClassification_"+i, 1);
		var j = 1;
		$(this).children("keyword").each(function(){
			saveDataArrayValues('classificationsClassification_'+i, [['KeywordTaxonClassification_'+i+"_"+j, $(this).html().split('"')[2].replace('</string>', '').replace(">","")], 
  						['titleLangKeywordTaxonClassification_'+i+"_"+j, searchLanguage($(this).html().split('"')[1])]], 1, 'DIVkeyClassification_'+i + "_" + j);
		        	j++;
		});
		j = 1;
  		$(this).children("taxonPath").each(function(){
  			var arrayElements = $(this).html().split("source");
  			arrayElements[2].split("taxon").forEach(function(element){
  				if(element.indexOf("<id>") != -1)
  				{
					saveDataArrayValues('classificationsClassification_'+i, [['sourceNameClassification_'+i+"_"+j, arrayElements[2].split("string")[1].split(">")[1].replace("</", "")], 
  						['langClassification_'+i+"_"+j, searchLanguage(arrayElements[2].split("string")[1].split('">')[0].replace('language="', "").replace(" ", ""))], 
  						['nameTaxonClassification_'+i+"_"+j, element.split("entry>")[1].split(">")[1].replace("</string","")], 
  						['idTaxonClassification_'+i+"_"+j, element.split("id>")[1].replace("</","")], 
  						['langClassificationTaxon_'+i+"_"+j, searchLanguage(element.split("entry>")[1].split('"')[1])]], 1, 'DIVpathClassification_'+i + "_" + j);
		        	j++;
  				}

  			});
  		});
		i++;
   	});
}

/**
 * This method is responsible for processing a duration field
 * @param  {String} date to be parsed
 * @result {String[]} array with date parsed
 */

function processDate(date)
{
	var arrayDate = {};
	var value = "";
	var date1 = "", date2 = "", i = 0;

	date1 = date.split("T")[0];
	date2 = date.split("T")[1];

	if(date1.length > 0)
	{
		arrayDate['P'] = {};
		for(i = 0; i < date1.length; i++)
		{
			if(!$.isNumeric(date1[i]))
			{
				arrayDate['P'][date1[i]] = value;
				value = "";
			}
			else
			{
				value = value + date1[i];
			}
		}
	}
	value = "";
	if(date2.length > 0)
	{
		arrayDate['T'] = {};
		for(i = 0; i < date2.length; i++)
		{
			if(!$.isNumeric(date2[i]))
			{
				arrayDate['T'][date2[i]] = value;
				value = "";
			}
			else
			{
				value = value + date2[i];
			}
		}
	}
	return arrayDate;
}
/**
 * This method is responsible for searching a language inside languages array
 * @param  {String} code of the language
 * @result {String} name of the language
 */
function searchLanguage(language)
{
	var result = "";
	languages.forEach(function(element){
		if(element[0] == language){
			result = element[1];
		} 
	});

	return result;
}
CBUtil.createNameSpace('application.importmetadata');
application.importmetadata = CBUtil.singleton(ImportMetadata);