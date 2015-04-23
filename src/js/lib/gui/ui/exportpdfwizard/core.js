function ExportPdfWizard(){}

/**
 * Initialize wizard for export project to pdf
 */
ExportPdfWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

ExportPdfWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportpdfwizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportpdfwizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



ExportPdfWizard.prototype.showExportPdfProject = function showExportPdfProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportpdfwizard").empty();
	var template = fs.readFileSync('./templates/exportPdfProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportpdfwizard").append(templatecompiled());
       
 	        
       $("input[name='numeracion']").change(function(e){
				
			if(e.currentTarget.value === "0"){
							
				$("[name='posicionN']").attr('disabled','disabled');
				
			}
			else{
				$("[name='posicionN']").removeAttr('disabled');
                               
			}
		});    
     
	
       $("input[name='header']").change(function(e){
			
			if(e.currentTarget.value === "0"){
							
				$("[name='posicionH']").attr('disabled','disabled');
				$("[name='headertext']").attr('disabled','disabled');
                                $("[name='headertext']").val('');
                                $("[name='path']").removeAttr('disabled');
			}
			else{
				$("[name='posicionH']").removeAttr('disabled');
				$("[name='headertext']").removeAttr('disabled');
				$("[name='path']").attr('disabled','disabled');
				$("input[name='headertext']").keyup(function(e){
						if (e.currentTarget.value!==""){
							$("[name='path']").removeAttr('disabled');						
						}else{
													
							$("[name='path']").attr('disabled','disabled');
						}
				});	
			
                       }			
        
       });
	
      var encabezado= $("input[name='header']:checked").val();
	if (encabezado==='0'){
		$("[name='path']").removeAttr('disabled');
        }


       $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		             $("[id='exportpdfbtn']").attr('disabled','disabled');
			     
			}else{
			    $("[id='exportpdfbtn']").removeAttr('disabled');
					
              		}                   
          }); 
        
		
	$("[id='exportpdfbtn']").click(function(){
	    var page= $("[name='pagesize']").val();  
            var orientacion=$("[name='orientation']:checked").val(); 
            var path=$("input[name='path']").val();
	    var numeracion=$("input[name='numeracion']:checked").val();

	    if (numeracion==="1"){
		var posicionN=$("[name='posicionN']:checked").val();
                       
            }else{
	        var posicionN="";
            }


	    var encabezado= $("input[name='header']:checked").val();
	    if (encabezado==="1"){
		var posicionH=$("[name='posicionH']:checked").val();
		var textoH=$("input[name='headertext']").val();
                       
            }else{
	        var posicionH="";
		var textoH="";
			
             }	
          
          var parametrosPdf={};
          parametrosPdf['page']=page;
          parametrosPdf['orientacion']=orientacion;
          parametrosPdf['path']=path;
          parametrosPdf['posicionN']=posicionN;
          parametrosPdf['posicionH']=posicionH;
          parametrosPdf['textoH']=textoH;
   
          var exportpdf = application.core.exports.exportPdf.core.getInstance();
	//  exportpdf.generatePdf(page,orientacion,path,posicionN,posicionH,textoH);
	  exportpdf.generatePdf(parametrosPdf);	

	});

      $("[id='exportpdfback']").click(function(){
	       $('#exportpdfwizard').dialog('close');
               $('#exportpdfwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportpdfwizard.core');
application.ui.exportpdfwizard.core = CBUtil.singleton(ExportPdfWizard);
