/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */
function ExportPdf() {}

/**
 * Function to generate an HTML file for each section of the project. 
 * Returns the list of files generated and information on the project structure 
 */

ExportPdf.prototype.htmltoPdf = function htmltoPdf(temppath) {
    var fileshtmltopdf=[];
    var htmlinfo={};

    var htmltopdf = new ExportHTMLSplited();
    var infohtml = htmltopdf.exportPDF(temppath);

    infohtml.orderedsections.forEach(function(elemento){
        fileshtmltopdf.push(temppath + "/" + elemento.filename);    
    });
    htmlinfo["sectionsinfo"]=infohtml;
    htmlinfo["fileshtml"]=fileshtmltopdf;

    return htmlinfo;
};

/**
 * Function to create the tmp dir for the htmlfiles and partial pdf files
 */

ExportPdf.prototype.createTemppath=function createTemppath(){
    var mktemp = require('mktemp');
    var temppath={}
    temppath.htmlpath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    temppath.pdfpath = mktemp.createDirSync(temppath.htmlpath+"/pdf/");
    return temppath;    

};

/**
 * Function to generate de pdf file
 */
ExportPdf.prototype.generatePdf = function generatePdf(parametrospdf) {
    var _this = this;
    var temppath=this.createTemppath();
    var htmlfiles = this.htmltoPdf(temppath.htmlpath);


    this.renderPdf(parametrospdf,htmlfiles.fileshtml,temppath.pdfpath,function(pdffiles){
       _this.joinPdf(pdffiles,parametrospdf,temppath.pdfpath,htmlfiles.sectionsinfo);
      

    });
   
    
};

/**
 * Function to render the footer template for the pdf files
 */

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

/**
 * Function to render the header template for the pdf files
 */
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

/**
 * Function to set the required parameters of wkhtmltopdf for generating the pdf file
 */
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
        info={};
       
      

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

/**
 * Function to generate the pdf file for each project's section
 */
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
      tmppdf.numberpage = tmppdf.numberpage + parseInt(tmppdf.that.getNumberPage(pdf,tmppdf.contfiles));
      $("#exportpdfwizard .waitingOK #pdfCount").html(CBI18n.gettext('File') + " " + tmppdf.contfiles + " " + CBI18n.gettext('of') + " " + tmppdf.htmlfiles.length)
      tmppdf.that.generateTemporalPdf(tmppdf,callback);
    }
  });
  
};


/**
 * Function to copy the files of the section's resource like flash, video...
*/

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


/**
 * Function to get the number of page of each pdf file...
*/

ExportPdf.prototype.getNumberPage=function getNumberPage(pdfpath,orderpdf){
    var spawn = require('child_process').spawnSync;
    var proc = spawn('pdftk',[pdfpath,'dump_data']);
    var that=this;
    var page;
    rawdata = proc.stdout.toString().split("\n");
    rawdata.forEach(function(element){
            if(element.indexOf("NumberOfPages") === 0){
               that.page=(element.split(":")[1].trim().toString())
            }
    });
    info[orderpdf]=that.page

    return that.page;
};


/**
 * Function to add a Toc and generate the final pdf file
*/

ExportPdf.prototype.addToc=function addToc(parametrospdf,tmpdir,sectionsinfo,pdfjoined){
    var CBStorage = application.storagemanager.getInstance();
    var spawn = require('child_process').spawn;
    var fsextra = require('fs-extra');
    var fs = require('fs');
    var that=this;
   
    var tocpdf = "",
        tocfile="",
        codeseclength="",
        codesection="",
        cbsec="",
        levelsec="",
        pagenumber=1; 
        initpage=1,  
        i=1,
        definitivo="", 
        paramtoc={},
        toc=[];

       
    var template = fs.readFileSync('./templates/tocPdf.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
 
   
    //Generamos el diccionario con los datos necesarios de las secciones para general el TOC
    paramtoc.infosection=[];
    info[0]="0";
    sectionsinfo.orderedsections.forEach(function(elemento){
       
        var sections = {};
        
        sections.title=elemento.title;
        
        pagenumber=pagenumber + parseInt(info[i-1]);
        sections.pages=pagenumber;

        codeseclength=elemento.filename.indexOf('.');
        codesection=elemento.filename.substring(0,codeseclength);
        cbsec=CBStorage.getSectionById(codesection);
        
        levelsec=cbsec.numbering.split(".").length;
        sections.level =levelsec;

        i++;
        paramtoc.infosection.push(sections);
    });

    //Creamos el txt con los datos del TOC a añadir al pdf
    tocpdf = templatecompiled(paramtoc);
    
    fs.writeFileSync(tmpdir+"toc.txt", tocpdf);
    
    //Generamos el pdf definitivo con el TOC
    tocfile=tmpdir+"toc.txt";
    definitivo=parametrospdf.path;
    toc.push(pdfjoined);
    toc.push("update_info_utf8")
    toc.push(tocfile);
    toc.push("output");
    toc.push(definitivo);

    var result=spawn("pdftk",toc);
    result.on('close',function(code){
      if (fs.existsSync(definitivo)){   
          $("#exportpdfwizard").find('.waitingPdf').css("display", "none") 
          $("#exportpdfwizard").dialog("destroy");
      };

    });
    result.stderr.on('data',function(data){
      $("#exportpdfwizard").find('.waitingPdf').css("display", "none");
      $("#exportpdfwizard").find('.waitingER').css("display", "inline");
      $("#exportpdfwizard .waitingER #messageError").html("Error : " + data);
   });



}

/**
 * Function to join all pdf files to gen a final pdf file
 */
ExportPdf.prototype.joinPdf=function joinPdf(pdffiles,parametrospdf,tmpdir,sectionsinfo){
   var spawn = require('child_process').spawn;
   var fsextra = require('fs-extra');
   var fs = require('fs');
   var that=this;
  
   var pdfjoined=tmpdir+"unido.pdf";

   pdffiles.push("cat");
   pdffiles.push("output");
   pdffiles.push(pdfjoined);


   $("#exportpdfwizard").find('.waitingOK').css("display", "none");
   $("#exportpdfwizard").find('.waitingFiles').css("display", "none");
   $("#exportpdfwizard").find('.waitingPdf').css("display", "inline") 
   var result = spawn("pdftk",pdffiles);
   result.on('close',function(code){
      if (fs.existsSync(pdfjoined)){   
         that.addToc(parametrospdf,tmpdir,sectionsinfo,pdfjoined);
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