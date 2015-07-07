function ExportScormWizard(){}

/**
 * Initialize wizard for export project to webzip
 */
ExportScormWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

ExportScormWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportscormwizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportscormwizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



ExportScormWizard.prototype.showExportScormProject = function showExportScormProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportscormwizard").empty();
	var template = fs.readFileSync('./templates/exportScormProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportscormwizard").append(templatecompiled());
       
 	        
      
     $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[id='exportscormbtn']").attr('disabled','disabled');
			     
			}else{
			    $("[id='exportscormbtn']").removeAttr('disabled');
					
              		}                   
          }); 
        
		
	$("[id='exportscormbtn']").click(function(){
		  
        var destino=$("input[name='path']").val();
	    
        var exportscorm = application.core.exports.exportscorm.core.getInstance();
       
	exportscorm.paramScorm(destino);	

	});

      $("[id='exportscormback']").click(function(){
	       $('#exportscormwizard').dialog('close');
               $('#exportscormwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportscormwizard.core');
application.ui.exportscormwizard.core = CBUtil.singleton(ExportScormWizard);
