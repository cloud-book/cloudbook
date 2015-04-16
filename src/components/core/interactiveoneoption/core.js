var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function PEMBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"position" : [200,200], "size":[250,100]};
  objectdata.idtype = metadata['idtype'];
  PEMBox.super_.call(this,objectdata);
}

util.inherits(PEMBox,CBobject);

PEMBox.prototype.editorView = function editorView() {
  var aux = PEMBox.super_.prototype.editorView.call(this);
  var template = '<div id="myprefix_pem_identifier"> \
   <div id="myprefix_pem_identifier_info_aria" class="CSSInfoTextPemPms">Seleccione la respuesta correcta</div> \
   <div style="display: none;" aria-hidden="true"> \
       <div data-info-bottom="myprefix_pem_identifier"> \
       <!-- El interior de este bloque se moverá al final de la actividad --> \
       <p>¡Suerte!</p> \
       </div> \
       <div data-info-ok="myprefix_pem_identifier"> \
           <!-- El interior de este bloque se mostrará cuando se resuelva bien la actividad --> \
           <span class="CSSMsgSuccess">¡CORRECTO!</span> \
       </div> \
       <div data-info-ko="myprefix_pem_identifier"> \
           <!-- El interior de este bloque se mostrará cuando se resuelva mal la actividad --> \
           <span class="CSSMsgFail">¡ERROR!</span> \
       </div> \
       <div data-opt="opta">Answer A</div> \
       <div data-opt="optb">Answer B</div> \
       <div data-opt="optc">Answer C</div> \
       <div data-opt="optd">Answer D</div> \
   </div> \
</div>';
  aux.children('.cbcontainer').append($(template));
  return aux;
};

PEMBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  var dialog = $("<div id='audiodialog'><input id='audiopath' type='file' accept='.mp3,.ogg,.wav' /><button id='action'>Insert</button></div>");
  dialog.dialog({modal:true,close:function(){$(this).remove()}});
  $("#audiodialog button").on('click',function(){controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')});
};

PEMBox.prototype.importHTML = function importHTML(){
  return ['PEM'];
}

PEMBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  PEMBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
  var obj_myprefix_pem_identifier = {
   "id": "myprefix_pem_identifier",
   "type": "single",
   "opt": [
       {
           "text": "Option A",
           "answer": "opta",
           "weight": 100
       },
       {
           "text": "Option B",
           "answer": "optb",
           "weight": 0
       },
       {
           "text": "Option C",
           "answer": "optc",
           "weight": 0
       },
       {
           "text": "Option D",
           "answer": "optd",
           "weight": 0
       }
        ],
   "fieldset": true,
   "legend": "Pregunta con respuestas de elección múltiple",
   "random": true,
   "optsuccess": true,
   "weighting": 100,
   "lighting": 0,
   "icons": "csshexent",
   "storage": "local",
   "storagekey": "jsgeork",
   "showstorage": true,
   "fillfromstorage": true,
   "delstorage": true
  };
  jsGeork.Questions.Question(obj_myprefix_pem_identifier);
};


function updateVideoPath(dialog,that){
    var fs = window.require('fs');
    var fsextra = window.require('fs-extra');
    var path = window.require('path');
    /*
     * get new file path
     */
    var dialogHTMLRaw = dialog.get()[0];
    var result = dialogHTMLRaw.querySelectorAll('#audiopath');
    var originalpath = result[0].value;

    /*
     * Copy file to workspace
     */

    var originalbasename = path.basename(originalpath);
    var finalpath = Project.Info.projectpath +"/rsrc/"+originalbasename;
    while(true){
      try{
        fs.accessSync(finalpath);
        originalbasename = "0"+originalbasename;
        finalpath = Project.Info.projectpath + "/rsrc/"+ originalbasename;
      }
      catch(e){
        break;
      }
    }
    fsextra.copySync(originalpath,finalpath);
    that.audioformat = mime.lookup(finalpath);
    /*
     * update component file
     */
    that.audiopath = originalbasename;
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