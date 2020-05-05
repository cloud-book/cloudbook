
/**
 * @class Export
 * @classdesc This class is responsible to export project to WebZip file
 */

function ExportWebZip(){
	     
}


ExportWebZip.prototype.createHtml=function createHtml(){
    
   var fs = require('fs');
   var os = require('os');
   var path = require('path');
    
   var temp_path = fs.mkdtempSync(path.join(os.tmpdir(),'cloudbook_'));
   var createhtml = application.exporthtml.core.getInstance();
   createhtml.do_html(temp_path);
    
   return temp_path;
};


/*ExportWebZip.prototype.borrarHtml=function borrarHtml(origen){
     
     var fs=require('fs');
     var fsextra=require('fs-extra');
     var path=require('path');

         
     var directorio=path.dirname(origen)

     fsextra.deleteSync(directorio,function (err) {
  	if (err) return console.error(err)
 
  	console.log('success!')
     });

 
};*/

ExportWebZip.prototype.paramWebZip=function paramWebZip(destino){
          
	 var directorio=this.createHtml();
        
          
         this.createZip(directorio,destino);
        
};    
        
  

ExportWebZip.prototype.createZip=function createZip(directorio,destino){    
	
      var zipFolder = require('zip-folder');
  	
      var zipFileName="" + destino + "";
      
      var directorioOrigen="" + directorio + "";
      
          
      var that = this;

      $("#exportwebzipwizard").find('.waitingOK').css("display","inline");
       zipFolder(directorioOrigen, zipFileName, function(err) {
    		if(err) {
       		 	console.log('oh no!', err);
			$("#exportwebzipwizard").find('.waitingOK').css("display","none");
			$("#exportwebzipwizard").find('.waitingER').css("display","inline");
    		} else {
       			 console.log('EXCELLENT');
		 	$("#exportwebzipwizard").dialog("destroy");
                  //      that.borrarHtml(directorio);
			
   		}
	});


};


CBUtil.createNameSpace('application.core.exports.exportwebzip.core');
application.core.exports.exportwebzip.core = CBUtil.singleton(ExportWebZip);
