function UI(){
}

UI.prototype.showIntro = function showIntro() {
	var container = $(document.createElement('div')).attr('id','wizard');
	container.dialog({modal:true,dialogClass: "no-close"});
	var e = {data:{that:this}};
	this.showSelectOption(e);
};

UI.prototype.showSelectOption = function showSelectOption(e) {
	var that = e.data.that;
	var core = base.core.getInstance();

	$("#wizard").empty();
	var listprojects = $(document.createElement('table')).attr('id','listProjects').addClass('table').addClass('table-striped');
	datainfo = core.getUserConfig();
	datainfo.projects.forEach(function(element){
		var row = $(document.createElement('tr'));
		var tdname = $(document.createElement('td')).addClass('name').html(element.name);
		var open = $(document.createElement('button')).addClass('open').html(CBI18n.gettext("Open"));
		var tdopen = $(document.createElement('td')).addClass('open').append(open);
		row.append([tdname,tdopen]);
		listprojects.append(row);
	});
	var newproject = $(document.createElement('button')).attr('id','newproject').html(CBI18n.gettext('New project')).css("float","left").click({that:that},that.showTypeProject);
	var openproject = $(document.createElement('button')).attr('id','openproject').html(CBI18n.gettext('Open project')).css("float","right");
	$("#wizard").append([listprojects,newproject,openproject]);
};

UI.prototype.showTypeProject = function(e) {
	var that = e.data.that;
	$("#wizard").empty();
	var projectname = '<div id="projectnamecontainer" class="form-group has-feedback "> \
  <label for="projectname">'+CBI18n.gettext('Project name')+'</label> \
  <input id="projectname" class="form-control" placeholder="'+CBI18n.gettext('Enter project name')+'" aria-describedby="inputSuccess2Status"> \
  <span id="validateindicator" class="glyphicon form-control-feedback" aria-hidden="true"></span> \
  <span id="inputSuccess2Status" class="sr-only">(success)</span> \
  </div>';

  var advancedtype = $(document.createElement('button'))
  .html('Advanced Project')
  .attr('id','advprojbtn')
  .attr("disabled","disabled")
  .click(function(){
   var main = base.main.getInstance();
   main.createProProject($("#projectname").val()); 
   $('#wizard').dialog('close');
 });
  var simpletype = $(document.createElement('button'))
  .html('Simple Project')
  .attr('id','smplprojbtn')
  .attr("disabled","disabled")
  .click(function(){
    var main = base.main.getInstance();
    main.createSimpleProject($("#projectname").val());
    $('#wizard').dialog('close');
  });
  var goback = $(document.createElement('button'))
  .html("go back")
  .click({that:that},that.showSelectOption);
  $("#wizard").append([projectname,advancedtype,simpletype,goback]);
  $("#projectname").keyup(function(e){
    var core = base.core.getInstance();
    if(core.checkProjectExists(this.value)){
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

/**
 * Create components buttons to append elements into selected section.
 * Here method call editorView and add_callback methods of CBObjects. 
 * See 
 * {@link CBObject#editorView} and 
 * {@link CBObject.add_callback}
 */
 UI.prototype.renderActionsButtons = function renderActionsButtons(){
  var that = this;
  var core = base.core.getInstance();
  var path = require('path');
  Object.keys(Cloudbook.Actions).forEach(function (component) {
    var componentpath = Cloudbook.Actions[component]['path'];
    var description = require("./" + path.join(componentpath,"metadata.json"));
    core.loadComponentExtraCss(componentpath,description);
    $(Cloudbook.UI.navactions).append($(document.createElement('button'))
      .bind('click', function () {that.getCBObjectFromButton(component)})
      .addClass('btn').addClass('btn-default')
      .html(that.calculeButtonContent(componentpath, description)));
  });
}

/**
 * Create element from component. This include cbobject and rendered view on targetcontent. 
 * When append rendered view on targetcontent then trigger add_callback function related with component
 * @param  {String} component Component idtype indicated on metadata file.
 */
 UI.prototype.getCBObjectFromButton = function getCBObjectFromButton(component) {
  var CBStorage = base.storagemanager.getInstance();
  var fullobject = new Cloudbook.Actions[component]['component']();
  var viewobject = $(fullobject.editorView());
  $(Cloudbook.UI.targetcontent).append(viewobject);
  fullobject.add_callback(viewobject,fullobject);
  var sectionWhereAppend = CBStorage.getSectionById(Cloudbook.UI.selected.attr('data-cbsectionid'));
  sectionWhereAppend.content.push(fullobject);
};

/**
 * On component metadata file may be field "icon" and "label". This fields are used to create action component button. 
 * When user click this button, on targetcontent to been added an element.
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String} infobutton.icon relative icon path 
 * @param  {String} infobutton.label Label button.
 * @result {String} Html code to be included on button tag
 */
 UI.prototype.calculeButtonContent = function calculeButtonContent(pluginpath, infobutton) {
  var result = "";
  var fs = require('fs');
  var path = require('path');
  if (infobutton.hasOwnProperty('icon')) {
    var iconpath = path.join(pluginpath,infobutton.icon);
    if (fs.existsSync(iconpath)) {
      result = '<img src="' + iconpath + '" />';
    }
  }
  if (infobutton.hasOwnProperty('label')) {
    result += "<div>"+infobutton.label+"</div>";
  }
  return result;
};


UI.prototype.initSectionsPro = function initSectionsPro() {
  var core = base.core.getInstance();
  var cbsecid = core.initSections();
  var son = this.createSectionProView(cbsecid);
  var list = $(document.createElement('ul')).addClass("connectedSortable");
  list.append(son);
  $(Cloudbook.UI.navsections).html(list).attr('data-cbsectionid','1');
  $($(son.children('.displaysection')).children('.divselector')).click();
  this.reloadSortable();
};



UI.prototype.reloadSortable = function reloadSortable(element){
  var that = this;
  var core = base.core.getInstance();
  $(".connectedSortable").sortable({
    placeholder: "ui-state-highlight",
    opacity:0.5,
    axis:"y",
    start:function(ev,ui){that.oldparent = ui.item.parent().parent().attr('data-cbsectionid');},
    stop:function(ev,ui){
      that.newparent = ui.item.parent().parent().attr('data-cbsectionid');
      if (that.oldparent !== that.newparent ){
        listoldparent = $("[data-cbsectionid=" + that.oldparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        listnewparent = $("[data-cbsectionid=" + that.newparent + "] > ul > li").map(function(element){return this.dataset.cbsectionid});
        core.regenerateSubsection(that.oldparent,listoldparent.toArray());
        core.regenerateSubsection(that.newparent,listnewparent.toArray());
      }
    },
    connectWith:".connectedSortable"}).disableSelection();
}


UI.prototype.createSectionProView = function createSectionProView(cbsecid) {

  var section = $(document.createElement('li')).addClass('cbsection');
  section.attr('data-cbsectionid',cbsecid);

  var displaysection = $(document.createElement('div')).addClass('displaysection');
  var textsection = $(document.createElement('div')).addClass('divselector');
  var actions = $(document.createElement('button')).html('+').attr('data-toggle','dropdown').attr('id',cbsecid);
  var subsections = $(document.createElement('ul')).addClass('subsections').addClass("connectedSortable");
  textsection.append($(document.createElement('span')).html("1.Seccion"));
  
  textsection.click({that:this},this.selectSection);
  actions.click({that:this},this.createMenu);
  displaysection.append([textsection,actions]);
  section.append([displaysection,subsections]);
  return section ;
};

UI.prototype.createMenu = function createMenu(e) {
  var that = e.data.that;
  var element = $(e.currentTarget);
  element.contextMenu([{name:'Insertar antes',fun:function(){that.appendBefore(e)}},{name:'Insertar despues',fun:function(){that.appendAfter(e)}},{name:'Insertar Submenu',fun:function(){that.appendSubsection(e)}},{name:'Borrar'},{name:'Editar'}]);
  element.trigger('click.contextMenu',[e]);
};



UI.prototype.createSectionPageView = function createSectionPageView(cbsecid) {

  var section = $(document.createElement('li')).addClass('cbsection');
  section.attr('data-cbsectionid',cbsecid);

  var thumbnail = $(document.createElement('div')).addClass('displaysection');

  var appendbefore = $(document.createElement('div')).addClass('appendbefore');
  var sectionimage = $(document.createElement('div')).addClass('divselector');
  var appendsubsection = $(document.createElement('div')).addClass('appendsubsection');
  var appendafter = $(document.createElement('div')).addClass('appendafter');
  var subsections = $(document.createElement('ul')).addClass('subsections').addClass("connectedSortable");

  appendbefore.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/add.png"));
  appendsubsection.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/subsection.png"));
  appendafter.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/add.png"));
  sectionimage.append($(document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath+"/img/white.png"));
  

  appendbefore.click({that:this},this.appendBefore);
  appendsubsection.click({that:this},this.appendSubsection);
  appendafter.click({that:this},this.appendAfter);
  sectionimage.click({that:this},this.selectSection);

  thumbnail.append([appendbefore,sectionimage,appendsubsection,appendafter]);

  section.append([thumbnail,subsections]);
  return section ;
};




UI.prototype.appendBefore = function appendBefore(e){
  var CBStorage = base.storagemanager.getInstance();
  var that = e.data.that;
  var listparents = $(e.currentTarget).parents('.cbsection');
  var core = base.core.getInstance();
  var parent = null;
  if (listparents.length <2){
    parent = "1";
  } 
  else{
    parent = $(listparents[1]).attr('data-cbsectionid');
  }
  var cbsecid = core.appendNewSectionObjectByUID(parent,'basic');
  var son = that.createSectionProView(cbsecid);
  $(listparents[0]).before(son);
  that.reloadSortable();
}


UI.prototype.appendSubsection = function appendSubsection(e){
  var that = e.data.that;
  var CBStorage = base.storagemanager.getInstance();
  var parent = $(e.currentTarget).parents('.cbsection');
  var core = base.core.getInstance();
  var parentObjectSection = $(parent[0]).attr('data-cbsectionid');
  var cbsecid = core.appendNewSectionObjectByUID(parentObjectSection,'basic');
  var newsection = that.createSectionProView(cbsecid);
  $(parent[0]).children("ul").append(newsection);
  that.reloadSortable();
}

UI.prototype.appendAfter = function appendAfter(e){
  var that = e.data.that;
  var CBStorage = base.storagemanager.getInstance();
  var core = base.core.getInstance();
  var listparents = $(e.currentTarget).parents('.cbsection');
  var parentObjectSection = null;
  if (listparents.length <2){
    parentObjectSection = "1";
  } 
  else{
    parentObjectSection = $(listparents[1]).attr('data-cbsectionid');
  }
  var cbsecid = core.appendNewSectionObjectByUID(parentObjectSection,'basic');
  var son = that.createSectionProView(cbsecid);
  $(listparents[0]).after(son);
  that.reloadSortable();
}

UI.prototype.selectSection = function selectSection(e){
  var that = e.data.that;
  if (Cloudbook.UI.selected !== undefined){
    $(Cloudbook.UI.selected.children('.displaysection')).removeClass('sectionselected');
  } 
  Cloudbook.UI.selected = $($(this).parents('.cbsection')[0]);
  Cloudbook.UI.selected.children('.displaysection').addClass('sectionselected');
  that.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

UI.prototype.loadContent = function loadContent(id){
  var CBStorage = base.storagemanager.getInstance();
  $(Cloudbook.UI.targetcontent).html("");
  var section = CBStorage.getSectionById(id);
  if (section !== undefined ){
    section.content.forEach(function (element){
      var x = element.editorView();
      $(Cloudbook.UI.targetcontent).append(x);
      element.add_callback(x,element);
    });
  }
}

UI.prototype.updateSectionName = function(name,cbsectionid) {
  $("li[data-cbsectionid='"+cbsectionid+"'] > div.displaysection > div.divselector").html("<span>"+name+"</span>");
};



CBUtil.createNameSpace('base.ui');
base.ui = CBUtil.singleton(UI);