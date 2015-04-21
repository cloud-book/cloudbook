var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function PEMBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"position" : [200,200], "size":[300,0]};
  objectdata.idtype = metadata['idtype'];
  PEMBox.super_.call(this,objectdata);
  this.pemidentifier = typeof objectdata.pemidentifier !== 'undefined' ? objectdata.pemidentifier : "pem_" + this.uniqueid ; 
  this.description = typeof objectdata.description !== 'undefined' ? objectdata.description : "Description of your activity" ; 
  this.questions = typeof objectdata.questions !== 'undefined' ? objectdata.questions : [] ;
}

util.inherits(PEMBox,CBobject);

PEMBox.prototype.editorView = function editorView() {
  var aux = PEMBox.super_.prototype.editorView.call(this);
  var fs = require('fs');
  var template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityview.hbs',{encoding:'utf8'});
  var templatecompiled = application.util.template.compile(template);
  options={"identifier":this.pemidentifier,"description":this.description,questions:this.questions};
  aux.children('.cbcontainer').append($(templatecompiled(options)));
  return aux;
};

PEMBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='pemdialog'><input id='numberquestions' type='number' min='2' max='10' value='4'/><button id='action'>Insert</button></div>");
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  
  $("#pemdialog button").on('click',function(){
    var counter = $("#numberquestions").val();
    that.questions.push({"text": "Correct option","answer": "opt0","weight": 100,"checked":"checked"});
    for (var i = 1 ; i < counter ; i++){
      that.questions.push({"text": "Option " + i.toString(),"answer": "opt"+ i.toString(),"weight": 0,"checked":""});  
    }
    controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')}
    );
};

PEMBox.prototype.HTMLtags = function HTMLtags(){
  return ['PEM'];
}

PEMBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  PEMBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
  var obj_myprefix_pem_identifier = {
   "id": this.pemidentifier,
   "type": "single",
   "opt": this.questions,
   "fieldset": true,
   "legend": "",
   "random": true,
   "optsuccess": true,
   "weighting": 100,
   "lighting": 0,
   "icons": "csshexent",
   "storage": "local",
   "storagekey": "jsgeork",
   "showstorage": false,
   "fillfromstorage": false,
   "delstorage": false
  };
  jsGeork.Questions.Question(obj_myprefix_pem_identifier);
  jquerycbo.on("resize",function(event,ui){
    var counter = 0;
    var listelements = jquerycbo.find('fieldset').children().each(function(index,element){
      counter += $(element).outerHeight(true);
    });
    ui.size.height = counter;
  });
  var z = jquerycbo.find(".CSSActFieldset");  
  z.css('height','100%');
  z.css('width','100%');
  if(objectcbo.size[1] === 0){
    var counter = 0;
    var listelements = jquerycbo.find('fieldset').children().each(function(index,element){
        counter += $(element).outerHeight(true);
      });
    jquerycbo.css('height',counter+"px");
    objectcbo.size[1] = counter;
  }
};

PEMBox.prototype.editButton = function editButton(e) {
  var that = e.data.that;
  var dialog = PEMBox.super_.prototype.editButton.call(this,e);
  var template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityedit.hbs',{encoding:'utf8'});
  var templatecompiled = application.util.template.compile(template);
  dialog.append(templatecompiled({'description':that.description,'questions':that.questions}));
  var questions = dialog.find("#listquestions");
  var addbutton = dialog.find("#addquestion");
  var questiontemplate =  '<div data-pemidentifier="{{identifier}}"><input type="radio" name="question" value="" {{this.checked}}><textarea>{{this.text}}</textarea><button type="button" onclick="deleteQuestion(this)">{{gettext "Delete"}}</button></div>';
  var questiontemplatecompiled = application.util.template.compile(questiontemplate);
  addbutton.click(function(event) {
    var last = $("#listquestions").children().last();
    var identifier = last.attr("data-pemidentifier");
    identifier = identifier.replace(/.$/,String.fromCharCode(identifier.charCodeAt(identifier.length - 1 ) + 1));
    last.after(questiontemplatecompiled({identifier:identifier}));
  });

  dialog.callbacks.push(function(){updateQuestions(dialog,that);});
}


function updateQuestions(dialog,objectcbo){
  var questions = dialog.find("#listquestions").children();
  var description = dialog.find("#activitydescription").val();
  var newlist = [];
  for(var i = 0; i < questions.length; i++){
    var tempquestion = {"text": "Option A","answer": "opta","weight": 0};
    tempquestion['answer'] = $(questions[i]).attr('data-pemidentifier');
    tempquestion['weight'] = $(questions[i]).find('input[type="radio"]').prop("checked") ? 100 : 0;
    tempquestion['checked'] = $(questions[i]).find('input[type="radio"]').prop("checked") ? "checked" : "";
    tempquestion['text'] = $(questions[i]).find('textarea').val();
    newlist.push(tempquestion);
  }
  objectcbo.questions = newlist;
  objectcbo.description = description;
}

//PEMBox.triggerAddEditorView =  CBobject.triggerAddEditorView;
/*
exports.add = function add() {
  return new PEMBox();
};

exports.restore = function restore(objectdata) {
  return new PEMBox(objectdata);
};
*/

module.exports = PEMBox;