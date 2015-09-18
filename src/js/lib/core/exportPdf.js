/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */
function ExportPdf() {}

ExportPdf.prototype.htmltoPdf = function htmltoPdf(temppath) {
    /*funcion que se lanzará para generar el html temporal necesario para el obtener el pdf */
   // var mktemp = require('mktemp');
  //  var temppath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    var fileshtmltopdf=[];

    var htmltopdf = new ExportHTMLSplited();
    var infohtml = htmltopdf.exportPDF(temppath);

    infohtml.orderedsections.forEach(function(elemento){
        fileshtmltopdf.push(temppath + "/" + elemento.filename);
        
    });

   return fileshtmltopdf

};


ExportPdf.prototype.createTemppath=function createTemppath(){
    var mktemp = require('mktemp');
    var temppath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    return temppath + "/";    

};

ExportPdf.prototype.generatePdf = function generatePdf(parametrospdf) {
  
    var temppath=this.createTemppath();
   
    $("#exportpdfwizard").find('.waitingOK').css("display", "inline");
    var htmlfiles = this.htmltoPdf(temppath);
    var pdfiles=this.renderPdf(parametrospdf,htmlfiles,temppath);
    this.joinPdf(pdfiles,parametrospdf.path)

};

ExportPdf.prototype.renderFooter=function renderFooter(pdfpath,numberpage,positionfooter){
    var fs = require('fs');
    var footerpdf = "";
    var paramfooter={}
    var template = fs.readFileSync('./templates/footerPdf.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
    
    paramfooter.numberpage=numberpage;
    paramfooter.positionfooter=positionfooter;
    footerpdf = templatecompiled(paramfooter);
    
    fs.writeFileSync(pdfpath+"footerpdf.html", footerpdf);

}

ExportPdf.prototype.renderHeader=function renderHeader(pdfpath,textheader,positionheader){
    var fs = require('fs');
    var headerpdf = "";
    var paramheader={}
    var template = fs.readFileSync('./templates/headerPdf.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
    
    paramheader.textheader=textheader;
    paramheader.positionheader=positionheader;
    headerpdf = templatecompiled(paramheader);
    
    fs.writeFileSync(pdfpath+"headerpdf.html", headerpdf);

}


ExportPdf.prototype.renderPdf = function renderPdf(parametrospdf, htmlfiles,temppath) {
    var mktemp = require('mktemp');
    var pdfpath = mktemp.createDirSync(temppath+"pdf/");
    var exec = require('child_process').execSync;
    var fsextra = require('fs-extra');
    var fs = require('fs');
    var path = require('path');
    /*Ruta donde se guardará el fichero pdf */
   // var pdfFileName = " '" + parametrosPdf.path + "' ";
    var ficheroorigen = "";
    
    var that = this;
    var cont=0;
    var pdffiles=[];
    var pdf=0;
    var numberpage=0;
    var newpage=0;
    var positionfooter="", 
        positionheader="",
        textheader=""; 

    if (htmlfiles instanceof Array) {
        htmlfiles.forEach(function(path) {
            ficheroorigen += " '" + path + "' ";
            
        });
    } else {
        ficheroorigen = " '" + htmlfiles + "' ";
    }
   
    /* Se calculan los parametros para el pdf a generar */
    var wkhtmloptions = "";
    var orientationpage = '-O' + " " + parametrospdf.orientationpage;
    wkhtmloptions = wkhtmloptions + orientationpage;
    var sizepage = ' -s' + " " + parametrospdf.page;
    wkhtmloptions = wkhtmloptions + sizepage;

    if (parametrospdf.posicionH !==""){
           textheader=parametrospdf.textheader;
           positionheader=parametrospdf.positionheader; 
           this.renderHeader(pdfpath,textheader,positionheader)
           var header= ' --header-html' + ' ' + pdfpath + 'headerpdf.html'
           wkhtmloptions = wkhtmloptions + header;
    }
  
    if (parametrospdf.posicionfooter !== "") {
            positionfooter = parametrospdf.positionfooter;

    }
   
   /*Se ejecuta el proceso para generar el pdf*/
  
   
    htmlfiles.forEach(function(element){
        cont=cont+1;
        pdf=pdfpath + cont + ".pdf";
        pdffiles.push(pdfpath + cont+".pdf");
       
        if (positionfooter !==""){
            numberpage=numberpage+parseInt(newpage)
            that.renderFooter(pdfpath,numberpage,positionfooter)
            var footer= ' --footer-html' + ' ' + pdfpath + 'footerpdf.html'
            wkhtmloptions = wkhtmloptions + footer;
        }


        wkhtmloptions += " --load-error-handling ignore ";
        var cmd = "wkhtmltopdf" + " " + wkhtmloptions + " " + element + " " + pdf;
       
        exec(cmd, function(err, stdout, stderr) {
        //process.stdout.write( stderr );
            if (err === null) {
               
                $("#exportpdfwizard").find('.waitingFiles').css("display", "inline");
                var extrafilesorig = Project.Info.projectpath + "/pdfextrafiles/";
                var destextrafiles = path.dirname(parametrospdf.path) + "/pdfextrafiles";
                if(fs.existsSync(extrafilesorig)){
                   fsextra.move(extrafilesorig,destextrafiles,function(err){console.log(err);
                    });
                };   

            
            }else{
                $("#exportpdfwizard").find('.waitingOK').css("display", "none");
                $("#exportpdfwizard").find('.waitingER').css("display", "inline");
                console.log(stderr);
            }
        });

        if (positionfooter!==""){
            newpage=that.getNumberPage(pdf);
        }
   });

   $("#exportpdfwizard").find('.waitingOK').css("display", "none");
   return pdffiles;
  // this.joinPdf(pdffiles,pdfFileName);
    

};

ExportPdf.prototype.getNumberPage=function getNumberPage(pdfpath){
    var s = require('child_process').spawnSync;
    var proc = s('pdftk',[pdfpath,'dump_data']);
    var info = {}
    var that=this;
    var page;
    rawdata = proc.stdout.toString().split("\n");
    rawdata.forEach(function(element){
            if(element.indexOf("NumberOfPages") === 0){
               that.page=(element.split(":")[1].trim().toString())
            }
    });
    return that.page;
};


ExportPdf.prototype.joinPdf=function joinPdf(pdffiles,dest){
   var exec = require('child_process').execSync;
   var fsextra = require('fs-extra');
   var fs = require('fs');
   var dest = " '" + dest + "' ";
   var cmd = "pdftk" + " "+ pdffiles.join(" ") + " " + "output" + dest;

   $("#exportpdfwizard").find('.waitingPdf').css("display", "inline");
   exec(cmd, function(err,stdout,stderr){
       
        if (err===null){
            if (fs.existsSync(dest)){
               $("#exportpdfwizard").find('.waitingPdf').css("display", "none") 
               $("#exportpdfwizard").dialog("destroy");
            }else{
                 $("#exportpdfwizard").find('.waitingPdf').css("display", "none");
                 $("#exportpdfwizard").find('.waitingER').css("display", "inline");
            }
        }else{
            $("#exportpdfwizard").find('.waitingPdf').css("display", "none");
            $("#exportpdfwizard").find('.waitingER').css("display", "inline");
            console.log(stderr);    
        }

   });
 //  $("#exportpdfwizard").dialog("destroy"); 
};


CBUtil.createNameSpace('application.core.exports.exportPdf.core');
application.core.exports.exportPdf.core = CBUtil.singleton(ExportPdf);