function exportHtmlwizard(){}

/**
 * Initialize wizard for export project to pdf
 */
exportHtmlwizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	
};

exportHtmlwizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','exportHtmlwizard');
  container.dialog({
  	modal:true,
  	dialogClass: "exportHtmlwizard",
  	closeOnEscape: false,
  	resizable:false,
  	width:850
  });
};



exportHtmlwizard.prototype.showExportHtmlProject = function showExportHtmlProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#exportHtmlwizard").empty();
	var template = fs.readFileSync('./templates/exportHtmlProject.wizard.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#exportHtmlwizard").append(templatecompiled());
       
    $("input[name='path']").change(function(e){
 		console.log('Path changed');                
  	}); 
    
		
	$("[id='exporthtmlbtn']").click(function(){
	    var path = $("input[name='path']").val();
	    console.log('Doing html in '+path+'/');  
        var exporthtml = application.exporthtml.core.getInstance();
	  	exporthtml.do_html(path+'/');
	  	$('#exportHtmlwizard').dialog('close');
        $('#exportHtmlwizard').remove();
	});

    $("[id='exporthtmlback']").click(function(){
	    $('#exportHtmlwizard').dialog('close');
        $('#exportHtmlwizard').remove();
	});

};



CBUtil.createNameSpace('application.ui.exportHtmlwizard.core');
application.ui.exportHtmlwizard.core = CBUtil.singleton(exportHtmlwizard);
