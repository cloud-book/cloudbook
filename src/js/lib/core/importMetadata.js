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
 * This method is responsible for getting CBi18n values
 * It before filters the values to avoid error
 * @param  {String} original value
 * @return {String} value obtained
 */
function getCBI18n(value)
{
	var returnValue = "";
	if(value == undefined)
		returnValue = "";
	else
	{
		if(value.trim() == "")
			returnValue = "";
		else
		 	returnValue = CBI18n.gettext(utf8tochar(value));
	}

	return returnValue;
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
        		Project.Info.LOM[arrayName] = getCBI18n($(this).find("value").text());
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
        		Project.Info.LOM[arrayName] = getCBI18n($(element).children()[1].innerHTML);
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
        	Project.Info.LOM[arrayName+i][elementName+i] = getCBI18n($(this).find("value").text());
    	}
    	else
    	{
        	Project.Info.LOM[arrayName][elementName] = getCBI18n($(this).find("value").text());
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
    	Project.Info.LOM[arrayName+i][elementName+i] = getCBI18n(element.children[1].innerHTML);
	}
	else
	{
    	Project.Info.LOM[arrayName][elementName] = getCBI18n(element.children[1].innerHTML);
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
			var tempData = date.indexOf("T") != -1?date.split("T")[0]:$(this).children("date").find("datetime").text();
			saveDataArrayValues(arrayName+i, [[elements[0]+i, getCBI18n(role)], [elements[1]+i, name], [elements[2]+i, email], [elements[3]+i, organization], [elements[4]+i, tempData]], 1);
		}
		else
		{
			saveDataArrayValues(arrayName+i, [[elements[0]+i, name], [elements[1]+i, email], [elements[2]+i, organization], [elements[3]+i, tempData]], 1);
		}	

		var j = 1;
		var arrayElements = $(this).children("date").html().split("description")[1] != undefined?$(this).children("date").html().split("description")[1].split("</string>"):[];
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
		saveDataArrayValues(arrayName+i, [[elements[0]+i, getCBI18n(role)], [elements[1]+i, name], [elements[2]+i, email], [elements[3]+i, organization], [elements[4]+i, date.split("T")[0]]], 1);
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
	  				if(element.trim() != "")
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
 * This method is responsible for reading ELP metadata content (Dublin Core)
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
 * This method is responsible for saving data and language information into namespace on ELP
 * @param  {Object} main element
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 */
function saveELPDataArrayLanguage(element,  arrayName, elementName1, elementName2, notclear)
{
	var i = 1;

	if(arrayName != null)
	{
		element.children().each(function(){
			if(elementName2 != null){
				if(notclear == null)
					Project.Info.LOM[arrayName+i] = {};
				Project.Info.LOM[arrayName+i][elementName1+i] = utf8tochar($(this).children().find("string[value='valueOf_']").next().attr("value"));
				Project.Info.LOM[arrayName+i][elementName2+i] = searchLanguage($(this).children().find("string[value='language']").next().attr("value"));
			}
			else
			{
				if(notclear == null)
					Project.Info.LOM[arrayName] = {};
				Project.Info.LOM[arrayName] = $(this).children().find("string[value='valueOf_']").next().attr("value") != undefined? 
				utf8tochar($(this).children().find("string[value='valueOf_']").next().attr("value")): utf8tochar($(this).children("string[value='valueOf_']").next().attr("value"));
			}
			i++;
		})
	}
}

/**
 * This method is responsible for saving data and language information into namespace on ELP
 * @param  {Object} main element
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 */
function saveELPDataArrayLanguage2(element,  arrayName, elementName1, elementName2, notclear)
{
	var i = 1;

	if(arrayName != null)
	{
		element.children().each(function(){
			if(elementName2 != null){
				if(notclear == null)
					Project.Info.LOM[arrayName+i] = {};
				Project.Info.LOM[arrayName+i][elementName1+i] = getCBI18n($($(this).children().find("string[value='valueOf_']")[1]).next().attr("value"));
				Project.Info.LOM[arrayName+i][elementName2+i] = searchLanguage($(this).children().find("string[value='language']").next().attr("value"));
			}
			else
			{
				if(notclear == null)
					Project.Info.LOM[arrayName] = {};
				Project.Info.LOM[arrayName] = $(this).children().find("string[value='valueOf_']").next().attr("value") != undefined? 
				utf8tochar($(this).children().find("string[value='valueOf_']").next().attr("value")): utf8tochar($(this).children("string[value='valueOf_']").next().attr("value"));
			}
			i++;
		})
	}
}
/**
 * This method is responsible for saving data and language information into namespace on ELP
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 * @param  {String} index of the element inside array
 * @param  {String} index of the element inside subarray
 */
function saveELPDataLanguage(element, instanceName, arrayName, elementName1, elementName2, notclear, index, index2)
{
	var i = 1, j = 1;
	if(index != undefined) i = index;
	if(index2 != undefined) j = index2;

	if(arrayName != null)
	{
		element.children().find("instance[class='exe.engine.lom.lomsubs." + instanceName + "']").each(function(){
  			if(notclear == null){
	  			Project.Info.LOM[arrayName+i] = {};
	        	Project.Info.LOM[arrayName+i][elementName1+j] = utf8tochar($($(this).children()[0]).find("string[value='valueOf_']").next().attr("value"));
	        	Project.Info.LOM[arrayName+i][elementName2+j] = searchLanguage($($(this).children()[0]).find("string[value='language']").next().attr("value"));
        	} 
        	else
        	{
	        	Project.Info.LOM[arrayName+i][elementName1+j] = utf8tochar($($(this).children()[0]).find("string[value='valueOf_']").next().attr("value"));
	        	Project.Info.LOM[arrayName+i][elementName2+j] = searchLanguage($($(this).children()[0]).find("string[value='language']").next().attr("value"));
        	}
        	i++;j++;
	  	});
  	}else{
		element.children().find("instance[class='exe.engine.lom.lomsubs." + instanceName + "']").each(function(){
        	Project.Info.LOM[elementName1+i] = utf8tochar($($(this).children()[0]).find("string[value='valueOf_']").next().attr("value"));
        	Project.Info.LOM[elementName2+i] = searchLanguage($($(this).children()[0]).find("string[value='language']").next().attr("value"));
        	i++;j++;
	  	});
  	}
}

/**
 * This method is responsible for saving data information into namespace on ELP
 * @param  {Object} main element
 * @param  {String} name of the array index
 * @param  {String} name of the first element
 * @param  {String} name of the second element
 * @param  {String} indicates if the array is not cleared
 */
function saveELPDataArray(element,  arrayName, elementName1, elementName2, notclear)
{
	var i = 1;

	if(arrayName != null)
	{
		element.children().each(function(){
			var auxNode =$(this).children()[0];
			if(elementName1 != null){
				if(notclear == null)
					Project.Info.LOM[arrayName+i] = {};
				Project.Info.LOM[arrayName+i][elementName1+i] = utf8tochar($($(auxNode).children("instance")[0]).find("string[value='valueOf_']").next().attr("value"));
				Project.Info.LOM[arrayName+i][elementName2+i] = utf8tochar($($(auxNode).children("instance")[1]).find("string[value='valueOf_']").next().attr("value"));
			}
			else
			{
				if(notclear == null)
					Project.Info.LOM[arrayName] = {};
				Project.Info.LOM[arrayName] = utf8tochar($($(auxNode)).children().find("string[value='valueOf_']").next().attr("value"));
			}
			i++;
		})
	}
}


/**
 * This method is responsible for saving data into namespace on ELP
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array index
 * @param  {String} name of the element of the dictionary with values
 * @param  {String} index of the array
 */
function saveELPDataValueText(element, arrayName, dictionaryName, index, instanceName)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var i = 1;
		if(dictionaryName == null)
			Project.Info.LOM[arrayName] = getCBI18n($(element).children().find("instance[class='exe.engine.lom.lomsubs." + instanceName + "']").children().find("string[value='valueOf_']").next().attr("value"));
        else{
        	if(index == null)
        		Project.Info.LOM[arrayName] = getCBI18n($(element).children()[1].innerHTML);
        	else	
				Project.Info.LOM[arrayName] = dictionary['Agregations'][index];
        }
}

/**
 * This method is responsible for saving contributions data on ELP
 * @param  {String} name of the array
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String} name of the subarray  (if exists)
 * @param  {String[]} array with element names and values
 * @param  {String} indicates if there is role element or not
 */
function saveContributionELP(element, childrenName, arrayName, subArrayName, elements, norole)
{
	var i = 1;
	element.children(childrenName).each(function(){

		var entity = norole == null?utf8tochar($($(this).children()[0]).children().find("instance[class='exe.engine.lom.lomsubs.VCardSub']").children().find("string[value='valueOf_']").next().attr("value")/*.replace("BEGIN:VCARD", "").replace("END:VCARD","")*/):
		utf8tochar($($(this).children()[0]).children("instance[class='exe.engine.lom.lomsubs.VCardSub']").children().find("string[value='valueOf_']").next().attr("value")/*.replace("BEGIN:VCARD", "").replace("END:VCARD","")*/);

		if(entity != undefined){
			entity = entity.replace("BEGIN:VCARD", "").replace("END:VCARD",""); 
			var name = entity.split("FN:")[1].split("EMAIL")[0];
			var email = entity.split("INTERNET:")[1].split(" ")[0];
			var organization = entity.split("ORG:")[1];
			var date = $($($($(this).children()[0]).children("instance[class='exe.engine.lom.lomsubs.dateSub']").children()[0]).find("string[value='valueOf_']")[0]).next().attr("value");
			if(norole == null)
			{
				var role = $($(this).children()[0]).children().find("instance[class='exe.engine.lom.lomsubs.roleValueSub']").children().find("string[value='valueOf_']").next().attr("value")
				saveDataArrayValues(arrayName+i, [[elements[0]+i, getCBI18n(role)], [elements[1]+i, name], [elements[2]+i, email], [elements[3]+i, organization], [elements[4]+i, date.split("T")[0]]], 1);
			}
			else
			{
				saveDataArrayValues(arrayName+i, [[elements[0]+i, name], [elements[1]+i, email], [elements[2]+i, organization], [elements[3]+i, date.split("T")[0]]], 1);
			}	

			var j = 1;
			var arrayElements = $($($($(this).children()[0]).children("instance[class='exe.engine.lom.lomsubs.dateSub']").children().find("string[value='language']")));
			arrayElements.each(function(){
				if(norole == null){
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j] = {};
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[5]+i+'_'+j] =  utf8tochar($(this).next().next().next().attr("value"));
			  	Project.Info.LOM[arrayName+i][subArrayName+i+'_'+j][elements[6]+i+'_'+j] = searchLanguage($(this).next().attr("value"));
				}else{
					Project.Info.LOM[arrayName+i][elements[4]+i] = utf8tochar($(this).next().next().next().attr("value"));
					Project.Info.LOM[arrayName+i][elements[5]+i] = searchLanguage($(this).next().attr("value"));
				}
			  j++;

			});
			 if(norole != null){
			 	$($(this).children()[0]).children("instance[class='exe.engine.lom.lomsubs.LanguageStringSub']").children().each(function(){
		         	Project.Info.LOM[arrayName+i][elements[6]+i] = utf8tochar($(this).find("string[value='valueOf_']").next().attr("value"));
		         	Project.Info.LOM[arrayName+i][elements[7]+i] = searchLanguage($(this).find("string[value='language']").next().attr("value"));
	   			});
			 }
		}
	  	i++;
	});
}

/**
 * This method is responsible for saving data information into array namespace
 * @param  {String[]} main element
 * @param  {String} name of the childElement
 * @param  {String} name of the array
 * @param  {String} name of the element
 * @param  {int} index of the element
 * @param  {Bool} indicates if information is presented in a ComboBox 
 */
function saveELPDataArrayText2(element, arrayName, elementName, i, isCombo, instanceName)
{
	element.children("instance").each(function(){
		
		Project.Info.LOM[arrayName+i] = {};
		if(isCombo == undefined)
    		Project.Info.LOM[arrayName+i][elementName+i] = utf8tochar($($(this).children()).find("string[value='valueOf_']").next().attr("value"));
    	else
			Project.Info.LOM[arrayName+i][elementName+i] = getCBI18n($($(this).children()).find("instance[class='exe.engine.lom.lomsubs." + instanceName + "']").find("string[value='valueOf_']").next().attr("value"));
    	i++;
    })	

}

/**
 * This method is responsible for saving contributions data
 * @param  {String} name of the array
 * @param  {String} name of the childElement
 * @param  {String} name of the array 
 * @param  {String[]} array with element names and values
 */
function saveELPDuration(element, childrenName, arrayName, elementsName)
{
	var arrayDate = processDate(element.children().find("instance[class='exe.engine.lom.lomsubs.DurationValueSub']").find("string[value='valueOf_']").next().attr("value"));
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

	element.children().find("instance[class='exe.engine.lom.lomsubs.LangStringSub']").each(function(){
	  	Project.Info.LOM[arrayName+i] = {};
  		Project.Info.LOM[arrayName+i][elementsName[6]+i] = $(this).find("string[value='valueOf_']").next().attr("value")
	  	Project.Info.LOM[arrayName+i][elementsName[7]+i] = searchLanguage($(this).find("string[value='language']").next().attr("value"));
		i++;
	});
}

/**
 * This method is responsible for changing utf8 chars to ascii chars
 * @param  {String} value of the element
 * @return  {String} value with replaced chars
 */
 function utf8tochar(value)
{
	var convValues = [{"utfvalue":/\\xc2\\xa1/g,  "charvalue":"¡"}, {"utfvalue":/\\xc2\\xa2/g,  "charvalue":"¢"},
	{"utfvalue":/\\xc2\\xa3/g,  "charvalue":"£"}, {"utfvalue":/\\xc2\\xa4/g,  "charvalue":"¤"}, {"utfvalue":/\\xc2\\xa5/g,  "charvalue":"¥"}, 
	{"utfvalue":/\\xc2\\xa6/g,  "charvalue":"¦"}, {"utfvalue":/\\xc2\\xa7/g,  "charvalue":"§"}, {"utfvalue":/\\xc2\\xa8/g,  "charvalue":"¨"}, 
	{"utfvalue":/\\xc2\\xa9/g,  "charvalue":"©"}, {"utfvalue":/\\xc2\\xaa/g,  "charvalue":"ª"}, {"utfvalue":/\\xc2\\xab/g,  "charvalue":"«"}, 
	{"utfvalue":/\\xc2\\xac/g,  "charvalue":"¬"}, {"utfvalue":/\\xc2\\xad/g,  "charvalue":" "}, {"utfvalue":/\\xc2\\xae/g,  "charvalue":"®"}, 
	{"utfvalue":/\\xc2\\xaf/g,  "charvalue":"¯"}, {"utfvalue":/\\xc2\\xb0/g,  "charvalue":"°"}, {"utfvalue":/\\xc2\\xb1/g,  "charvalue":"±"}, 
	{"utfvalue":/\\xc2\\xb2/g,  "charvalue":"²"}, {"utfvalue":/\\xc2\\xb3/g,  "charvalue":"³"}, {"utfvalue":/\\xc2\\xb4/g,  "charvalue":"´"}, 
	{"utfvalue":/\\xc2\\xb5/g,  "charvalue":"µ"}, {"utfvalue":/\\xc2\\xb6/g,  "charvalue":"¶"}, {"utfvalue":/\\xc2\\xb7/g,  "charvalue":"·"}, 
	{"utfvalue":/\\xc2\\xb8/g,  "charvalue":"¸"}, {"utfvalue":/\\xc2\\xb9/g,  "charvalue":"¹"}, {"utfvalue":/\\xc2\\xba/g,  "charvalue":"º"}, 
	{"utfvalue":/\\xc2\\xbb/g,  "charvalue":"»"}, {"utfvalue":/\\xc2\\xbc/g,  "charvalue":"¼"}, {"utfvalue":/\\xc2\\xbd/g,  "charvalue":"½"}, 
	{"utfvalue":/\\xc2\\xbe/g,  "charvalue":"¾"}, {"utfvalue":/\\xc2\\xbf/g,  "charvalue":"¿"}, {"utfvalue":/\\xc3\\x80/g,  "charvalue":"À"}, 
	{"utfvalue":/\\xc3\\x81/g,  "charvalue":"Á"}, {"utfvalue":/\\xc3\\x82/g,  "charvalue":"Â"}, {"utfvalue":/\\xc3\\x83/g,  "charvalue":"Ã"}, 
	{"utfvalue":/\\xc3\\x84/g,  "charvalue":"Ä"}, {"utfvalue":/\\xc3\\x85/g,  "charvalue":"Å"}, {"utfvalue":/\\xc3\\x86/g,  "charvalue":"Æ"}, 
	{"utfvalue":/\\xc3\\x87/g,  "charvalue":"Ç"}, {"utfvalue":/\\xc3\\x88/g,  "charvalue":"È"}, {"utfvalue":/\\xc3\\x89/g,  "charvalue":"É"}, 
	{"utfvalue":/\\xc3\\x8a/g,  "charvalue":"Ê"}, {"utfvalue":/\\xc3\\x8b/g,  "charvalue":"Ë"}, {"utfvalue":/\\xc3\\x8c/g,  "charvalue":"Ì"}, 
	{"utfvalue":/\\xc3\\x8d/g,  "charvalue":"Í"}, {"utfvalue":/\\xc3\\x8e/g,  "charvalue":"Î"}, {"utfvalue":/\\xc3\\x8f/g,  "charvalue":"Ï"}, 
	{"utfvalue":/\\xc3\\x90/g,  "charvalue":"Ð"}, {"utfvalue":/\\xc3\\x91/g,  "charvalue":"Ñ"}, {"utfvalue":/\\xc3\\x92/g,  "charvalue":"Ò"}, 
	{"utfvalue":/\\xc3\\x93/g,  "charvalue":"Ó"}, {"utfvalue":/\\xc3\\x94/g,  "charvalue":"Ô"}, {"utfvalue":/\\xc3\\x95/g,  "charvalue":"Õ"}, 
	{"utfvalue":/\\xc3\\x96/g,  "charvalue":"Ö"}, {"utfvalue":/\\xc3\\x97/g,  "charvalue":"×"}, {"utfvalue":/\\xc3\\x98/g,  "charvalue":"Ø"}, 
	{"utfvalue":/\\xc3\\x99/g,  "charvalue":"Ù"}, {"utfvalue":/\\xc3\\x9a/g,  "charvalue":"Ú"}, {"utfvalue":/\\xc3\\x9b/g,  "charvalue":"Û"}, 
	{"utfvalue":/\\xc3\\x9c/g,  "charvalue":"Ü"}, {"utfvalue":/\\xc3\\x9d/g,  "charvalue":"Ý"}, {"utfvalue":/\\xc3\\x9e/g,  "charvalue":"Þ"}, 
	{"utfvalue":/\\xc3\\x9f/g,  "charvalue":"ß"}, {"utfvalue":/\\xc3\\xa0/g,  "charvalue":"à"}, {"utfvalue":/\\xc3\\xa1/g,  "charvalue":"á"}, 
	{"utfvalue":/\\xc3\\xa2/g,  "charvalue":"â"}, {"utfvalue":/\\xc3\\xa3/g,  "charvalue":"ã"}, {"utfvalue":/\\xc3\\xa4/g,  "charvalue":"ä"}, 
	{"utfvalue":/\\xc3\\xa5/g,  "charvalue":"å"}, {"utfvalue":/\\xc3\\xa6/g,  "charvalue":"æ"}, {"utfvalue":/\\xc3\\xa7/g,  "charvalue":"ç"},
	{"utfvalue":/\\xc3\\xa8/g,  "charvalue":"è"}, {"utfvalue":/\\xc3\\xa9/g,  "charvalue":"é"}, {"utfvalue":/\\xc3\\xaa/g,  "charvalue":"ê"},
	{"utfvalue":/\\xc3\\xab/g,  "charvalue":"ë"}, {"utfvalue":/\\xc3\\xac/g,  "charvalue":"ì"}, {"utfvalue":/\\xc3\\xad/g,  "charvalue":"í"}, 
	{"utfvalue":/\\xc3\\xae/g,  "charvalue":"î"}, {"utfvalue":/\\xc3\\xaf/g,  "charvalue":"ï"}, {"utfvalue":/\\xc3\\xb0/g,  "charvalue":"ð"},
	{"utfvalue":/\\xc3\\xb1/g,  "charvalue":"ñ"}, {"utfvalue":/\\xc3\\xb2/g,  "charvalue":"ò"}, {"utfvalue":/\\xc3\\xb3/g,  "charvalue":"ó"},
	{"utfvalue":/\\xc3\\xb4/g,  "charvalue":"ô"}, {"utfvalue":/\\xc3\\xb5/g,  "charvalue":"õ"}, {"utfvalue":/\\xc3\\xb6/g,  "charvalue":"ö"},
	{"utfvalue":/\\xc3\\xb7/g,  "charvalue":"÷"}, {"utfvalue":/\\xc3\\xb8/g,  "charvalue":"ø"}, {"utfvalue":/\\xc3\\xb9/g,  "charvalue":"ù"},
	{"utfvalue":/\\xc3\\xba/g,  "charvalue":"ú"}, {"utfvalue":/\\xc3\\xbb/g,  "charvalue":"û"}, {"utfvalue":/\\xc3\\xbc/g,  "charvalue":"ü"},
	{"utfvalue":/\\xc3\\xbd/g,  "charvalue":"ý"}, {"utfvalue":/\\xc3\\xbe/g,  "charvalue":"þ"}, {"utfvalue":/\\xc3\\xbf/g,  "charvalue":"ÿ"},
	{"utfvalue":/\\xc4\\x80/g,  "charvalue":"Ā"}, {"utfvalue":/\\xc4\\x81/g,  "charvalue":"ā"}, {"utfvalue":/\\xc4\\x82/g,  "charvalue":"Ă"},
	{"utfvalue":/\\xc4\\x83/g,  "charvalue":"ă"}, {"utfvalue":/\\xc4\\x84/g,  "charvalue":"Ą"}, {"utfvalue":/\\xc4\\x85/g,  "charvalue":"ą"},
	{"utfvalue":/\\xc4\\x86/g,  "charvalue":"Ć"}, {"utfvalue":/\\xc4\\x87/g,  "charvalue":"ć"}, {"utfvalue":/\\xc4\\x88/g,  "charvalue":"Ĉ"},
	{"utfvalue":/\\xc4\\x89/g,  "charvalue":"ĉ"}, {"utfvalue":/\\xc4\\x8a/g,  "charvalue":"Ċ"}, {"utfvalue":/\\xc4\\x8b/g,  "charvalue":"ċ"},
	{"utfvalue":/\\xc4\\x8c/g,  "charvalue":"Č"}, {"utfvalue":/\\xc4\\x8d/g,  "charvalue":"č"}, {"utfvalue":/\\xc4\\x8e/g,  "charvalue":"Ď"},
	{"utfvalue":/\\xc4\\x8f/g,  "charvalue":"ď"}, {"utfvalue":/\\xc4\\x90/g,  "charvalue":"Đ"}, {"utfvalue":/\\xc4\\x91/g,  "charvalue":"đ"},
	{"utfvalue":/\\xc4\\x92/g,  "charvalue":"Ē"}, {"utfvalue":/\\xc4\\x93/g,  "charvalue":"ē"}, {"utfvalue":/\\xc4\\x94/g,  "charvalue":"Ĕ"},
	{"utfvalue":/\\xc4\\x95/g,  "charvalue":"ĕ"}, {"utfvalue":/\\xc4\\x96/g,  "charvalue":"Ė"}, {"utfvalue":/\\xc4\\x97/g,  "charvalue":"ė"},
	{"utfvalue":/\\xc4\\x98/g,  "charvalue":"Ę"}, {"utfvalue":/\\xc4\\x99/g,  "charvalue":"ę"}, {"utfvalue":/\\xc4\\x9a/g,  "charvalue":"Ě"},
	{"utfvalue":/\\xc4\\x9b/g,  "charvalue":"ě"}, {"utfvalue":/\\xc4\\x9c/g,  "charvalue":"Ĝ"}, {"utfvalue":/\\xc4\\x9d/g,  "charvalue":"ĝ"},
	{"utfvalue":/\\xc4\\x9e/g,  "charvalue":"Ğ"}, {"utfvalue":/\\xc4\\x9f/g,  "charvalue":"ğ"}, {"utfvalue":/\\xc4\\xa0/g,  "charvalue":"Ġ"},
	{"utfvalue":/\\xc4\\xa1/g,  "charvalue":"ġ"}, {"utfvalue":/\\xc4\\xa2/g,  "charvalue":"Ģ"}, {"utfvalue":/\\xc4\\xa3/g,  "charvalue":"ģ"},
	{"utfvalue":/\\xc4\\xa4/g,  "charvalue":"Ĥ"}, {"utfvalue":/\\xc4\\xa5/g,  "charvalue":"ĥ"}, {"utfvalue":/\\xc4\\xa6/g,  "charvalue":"Ħ"},
	{"utfvalue":/\\xc4\\xa7/g,  "charvalue":"Ħ"}, {"utfvalue":/\\xc4\\xa8/g,  "charvalue":"Ĩ"}, {"utfvalue":/\\xc4\\xa9/g,  "charvalue":"ĩ"},
	{"utfvalue":/\\xc4\\xaa/g,  "charvalue":"Ī"}, {"utfvalue":/\\xc4\\xab/g,  "charvalue":"ī"}, {"utfvalue":/\\xc4\\xac/g,  "charvalue":"Ĭ"},
	{"utfvalue":/\\xc4\\xad/g,  "charvalue":"ĭ"}, {"utfvalue":/\\xc4\\xae/g,  "charvalue":"Į"}, {"utfvalue":/\\xc4\\xaf/g,  "charvalue":"į"},
	{"utfvalue":/\\xc4\\xb0/g,  "charvalue":"İ"}, {"utfvalue":/\\xc4\\xb1/g,  "charvalue":"ı"}, {"utfvalue":/\\xc4\\xb2/g,  "charvalue":"Ĳ"},
	{"utfvalue":/\\xc4\\xb3/g,  "charvalue":"ĳ"}, {"utfvalue":/\\xc4\\xb4/g,  "charvalue":"Ĵ"}, {"utfvalue":/\\xc4\\xb5/g,  "charvalue":"ĵ"},
	{"utfvalue":/\\xc4\\xb6/g,  "charvalue":"Ķ"}, {"utfvalue":/\\xc4\\xb7/g,  "charvalue":"ķ"}, {"utfvalue":/\\xc4\\xb8/g,  "charvalue":"ĸ"},
	{"utfvalue":/\\xc4\\xb9/g,  "charvalue":"Ĺ"}, {"utfvalue":/\\xc4\\xba/g,  "charvalue":"ĺ"}, {"utfvalue":/\\xc4\\xbb/g,  "charvalue":"Ļ"},
	{"utfvalue":/\\xc4\\xbc/g,  "charvalue":"ļ"}, {"utfvalue":/\\xc4\\xbd/g,  "charvalue":"Ľ"}, {"utfvalue":/\\xc4\\xbe/g,  "charvalue":"ľ"},
	{"utfvalue":/\\xc4\\xbf/g,  "charvalue":"Ŀ"}, {"utfvalue":/\\xc5\\x80/g,  "charvalue":"ŀ"}, {"utfvalue":/\\xc5\\x81/g,  "charvalue":"Ł"},
	{"utfvalue":/\\xc5\\x82/g,  "charvalue":"ł"}, {"utfvalue":/\\xc5\\x83/g,  "charvalue":"Ń"}, {"utfvalue":/\\xc5\\x84/g,  "charvalue":"ń"},
	{"utfvalue":/\\xc5\\x85/g,  "charvalue":"Ņ"}, {"utfvalue":/\\xc5\\x86/g,  "charvalue":"ņ"}, {"utfvalue":/\\xc5\\x87/g,  "charvalue":"Ň"},
	{"utfvalue":/\\xc5\\x88/g,  "charvalue":"ň"}, {"utfvalue":/\\xc5\\x89/g,  "charvalue":"ŉ"}, {"utfvalue":/\\xc5\\x8a/g,  "charvalue":"Ŋ"},
	{"utfvalue":/\\xc5\\x8b/g,  "charvalue":"ŋ"}, {"utfvalue":/\\xc5\\x8c/g,  "charvalue":"Ō"}, {"utfvalue":/\\xc5\\x8d/g,  "charvalue":"ō"},
	{"utfvalue":/\\xc5\\x8e/g,  "charvalue":"Ŏ"}, {"utfvalue":/\\xc5\\x8f/g,  "charvalue":"ŏ"}, {"utfvalue":/\\xc5\\x90/g,  "charvalue":"Ő"},
	{"utfvalue":/\\xc5\\x91/g,  "charvalue":"ő"}, {"utfvalue":/\\xc5\\x92/g,  "charvalue":"Œ"},
	{"utfvalue":/\\xc5\\x93/g,  "charvalue":"œ"}, {"utfvalue":/\\xc5\\x94/g,  "charvalue":"Ŕ"}, {"utfvalue":/\\xc5\\x95/g,  "charvalue":"ŕ"},
	{"utfvalue":/\\xc5\\x96/g,  "charvalue":"Ŗ"}, {"utfvalue":/\\xc5\\x97/g,  "charvalue":"ŗ"}, {"utfvalue":/\\xc5\\x98/g,  "charvalue":"Ř"},
	{"utfvalue":/\\xc5\\x99/g,  "charvalue":"ř"}, {"utfvalue":/\\xc5\\x9a/g,  "charvalue":"Ś"}, {"utfvalue":/\\xc5\\x9b/g,  "charvalue":"ś"},
	{"utfvalue":/\\xc5\\x9c/g,  "charvalue":"Ŝ"}, {"utfvalue":/\\xc5\\x9d/g,  "charvalue":"ŝ"}, {"utfvalue":/\\xc5\\x9e/g,  "charvalue":"Ş"},
	{"utfvalue":/\\xc5\\x9f/g,  "charvalue":"ş"}, {"utfvalue":/\\xc5\\xa0/g,  "charvalue":"Š"}, {"utfvalue":/\\xc5\\xa1/g,  "charvalue":"š"},
	{"utfvalue":/\\xc5\\xa2/g,  "charvalue":"Ţ"}, {"utfvalue":/\\xc5\\xa3/g,  "charvalue":"ţ"}, {"utfvalue":/\\xc5\\xa4/g,  "charvalue":"Ť"},
	{"utfvalue":/\\xc5\\xa5/g,  "charvalue":"ť"}, {"utfvalue":/\\xc5\\xa6/g,  "charvalue":"Ŧ"}, {"utfvalue":/\\xc5\\xa7/g,  "charvalue":"ŧ"},
	{"utfvalue":/\\xc5\\xa8/g,  "charvalue":"Ũ"}, {"utfvalue":/\\xc5\\xa9/g,  "charvalue":"ũ"}, {"utfvalue":/\\xc5\\xaa/g,  "charvalue":"Ū"},
	{"utfvalue":/\\xc5\\xab/g,  "charvalue":"ū"}, {"utfvalue":/\\xc5\\xac/g,  "charvalue":"Ŭ"}, {"utfvalue":/\\xc5\\xad/g,  "charvalue":"ŭ"},
	{"utfvalue":/\\xc5\\xae/g,  "charvalue":"Ů"}, {"utfvalue":/\\xc5\\xaf/g,  "charvalue":"ů"}, {"utfvalue":/\\xc5\\xb0/g,  "charvalue":"Ű"},
	{"utfvalue":/\\xc5\\xb1/g,  "charvalue":"ű"}, {"utfvalue":/\\xc5\\xb2/g,  "charvalue":"Ų"}, {"utfvalue":/\\xc5\\xb3/g,  "charvalue":"ų"},
	{"utfvalue":/\\xc5\\xb4/g,  "charvalue":"Ŵ"}, {"utfvalue":/\\xc5\\xb5/g,  "charvalue":"ŵ"}, {"utfvalue":/\\xc5\\xb6/g,  "charvalue":"Ŷ"},
	{"utfvalue":/\\xc5\\xb7/g,  "charvalue":"ŷ"}, {"utfvalue":/\\xc5\\xb8/g,  "charvalue":"Ÿ"}, {"utfvalue":/\\xc5\\xb9/g,  "charvalue":"Ź"},
	{"utfvalue":/\\xc5\\xba/g,  "charvalue":"ź"}, {"utfvalue":/\\xc5\\xbb/g,  "charvalue":"Ż"}, {"utfvalue":/\\xc5\\xbc/g,  "charvalue":"ż"},
	{"utfvalue":/\\xc5\\xbd/g,  "charvalue":"Ž"}, {"utfvalue":/\\xc5\\xbe/g,  "charvalue":"ž"}, {"utfvalue":/\\xc5\\xbf/g,  "charvalue":"ſ"}];

	if(value != undefined){
		for(i = 0; i < convValues.length; i++){
			value = value.replace(convValues[i].utfvalue, convValues[i].charvalue);
		}
	}
	return value;
}
/**
 * This method is responsible for reading ELP metadata content (LOM-ES)
 * @param  {String} value of the file
 */
ImportMetadata.prototype.loadELPLOMMetadata =  function loadELPLOMMetadata(node)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var i = 1, maxVersion = "", minVersion = "", type = "", name = "";

	clearMetadata();

	$(node.children()[0]).children("string").each(function(){
		switch($(this).attr("value"))
		{
			case "general":
				$($($(this).next()[0]).children()[0]).children("string").each(function(){
					switch($(this).attr("value"))
					{
						case "aggregationLevel":
						saveELPDataValueText($(this), 'aggregationLevels_1', 'Agregations', 
							parseInt($(this).next().children().find("instance[class='exe.engine.lom.lomsubs.aggregationLevelValueSub']").children().find("string[value='valueOf_']").next().attr("value"))-1);
						break;
						case "coverage":
							saveELPDataArrayLanguage($($(this).next()), 'coverage_', 'coverage1_', 'coverageLang_', null);
						break;
						case "description":
							saveELPDataArrayLanguage($($(this).next()), 'descGeneral_', 'Description_', 'descGeneralLang_', null);
						break;
						case "identifier":
							saveELPDataArray($($(this).next()),  'cat_', 'catalog_', 'entry_', null);
						break;
						case "keyword":
							saveELPDataArrayLanguage($($(this).next()), 'keywordGeneral_', 'keywordGeneral1_', 'keywordGeneralLang_', null);
						break;
						case "language":
							i = 1;
							$(this).next().children().each(function(){

								Project.Info.LOM['idiom_'+i] = {};
								Project.Info.LOM['idiom_'+i]['mainLang_'+i] = searchLanguage($($(this).children()[0]).find("string[value='valueOf_']").next().attr("value"));
								i++;
							})
						break;
						case "structure":
							saveELPDataValueText($($(this).next()), 'structuresGeneral_1', null, null, 'structureValueSub')
						break;
						case "title":
							saveELPDataLanguage($($(this).next()), 'LangStringSub', 'tit_', 'title_', 'titleLang_', null);
						break;
					}	
				});
			break;
			case "lifeCycle":
				$($($(this).next()[0]).children()[0]).children("string").each(function(){
					switch($(this).attr("value"))
					{
						case "version":
								saveELPDataLanguage($($(this).next()), 'LangStringSub', 'versionlifecycle_', 'versionlifecycle1_', 'lifeCycleLang_', null);
						break;
						case "status":
							saveELPDataValueText($($(this).next()),'statusLifeCycle_1_1', null, null, 'statusValueSub');
						break;
						case "contribute":
							saveContributionELP($(this).next(), "instance[class='exe.engine.lom.lomsubs.contributeSub']",'contrLyfeCycle_',
							'DIVdescContribLifeCycle_', ['rolesLifeCycle_','nameContribLifeCycle_', 'emailContribLifeCycle_',
			 				'organContribLifeCycle_', 'dateContribLifeCycle_', 'DescriptionContribLifeCycle_', 'ContribLifeCycleLang_'], null)
				 		break;
					}
				});
			break;
			case "metaMetadata":
				$($($(this).next()[0]).children()[0]).children("string").each(function(){
					switch($(this).attr("value"))
					{
						case "identifier":
							saveELPDataArray($($(this).next()),  'catMetadata_', 'metametadataCatalog_', 'metametadataEntry_', null)
						break;
						case "metadataSchema":
							saveELPDataArrayLanguage($($(this).next()), 'schemaMetametadataValue_1', null, null, null);
						break;
						case "language":
							Project.Info.LOM['langMetametadataValue_1'] = {};
							Project.Info.LOM['langMetametadataValue_1'] = searchLanguage($($($(this).next().children()[0]).children("string[value='valueOf_']")).next().attr("value"));
				 		break;
						case "contribute":
							saveContributionELP($(this).next(), "instance[class='exe.engine.lom.lomsubs.contributeMetaSub']",'contrMetametadata_',
							'DIVdescContribMetametadata_', ['rolesMetametadata_','nameContribMetametadata_', 'emailContribMetametadata_',
			 				'organContribMetametadata_', 'dateContribMetametadata_', 'DescriptionContribMetametadata_', 'ContribMetametadataLang_'], null)
				 		break;
					}
				});
			break;
			case "technical":
				$($($(this).next()[0]).children()[0]).children("string").each(function(){
					switch($(this).attr("value"))
					{
						case "format":
							i = 1;
							saveELPDataArrayText2($($(this).next()), 'formatTechnical_', 'formatTechnicalValue_', i);
						break;
						case "size":
							saveELPDataArrayLanguage($($(this).next()), 'sizeTechnicalValue_1', null, null, null);
						break;
						case "location":
							i = 1;
							saveELPDataArrayText2($($(this).next()), 'locationTechnical_', 'locationTechnicalValue_', i);
				 		break;
						case "installationRemarks":
							saveELPDataLanguage($($(this).next()), 'LangStringSub', 'installRemTech_', 'installRemTechValue_', 'LangRemTech_', null);
				 		break;
						case "otherPlatformRequirements":
							saveELPDataLanguage($($(this).next()), 'LangStringSub', 'requirementsRemTech_', 'requirementsRemTechValue_', 'LangOtherTech_', null);
				 		break;
				 		case "requirement":
					 		i = 1;
					 		$(this).next().children().each(function(){
					 			$($(this).children().find("instance[class='exe.engine.lom.lomsubs.orCompositeSub']").children()[0]).children("instance").each(function(){
					 				switch($(this)[0].className){
					 					case "exe.engine.lom.lomsubs.maximumVersionSub":
					 						maxVersion = utf8tochar($($(this)[0]).children().find("string[value='valueOf_']").next().attr("value"));
					 					break;
					 					case "exe.engine.lom.lomsubs.minimumVersionSub":
					 						minVersion = utf8tochar($($(this)[0]).children().find("string[value='valueOf_']").next().attr("value"));
					 					break;
					 					case "exe.engine.lom.lomsubs.type_Sub":
					 						type = utf8tochar($($(this).children()[0]).find("instance[class='exe.engine.lom.lomsubs.typeValueSub']").find("string[value='valueOf_']").next().attr("value"));
					 					break;
					 					case "exe.engine.lom.lomsubs.nameSub":
					 						name = utf8tochar($($(this)[0]).children().find("instance[class='exe.engine.lom.lomsubs.nameValueSub']").find("string[value='valueOf_']").next().attr("value"));
					 					break;
					 				}
					 			})

					 			saveDataArrayValues('requirementsTechnical_'+i,[['typeTechnicalReq_'+i, getCBI18n(type)], ['nameTechnicalReq_'+i, 
								getCBI18n(name)], ['minVerTechnicalReq_'+i, minVersion], ['versmaxTechnicalReq_'+i, maxVersion]] ,1);
								i++;
							});
				 		break;
				 		case "duration":
							saveELPDuration($($(this).next()), "duration", 'descdurationDurTech_', ['durationYearsDurTech_1', 'durationMonthsDurTech_1', 'durationDaysDurTech_1','durationHoursDurTech_1',
						 	'durationminutesDurTech_1', 'durationsecondsDurTech_1', 'DescriptionDurTech_', 'languageDescDurTech_']);
				 		break;
					}
				});
			break;
			case "educational":
				$($($($(this).next()[0]).children()[0]).children()[0]).children("string").each(function(){
					switch($(this).attr("value"))
					{
						case "interactivityType":
							saveELPDataValueText($($(this).next()), 'intTypeEducationalValue_1', null, null, 'interactivityTypeValueSub');
						break;
						case "learningResourceType":
							i = 1;
							saveELPDataArrayText2($($(this).next()), 'resourceTypeEducational_', 'resourceTypeEducationalValue_', i, true, 'learningResourceTypeValueSub');
						break;
						case "interactivityLevel":
							saveELPDataValueText($($(this).next()), 'levelIntEducationalValue_1', null, null, 'interactivityLevelValueSub');
						break;
						case "semanticDensity":
							saveELPDataValueText($($(this).next()), 'levelDensEducationalValue_1', null, null, 'semanticDensityValueSub');
						break;
						case "intendedEndUserRole":
							i = 1;
							saveELPDataArrayText2($($(this).next()), 'endUserEducational_', 'endUserEducationalValue_', i, true, 'intendedEndUserRoleValueSub');
						break;
						case "context":
							i = 1;
							saveELPDataArrayText2($($(this).next()), 'contextEducational_', 'contextEducationalValue_', i, true, 'contextValueSub');
						break;
						case "difficulty":
							saveELPDataValueText($($(this).next()), 'difficultyEducationalValue_1', null, null, 'difficultyValueSub');
						break;
						case "typicalAgeRange":
							saveELPDataLanguage($($(this).next()), 'LangStringSub', 'rangeAgeEducational_','rangeAgeEducationalValue_','languageRangeEducational_', null);
						break;
						case "description":
							saveELPDataLanguage($($(this).next()), 'LangStringSub' , 'descEducationUse_','descEducationUseValue_','langDescrEducational_', null);
						break;
						case "language":
							 i = 1;
							 $(this).next().children().each(function(){
							 	Project.Info.LOM['languageEducationalUse_'+i] = {};
							 	Project.Info.LOM['languageEducationalUse_'+i]['languageEducationalUseValue_'+i] = searchLanguage($($(this).children()[0]).find("string[value='valueOf_']").next().attr("value"));
							 	i++;
							 })
						break;
						case "cognitiveProcess":
							 i = 1;
							 saveELPDataArrayText2($($(this).next()), 'processcogEducational_', 'processcogEducationalValue_', i, true, 'cognitiveProcessValueSub');
						break;
				 		case "typicalLearningTime":
							saveELPDuration($($(this).next()), "typicalLearningTime", 'descLearningTimeEducational_', ['durationYearsEducational_1', 'durationMonthsEducational_1', 'durationDaysEducational_1','durationHoursEducational_1',
		 					'durationminutesEducational_1', 'durationsecondsEducational_1', 'DescriptionLearningEducational_', 'langDurationEducational_']);
				 		break;
					}
				});
			break;
			case "rights":
				$($($(this).next()[0]).children()[0]).children("string").each(function(){
					switch($(this).attr("value"))
					{
						case "cost":
							saveELPDataValueText($($(this).next()), 'costRightsValue_1', null, null, 'costValueSub');
						break;
						case "copyrightAndOtherRestrictions":
							saveELPDataValueText($($(this).next()), 'copyrightRightsValue_1', null, null, 'copyrightAndOtherRestrictionsValueSub');
						break;
						case "description":
							saveELPDataArrayLanguage($($(this).next()), 'descRights_','descRightsValue_','descRightsLang_', null);
						break;
						case "access":
							saveELPDataValueText($($(this).next()), 'accessTypeRights_1', null, null, 'accessTypeValueSub');
							saveELPDataLanguage($($(this).next()), 'LanguageStringSub' , null,'DescriptionAccessRights_','langAccessRights_', 1);
					}
				});
			break;
			case "relation":
				i = 1;
				$(this).next().children("instance").each(function(){
					saveDataArrayValues('relationRelations_'+i,[['relationRelationsValue_'+i, getCBI18n($(this).children().find("instance[class='exe.engine.lom.lomsubs.kindValueSub']").find("string[value='valueOf_']").next().attr("value")) ],
					 ['catalogRelations_'+i, $(this).children().find("instance[class='exe.engine.lom.lomsubs.catalogSub']").find("string[value='valueOf_']").next().attr("value")],
							['entryRelations_'+i, $(this).children().find("instance[class='exe.engine.lom.lomsubs.entrySub']").find("string[value='valueOf_']").next().attr("value")], 
							['DescriptionRelationRelations_'+i, $(this).children().find("instance[class='exe.engine.lom.lomsubs.LangStringSub']").find("string[value='valueOf_']").next().attr("value")], 
							['relationRelationsLang_'+i, searchLanguage($(this).children().find("instance[class='exe.engine.lom.lomsubs.LangStringSub']").find("string[value='language']").next().attr("value"))]]  ,1);	  	
					  	i++;
				});
			break;
			case "annotation":
					saveContributionELP($(this).next(), "instance[class='exe.engine.lom.lomsubs.annotationSub']", 'annotationAnnotations_', null, ['nameAnnotations_','emailAnnotations_', 'organAnnotations_','dateAnnotations_', 'DescriptionDateAnnotations_',
					 'langDateAnnotations_', 'DescriptionAnnotations_', 'LangAnnotations_'], 1);
			break;
			case "classification":
				i = 1;
				$(this).next().children("instance").each(function(){
	 				  	Project.Info.LOM['classificationsClassification_'+i] = {};

					  	Project.Info.LOM['classificationsClassification_'+i]['typePurposeClassification_'+i] = getCBI18n($(this).children().find("instance[class='exe.engine.lom.lomsubs.purposeValueSub']").find("string[value='valueOf_']").next().attr("value"));
 					    saveELPDataLanguage($(this).children().find("instance[class='exe.engine.lom.lomsubs.LanguageStringSub']"), "LangStringSub", "classificationsClassification_", "DescriptionTaxonClassification_", "tituloLangTaxonClassification_", 1, i, i);
						var j = 1;
						$(this).children().find("instance[class='exe.engine.lom.lomsubs.keywordSub']").each(function(){
							saveDataArrayValues('classificationsClassification_'+i, [['KeywordTaxonClassification_'+i+"_"+j, $(this).find("string[value='valueOf_']").next().attr("value")], 
				  						['titleLangKeywordTaxonClassification_'+i+"_"+j, searchLanguage($(this).find("string[value='language']").next().attr("value"))]], 1, 'DIVkeyClassification_'+i + "_" + j);
						        	j++;
						});
						j = 1;
				  		$(this).children().find("instance[class='exe.engine.lom.lomsubs.taxonPathSub']").each(function(){
				  			var cont = $(this).children().find("instance[class='exe.engine.lom.lomsubs.taxonSub']").length;
				  			for(j = 1; j <= cont; j++){
				  				var auxContent =$(this).children().find("instance[class='exe.engine.lom.lomsubs.taxonSub']")[j-1];
								saveDataArrayValues('classificationsClassification_'+i, [['sourceNameClassification_'+i+"_"+j, $(this).children().find("instance[class='exe.engine.lom.lomsubs.sourceSub']").find("string[value='valueOf_']").next().attr("value")], 
			  						['langClassification_'+i+"_"+j, searchLanguage($(auxContent).children().find("instance[class='exe.engine.lom.lomsubs.LangStringSub']").find("string[value='language']").next().attr("value"))], 
			  						['nameTaxonClassification_'+i+"_"+j, $(auxContent).children().find("instance[class='exe.engine.lom.lomsubs.LangStringSub']").find("string[value='valueOf_']").next().attr("value")], 
			  						['idTaxonClassification_'+i+"_"+j, $(auxContent).children().find("instance[class='exe.engine.lom.lomsubs.idSub']").find("string[value='valueOf_']").next().attr("value")], 
			  						['langClassificationTaxon_'+i+"_"+j, searchLanguage($(this).children().find("instance[class='exe.engine.lom.lomsubs.taxonSub']").find("string[value='language']").next().attr("value"))]], 1, 'DIVpathClassification_'+i + "_" + j);
					        }
				  		});
						i++;
				   	});			
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
						saveDataArrayValues('requirementsTechnical_'+k,[['typeTechnicalReq_'+k, getCBI18n(type)], ['nameTechnicalReq_'+k, 
							getCBI18n(nameReq)], ['minVerTechnicalReq_'+k, minVer], ['versmaxTechnicalReq_'+k, maxVer]] ,1);
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
				saveDataArrayValues('relationRelations_'+p,[['relationRelationsValue_'+p, getCBI18n($($(this).children()[0]).children()[1].innerHTML) ], ['catalogRelations_'+p, $($($(this).children()[1]).children()[0]).children()[0].innerHTML],
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
			saveDataArrayValues('requirementsTechnical_'+i,[['typeTechnicalReq_'+i, getCBI18n($(this).find("type").find("value").text()) ], ['nameTechnicalReq_'+i, getCBI18n($(this).find("name").find("value").text()) ],
			['minVerTechnicalReq_'+i, $(this).find("minimumVersion").text()], ['versmaxTechnicalReq_'+i, $(this).find("maximumVersion").text()]]  ,1);
		  	i++;
		});
		i = 1;
   		$(this).children("installationRemarks").each(function(){
  			var arrayElements = $(this).html().trim().split("</string>");
  			arrayElements.forEach(function(element){
  				if(element.trim() != "")
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
  				if(element.trim() != "")
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
		saveDataArrayValues('relationRelations_'+i,[['relationRelationsValue_'+i, getCBI18n($(this).find("kind").find("value").text()) ], ['catalogRelations_'+i, $(this).find("resource").find("identifier").find("catalog").text()],
			['entryRelations_'+i, $(this).find("resource").find("identifier").find("entry").text()], ['DescriptionRelationRelations_'+i, $(this).find("resource").find("description").text()], 
			['relationRelationsLang_'+i, searchLanguage($(this).find("resource").find("description").html() != undefined?$(this).find("resource").find("description").html().split('"')[1]:"")]]  ,1);	  	
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

	trimArray(Project.Info.LOM);
}

/** 
 * This function is responsible for applicate a trim to xml values 
 */
function trimArray(data){
	if (!(typeof data == undefined || data ===null)){
    	var listaclaves = Object.keys(data);
    	listaclaves.forEach(function(e){
    		if (typeof(data[e]) === 'string'){
    			data[e]=data[e].trim()
    		}
    		else{
    			trimArray(data[e]);
    		}
    	})
    }	
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

	if(date != undefined){
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