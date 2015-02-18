var Project = window.Project;  
var $ = require('jquery');
var util = require('util');
var CBobject = require('cbobject');
var metadata = require('./metadata.json');

/**
 * Class textbox 
 * @class TextBox
 * @extends CBObject
 * @param {Object} objectdata 
 * @param {String} objectdata.text Text object
 */

function TextBox(objectdata){
  objectdata = typeof objectdata !== 'undefined' ? objectdata : {"text":"Lorem ipsum", "position" : [200,200]};
  TextBox.super_.call(this,objectdata.position,metadata['namespace']);
  this.text = objectdata.text;
}

util.inherits(TextBox,CBobject);

TextBox.prototype.editorView = function editorView() {
  var aux = TextBox.super_.prototype.editorView.call(this);
  aux.html(this.text);
  aux.addClass('raptor');
  return aux;
};

TextBox.add_callback = CBobject.add_callback + '; $( ".raptor" ).raptor({  \
										plugins:{ \
											insertFile: false, \
											languageMenu: false, \
											clearFormatting: false, \
											textSub: false, \
											textSuper: false, \
											guides: false, \
											floatLeft: false, \
											floatNone: false, \
											floatRight: false, \
											logo: false, \
											dockToElement: false, \
											dockToScreen: false, \
											snippetMenu: false, \
											specialCharacters: false, \
											embed: false, \
											classMenu: false, \
											statistics: false \
											} \
										});';
/*
function add (){
  return new TextBoxEditor();
}

function restore (objectdata){
  return new TextBoxEditor(objectdata);
}

exports.add = add;
exports.restore = restore;
*/
module.exports = TextBox;
