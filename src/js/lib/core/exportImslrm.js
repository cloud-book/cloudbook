
/**
 * @class Export
 * @classdesc This class is responsible to export metadata file
 */

function ExportImslrm(){
	
     
};




/**
 * Function to get de imsllrm file
 */
ExportImslrm.prototype.getImslrm=function getImslrm(destino){
     
        
   var metadatamanager = application.metadatamanager.getInstance();
   var destino=destino + "/"; 
   
   $("#exportimslrmwizard").find('.waitingOK').css("display","inline");

   var err = metadatamanager.renderImslrm(destino);
   if (err){
      console.log('oh no!', err);
      $("#exportimslrmwizard").find('.waitingOK').css("display","none");
      $("#exportimslrmwizard").find('.waitingER').css("display","inline");
      $("#exportimslrmwizard .waitingER #messageError").html("Error : " + err.message);
    } else {
      console.log('EXCELLENT');
      $("#exportimslrmwizard").dialog("destroy");
    } 


};
  
        
      


CBUtil.createNameSpace('application.core.exports.exportimslrm.core');
application.core.exports.exportimslrm.core = CBUtil.singleton(ExportImslrm);
