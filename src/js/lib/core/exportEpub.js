/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */
function ExportEpub() {}
ExportEpub.prototype.htmltoEpub = function htmltoEpub() {
    /*funcion que se lanzará para generar el html temporal necesario para el obtener el pdf */
    var contenido = application.exporthtml.core.getInstance();

    return contenido.preExportHTMLToEPUB();
};


ExportEpub.prototype.generateEpub = function generateEpub(parametrosEpub) {
    var contenido = this.htmltoEpub();
    this.renderEpub(parametrosEpub,contenido);
};

ExportEpub.prototype.renderEpub = function renderEpub(parametrosEpub,contenido) {
    
    var Epub = require("epub-gen")
    var fsextra = require('fs-extra');
    var fs = require('fs');
    var path = require('path');

    var editor=parametrosEpub.publisher;
    
    if (editor===''){
    var publisher="cloudbook";
    }else{
    var publisher=parametrosEpub.publisher;
    } 

       /* Se calculan los parametros para el pdf a generar */
    var option = {
        title: parametrosEpub.title, // *Required, title of the book. 
        author: parametrosEpub.author, // *Required, name of the author. 
        publisher:publisher, // optional 
        cover: parametrosEpub.cover, // Url or File path both ok. 
        lang:"es",
        content:contenido 
     };

    var destino=parametrosEpub.path;

    new Epub(option, destino);
    var that = this;
    $("#exportepubwizard").find('.waitingOK').css("display", "inline");
    new Epub(option,destino).promise.then(function(){
           $("#exportepubwizard").find('.waitingOK').css("display", "none");
           $("#exportepubwizard").dialog("destroy");
            console.log("Ebook Generated Successfully!")
            

           
        }, function(err){
            $("#exportepubwizard").find('.waitingOK').css("display", "none");
            $("#exportepubwizard").find('.waitingER').css("display", "inline");
             console.error("Failed to generate Ebook because of ", err)
    })  



};
CBUtil.createNameSpace('application.core.exports.exportEpub.core');
application.core.exports.exportEpub.core = CBUtil.singleton(ExportEpub);

