var Project = window.Project;
var util = require('util');
var CBobject = CBUtil.req("js/lib/core/components/cbobject.js");
var metadata = require( "./"+__module_path__ + 'metadata.json');

function FillGapBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"position" : [200,200], "size":[300,300]};
  objectdata.idtype = metadata['idtype'];
  FillGapBox.super_.call(this,objectdata);
  this.fgpidentifier = typeof objectdata.fgpidentifier !== 'undefined' ? objectdata.fgpidentifier : "pem_" + this.uniqueid ; 
  this.description = typeof objectdata.description !== 'undefined' ? objectdata.description : CBI18n.gettext("Description of your activity") ; 
  this.activitytext = typeof objectdata.activitytext !== 'undefined' ? objectdata.activitytext : 'En un lugar de la <span data-gap-fill="gap">Mancha</span>, de cuyo nombre no quiero acordarme,...' ;
  this.gaps = typeof objectdata.gaps !== 'undefined' ? objectdata.gaps : {
        "gap": {
           "words": [],
           "showwords": false,
           "casesensitive": false,
           "placeholder": "?",
           "autocomplete": "",
           "adjustgaps": "",
           "aria-label": "default",
           "weight": 100
       }
     };
}

util.inherits(FillGapBox,CBobject);

FillGapBox.prototype.editorView = function editorView() {
  var aux = FillGapBox.super_.prototype.editorView.call(this);
  var fs = require('fs');
  var template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityview.hbs',{encoding:'utf8'});
  var templatecompiled = application.util.template.compile(template);
  options={"identifier":this.fgpidentifier,"description":this.description,activitytext:this.activitytext};
  aux.children('.cbcontainer').append($(templatecompiled(options)));
  aux.addClass('FillGapBox');
  return aux;
};

FillGapBox.prototype.htmlView = function htmlView() {
  var aux = FillGapBox.super_.prototype.htmlView.call(this);
  var fs = require('fs');
  var template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityview.hbs',{encoding:'utf8'});
  var templatecompiled = application.util.template.compile(template);
  options={"identifier":this.fgpidentifier,"description":this.description,activitytext:this.activitytext};
  aux.children('.cbcontainer').append($(templatecompiled(options)));
  aux.addClass('FillGapBox');
  return aux;
}

FillGapBox.prototype.pdfView = function pdfView() {
  return this.htmlView();
}

FillGapBox.prototype.epubView = function epubView() {
  var aux = FillGapBox.super_.prototype.htmlView.call(this);
  var fs = require('fs');
  var template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityepub.hbs',{encoding:'utf8'});
  var templatecompiled = application.util.template.compile(template);
  options={"description":this.description,"activitytext":this.activitytext.replace(/data-gap-fill="gap"/g,'style="visibility:hidden"')};
  aux.children('.cbcontainer').append($(templatecompiled(options)));
  aux.css("height","auto");
  aux.css("weight","auto");
  //aux.addClass('FillGapBox');
  return aux;
}

FillGapBox.prototype.clickButton = function clickButton(controllerClass) {
  var that = this;
  controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);
  // var dialog = $("<div id='pemdialog'><input id='numberquestions' type='number' min='2' max='10' value='4'/><button id='action'>Insert</button></div>");
  // dialog.dialog({modal:true,close:function(){$(this).remove()}});
  
  // $("#pemdialog button").on('click',function(){
  //   var counter = $("#numberquestions").val();
  //   that.questions.push({"text": "Correct option","answer": "opt0","select": true,"checked":"checked"});
  //   for (var i = 1 ; i < counter ; i++){
  //     that.questions.push({"text": "Option " + i.toString(),"answer": "opt"+ i.toString(),"select": false,"checked":""});  
  //   }
  //   controllerClass.addCBObjectIntoSelectedSection(that.editorView(),that);dialog.dialog('close')}
  //   );
};

FillGapBox.prototype.HTMLtags = function HTMLtags(){
  var tagTypes = ['FGP'];
  var score = 0;
  return score;

}

FillGapBox.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
  FillGapBox.super_.prototype.triggerAddEditorView.call(this,jquerycbo,objectcbo);
  var obj_myprefix_fgp_identifier = {
   "id": this.fgpidentifier,
   "type": "gapfill",
   "gaps": this.gaps,
   "attempts": 3,
   "fieldset": true,
   "legend": "",
   "button": "",
   "hint": true,
   "btnhint": "",
   "weighting": 100,
   "lighting": 0,
   "icons": "csshexent",
   "storagekey": "jsgeork",
   "showstorage": false,
   "fillfromstorage": true,
   "delstorage": true
  };
  jsGeork.Questions.Question(obj_myprefix_fgp_identifier);
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
  jquerycbo[0].addEventListener('input',function(){jquerycbo.height(jquerycbo.outerHeight(true));});
};


FillGapBox.prototype.triggerHTMLView = function triggerHTMLView() {
  return '$(document).ready(function(){\
  var obj_myprefix_fgp_identifier = {\
   "id": "'+this.fgpidentifier+'",\
   "type": "gapfill",\
   "gaps": '+JSON.stringify(this.gaps)+',\
   "attempts": 3,\
   "fieldset": true,\
   "legend": "",\
   "button": "",\
   "hint": true,\
   "btnhint": "",\
   "weighting": 100,\
   "lighting": 0,\
   "icons": "csshexent",\
   "storage": "local",\
   "storagekey": "jsgeork",\
   "showstorage": true,\
   "fillfromstorage": true,\
   "delstorage": true\
  };\
  jsGeork.Questions.Question(obj_myprefix_fgp_identifier);\
  });';
};


FillGapBox.prototype.editButton = function editButton(e) {
  var that = e.data.that;
  var dialog = FillGapBox.super_.prototype.editButton.call(this,e);
  var template = application.util.template.getTemplate(__module_path__+'/toolbar.hbs');  
  var toolbar = template({identifier:"#activitytext"});
  template = fs.readFileSync("./"+__module_path__ + 'rsrc/templates/activityedit.hbs',{encoding:'utf8'});
  dialog.dialog('option','width',500);
  var templatecompiled = application.util.template.compile(template);
  dialog.children(".content").append(templatecompiled({description:that.description,toolbar:toolbar,activitytext:that.activitytext}));
  dialog.find("#activitytext").wysiwyg({extracommandhandler:that.extracommandhandler});
  dialog.callbacks.push(function(){updateText(dialog,that);});
}

FillGapBox.prototype.extracommandhandler = function(command) {
  if(command === "fgp"){
    debugger;
    var range = window.getSelection().getRangeAt(0);
    var node;
    var start = range.startContainer;
    var end = range.endContainer;
    var found = false;
    if(start === end ){
      if( start.hasAttribute && start.hasAttribute("data-gap-fill")){
        var aux = document.createElement('span');
        aux.innerHTML = start.innerHTML;
        start.parentNode.replaceChild(aux,start);
        found = true;
      }
    }
    else{
      node = start ;
      while(node && node != end){
        if( node.hasAttribute && node.hasAttribute("data-gap-fill")){
          var aux = document.createElement('span');
          aux.innerHTML = node.innerHTML;
          node.parentNode.replaceChild(aux,node);
          found = true;
          node = nextNode(aux);
        }
        else{
          node = nextNode(node);
        }
      }
    }
    if(!found){
      var content = range.extractContents();
      var span = document.createElement('SPAN');
      span.appendChild(content);
      span.setAttribute('data-gap-fill','gap');
      range.insertNode(span);
    }
  }
};

function updateText(dialog,objectcbo){
  objectcbo.activitytext = dialog.find("#activitytext").html();
  objectcbo.description = dialog.find("#description").val();
}

function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild;
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode;
        }
        if (!node) {
            return null;
        }
        return node.nextSibling;
    }
}


module.exports = FillGapBox;
//@ sourceURL=gapinthefills.js
