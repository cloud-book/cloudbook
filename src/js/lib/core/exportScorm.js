
/**
 * @class Export
 * @classdesc This class is responsible to export project to Scorm file
 */

function ExportScorm(){
	     
};



/**
 * Function to create a temp folder with copy all the files needed to
   generate a scorm project
 */  

ExportScorm.prototype.createTemppath=function createTemppath(){
    var mktemp = require('mktemp');
    var temppath = mktemp.createDirSync("/tmp/cloudbook_XXXX");
    return temppath + "/";    

};


/** 
 * Function to get the html files of the project
 * Generating the imsmanifest.xml
 */
ExportScorm.prototype.renderImsmanifest=function renderImsmanifest(dest){
    var fs = require('fs');
    var pretty = require('pretty-data').pd;
    var filemanifest="";

    var itemstemplate = fs.readFileSync('./templates/itemscorm.hbs',{encoding:"utf8"});
    var manifestemplate=fs.readFileSync('./templates/imsmanifest.hbs', {encoding:"utf8"});
    var resourcetemplate=fs.readFileSync('./templates/resourcescorm.hbs', {encoding:"utf8"});

    application.util.template.registerPartial("scormitem",itemstemplate);
    application.util.template.registerPartial("resourceitem",resourcetemplate);

    var imsmanifest = application.util.template.compile(manifestemplate);

    var ehs = new ExportHTMLSplited();
    var objeto = ehs.exportHTML(dest);
   

    filemanifest=imsmanifest(objeto);
    fs.writeFileSync(dest+"imsmanifest.xml", filemanifest);


};

/**
 * Function to copy the extra files (xsd) indicates by the standar scorm
 */

ExportScorm.prototype.copyScormfiles=function copyScormfiles(dest){
   var fs = require('fs');
   var files_to_copy = []; 
   var dir='rsrc/scorm/scorm_2004_v4/'
   
   
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
ExportScorm.prototype.paramScorm=function paramScorm(destino){
     
   var tempath = this.createTemppath();
   var metadatamanager = application.metadatamanager.getInstance();       
   
   metadatamanager.renderImslrm(tempath);
   this.copyScormfiles(tempath);
   this.renderImsmanifest(tempath);
   this.createZip(tempath,destino);


};


/** 
 * Function to create a zip with the files that make up the scorm project
 */
ExportScorm.prototype.createZip=function createZip(directorio,destino){    
    
      var zipFolder = require('zip-folder');
    
      var zipFileName="" + destino + "";
      
      var directorioOrigen="" + directorio + "";
      
          
      var that = this;

      $("#exportscormwizard").find('.waitingOK').css("display","inline");
      zipFolder(directorioOrigen, zipFileName, function(err) {
            if(err) {
                console.log('oh no!', err);
            $("#exportscormwizard").find('.waitingOK').css("display","none");
            $("#exportscormwizard").find('.waitingER').css("display","inline");
            } else {
                 console.log('EXCELLENT');
            $("#exportscormwizard").dialog("destroy");
                      
        }
    });
        
};    
        
      


CBUtil.createNameSpace('application.core.exports.exportscorm.core');
application.core.exports.exportscorm.core = CBUtil.singleton(ExportScorm);
