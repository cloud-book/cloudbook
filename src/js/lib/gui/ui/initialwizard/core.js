function InitialWizard(){}

/**
 * Initialize wizard that show open or create new project
 */
InitialWizard.prototype.showIntro = function showIntro() {
	this.initializeWizardDiv();
	this.showNewOpenProject({data:{that:this}});
};

InitialWizard.prototype.initializeWizardDiv = function() {
  var container = $(document.createElement('div')).attr('id','wizardnewopenproject');
  container.dialog({
  	modal:true,
  	dialogClass: "wizardnewopenproject",
  	closeOnEscape: false,
  	resizable:false,
  	width:350
  });
};

/**
 * Show wizard with recent projects to open, create new project or open other project
 * @param {event} e to send this object reference
 */
InitialWizard.prototype.showNewOpenProject = function showNewOpenProject(e) {
    var that = e.data.that;
    var userconfig = application.config.user.getInstance();
    var backend = application.backend.core.getInstance();
    var fs = require('fs');
    var wizarddiv = $("#wizardnewopenproject") ;
    wizarddiv.empty();

    var datainfo = userconfig.getLastProjects();
    var template = fs.readFileSync('./templates/initialwizard.step1.hbs',{encoding:'utf8'});
    var templatecompiled = application.util.template.compile(template);
    var data = {
        projects : datainfo.slice(-5)
    };
    wizarddiv.append(templatecompiled(data));
    $('#listProjects button').click({that:that},that.launcherloadProject);
    $('#newproject').click({that:that},that.showTypeProject);
    $('#importproject').click({that:that},that.showImportProject);
    
};

/**
 * Load dialog on #wizard div to create new project.
 * @param  {event} e to send this object reference
 */
InitialWizard.prototype.showTypeProject = function(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#wizardnewopenproject").empty();
	var template = fs.readFileSync('./templates/initialwizard.step2.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#wizardnewopenproject").append(templatecompiled());

	$("#advprojbtn").click(function(){
		var controller = application.controller.getInstance();
		controller.createProProject($("#projectname").val());
		$('#wizardnewopenproject').dialog('close');
		$('#wizardnewopenproject').remove();
	});
	$("#smplprojbtn").click(function(){
		var controller = application.controller.getInstance();
		controller.createSimpleProject($("#projectname").val());
		$('#wizardnewopenproject').dialog('close');
		$('#wizardnewopenproject').remove();
	});
	$("#wzrdgoback").click({that:that},that.showNewOpenProject);

	$("#projectname").keyup(function(e){
		var backend = application.backend.core.getInstance();
		if(backend.checkProjectExists(this.value)){
			$("#projectnamecontainer").removeClass("has-success").addClass("has-error");
			$("#validateindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
			$("#advprojbtn").attr("disabled","disabled");
			$("#smplprojbtn").attr("disabled","disabled");

		}
		else{
			$("#projectnamecontainer").addClass("has-success").removeClass("has-error");
			$("#validateindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
			$("#advprojbtn").removeAttr("disabled");
			$("#smplprojbtn").removeAttr("disabled");
		}
	})
	.focus();

};

InitialWizard.prototype.showImportProject = function showImportProject(e) {
	var that = e.data.that;
	var fs = require('fs');
	$("#wizardnewopenproject").empty();
	var template = fs.readFileSync('./templates/initialwizard.importprojects.hbs',{encoding:'utf8'});
	var templatecompiled = application.util.template.compile(template);
	$("#wizardnewopenproject").append(templatecompiled());

	$("#wzrdgoback").click({that:that},that.showNewOpenProject);

	$("#importhtml5").click(function(){
		var pathelement = $(document.createElement('input')).attr('type','file').attr('accept', 'text/html');
	              pathelement.change(function(evt) {
	                  var importation = application.importation.getInstance();
	                  var projectname = $('#projectname').val();
	                  importation.loadFile(projectname,$(this).val(), 'HTML');
	                  $('#wizardnewopenproject').dialog('close');
					  $('#wizardnewopenproject').remove();
	              });
	    pathelement.trigger('click');
	});

	$("#importscorm").click(function(){
		var pathelement = $(document.createElement('input')).attr('type','file').attr('accept', 'zip');
	              pathelement.change(function(evt) {
	                  var importation = application.importation.getInstance();
	                  var projectname = $('#projectname').val();
	                  importation.loadFile(projectname,$(this).val(), 'SCORM');
	                  $('#wizardnewopenproject').dialog('close');
					  $('#wizardnewopenproject').remove();
	              });
	    pathelement.trigger('click');
	});
	$("#projectname").keyup(function(e){
		var backend = application.backend.core.getInstance();
		if(backend.checkProjectExists(this.value)){
			$("#projectnamecontainer").removeClass("has-success").addClass("has-error");
			$("#validateindicator").removeClass("glyphicon-ok").addClass("glyphicon-remove");
			$("#importbuttonactions button").attr("disabled","disabled");

		}
		else{
			$("#projectnamecontainer").addClass("has-success").removeClass("has-error");
			$("#validateindicator").addClass("glyphicon-ok").removeClass("glyphicon-remove");
			$("#importbuttonactions button").removeAttr("disabled");
		}
	})
	.focus();
};


InitialWizard.prototype.launcherloadProject = function launcherloadProject(e) {
  var that = e.data.that;
  var element = e.currentTarget;
  var path = element.dataset.path;
  var controller = application.controller.getInstance();
  controller.loadProject(path + "/project.cloudbook");
  $("#wizardnewopenproject").dialog('close');
  $("#wizardnewopenproject").remove();
};


CBUtil.createNameSpace('application.ui.initialwizard.core');
application.ui.initialwizard.core = CBUtil.singleton(InitialWizard);