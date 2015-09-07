
/**
 * @class Export
 * @classdesc This class is responsible to export project to WebZip file
 */

function ExportIms(){
	
     
};


/**
 * Function to create a temp folder with copy all the files needed to
   generate a scorm project
 */  

ExportIms.prototype.createTemppath=function createTemppath(){
    var mktemp = require('mktemp');
    var temppath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    return temppath + "/";    

};


/**
 * Function to generate the imslrm.xml file
 */
ExportIms.prototype.renderImslrm=function renderImslrm(dest){
    
    var fs = require('fs');
    var fileimslrm = "";
  
    var fullmetainfo = parserImslrm();
    var template = fs.readFileSync('./templates/imslrm.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
    fileimslrm = templatecompiled(fullmetainfo);

    fs.writeFileSync(dest+"imslrm.xml", fileimslrm);

   
};    

/** 
 * Function to get the html files of the project
 * Generating the imsmanifest.xml
 */
ExportIms.prototype.renderImsmanifest=function renderImsmanifest(dest){
    var fs = require('fs');
    var pretty = require('pretty-data').pd;
    var metadatamanager = application.metadatamanager.getInstance();
    var filemanifest="";
    var imsdata={};

    var metadatatemplate=fs.readFileSync('./templates/imslrm_ims.hbs',{encoding:"utf8"});
    var itemstemplate = fs.readFileSync('./templates/itemims.hbs',{encoding:"utf8"});
    var manifestemplate=fs.readFileSync('./templates/imsmanifest_ims.hbs', {encoding:"utf8"});
    var resourcetemplate=fs.readFileSync('./templates/resourceims.hbs', {encoding:"utf8"});

    application.util.template.registerPartial("imsmetadata",metadatatemplate);
    application.util.template.registerPartial("imsitem",itemstemplate);
    application.util.template.registerPartial("resourceitem",resourcetemplate);

    var imsmanifest = application.util.template.compile(manifestemplate);

    var metadata=metadatamanager.parserMetadata();

    var ehs = new ExportHTMLSplited();
    var objeto = ehs.exportHTML(dest);
   
    imsdata["metadata"]=metadata;
    imsdata["objects"]=objeto;

    filemanifest=imsmanifest(imsdata);
    fs.writeFileSync(dest+"imsmanifest.xml", filemanifest);


};

/**
 * Function to copy the extra files (xsd) indicates by the standar scorm
 */

ExportIms.prototype.copyImsfiles=function copyImsfiles(dest){
   var fs = require('fs');
   var files_to_copy = []; 
   var dir='rsrc/ims/'
   
   
   var fs = window.require('fs');
   var filenames=fs.readdirSync(dir);
   for (var i=0; i<filenames.length; i++){
        var file = filenames[i];
        var fsextra = window.require('fs-extra');
        fsextra.ensureDirSync(dest);
        fsextra.copySync(dir+file,dest+file);
      
    }
  
};
   


/**
 * Function to manage the scorm generation
 */
ExportIms.prototype.paramIms=function paramIms(destino){
     
   var tempath = this.createTemppath();       
   
 //  this.renderImslrm(tempath);
   this.copyImsfiles(tempath);
   this.renderImsmanifest(tempath);
   this.createZip(tempath,destino);


};


/** 
 * Function to create a zip with the files that make up the scorm project
 */
ExportIms.prototype.createZip=function createZip(directorio,destino){    
    
      var zipFolder = require('zip-folder');
    
      var zipFileName="" + destino + "";
      
      var directorioOrigen="" + directorio + "";
      
          
      var that = this;

      $("#exportimswizard").find('.waitingOK').css("display","inline");
      zipFolder(directorioOrigen, zipFileName, function(err) {
            if(err) {
                console.log('oh no!', err);
            $("#exportimswizard").find('.waitingOK').css("display","none");
            $("#exportimswizard").find('.waitingER').css("display","inline");
            } else {
                 console.log('EXCELLENT');
            $("#exportimswizard").dialog("destroy");
                      
        }
    });
        
};    
        
      


CBUtil.createNameSpace('application.core.exports.exportims.core');
application.core.exports.exportims.core = CBUtil.singleton(ExportIms);
