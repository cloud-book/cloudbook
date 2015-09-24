function ExportImslrmWizard(){}

/**
 * Initialize wizard for export metadata file (imslrm.xml)
 */
ExportImslrmWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

ExportImslrmWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportimslrmwizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportimslrmwizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



ExportImslrmWizard.prototype.showExportImslrmFile = function showExportImslrmFile(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportimslrmwizard").empty();
	var template = fs.readFileSync('./templates/exportImslrmFile.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportimslrmwizard").append(templatecompiled());
       
 	        
      
     $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[id='exportimslrmbtn']").attr('disabled','disabled');
			     
			}else{
			    $("[id='exportimslrmbtn']").removeAttr('disabled');
					
              		}                   
          }); 
        
		
	$("[id='exportimslrmbtn']").click(function(){
		  
        var destino=$("input[name='path']").val();
	    
        var exportimslrm = application.core.exports.exportimslrm.core.getInstance();
       
		exportimslrm.getImslrm(destino);	

	});

      $("[id='exportimslrmback']").click(function(){
	       $('#exportimslrmwizard').dialog('close');
               $('#exportimslrmwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportimslrmwizard.core');
application.ui.exportimslrmwizard.core = CBUtil.singleton(ExportImslrmWizard);
