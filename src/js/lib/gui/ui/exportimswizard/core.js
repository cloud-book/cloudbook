function ExportImsWizard(){}

/**
 * Initialize wizard for export project to webzip
 */
ExportImsWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

ExportImsWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportimswizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportimswizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



ExportImsWizard.prototype.showExportImsProject = function showExportImsProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportimswizard").empty();
	var template = fs.readFileSync('./templates/exportImsProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportimswizard").append(templatecompiled());
       
 	        
      
     $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[id='exportimsbtn']").attr('disabled','disabled');
			     
			}else{
			    $("[id='exportimsbtn']").removeAttr('disabled');
					
              		}                   
          }); 
        
		
	$("[id='exportimsbtn']").click(function(){
		  
        var destino=$("input[name='path']").val();
	    
        var exportims = application.core.exports.exportims.core.getInstance();
       
		exportims.paramIms(destino);	

	});

      $("[id='exportimsback']").click(function(){
	       $('#exportimswizard').dialog('close');
               $('#exportimswizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportimswizard.core');
application.ui.exportimswizard.core = CBUtil.singleton(ExportImsWizard);
