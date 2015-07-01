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

function requirefields(){
	$("#titlecontainer").removeClass("has-success").addClass("has-error");
    $("#titlebookindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");

    $("#authorcontainer").removeClass("has-success").addClass("has-error");
   	$("#authorbookindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");

   	$("#langcontainer").removeClass("has-success").addClass("has-error");
   	$("#langindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");

   	$("#pathcontainer").removeClass("has-success").addClass("has-error");
   	$("#pathindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
		

}

function checkform() {

	var titleB=$("input[name='titlebook']").val();
    var authorB=$("input[name='authorbook']").val();
    var langB=$("[name='lang']").val();
    var pathB=$("input[name='path']").val();

    if ((titleB!=='')&(authorB!=='')&(langB!=='0')&(pathB!=='')){
    	 $("[id='exportepubbtn']").removeAttr('disabled');
    
    }else{
		$("[id='exportepubbtn']").attr('disabled','disabled');

    }

};



ExportEpubWizard.prototype.showExportEpubProject = function showExportEpubProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	var languages=JSON.parse(fs.readFileSync('js/lib/gui/languages.json', 'utf8'));


	
	$("#exportepubwizard").empty();
	var template = fs.readFileSync('./templates/exportEpubProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	
	$("#exportepubwizard").append(templatecompiled({languages:languages}));

	requirefields();
       
 	       
    
    $("input[name='titlebook']").keyup(function(e){
     	if (e.currentTarget.value===''){	
     		$("#titlecontainer").removeClass("has-success").addClass("has-error");
     		$("#titlebookindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
     		
		}else{
			$("#titlecontainer").addClass("has-success").removeClass("has-error");
			$("#titlebookindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
		}	

		checkform();


	});	

    $("input[name='authorbook']").keyup(function(e){
    	if (e.currentTarget.value===''){
    		$("#authorcontainer").removeClass("has-success").addClass("has-error");
    		$("#authorbookindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");

    	}else{
    		$("#authorcontainer").addClass("has-success").removeClass("has-error");
    		$("#authorbookindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
			
    	}
    	checkform();
    });

    $("select[name='lang']").change(function(e){
         	
		
   		if (e.currentTarget.value ==="0"){
   			$("#langcontainer").removeClass("has-success").addClass("has-error");
   			$("#langindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
 				 
		}else{
		    $("#langcontainer").addClass("has-success").removeClass("has-error");
		    $("#langindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
		   
       	}
       	checkform();	 
    }); 

    $("input[name='path']").change(function(e){
         	
			
      	if (e.currentTarget.value===''){
      		$("#pathcontainer").removeClass("has-success").addClass("has-error");
      		$("#pathindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
		
			     
		}else{
			$("#pathcontainer").addClass("has-success").removeClass("has-error");
			$("#pathindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
		 					
        }  
        checkform();
                 
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
