/**
 * @class Core
 * @classdesc This class is responsible to manage all app. 
 */
function Core() {
  /**
   * Root all project info
   * @namespace Project
   */
  CBUtil.createNameSpace('Project');
  /**
   * Root all cloudbook info
   * @namespace Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook');
  /**
   * Components are loaded
   * @namespace Actions
   * @memberOf Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook.Actions');
  /**
   * Ui information
   * @namespace UI
   * @memberOf Cloudbook
   */
  CBUtil.createNameSpace('Cloudbook.UI');
  /**
   * Description of project. This contain authods, name project , etc
   * @namespace Info
   * @memberOf Project
   */
  CBUtil.createNameSpace('Project.Info');
  /**
   * Define jquery selector where render CBObjects
   * @type {String}
   */
  Cloudbook.UI.targetcontent = '#targetcontent';
  /**
   * Define jquery selector where render components buttons
   * @type {String}
   */
  Cloudbook.UI.navactions = '#navactions';
  /**
   * Define jquery selector where render components buttons
   * @type {String}
   */
  Cloudbook.UI.navsections = '#navsections';
}


/**
 * Go over components path to find components and append this components on Project.Actions namespace. 
 * Also load extra scripts needed to components work fine
 */
Core.prototype.loadComponents = function loadComponents() {
  var that = this;
  var sections = CBUtil.readOnlyDirectories('./components');
  sections.forEach(function (section) {
    var actions = CBUtil.readOnlyDirectories('./components/'+section);
    actions.forEach(function (action) {
      
      var auxnamespace = 'Project.Actions.' + description['namespace'];
      CBUtil.createNameSpace(auxnamespace);
      Project.Actions[section][action] = require( auxpathcomponent + 'core.js');
      
      
    });
  });
};

Core.prototype.loadComponentsRecursive = function loadComponentsRecursive(componentpath) {
  var fs = require('fs');
  var path = require('path');
  var that = this;
  var metadatapath = path.join(componentpath,'metadata.json');
  if(fs.existsSync(metadatapath)){
    var description = require(metadatapath);
    Cloudbook.Actions[description.id] = require(path.join(componentpath,'core.js'));
    that.loadComponentExtraScripts(componentpath , description);
  }
  else{
    var listdirectories = CBUtil.readOnlyDirectories(componentpath);
    listdirectories.forEach(function(directory){
      that.loadComponentsRecursive(path.join(componentpath,directory));
    });
  }

};


/**
 * Create components buttons to append elements into selected section.
 * Here method call editorView and add_callback methods of CBObjects. 
 * See 
 * {@link CBObject#editorView} and 
 * {@link CBObject.add_callback}
 */
Core.prototype.renderActionsButtons = function renderActionsButtons(){
    var that = this;
    Object.keys(Project.Actions).forEach(function (section) {
      Object.keys(Project.Actions[section]).forEach(function (action){

        var componentpath = './components/' + section + '/' + action + '/';
        var description = require(componentpath + 'metadata.json');

        that.loadComponentExtraCss(componentpath,description);
        $(Cloudbook.UI.navactions).append($(document.createElement('button'))
          .bind('click', function () {
            var fullobject = new Project.Actions[section][action]();
            var viewobject = $(fullobject.editorView());
            $(Cloudbook.UI.targetcontent).append(viewobject);
            //eval('function _____x_____(jquerycbo,objectcbo){'+ Project.Actions[section][action].add_callback + '}; _____x_____(fullobject,viewobject); ');
            add_callback = Function('jquerycbo','objectcbo',Project.Actions[section][action].add_callback);
            add_callback(viewobject,fullobject);
            
            //loadElement(viewobject,fullobject);
            Project.UI.Data.Sections[Project.UI.selected.attr('id')-1].push(fullobject);
          })
          .html(that.calculeButtonContent(componentpath, description)));        
      });
    })
}

/**
 * On component metadata file may be field "external_scripts" . This field include libraries must be included on head file to work component fine.
 * This method is reponsible read metadata info to be include all files indicate on "external_scripts". This files are loaded 
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String[]} infobutton.external_scripts List paths to be included. This not support folders, only files.
 */
Core.prototype.loadComponentExtraScripts = function loadComponentExtraScripts(pluginpath,infobutton) {
  if (infobutton.hasOwnProperty('external_scripts')) {
      var fs = require('fs');
      var path = require('path');
      infobutton['external_scripts'].forEach(function(scriptpath){
        var script = fs.readFileSync(path.join(pluginpath,scriptpath),'utf8');
        eval(script);
      });
  } 
};


/**
 * On component metadata file may be field "external_css" . This field include style files that may be included to decorate component 
 * function or elements created by component . This method is reponsible read metadata info to be include all files indicate on "external_scripts". This files are loaded 
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String[]} infobutton.external_css List paths to be included. This not support folders, only files.
 */
Core.prototype.loadComponentExtraCss = function loadComponentExtraCss(pluginpath, infobutton){
  if (infobutton.hasOwnProperty('external_css')) {
      var head = document.getElementsByTagName('head')[0];
      infobutton['external_css'].forEach(function(csspath){
        var css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = pluginpath + csspath;
        head.appendChild(css);
      }); 
  }
}


/**
 * On component metadata file may be field "icon" and "label". This fields are used to create action component button. 
 * When user click this button, on targetcontent to been added an element.
 * @param  {String} pluginpath relative path to root component
 * @param  {Object} infobutton JSON created from metadata file.
 * @param  {String} infobutton.icon relative icon path 
 * @param  {String} infobutton.label Label button.
 * @result {String} Html code to be included on button tag
 */
Core.prototype.calculeButtonContent = function calculeButtonContent(pluginpath, infobutton) {
  var result = "";
  var fs = require('fs');
  if (infobutton.hasOwnProperty('icon')) {
    var iconpath = pluginpath + infobutton.icon;
    if (fs.existsSync(iconpath)) {
      result = '<img src="' + iconpath + '" />';
    }
  }
  if (infobutton.hasOwnProperty('label')) {
    result += infobutton.label;
  }
  return result;
};

/**
 * Initalize sections. This void Sections namespace and render initial section
 */
Core.prototype.initSections = function initSections() {
  var that = this;
  /**
   * List sections. See {@link CBSection}
   * @namespace Project.UI.Data.Sections
   */
  CBUtil.createNameSpace('Project.UI.Data.Sections');
  Project.UI.Data.Sections = [];
  var addsection = $(document.createElement('img'))
                    .attr('id','addsection')
                    .attr('src', Project.UI.themeeditorpath + '/img/add.png')
                    .bind('click', that.addSection);
  $(Cloudbook.UI.navsections).html(addsection);
};

/**
 * Create {@link CBSection} object and append it on namespace Section.
 * Also render section on navsections and bind click event to load content on targetcontent
 */
Core.prototype.addSection = function addSection() {
  Project.UI.Data.Sections.push([]);
  var sectionthumbnail = $(document.createElement('img'))
                            .attr('src', Project.UI.themeeditorpath +  '/img/white.png')
                            .attr('id', Project.UI.Data.Sections.length)
                            .bind('click', function () {loadThumbnailSelected(this); });
                            
  $(this).before(sectionthumbnail);
};

/**
 * Load project from path. This method void project and discard not saved changes. 
 * @param  {String} projectPath 
 */
Core.prototype.loadProject = function(projectPath) {
  var fs = require('fs');
  if (fs.existsSync(projectPath)){

    var projectdata = require(projectPath);
    this.voidProject();
    Project.UI.Data.Info.projectname = projectPath;
    projectdata.data.sections.forEach(function(section){
      var tempsection = [];
      section.forEach(function(element){
        tempsection.push(CBUtil.getObjectFromString('Project.Actions.' + element['type']).restore(element));
      });
      Project.UI.Data.Sections.push(tempsection);
    });
  }
  
};


Core.prototype.saveProject = function(projectPath) {
  var fs = require('fs');
    var objectProject = {};
    objectProject['name'] = "Nombre temporal";
    objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
    objectProject['data'] = {};
    objectProject['data']['sections'] = Project.UI.Data.Sections;
    var result_string = JSON.stringify(objectProject,null," ");
    fs.writeFile(projectPath,result_string);
};

Core.prototype.voidProject = function() {
  this.initSections();
};


Core.prototype.loadTheme = function loadTheme(){
  var fs = require('fs');
  var path = require('path');
  Project.UI.themeeditorpath = path.join('themes','editor','default');
  var cssbasepath = path.join(Project.UI.themeeditorpath,'css');
  fs.readdirSync(cssbasepath).forEach(function(csspath){
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = path.join(cssbasepath,csspath);
    document.head.appendChild(css);
  });
}


function loadThumbnailSelected(thumbnail) {

  if (Project.UI.selected !== undefined){
    Project.UI.selected.removeClass('sectionselected');
  } 
  // Load content into targetcontent
  
  Project.UI.selected = $(thumbnail);
  loadContent(Project.UI.selected.attr('id')-1);
  $(thumbnail).addClass('sectionselected');
}

function loadContent(id){
  $(Cloudbook.UI.targetcontent).html("");
  if (Project.UI.Data.Sections[id] !== undefined ){
    Project.UI.Data.Sections[id].forEach(function (element){
      var x = element.editorView();
      $(Cloudbook.UI.targetcontent).append(x);
      /**
       * @todo replace function loadElement by callbacks function from element
       */
      loadElement(x);
    });
  }
}


function loadElement(miobjeto , relativeobject){
            $(function() {
                $( ".draggable" ).draggable({stop: function (event,ui){relativeobject.position = [ui.position.left,ui.position.top];}});
                //miobjeto.draggable({stop: function (event,ui){relativeobject.position = [ui.position.left,ui.position.top];}});
                $( ".raptor" ).raptor({});
            });
}