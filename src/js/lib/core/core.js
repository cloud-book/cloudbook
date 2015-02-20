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
   * All sections, subsections and components of project
   * @namespace Data
   * @memberOf Project
   */
  CBUtil.createNameSpace('Project.Data');

  Project.Data.Sections = [];
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
 */
Core.prototype.loadComponents = function loadComponents() {
  this.loadComponentsRecursive('./components');

};

/**
 * Go over components path to find components and append this components on Cloudbook.Actions with id
 * Also load extra scripts needed to components work fine
 * @param  {String} componentpath Path to load component
 */
Core.prototype.loadComponentsRecursive = function loadComponentsRecursive(componentpath) {
  var fs = require('fs');
  var path = require('path');
  var that = this;
  var metadatapath = path.join(componentpath,'metadata.json');
  if(fs.existsSync(metadatapath)){
    var description = require("./"+metadatapath);
    Cloudbook.Actions[description.id] = {};
    Cloudbook.Actions[description.id]['path'] = componentpath;
    Cloudbook.Actions[description.id]['component'] = CBUtil.req(path.join(componentpath,'core.js'));
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
    var path = require('path');
    Object.keys(Cloudbook.Actions).forEach(function (component) {
      var componentpath = Cloudbook.Actions[component]['path'];
      var description = require("./" + path.join(componentpath,"metadata.json"));
      that.loadComponentExtraCss(componentpath,description);
      $(Cloudbook.UI.navactions).append($(document.createElement('button'))
          .bind('click', function () {
            var fullobject = new Cloudbook.Actions[component]['component']();
            var viewobject = $(fullobject.editorView());
            $(Cloudbook.UI.targetcontent).append(viewobject);
            fullobject.add_callback(viewobject,fullobject);
            
            //eval('function _____x_____(jquerycbo,objectcbo){'+ Project.Actions[section][action].add_callback + '}; _____x_____(fullobject,viewobject); ');
            /*
            add_callback = Function('jquerycbo','objectcbo',Cloudbook.Actions[component]['component'].add_callback);
            add_callback(viewobject,fullobject);
            */
            
            Project.Data.Sections[Cloudbook.UI.selected.attr('id')-1].push(fullobject);
          })
          .html(that.calculeButtonContent(componentpath, description)));
    });
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
        var script = fs.readFileSync("./"+ path.join(pluginpath,scriptpath),'utf8');
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
  var path = require('path');
  if (infobutton.hasOwnProperty('icon')) {
    var iconpath = path.join(pluginpath,infobutton.icon);
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
  Project.Data.Sections = [];
  var addsection = $(document.createElement('img'))
                    .attr('id','addsection')
                    .attr('src', Cloudbook.UI.themeeditorpath + '/img/add.png')
                    .bind('click', that.addSection);
  $(Cloudbook.UI.navsections).html(addsection);
};

/**
 * Create {@link CBSection} object and append it on namespace Section.
 * Also render section on navsections and bind click event to load content on targetcontent
 */
Core.prototype.addSection = function addSection() {
  Project.Data.Sections.push([]);
  var sectionthumbnail = $(document.createElement('img'))
                            .attr('src', Cloudbook.UI.themeeditorpath +  '/img/white.png')
                            .attr('id', Project.Data.Sections.length)
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
    var contentproject = fs.readFileSync(projectPath);
    var projectdata = JSON.parse(contentproject);
    this.voidProject();
    Project.Info.projectname = projectPath;
    projectdata.data.sections.forEach(function(section){
      var tempsection = [];
      section.forEach(function(element){
        tempsection.push(new Cloudbook.Actions[element['idtype']]['component'](element));
      });
      Project.Data.Sections.push(tempsection);
    });
  }
  
};


Core.prototype.saveProject = function(projectPath) {
  var fs = require('fs');
  var objectProject = {};
  objectProject['name'] = "Nombre temporal";
  objectProject['author'] = "Usuario 1 <micorreo@midominio.com>";
  objectProject['data'] = {};
  objectProject['data']['sections'] = Project.Data.Sections;
  var result_string = JSON.stringify(objectProject,null," ");
  fs.writeFile(projectPath,result_string);
};

Core.prototype.voidProject = function() {
  this.initSections();
};


Core.prototype.loadTheme = function loadTheme(){
  var fs = require('fs');
  var path = require('path');
  Cloudbook.UI.themeeditorpath = path.join('themes','editor','default');
  var cssbasepath = path.join(Cloudbook.UI.themeeditorpath,'css');
  fs.readdirSync(cssbasepath).forEach(function(csspath){
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = path.join(cssbasepath,csspath);
    document.head.appendChild(css);
  });
}


function loadThumbnailSelected(thumbnail) {

  if (Cloudbook.UI.selected !== undefined){
    Cloudbook.UI.selected.removeClass('sectionselected');
  } 
  // Load content into targetcontent
  
  Cloudbook.UI.selected = $(thumbnail);
  loadContent(Cloudbook.UI.selected.attr('id')-1);
  $(thumbnail).addClass('sectionselected');
}

function loadContent(id){
  $(Cloudbook.UI.targetcontent).html("");
  if (Project.Data.Sections[id] !== undefined ){
    Project.Data.Sections[id].forEach(function (element){
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