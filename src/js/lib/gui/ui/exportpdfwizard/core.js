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

function requirefieldsPdf(){
	
   	$("#pathcontainer").removeClass("has-success").addClass("has-error");
   	$("#pathindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
		

};

function checkformPdf() {

	var headerB=$("input[name='header']:checked").val();
	var headertextB=$("input[name='headertext']").val();
   
    var pathB=$("input[name='path']").val();
    
    if (pathB!==''){
    	if (headerB==='0'){
   		 	$("[id='exportpdfbtn']").removeAttr('disabled');
	 	}else{
    		if (headertextB!==''){
    			$("[id='exportpdfbtn']").removeAttr('disabled');

    		}else{
				$("[id='exportpdfbtn']").attr('disabled','disabled');
   			}

   		}

  	 }else{
    	$("[id='exportpdfbtn']").attr('disabled','disabled');

    }
   

};


ExportPdfWizard.prototype.showExportPdfProject = function showExportPdfProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportpdfwizard").empty();
	var template = fs.readFileSync('./templates/exportPdfProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportpdfwizard").append(templatecompiled());
       
 	requirefieldsPdf();

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
                $("#headertextcontainer").removeClass("has-success").removeClass("has-error");
                $("#headertextindicator").removeClass("glyphicon-ok").removeClass("glyphicon-remove");
             
			}
			else{
				$("[name='posicionH']").removeAttr('disabled');
				$("[name='headertext']").removeAttr('disabled');
                $("#headertextcontainer").removeClass("has-success").addClass("has-error");
      			$("#headertextindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");

		

				$("input[name='headertext']").keyup(function(e){
					if (e.currentTarget.value!==""){
						$("#headertextcontainer").addClass("has-success").removeClass("has-error");
						$("#headertextindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");					
					}else{
						$("#headertextcontainer").removeClass("has-success").addClass("has-error");
      					$("#headertextindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");


				
					}
					checkformPdf();		
				});	
			
            }

        	checkformPdf();
       });
	
  

       $("input[name='path']").change(function(e){
         	
			
      		if (e.currentTarget.value===''){
		        $("#pathcontainer").removeClass("has-success").addClass("has-error");
      			$("#pathindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
		      
			     
			}else{
			  
					
            	$("#pathcontainer").addClass("has-success").removeClass("has-error");
				$("#pathindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");

            }   

             checkformPdf();                
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
          
          var parametrospdf={};
          parametrospdf['page']=page;
          parametrospdf['orientationpage']=orientacion;
          parametrospdf['path']=path;
          parametrospdf['positionfooter']=posicionN;
          parametrospdf['positionheader']=posicionH;
          parametrospdf['textheader']=textoH;
   
          var exportpdf = application.core.exports.exportPdf.core.getInstance();
          $("#exportpdfwizard").find('.waitingOK').css("display", "inline");
		  exportpdf.generatePdf(parametrospdf);	


	});

      $("[id='exportpdfback']").click(function(){
	       $('#exportpdfwizard').dialog('close');
           $('#exportpdfwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportpdfwizard.core');
application.ui.exportpdfwizard.core = CBUtil.singleton(ExportPdfWizard);
