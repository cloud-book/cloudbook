function UI(main){
	this.main = main;
}

UI.prototype.showIntro = function showIntro(datainfo) {
	var container = $(document.createElement('div')).attr('id','wizard');
	var listprojects = $(document.createElement('table')).attr('id','listProjects').addClass('table').addClass('table-striped');
	datainfo.recentprojects.forEach(function(element){
		var row = $(document.createElement('tr'));
		var tdname = $(document.createElement('td')).addClass('name').html(element.name);
		var open = $(document.createElement('button')).addClass('open').html(CBI18n.gettext("Open"));
		var tdopen = $(document.createElement('td')).addClass('open').append(open);
		row.append([tdname,tdopen]);
		listprojects.append(row);
	});
	var newproject = $(document.createElement('button')).attr('id','newproject').html(CBI18n.gettext('New project')).css("float","left").click({that:this},this.showTypeProject);
	var openproject = $(document.createElement('button')).attr('id','openproject').html(CBI18n.gettext('Open project')).css("float","right");
	container.append([listprojects,newproject,openproject]);
	container.dialog({modal:true});
};

UI.prototype.showTypeProject = function(e) {
	var that = e.data.that;
	$("#wizard").empty();
	var projectname = '<div class="form-group"><label for="projectname">'+CBI18n.gettext('Project name')+'</label><input id="projectname" class="form-control" placeholder="'+CBI18n.gettext('Enter project name')+'"></div>'
	
	var advancedtype = $(document.createElement('button'))
					.html('Advanced Project')
					.click(function(){
							that.main.createProProject($("#projectname").val()); 
							$('#wizard').dialog('close');
					});
	var simpletype = $(document.createElement('button'))
					.html('Simple Project')
					.click(function(){
						that.main.createSimpleProject($("#projectname").val());
						$('#wizard').dialog('close');
					});
	$("#wizard").append([projectname,advancedtype,simpletype]);

};


UI.prototype.loadTheme = function loadTheme(){
  var fs = require('fs');
  var path = require('path');
  Cloudbook.UI.themeeditorpath = path.join('themes','editor','default');

  var cssbasepath = path.join(Cloudbook.UI.themeeditorpath,'css');
  if(fs.existsSync(cssbasepath)){
    fs.readdirSync(cssbasepath).forEach(function(csspath){
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path.join(cssbasepath,csspath);
      document.head.appendChild(css);
    });
  }
  var scriptsbasepath = path.join(Cloudbook.UI.themeeditorpath,'js');
   if(fs.existsSync(scriptsbasepath)){
    fs.readdirSync(scriptsbasepath).forEach(function(jspath){
      CBUtil.include(path.join(scriptsbasepath,jspath))
    });
  }
}