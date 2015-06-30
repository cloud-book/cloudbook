function ExportEpubWizard(){}

/**
 * Initialize wizard for export project to webzip
 */
ExportEpubWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

ExportEpubWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportepubwizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportepubwizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



ExportEpubWizard.prototype.showExportEpubProject = function showExportEpubProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	var languages=JSON.parse(fs.readFileSync('js/lib/gui/languages.json', 'utf8'));
	
	$("#exportepubwizard").empty();
	var template = fs.readFileSync('./templates/exportEpubProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	
	$("#exportepubwizard").append(templatecompiled({languages:languages}));
       
 	        
      
     $("input[name='authorbook']").keyup(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[name='path']").attr('disabled','disabled');
			     $("[name='path']").val('');

		             
			     
			}else{
			    var title=$("input[name='titlebook']").val();
			    if (title!==''){
						    	
				$("[name='path']").removeAttr('disabled');
					
               		    }else{
               		 	$("[name='path']").attr('disabled','disabled');	
				$("[name='path']").val('');
               	             }   
                }
          }); 

      $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[id='exportepubbtn']").attr('disabled','disabled');
			     
			}else{
			    $("[id='exportepubbtn']").removeAttr('disabled');
					
              		}  
                 
        }); 
        
		
	$("[id='exportepubbtn']").click(function(){
		  
          var parametrosEpub={};
          parametrosEpub['title']=$("input[name='titlebook']").val();
          parametrosEpub['author']=$("input[name='authorbook']").val();
    	  parametrosEpub['publisher']=$("input[name='publisherbook']").val();
    	  parametrosEpub['cover']=$("input[name='coverbook']").val();
    	  parametrosEpub['path']=$("input[name='path']").val();
    	  parametrosEpub['lang']=$("[name='lang']").val();  
          	    

	 var exportepub = application.core.exports.exportEpub.core.getInstance();
       
	 exportepub.generateEpub(parametrosEpub);	

	});

      $("[id='exportepubback']").click(function(){
	       $('#exportepubwizard').dialog('close');
               $('#exportepubwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportepubwizard.core');
application.ui.exportepubwizard.core = CBUtil.singleton(ExportEpubWizard);
