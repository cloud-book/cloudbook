var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function PEMBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"position" : [200,200], "size":[250,300]};
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
  var dialog = $("<div id='audiodialog'><input id='audiopath' type='file' accept='.mp3,.ogg,.wav' /><button id='action'>Insert</button></div>");
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  this.questions.push({"text": "Option A","answer": "opta","weight": 100,"checked":"checked"});
  var counter = Math.floor(Math.random() * 3) +1;
  for (var i = 0 ; i < counter ; i++){
    this.questions.push({"text": "Option " + i.toString(),"answer": "opt"+ i.toString(),"weight": 0,"checked":""});  
  }
  $("#audiodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

PEMBox.prototype.importHTML = function importHTML(){
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
  var minHeight = $("#" + objectcbo.pemidentifier).get()[0].clientHeight;
  if(minHeight < objectcbo.size[1]){
    minHeight = objectcbo.size[1];
  }
  jquerycbo.css('height',minHeight +"px");
  objectcbo.size[1] = minHeight;
  jquerycbo.resizable("option","minHeight",minHeight);
  var z = jquerycbo.find(".CSSActFieldset");
  z.css('height','100%');
  z.css('width','100%');

};

PEMBox.prototype.editButton = function editButton(e) {
  var that = e.data.that;
  var dialog = PEMBox.super_.prototype.editButton.call(this,e);
  var template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityedit.hbs',{encoding:'utf8'});
  var templatecompiled = application.util.template.compile(template);
  dialog.append(templatecompiled({'description':that.description,'questions':that.questions}));
  var questions = dialog.find("#listquestions");
  var addbutton = dialog.find("#addquestion");
  addbutton.


  dialog.callbacks.push(function(){
    updateQuestions(dialog,that);
  });
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