/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */
function ExportEpub() {}
ExportPdf.prototype.htmltoEpub = function htmltoEpub() {
    /*funcion que se lanzará para generar el html temporal necesario para el obtener el pdf */
    var exporthtml = application.exporthtml.core.getInstance();
    return exporthtml.preExportHTMLToPDF();
};

ExportEpub.prototype.borrarHtml = function borrarHtml(origen) {
    var fsextra = require('fs-extra');
    var path = require('path');
    var directorio = path.dirname(origen)
    if (directorio.indexOf("/tmp") === 0) {
        fsextra.removeSync(directorio);
    }
};

ExportEpub.prototype.generateEpub = function generateEpub(parametrosEpub) {
  /* var origen = this.htmltoEpub();*/
    this.renderEpub(parametrosEpub);
};

ExportEpub.prototype.renderEpub = function renderEpub(parametrosEpub) {
    
    var Epub = require("epub-gen")

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
        content: [
            {
                title: "", // Optional 
                author: "", // Optional 
                data: "<article id='data0'> <div class='cbobject' tabindex='-1' data-cbobjectid='251589fd-0693-479d-8aca-8d62b94c97ce' style='left: 54px; top: 423px; position: absolute; z-index: 0; -webkit-transform: rotate(0rad); 	width: 300px; height: 80px;'> <div class='cbcontainer'> <div data-textbox-id='251589fd-0693-479d-8aca-8d62b94c97ce' class='cbtextbox' style='padding: 5px;'> <b>En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. </b></div></div></div> <div class='cbobject' tabindex='-1' data-cbobjectid='88ca7646-2772-4efe-ba19-e104f0b4bf5f' style='left: 236px; top: 54px; position: absolute; z-index: 0; -webkit-transform: rotate(0rad); width: 300px; height: 80px;'> <div class='cbcontainer'> <div data-textbox-id='88ca7646-2772-4efe-ba19-e104f0b4bf5f' class='cbtextbox' style='padding: 5px;'> <font face='Verdana' size='5'>En un<strike> lugar</strike> de la Mancha, de <u>cuyo </u>nombre no quiero&nbsp;</font> <div> <ul> <li> <span style='font-family: Verdana; font-size: x-large; line-height: 1.42857143;'>acordarme, no ha mucho tiempo</span> <span style='font-family: Verdana; font-size: x-large; line-height: 1.42857143;'> que vivía un hidalgo de&nbsp;</span></li> <li> <span style='font-family: Verdana; font-size: x-large; line-height: 1.42857143;'>za en astillero, adarga antigua, rocín flaco y galgo corredor.</span></li></ul></div></div></div></div> <div class='cbobject' tabindex='-1' data-cbobjectid='3d52b76f-0876-418d-ab57-b821c30becaf' style='left: 272px; top: 583px; position: absolute; z-index: 0; -webkit-transform: rotate(0rad); width: 460px; height: 182px;'> <div class='cbcontainer'> <img src='file:///tmp/Epub/Prueba.png' style='height: 100%; width: 100%;'></div></div></article>"
            }
        ]
    };

    var destino=parametrosEpub.path;

    new Epub(option, destino);
    
    $("#exportepubwizard").find('.waitingOK').css("display", "inline");
    new Epub(option,destino).promise.then(function(){
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
