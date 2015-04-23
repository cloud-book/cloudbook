function ExportWebZipWizard(){}

/**
 * Initialize wizard for export project to webzip
 */
ExportWebZipWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

ExportWebZipWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportwebzipwizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportwebzipwizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



ExportWebZipWizard.prototype.showExportWebZipProject = function showExportWebZipProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportwebzipwizard").empty();
	var template = fs.readFileSync('./templates/exportWebZipProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportwebzipwizard").append(templatecompiled());
       
 	        
      
     $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[id='exportpwebzipbtn']").attr('disabled','disabled');
			     
			}else{
			    $("[id='exportwebzipbtn']").removeAttr('disabled');
					
              		}                   
          }); 
        
		
	$("[id='exportwebzipbtn']").click(function(){
		  
        var destino=$("input[name='path']").val();
	    
        var exportwebzip = application.core.exports.exportwebzip.core.getInstance();
       
	exportwebzip.paramWebZip(destino);	

	});

      $("[id='exportwebzipback']").click(function(){
	       $('#exportwebzipwizard').dialog('close');
               $('#exportwebzipwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportwebzipwizard.core');
application.ui.exportwebzipwizard.core = CBUtil.singleton(ExportWebZipWizard);
