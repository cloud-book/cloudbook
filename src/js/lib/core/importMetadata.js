languages = [];
/**
 * @class ImportMetadata
 * This class is created to load metadata data from SCORM file
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
 * This method is responsible for reading metadata content
 * @param  {String} path of the file
 */
ImportMetadata.prototype.loadMetadata =  function loadMetadata(xml)
{
	var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
	var i = 1;
  	
  	$(xml).find("general").each(function(){	
  		$(this).children("identifier").each(function(){
		  	saveDataArrayValues('cat_'+i, [['catalog_'+i, $(this).find("catalog").text()], ['entry_'+i, $(this).find("entry").text()]], 1);
		  	i++;
  		});
  		i = 1;
  		$(this).children("title").each(function(){
  			$(this).text().split("</string>").forEach(function(element){
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
  			$(this).html().split("</string>").forEach(function(element){
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
  			var arrayElements = $(this).html().split("</string>");
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
  			var arrayElements = $(this).html().split("</string>");
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