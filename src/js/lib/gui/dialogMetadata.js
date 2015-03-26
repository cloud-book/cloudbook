/**
 * @class DialogMetadata
 * @classdesc This class is responsible for creating elements of the Metadata Dialog. 
 * It loads component data from JSON file
 */
function DialogMetadata(){

    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('js/lib/gui/dialogMetadataGUIElements.json', 'utf8'));

    var dialog = CBDialog.createDiv("dialog");
    dialog.append(CBDialog.createList([["#dublincore", "Dublin Core"],["#accordion", "LOM-ES"]]));
    var dialogDublin = CBDialog.createDiv("dublincore").append(CBDialog.createFieldsetWithElements("Content", data[0])).append(CBDialog.createFieldsetWithElements("Intellectual property", data[1]))
    .append(CBDialog.createFieldsetWithElements("Instantiation", data[2]));

    var dialogLOM = CBDialog.createDiv("accordion").append(CBDialog.createHeader("General")).append(CBDialog.createDiv("general")
      .append(CBDialog.createFieldsetWithDivElements("Identifier", "cat_1", data[3])).append(CBDialog.createFieldsetWithDivElements("Title", "tit_1", data[4]))
      .append(CBDialog.createFieldsetWithDivElements("Language", "idiom_1", data[5])).append(CBDialog.createFieldsetWithDivElements("Description", "descGeneral_1", data[6]))
      .append(CBDialog.createFieldsetWithDivElements("Keyword", "keywordGeneral_1", data[7])).append(CBDialog.createFieldsetWithDivElements("Coverage", "coverage_1", data[8]))
      .append(CBDialog.createFieldsetWithDivElements("Structure", "structureGeneral_1", data[9])).append(CBDialog.createFieldsetWithDivElements("Aggregation Level", "aggregationLevel_1", data[10])))

    .append(CBDialog.createHeader("Life cycle")).append(CBDialog.createDiv("lifecycle").append(CBDialog.createFieldsetWithDivElements("Version", "versionlifecycle_1", data[11]))
      .append(CBDialog.createFieldsetWithDivElements("Status", "statusLifeCycle_1", data[12])).append(CBDialog.createFieldsetWithDivElements("Contribution", "contrLyfeCycle_1", data[13])))

    .append(CBDialog.createHeader("Meta-Metadata")).append(CBDialog.createDiv("metametadata").append(CBDialog.createFieldsetWithDivElements("Identifier", "catMetadata_1", data[14]))
      .append(CBDialog.createFieldsetWithDivElements("Metadata Schema", "schemaMetametadata_1", data[15])).append(CBDialog.createFieldsetWithDivElements("Language", "langMetametadata_1", data[16]))
      .append(CBDialog.createFieldsetWithDivElements("Contribution", "contrMetametadata_1", data[17])))

    .append(CBDialog.createHeader("Technical")).append(CBDialog.createDiv("technical").append(CBDialog.createFieldsetWithDivElements("Format", "formatTechnical_1", data[18]))
      .append(CBDialog.createFieldsetWithDivElements("Size", "sizeTechnical_1", data[19])).append(CBDialog.createFieldsetWithDivElements("Location", "locationTechnical_1", data[20]))
      .append(CBDialog.createFieldsetWithDivElements("Requirements", "requirementsTechnical_1", data[21])).append(CBDialog.createFieldsetWithDivElements("Installation Remarks", "installRemTech_1", data[22]))
      .append(CBDialog.createFieldsetWithDivElements("Other Platform Requirements", "requirementsRemTech_1", data[23])).append(CBDialog.createFieldsetWithDivElements("Duration", "durationDurTech_1", data[24])))

    .append(CBDialog.createHeader("Educational")).append(CBDialog.createDiv("educationaluse").append(CBDialog.createFieldsetWithDivElements("Interactivity type", "intTypeEducational_1", data[25]))
      .append(CBDialog.createFieldsetWithDivElements("Learning Resource Type", "resourceTypeEducational_1", data[26])).append(CBDialog.createFieldsetWithDivElements("Interactivity level", "levelInterEducational_1", data[27]))
      .append(CBDialog.createFieldsetWithDivElements("Semantic density", "levelDensEducational_1", data[28])).append(CBDialog.createFieldsetWithDivElements("Intended end user role", "endUserEducational_1", data[29]))
      .append(CBDialog.createFieldsetWithDivElements("Context", "contextEducational_1", data[30])).append(CBDialog.createFieldsetWithDivElements("Typical age range", "rangeAgeEducational_1", data[31]))
      .append(CBDialog.createFieldsetWithDivElements("Difficulty", "difficultyEducational_1", data[32])).append(CBDialog.createFieldsetWithDivElements("Typical learning time", "learningTimeEducational_1",data[33]))
      .append(CBDialog.createFieldsetWithDivElements("Description", "descEducationUse_1", data[34])).append(CBDialog.createFieldsetWithDivElements("Language", "languageEducationalUse_1", data[35]))
      .append(CBDialog.createFieldsetWithDivElements("Cognitive process", "processcogEducational_1", data[36])))

     .append(CBDialog.createHeader("Rights")).append(CBDialog.createDiv("rights").append(CBDialog.createFieldsetWithDivElements("Cost", "costRights_1", data[37]))
      .append(CBDialog.createFieldsetWithDivElements("Copyright and other restrictions", "copyrightRights_1", data[38])).append(CBDialog.createFieldsetWithDivElements("Description", "descRights_1", data[39]))
      .append(CBDialog.createFieldsetWithDivElements("Access", "accessRights_1", data[40])))

     .append(CBDialog.createHeader("Relation")).append(CBDialog.createDiv("relation").append(CBDialog.createFieldsetWithDivElements("Relations", "relationRelations_1", data[41])))
     .append(CBDialog.createHeader("Annotation")).append(CBDialog.createDiv("annotation").append(CBDialog.createFieldsetWithDivElements("Annotations", "annotationAnnotations_1", data[42])))
    .append(CBDialog.createHeader("Classification")).append(CBDialog.createDiv("classification").append(CBDialog.createFieldsetWithDivElements("Classifications", "classificationsClassification_1", data[43])));

    dialogLOM.accordion({
      heightStyle: "content",
      active: "false",
      collapsible: true,
    });

    dialog.append(dialogDublin)
    .append(dialogLOM);

    $("#format").selectmenu();
    $('body').append(dialog);
    $("#dialog").tabs({show: { effect: "fadeIn", duration: 500 }});

  }

/**
 * This method is responsible for showing this dialog and load data into it
 */
DialogMetadata.prototype.showDialog = function showDialog(){
    
    $("#dialog").dialog({
      autoOpen: true,
      title:"Metadata",
      modal: true,
      width:900,
      height:720,
      resizable:false,
      hide:{effect:"fadeOut", duration:500},
      show:{effect:"fadeIn", duration:500},
      buttons: {
        "Save": function (){
          saveData();
          $("#dialog").dialog('destroy').remove()
        },
        "Cancel": function(){
          $("#dialog").dialog('destroy').remove()
        }
      }
    });

    loadData();
}


 /**
 * This method returns the number of subelements of one element
 * @param  {String[]} array with subelements
 * @numElements {String} Number of subelements
 */

function getNumElements(element){
  var numElements = 0;
  if(element[0].indexOf("DIV") != -1)
  {
    $.each(Project.Info.LOM, function (intValue, currentelement){
      for (var key in Project.Info.LOM[intValue]) {
        if(key.indexOf(element[0]) >=0){ numElements++;}
      };
    });
  }
  else
  {
    $.each(Project.Info.LOM, function (intValue, currentelement){
      if(intValue.indexOf(element[0]) >=0){ numElements++;}
    });
  }
  return numElements;
}

/**
 * This method is responsible for loading data into Dialog and control values of dependant comboboxes
 */
function loadData(){

  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('js/lib/gui/dialogMetadataGUIElements.json', 'utf8'));

  data[44].forEach(function(element){
      $("#"+element).val(Project.Info.DublinCore[element]);
  });
  data[45].forEach(function(element){
    if(element.length > 1)
    {
        for(i=1;i<=getNumElements(element);i++)
        {
          if(getNumElements(element) > 1 && i < getNumElements(element)) 
            $("#"+element[2] + i).click(); 
          element[1].forEach(function(element1){
            if(element1[0].length > 1)
            {
                element1[0] = element1[0].replace('1',i);
                  for(j=1;j<=getNumElements(element1);j++)
                  {
                      if(getNumElements(element1) > 1 && j < getNumElements(element1))
                       $("#"+element1[2].split("_")[0] + "_" + i + "_" + j).click(); 
                      element1[1].forEach(function(element2)
                      {
                          $("#" + element2.split("_")[0] + "_" + i+ "_" +j).val(Project.Info.LOM[element[0]+i][element1[0].split("_")[0] + "_" + i + "_" +j][element2.split("_")[0] + "_" + i + "_" +j]);  
                      });
                   }
            }
            else
              $("#" + element1+i).val(Project.Info.LOM[element[0] + i][element1+i]);  
          });  
        }    
    }
    else
    {
      $("#"+element).val(Project.Info.LOM[element]);
    }
  });

  $.each(Project.Info.LOM, function (intValue, currentelement){
    if(intValue.indexOf('requirementsTechnical_') >=0){ 
        var index = intValue.split("_")[1]
        changeNames($('#typeTechnicalReq_'+index), 'nameTechnicalReq_'+index, Project.Info.LOM['requirementsTechnical_'+index]['nameTechnicalReq_'+index]);      
    }
  });
}

/**
 * This method is responsible for saving data from Dialog.
 */
function saveData(){

  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('js/lib/gui/dialogMetadataGUIElements.json', 'utf8'));

  data[44].forEach(function(element){ 
    Project.Info.DublinCore[element] = $("#"+element).val();
  });

  data[45].forEach(function(element){    
    if(element.length > 1)
    {
      var cont = $('[id^=' + element[0]).length;
      for(i=1; i<=cont;i++)
      {
        Project.Info.LOM[element[0]+i] = {};
        element[1].forEach(function(element1){
          if(element1[0].length > 1)
          {
            var cont2 = $('[id^=' + element1[0].split("_")[0] + "_" + element1[0].split("_")[1] + "_").length;
            for(j=1; j<=cont2;j++)
            {
              Project.Info.LOM[element[0]+i][element1[0].split("_")[0] + "_" + i + "_" +j] = {};
              element1[1].forEach(function(element2){
                Project.Info.LOM[element[0]+i][element1[0].split("_")[0] + "_" + i + "_" +j][element2.split("_")[0] + "_" + i + "_" +j] =  $("#"+element2.split("_")[0] + "_" + i+ "_" +j).val();
              });
            };
          }
          else{
            Project.Info.LOM[element[0]+i][element1+i] =  $("#"+element1+i).val();
          }
        });
      }
    }
    else{
      Project.Info.LOM[element] = $("#"+element).val() == null? "":$("#"+element).val();
    }
  });
}

/**
 * This method is responsible for changing values of the Name type depending on the Technical type
 * @param  {Object} element with value changed
 */
function changeNames(element){

  var type = $(element).val();
  var suffix = $(element).attr("id").split("_")[1];
  var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");

  var selectElement = $("#nameTechnicalReq_" + suffix);
  selectElement.empty();

  if(type != "")
  {
    if(type == dictionary['TechnicalType'][0]){
      dictionary['NamesOS'].forEach(function(element){
        selectElement.append(new Option(element));
      })
    }
    else
    {
      dictionary['Browser'].forEach(function(element){
        selectElement.append(new Option(element));
      })
    }

  };

  if(arguments[1] != null)
  {
    $("#"+arguments[1]).val(arguments[2]);
  }
}


