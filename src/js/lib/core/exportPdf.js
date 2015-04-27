/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */
function ExportPdf() {}
ExportPdf.prototype.htmltoPdf = function htmltoPdf() {
    /*funcion que se lanzará para generar el html temporal necesario para el obtener el pdf */
    var exporthtml = application.exporthtml.core.getInstance();
    return exporthtml.preExportHTMLToPDF();
};
ExportPdf.prototype.borrarHtml = function borrarHtml(origen) {
    var fsextra = require('fs-extra');
    var path = require('path');
    var directorio = path.dirname(origen)
    if (directorio.indexOf("/tmp") === 0) {
        fsextra.removeSync(directorio);
    }
};
ExportPdf.prototype.generatePdf = function generatePdf(parametrosPdf) {
    var origen = this.htmltoPdf();
    this.renderPdf(parametrosPdf, origen);
};
ExportPdf.prototype.renderPdf = function renderPdf(parametrosPdf, origen) {
    var exec = require('child_process').exec;
    var fsextra = require('fs-extra');
    var fs = require('fs');
    var path = require('path');
    /*Ruta donde se guardará el fichero pdf */
    var pdfFileName = " '" + parametrosPdf.path + "' ";
    var ficheroOrigen = "";
    if (origen instanceof Array) {
        origen.forEach(function(path) {
            ficheroOrigen += " '" + path + "' ";
        });
    } else {
        ficheroOrigen = " '" + origen + "' ";
    }
    /* Se calculan los parametros para el pdf a generar */
    var wkhtmloptions = "";
    var orientacionP = '-O' + " " + parametrosPdf.orientacion;
    wkhtmloptions = wkhtmloptions + orientacionP;
    var size = ' -s' + " " + parametrosPdf.page;
    wkhtmloptions = wkhtmloptions + size;
    var encabezadoP = "";
    if (parametrosPdf.posicionH !== "") {
        var encabezado = parametrosPdf.posicionH;
        switch (encabezado) {
            case "headerRight":
                encabezadoP = ' --header-right' + " '" + parametrosPdf.textoH + "' ";
                break;
            case "headerLeft":
                encabezadoP = ' --header-left' + " '" + parametrosPdf.textoH + "' ";
                break;
            case "headerCenter":
                encabezadoP = ' --header-center' + " '" + parametrosPdf.textoH + "' ";
                break;
        }
        wkhtmloptions = wkhtmloptions + encabezadoP;
    }
    var pieP = "";
    if (parametrosPdf.posicionN !== "") {
        var posicionP = parametrosPdf.posicionN;
        switch (posicionP) {
            case "footerRight":
                pieP = ' --footer-right [page]';
                break;
            case "footerLeft":
                pieP = ' --footer-left [page]';
                break;
            case "footerCenter":
                pieP = ' --footer-center [page]';
                break;
        }
        wkhtmloptions = wkhtmloptions + pieP;
    }
    wkhtmloptions += " --load-error-handling ignore ";
    /*Se ejecuta el proceso para generar el pdf*/
    $("#exportpdfwizard").find('.waitingOK').css("display", "inline");
    var that = this;
    var cmd = "wkhtmltopdf" + " " + wkhtmloptions + " " + ficheroOrigen + " " + pdfFileName;
    exec(cmd, function(err, stdout, stderr) {
        //process.stdout.write( stderr );
        if (err === null) {
            $("#exportpdfwizard").find('.waitingOK').css("display", "none");
            $("#exportpdfwizard").find('.waitingFiles').css("display", "inline");
            var extrafilesorig = Project.Info.projectpath + "/pdfextrafiles/";
            var destextrafiles = path.dirname(parametrosPdf.path) + "/pdfextrafiles";
            if(fs.existsSync(extrafilesorig)){
            	fsextra.move(extrafilesorig,destextrafiles,function(err){console.log(err);$("#exportpdfwizard").dialog("destroy");});
            }
            //that.borrarHtml(origen);
        } else {
            $("#exportpdfwizard").find('.waitingOK').css("display", "none");
            $("#exportpdfwizard").find('.waitingER').css("display", "inline");
            console.log(stderr);
        }
    });
};
CBUtil.createNameSpace('application.core.exports.exportPdf.core');
application.core.exports.exportPdf.core = CBUtil.singleton(ExportPdf);