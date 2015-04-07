/**
 * @class DialogMetadata
 * @classdesc This class is responsible for creating elements of the Metadata Dialog. 
 * It loads component data from JSON file
 */
function DialogMetadata(){

    var CBDialog = application.dialog.getInstance();

    var fs = require('fs');
    var data = JSON.parse(fs.readFileSync('js/lib/gui/dialogMetadataGUIElements.json', 'utf8'));

    var dialog = CBDialog.createDiv("dialog");
    dialog.append(CBDialog.createList([["#dublincore", CBI18n.gettext("Dublin Core")],["#accordion", CBI18n.gettext("LOM-ES")]]));
    var dialogDublin = CBDialog.createDiv("dublincore").append(CBDialog.createFieldsetWithElements(CBI18n.gettext("Content"), data[0])).append(CBDialog.createFieldsetWithElements(CBI18n.gettext("Intellectual property"), data[1]))
    .append(CBDialog.createFieldsetWithElements(CBI18n.gettext("Instantiation"), data[2]));

    var dialogLOM = CBDialog.createDiv("accordion").append(CBDialog.createHeader(CBI18n.gettext("General"))).append(CBDialog.createDiv("general")
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Identifier"), "cat_1", data[3])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Title"), "tit_1", data[4]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Language"), "idiom_1", data[5])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Description"), "descGeneral_1", data[6]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Keyword"), "keywordGeneral_1", data[7])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Coverage"), "coverage_1", data[8]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Structure"), "structureGeneral_1", data[9])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Aggregation Level"), "aggregationLevel_1", data[10])))

    .append(CBDialog.createHeader(CBI18n.gettext("Life cycle"))).append(CBDialog.createDiv("lifecycle").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Version"), "versionlifecycle_1", data[11]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Status"), "statusLifeCycle_1", data[12])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Contribution"), "contrLyfeCycle_1", data[13])))

    .append(CBDialog.createHeader(CBI18n.gettext("Meta-Metadata"))).append(CBDialog.createDiv("metametadata").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Identifier"), "catMetadata_1", data[14]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Metadata Schema"), "schemaMetametadata_1", data[15])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Language"), "langMetametadata_1", data[16]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Contribution"), "contrMetametadata_1", data[17])))

    .append(CBDialog.createHeader(CBI18n.gettext("Technical"))).append(CBDialog.createDiv("technical").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Format"), "formatTechnical_1", data[18]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Size"), "sizeTechnical_1", data[19])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Location"), "locationTechnical_1", data[20]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Requirements"), "requirementsTechnical_1", data[21])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Installation Remarks"), "installRemTech_1", data[22]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Other Platform Requirements"), "requirementsRemTech_1", data[23])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Duration"), "durationDurTech_1", data[24])))

    .append(CBDialog.createHeader(CBI18n.gettext("Educational"))).append(CBDialog.createDiv("educationaluse").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Interactivity type"), "intTypeEducational_1", data[25]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Learning Resource Type"), "resourceTypeEducational_1", data[26])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Interactivity level"), "levelInterEducational_1", data[27]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Semantic density"), "levelDensEducational_1", data[28])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Intended end user role"), "endUserEducational_1", data[29]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Context"), "contextEducational_1", data[30])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Typical age range"), "rangeAgeEducational_1", data[31]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Difficulty"), "difficultyEducational_1", data[32])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Typical learning time"), "learningTimeEducational_1",data[33]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Description"), "descEducationUse_1", data[34])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Language"), "languageEducationalUse_1", data[35]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Cognitive process"), "processcogEducational_1", data[36])))

     .append(CBDialog.createHeader(CBI18n.gettext("Rights"))).append(CBDialog.createDiv("rights").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Cost"), "costRights_1", data[37]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Copyright and other restrictions"), "copyrightRights_1", data[38])).append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Description"), "descRights_1", data[39]))
      .append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Access"), "accessRights_1", data[40])))

     .append(CBDialog.createHeader(CBI18n.gettext("Relation"))).append(CBDialog.createDiv("relation").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Relations"), "relationRelations_1", data[41])))
     .append(CBDialog.createHeader(CBI18n.gettext("Annotation"))).append(CBDialog.createDiv("annotation").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Annotations"), "annotationAnnotations_1", data[42])))
    .append(CBDialog.createHeader(CBI18n.gettext("Classification"))).append(CBDialog.createDiv("classification").append(CBDialog.createFieldsetWithDivElements(CBI18n.gettext("Classifications"), "classificationsClassification_1", data[43])));

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
      close: function(event,ui){
        $("#dialog").remove();
      },
      buttons: [{
        text:CBI18n.gettext("Save"),
        click: function (){
          saveData();
          $("#dialog").remove();
        }},
        {text:CBI18n.gettext("Cancel"),
        click: function(){
          $("#dialog").remove();
        }
      }]
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
            var cont2 = $('[id^=' + element1[0].split("_")[0] + "_" + i + "_").length;
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


