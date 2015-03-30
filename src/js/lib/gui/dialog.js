var languages = [];
/**
 * @class Dialog
 * @classdesc This class is responsible for creating elements of a Dialog and loads languages from JSON. 
 */
function Dialog(){
  var fs = require('fs');
  var data = JSON.parse(fs.readFileSync('js/lib/gui/languages.json', 'utf8'));
  data.forEach(function(languageelement){
       languages.push(languageelement.name);
  });
}
/**
 * This method is responsible for creating an Input element
 * @param  {String} name of the component
 * @param  {String} name of the style (CSS) of the component
 * @inputElement {Object} Input element with parameters passed
 */
Dialog.prototype.createInput = function createInput(name, style){
  var inputElement = $(window.document.createElement('input'))
    .attr("type","text")
    .attr("name", name)
    .attr("id", name)
    .addClass("text ui-widget-content ui-corner-all")
    .addClass(style)
    .css("font-size","0.8em");

    return inputElement;
}
/**
 * This method is responsible for creating an Span element 
 * @param  {String} text of the component
 * @param  {String} name of the style (CSS) of the component
 * @spanElement {Object} Span element with parameters passed
 */
Dialog.prototype.createText = function createText(text, style){
  var spanElement = $(window.document.createElement('span'))
      .text(CBI18n.gettext(text))
      .addClass(style);

  return spanElement;
}
/**
 * This method is responsible for creating an Span element. This function is
 * similar to previous but this includes the name of the component
 * @param  {String} text of the component
 * @param  {String} name of the component
 * @param  {String} name of the style (CSS) of the component
 * @spanElement {Object} Span element with parameters passed
 */
Dialog.prototype.createSpan = function createSpan(text, name, style){
  var spanElement = $(window.document.createElement('span'))
      .text(CBI18n.gettext(text))
      .attr("id", name)
      .attr("name", name)
      .addClass(style);

  return spanElement;
}
/**
 * This method is responsible for creating a Legend element
 * @param  {String} text of the component
 * @legendElement {Object} Input element with parameters passed
 */
Dialog.prototype.createLegend = function createLegend(text){
   var legendElement = $(window.document.createElement('legend'))
    .text(CBI18n.gettext(text));
    return legendElement;

}
/**
 * This method allows to add a row to an element. It clons the row renaming its children
 * and adds the row to the element
 * @param  {String} Id of the element
 */
function addRow(id){
  var num = parseInt(id.split("_")[2]);
  var actual = num + 1;

  $clon = $("#" + id).clone();
  $clon.attr("id",id.split("_")[0] + "_" + id.split("_")[1] + "_" + actual);
  $clon.attr("name",id.split("_")[0] + "_" + id.split("_")[1] + "_" + actual);
  $clon.val("");
  $clon.children().each(function(){
    if($(this).text() != "<br>")
    {
      $(this).attr("id", $(this).attr("id").split("_")[0] + "_" + id.split("_")[1] + "_" + actual);
      $(this).attr("name", $(this).attr("name").split("_")[0] + "_" + id.split("_")[1] + "_" + actual);
      $(this).val("");
      if($(this).prop('tagName') == "BUTTON")
      {
       $(this).attr("onclick", $(this).attr("onclick").split("_")[0] + "_" + id.split("_")[1] + "_" + actual + "')"); 
       $(this).removeAttr("disabled");
      }
    }
    })
    $("#" + id).parent().append($clon);
}
/**
 * This method allows to add a row to an element. This function is similar to previous but it can work with div elements
 * @param  {String} Id of the element
 */
function addRowDiv(id){

  var num = parseInt(id.split("_")[1]);
  var actual = $("div[id^="+id.split("_")[0] + "_]").length + 1;

  $clon = $("#" + id.split("_")[0] + "_" + num).clone();
  $clon.attr("id",id.split("_")[0] + "_" + actual);
  $clon.attr("name",id.split("_")[0] + "_" + actual);
  $clon.val("");
  $clon.children().each(function(){
    if($(this).attr("name") != null)
    {
    if($(this).prop('tagName') == "DIV"){
      $(this).attr("id", $(this).attr("id").split("_")[0] + "_" + actual + "_" + $(this).attr("id").split("_")[2]);
      $(this).attr("name", $(this).attr("name").split("_")[0] + "_" + actual + "_" + $(this).attr("id").split("_")[2]);
      $(this).val("");
      $(this).children().each(function(){
        if($(this).text() != "<br>")
        {
          $(this).attr("id", $(this).attr("id").split("_")[0] + "_" + actual + "_" + $(this).attr("id").split("_")[2]);
          $(this).attr("name", $(this).attr("name").split("_")[0] + "_" + actual + "_" + $(this).attr("id").split("_")[2]);
          $(this).val("");
         if($(this).prop('tagName') == "BUTTON")
          {
            var nombre = $(this).attr("onclick").split("_")[0].replace("Div","");
           $(this).attr("onclick", nombre + "_" + actual + "_" + $(this).attr("id").split("_")[2] + "')"); 
          }
        }
      })
    }
    else
    {
      $(this).attr("id", $(this).attr("id").split("_")[0] + "_" + actual);
      $(this).attr("name", $(this).attr("name").split("_")[0] + "_" + actual );
      $(this).val("");
      if($(this).prop('tagName') == "BUTTON")
      {
       $(this).attr("onclick", $(this).attr("onclick").split("_")[0] + "_" + actual + "')"); 
       $(this).removeAttr("disabled");
      }
    }
   }
  })
  $("#" + id).parent().append($clon);
}
/**
 * This method is responsible for creating an add button element
 * @param  {String} Id of the element
 * @param  {String} name of the icon
 * @param  {String} Id of the parent of the element
 * @buttonElement {Object} Button element with parameters passed
 */
Dialog.prototype.createAddButton = function createAddButton(id, icon, idParent){
  var buttonElement = $(window.document.createElement('button'))
      .attr("id",id)
      .attr("name",id)
      .text("+")
      .addClass(icon)
      .addClass("button")
      .addClass("ui-corner-all")
      .attr("onclick","addRowDiv('" + idParent +"')");
  return buttonElement;
}
/**
 * This method is responsible for creating an add button element. This function is similar to previous but it can add div elements
 * @param  {String} Id of the element
 * @param  {String} name of the icon
 * @param  {String} Id of the parent of the element
 * @buttonElement {Object} Button element with parameters passed
 */
Dialog.prototype.createAddButtonDiv = function createAddButtonDiv(id, icon, idParent){
  var buttonElement = $(window.document.createElement('button'))
      .attr("id",id)
      .attr("name",id)
      .text("+")
      .addClass(icon)
      .addClass("button")
      .addClass("ui-corner-all")
      .attr("onclick","addRow('" + idParent +"')");
  return buttonElement;
}
/**
 * This method is responsible for creating a select element with language values 
 * @param  {String} Id of the element
 * @param  {String} name of the style (CSS) of the component
 * @selectLanguageElement {Object} Select element with parameters passed
 */
Dialog.prototype.createSelectLanguages = function createSelectLanguages(id, style)
{
  var selectLanguageElement = $(window.document.createElement('select'))
    .attr("name", id)
    .attr("id", id)
    .addClass(style)
    .addClass("ui-corner-all");

    languages.forEach(function(element){
      if(!$.isArray(element))
        selectLanguageElement.append(new Option(element));
    });
    return selectLanguageElement;
}
/**
 * This method is responsible for creating a select element with values 
 * @param  {String} Id of the element
 * @param  {String[]} List of values
 * @param  {String} name of the style (CSS) of the component
 * @selectElement {Object} Select element with parameters passed
 */
Dialog.prototype.createSelect = function createSelect(id, values, style)
{
  var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");

  var selectElement = $(window.document.createElement('select'))
    .attr("name", id)
    .attr("id", id)
    .addClass("ui-corner-all")
    .addClass(style);

    dictionary[values].forEach(function(element){
      selectElement.append(new Option(element));
    })
    return selectElement;
}
/**
 * This method is responsible for creating a select element with values and a dependency
 * @param  {String} Id of the element
 * @param  {String[]} List of values
 * @param  {String} name of the style (CSS) of the component
 * @param  {String} name of the onclick function
 * @selectElement {Object} Select element with parameters passed
 */
Dialog.prototype.createSelectWithDependency = function createSelectWithDependency(id, values, style, onclickFunction)
{
  var dictionary = CBUtil.req("js/lib/gui/dialogMetadataValues.js");
  var selectElement = $(window.document.createElement('select'))
    .attr("name", id)
    .attr("id", id)
    .addClass("ui-corner-all")
    .addClass(style)
    .attr("onclick", onclickFunction);

    dictionary[values].forEach(function(element){
      selectElement.append(new Option(element));
    })
    return selectElement;
}
/**
 * This method allows to delete a row from an element. 
 * @param  {String} element to be removed
 */
function removeRow(element)
{
    $("#" + element).remove();
}
/**
 * This method is responsible for creating a remove button element
 * @param  {String} Id of the element
 * @param  {String} name of the icon
 * @param  {String} Id of the parent of the element
 * @buttonElement {Object} Button element with parameters passed
 */
Dialog.prototype.createDeleteButton = function createDeleteButton(id, icon, parent){
  var buttonElement = $(window.document.createElement('button'))
      .attr("id",id)
      .attr("name",id)
      .text("-")
      .addClass(icon)
      .addClass("ui-corner-all")
      .attr("disabled", "true")
      .attr("onclick", "removeRow('" + parent + "')");

  return buttonElement;
}
/**
 * This method is responsible for creating a date element
 * @param  {String} Id of the element
 * @param  {String} Id of the parent of the element
 * @buttonElement {Object} Button element with parameters passed
 */
Dialog.prototype.createDate = function createDate(id, style)
{
  var dateElement = $(window.document.createElement('input'))
    .attr("type","date")
    .attr("name", id)
    .attr("id", id)
    .addClass(style)
    .addClass("text ui-widget-content ui-corner-all")
    .css("font-size","0.8em");

    return dateElement;
}
/**
 * This method is responsible for creating a div element 
 * @param  {String} Id and name of the element
 * @divElement {Object} Div element with parameters passed
 */
Dialog.prototype.createDiv = function createDiv(id)
{
  var divElement = $(window.document.createElement('div'))
    .attr("name", id)
    .attr("id", id);

    return divElement;
}
/**
 * This method is responsible for creating a fieldset element with a legend
 * @param  {String} text of the element
 * @fieldsetElement {Object} Fieldset element with parameters passed
 */
Dialog.prototype.createFieldset = function createFieldset(legendTitle){

  var that = this;
  var fieldsetElement = $(window.document.createElement('fieldset'))
    .append(that.createLegend(legendTitle));

    return fieldsetElement;
}
/**
 * This method is responsible for creating a fieldset element with legend and children
 * @param  {String} text of the element
 * @param  {Object[]} List of children to be included
 * @fieldSet {Object} Fieldset element with children
 */
Dialog.prototype.createFieldsetWithElements = function createFieldsetWithElements(legendTitle, elements){

  var that = this;
  var fieldSet = that.createFieldset(legendTitle)
  elements.forEach(function(element){

    var elem = "";
    switch(element[0])
    {
      case "Text": elem = that.createText(element[1], element[2]); break;
      case "Input": elem = that.createInput(element[1], element[2]); break;
      case "Date": elem = that.createDate(element[1], element[2]); break;
      case "SelectLanguage": elem = that.createSelectLanguages(element[1], element[2]); break;
    }

    fieldSet.append(elem);
  });
  return fieldSet;
}
/**
 * This method is responsible for creating a fieldset element with legend, div and children
 * @param  {String} text of the element
 * @param  {String} title of the div
 * @param  {Object[]} List of children to be included
 * @fieldSetElement {Object} fieldset element with children
 */
Dialog.prototype.createFieldsetWithDivElements = function createFieldsetWithDivElements(legendTitle, divTitle, elements){

  var that = this;
  var fieldSetElement = that.createFieldset(legendTitle)
  var div = that.createDiv(divTitle);

  elements.forEach(function(element){
    var elem = "";
    switch(element[0])
    {
      case "Text": elem = that.createText(element[1], element[2]); break;
      case "Input":
      case "InputWithBr": elem = that.createInput(element[1], element[2]); break;
      case "Date": elem = that.createDate(element[1], element[2]); break;
      case "SelectLanguage":
      case "SelectLanguageWithBr": elem = that.createSelectLanguages(element[1], element[2]); break;
      case "Span": elem = that.createSpan(element[1], element[2], element[3]); break;
      case "AddButton": elem = that.createAddButton(element[1], element[2], element[3]); break;
      case "AddButtonDiv": elem = that.createAddButtonDiv(element[1], element[2], element[3]); break;
      case "DeleteButton":
      case "DeleteButtonDiv": 
      case "DeleteButtonWithBr":elem = that.createDeleteButton(element[1], element[2], element[3]); break;
      case "Select": elem = that.createSelect(element[1], element[2], element[3]); break;
      case "Div": 
      case "DivWithBr": elem = that.createDivWithElements(element[1], element[2]);break;
      case "SelectWithDependency": elem = that.createSelectWithDependency(element[1], element[2], element[3], element[4]); break;
    }

    if(element[0].search("Br") != -1)
      div.append(elem).append("<br>");
    else
      div.append(elem);

  });

  fieldSetElement.append(div);
  return fieldSetElement;
}
/**
 * This method is responsible for creating a div element with title and children
 * @param  {String} title of the element
 * @param  {Object[]} List of children to be included
 * @divElement {Object} div element with children
 */
Dialog.prototype.createDivWithElements = function createDivWithElements(divTitle, elements){

  var that = this;
  var divElement = that.createDiv(divTitle);

  elements.forEach(function(element){
    var elem = "";
    switch(element[0])
    {
      case "Text": elem = that.createText(element[1], element[2]); break;
      case "Input": elem = that.createInput(element[1], element[2]); break;
      case "Date": elem = that.createDate(element[1], element[2]); break;
      case "SelectLanguage": 
      case "SelectLanguageWithBr":elem = that.createSelectLanguages(element[1], element[2]); break;
      case "Span": elem = that.createSpan(element[1], element[2], element[3]); break;
      case "AddButton": elem = that.createAddButton(element[1], element[2], element[3]); break;
      case "DeleteButton": 
      case "DeleteButtonDiv": elem = that.createDeleteButton(element[1], element[2], element[3]); break;
      case "AddButtonDiv": elem = that.createAddButtonDiv(element[1], element[2], element[3]); break;
      case "Select": elem = that.createSelect(element[1], element[2], element[3]); break;
      case "SelectWithDependency": elem = that.createSelectWithDependency(element[1], element[2], element[3], element[4]); break;
    }

    divElement.append(elem);
  });


  return divElement;
}
/**
 * This method is responsible for creating an h3 element 
 * @param  {String} text of the component
 * @headerElement {Object} h3 element with parameters passed
 */
Dialog.prototype.createHeader = function createHeader(text)
{
  var headerElement = $(window.document.createElement('h3'))
      .text(text);
  return headerElement;
}
/**
 * This method is responsible for creating a list element 
 * @param  {Object[]} List of elements to be included
 * @headerElement {Object} list element with parameter passed
 */
Dialog.prototype.createList = function createList(elements){

  var ul = $(window.document.createElement('ul'));
  elements.forEach(function(element){

    var li1 = $(window.document.createElement('li'));
    var a1 = $(window.document.createElement('a'))
    .attr("href",element[0])
    .text(element[1]);
    li1.append(a1);
    ul.append(li1) 
  });

  return ul;
}
CBUtil.createNameSpace('application.dialog');
application.dialog = CBUtil.singleton(Dialog);