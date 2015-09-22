/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */
function ExportPdf() {}

ExportPdf.prototype.htmltoPdf = function htmltoPdf(temppath) {
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
    var temppath={}
    temppath.htmlpath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    temppath.pdfpath = mktemp.createDirSync(temppath.htmlpath+"/pdf/");
    return temppath;    

};

ExportPdf.prototype.generatePdf = function generatePdf(parametrospdf) {
    var _this = this;
    var temppath=this.createTemppath();
    var htmlfiles = this.htmltoPdf(temppath.htmlpath);

    this.renderPdf(parametrospdf,htmlfiles,temppath.pdfpath,function(pdffiles){
       _this.joinPdf(pdffiles,parametrospdf.path);

    });
    
};

ExportPdf.prototype.renderFooter=function renderFooter(footerop){
    var fs = require('fs');
    var footerpdf = "";
    var paramfooter={}
    var template = fs.readFileSync('./templates/footerPdf.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
    
    paramfooter.numberpage=footerop.numberpage;
    paramfooter.positionfooter=footerop.positionfooter;
    footerpdf = templatecompiled(paramfooter);
    
    fs.writeFileSync(footerop.pdfpath+"footerpdf.html", footerpdf);

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


ExportPdf.prototype.renderPdf = function renderPdf(parametrospdf, htmlfiles, pdfpath, callback) {
   
    var mktemp = require('mktemp'),
        fsextra = require('fs-extra'),
        fs = require('fs'),
        path = require('path');

    var that = this;

    var contfiles = 0,
        numberpage = 0,
        positionheader = "",
        textheader = "",
        pdffiles = [],
        wkop = [],
        tmppdf={};
      

    wkop = wkop.concat(['-O', parametrospdf.orientationpage]);
    wkop = wkop.concat(['-s', parametrospdf.page]);

    if (parametrospdf.positionheader !== "") {
        textheader = parametrospdf.textheader;
        positionheader = parametrospdf.positionheader;
        this.renderHeader(pdfpath, textheader, positionheader)
        wkop = wkop.concat(['--header-html', pdfpath + 'headerpdf.html']);
    }

    tmppdf.htmlfiles=htmlfiles;
    tmppdf.contfiles=contfiles;
    tmppdf.pdffiles=pdffiles;
    tmppdf.wkop=wkop;
    tmppdf.numberpage=numberpage;
    tmppdf.pdfpath=pdfpath;
    tmppdf.parametrospdf=parametrospdf
    tmppdf.that=that


    this.generateTemporalPdf(tmppdf,callback);
  
};

ExportPdf.prototype.generateTemporalPdf = function generateTemporalPdf(tmppdf,callback) {
  var optionsThisFile = [],
      newpage = 0,
      pdf,
      spawn = require('child_process').spawn,
      indexPosition = tmppdf.contfiles;
      footerop={};

  tmppdf.contfiles++;
  
  pdf = tmppdf.pdfpath + tmppdf.contfiles + ".pdf";
  tmppdf.pdffiles.push(pdf);

  if (tmppdf.parametrospdf.positionfooter !== "") {
      footerop.pdfpath=tmppdf.pdfpath;
      footerop.numberpage=tmppdf.numberpage;
      footerop.positionfooter=tmppdf.parametrospdf.positionfooter;

      tmppdf.that.renderFooter(footerop);
      optionsThisFile = optionsThisFile.concat(['--footer-html', tmppdf.pdfpath +'footerpdf.html']);
  }
  optionsThisFile = optionsThisFile.concat(['--load-error-handling', 'ignore']);
  optionsThisFile = optionsThisFile.concat([tmppdf.htmlfiles[indexPosition], pdf]);
  

  var wkcommand = spawn('wkhtmltopdf', tmppdf.wkop.concat(optionsThisFile));
  console.log("Se esta generando el fichero " + tmppdf.contfiles);

  wkcommand.on('close',function wkhtmltopdfCloseCommand(code){
    if(tmppdf.contfiles === tmppdf.htmlfiles.length){
      $("#exportpdfwizard").find('.waitingOK').css("display", "none");
      tmppdf.that.copyResources(tmppdf.parametrospdf);
      callback(tmppdf.pdffiles);
    } 
    else{
      if (tmppdf.parametrospdf.positionfooter !== "") {
        tmppdf.numberpage = tmppdf.numberpage + parseInt(tmppdf.that.getNumberPage(pdf));
      }
      $("#exportpdfwizard .waitingOK #pdfCount").html(CBI18n.gettext('File') + " " + tmppdf.contfiles + " " + CBI18n.gettext('of') + " " + tmppdf.htmlfiles.length)
        tmppdf.that.generateTemporalPdf(tmppdf,callback);
    }
  });
  
};



ExportPdf.prototype.copyResources = function copyResources(parametrospdf) {
  var fsextra = require("fs-extra");
  var path = require("path");
 
  $("#exportpdfwizard").find('.waitingOK').css("display", "none");
  $("#exportpdfwizard").find('.waitingFiles').css("display", "inline");
  var extrafilesorig = Project.Info.projectpath + "/pdfextrafiles/";
  var destextrafiles = path.dirname(parametrospdf.path) + "/pdfextrafiles";
  if(fs.existsSync(extrafilesorig)){
      fsextra.move(extrafilesorig,destextrafiles,function(err){console.log(err);
      });
      $("#exportpdfwizard").find('.waitingFiles').css("display", "none");
  };
};


ExportPdf.prototype.getNumberPage=function getNumberPage(pdfpath){
    var spawn = require('child_process').spawnSync;
    var proc = spawn('pdftk',[pdfpath,'dump_data']);
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
   var spawn = require('child_process').spawn;
   var fsextra = require('fs-extra');
   var fs = require('fs');

   pdffiles.push("cat");
   pdffiles.push("output");
   pdffiles.push(dest);


   $("#exportpdfwizard").find('.waitingOK').css("display", "none");
   $("#exportpdfwizard").find('.waitingFiles').css("display", "none");
   $("#exportpdfwizard").find('.waitingPdf').css("display", "inline") 
   var result = spawn("pdftk",pdffiles);
   result.on('close',function(code){
      if (fs.existsSync(dest)){    
        $("#exportpdfwizard").find('.waitingPdf').css("display", "none") 
        $("#exportpdfwizard").dialog("destroy");
      }
   });

   result.stderr.on('data',function(data){
      $("#exportpdfwizard").find('.waitingPdf').css("display", "none");
      $("#exportpdfwizard").find('.waitingER').css("display", "inline");
      $("#exportpdfwizard .waitingER #messageError").html("Error : " + data);
   });
};


CBUtil.createNameSpace('application.core.exports.exportPdf.core');
application.core.exports.exportPdf.core = CBUtil.singleton(ExportPdf);