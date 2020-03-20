/**
 * Responsible class to manage all things related with GUI
 * @constructor
 */
function UI(){
  this.sectionmanager = null;
}


/**
 * Load theme to apply all aplication. This function look for css/js folders and load all find.
 */
UI.prototype.loadTheme = function loadTheme(){
  var fs = require('fs');
  var path = require('path');
  Cloudbook.UI.themeeditorpath = path.join('themes','editor','default');

  var cssbasepath = path.join(Cloudbook.UI.themeeditorpath,'css');
  if(fs.existsSync(cssbasepath)){
    fs.readdirSync(cssbasepath,{withFileTypes:true}).forEach(function(csspath){
      if(csspath.isDirectory()) { return; }
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = path.join(cssbasepath,csspath.name);
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


UI.prototype.loadExportTheme = function loadExportTheme(themename) {
  var path = require('path');
  var fs = require('fs');
  var auxpath = path.join('themes','export',themename);
  Cloudbook.UI.exportthemepath = fs.existsSync(auxpath)?auxpath: path.join('themes','export','default');
};



/**
 * Create components buttons to append elements into selected section.
 * Here method call editorView and triggerAddEditorView methods of CBObjects.
 * See
 * {@link CBObject#editorView} and
 * {@link CBObject.triggerAddEditorView}
 */
 UI.prototype.renderActionsButtons = function renderActionsButtons(){

  try{
    if(!Cloudbook.UI.renderedActionsButtons){
    var that = this;
    var backend = application.backend.core.getInstance();
    var userconfigmanager = application.config.user.getInstance();
    var userconfig = userconfigmanager.getUserConfig();
    if (! userconfig.hasOwnProperty('toolbar')){
      userconfig['toolbar'] = that.defaultToolbar();
      userconfigmanager.saveUserConfig(userconfig);
    }
    userconfig['toolbar'].forEach(function(identifier){
        var componentpath = Cloudbook.Actions[identifier]['path'];
        var description = Cloudbook.Actions[identifier]['metadata'];
        $(Cloudbook.UI.navactions).append($(document.createElement('button'))
        .bind('click', function () {that.getCBObjectFromButton(identifier)})
        .addClass('btn').addClass('btn-default')
        .html(that.calculeButtonContent(componentpath, description)));  
    })
    // var path = require('path');
    // Object.keys(Cloudbook.Actions).forEach(function (component) {
    //   var componentpath = Cloudbook.Actions[component]['path'];
    //   var description = require("./" + path.join(componentpath,"metadata.json"));
    //   backend.loadComponentExtraCss(componentpath,description);
    //   $(Cloudbook.UI.navactions).append($(document.createElement('button'))
    //     .bind('click', function () {that.getCBObjectFromButton(component)})
    //     .addClass('btn').addClass('btn-default')
    //     .html(that.calculeButtonContent(componentpath, description)));
    // });
  /**
   * Flag to detect if actions were rendered
   * @type {boolean}
   */
   Cloudbook.UI.renderedActionsButtons = true;
 }
  }
  catch(e){}
  
}

UI.prototype.defaultToolbar = function defaultToolbar() {
  return ["438eef56-06c2-4ece-b516-16937ef42208",
          "aa0e3021-2315-4950-a3b2-ccf4cc51af5",
          "ea54d8be-d607-4c50-a655-8d2787d08e2e",
          "9c0063d1-cf14-45b5-b4c3-0264263359ad",
          "b966e4b3-05e9-41db-a1ae-7ed1e03a7bc4",
          "87d7b00a-a296-4cd9-af13-f8d9685a6dec",
          "ad2a6410-8dcd-4ca7-9bf7-73043dcd5771",
          "05696a9f-cc0e-4ef3-b243-0a6b20cefb8b",
          "f5bc49e8-eb52-455f-8c4b-8470dab081c0",
          "4041227c-8738-4787-af3d-71d196aad257",
          "f1ef211a-562a-4e00-bae2-ca5b471bec16",
          "3233071a-24fa-4476-a677-19613ffbafed"
          ];
};


/**
 * Create element from component. This include cbobject and rendered view on targetcontent.
 * When append rendered view on targetcontent then trigger triggerAddEditorView function related with component
 * @param  {String} component Component idtype indicated on metadata file.
 */
 UI.prototype.getCBObjectFromButton = function getCBObjectFromButton(component) {
  var fullobject = new Cloudbook.Actions[component]['component']();
  var controller = application.controller.getInstance();
  fullobject.clickButton(controller);
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

  return result;
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

UI.prototype.loadContent = function loadContent(id){
  var that = this;
  var CBStorage = application.storagemanager.getInstance();
  $(Cloudbook.UI.targetcontent).html("");
  var section = CBStorage.getSectionById(id);
  if (section !== undefined ){
    section.content.forEach(that.renderCBObject,that);
  }
}

UI.prototype.loadProject = function loadProject(path) {
  var CBStorage = application.storagemanager.getInstance();
  var root = CBStorage.getRoot();
  var that = this;
  this.setSectionManager('Pro');
  this.sectionmanager.initSections();
  var pool = [];
  pool = root.sections.map(function(el){return {parent:'root',identifier:el}});
  while(node = pool.shift()){
    var son = that.sectionmanager.createSectionView(node.identifier);
    $('[data-cbsectionid="'+node.parent+'"] > ul').append(son);
    var objraw = CBStorage.getSectionById(node.identifier);
    pool = pool.concat(objraw.sections.map(function(el){return {parent:node.identifier,identifier:el}}));
  }
  $("#navsections > ul > li:first-child > .displaysection .divselector").click();
};

UI.prototype.emptyTargetContent = function emptyTargetContent() {
  var targetcontent = $(Cloudbook.UI.targetcontent);
  targetcontent.get()[0].removeEventListener('click',this.removeSelectElement);
  targetcontent.get()[0].addEventListener('click',this.removeSelectElement);
  targetcontent.empty();
};

UI.prototype.removeSelectElement = function removeSelectElement(event) {
  if (Cloudbook.UI.cbobjectselected !== null){
    if(document.getSelection().getRangeAt(0).toString().length === 0){
      $("[data-cbobjectid='"+Cloudbook.UI.cbobjectselected+"']").removeClass('selected');
      $("#cbobjecttoolbar").remove();
      Cloudbook.UI.cbobjectselected = null;
      
    }
  }
};


UI.prototype.setSectionManager = function(type) {
  if( type === "Pro" ){
    var promanager = CBUtil.req('js/lib/gui/ui/proview/core.js');
    this.sectionmanager = new promanager();
  }
  else{
    var simplemanager = CBUtil.req('js/lib/gui/ui/simpleview/core.js');
    this.sectionmanager = new simplemanager();
  }
};

UI.prototype.setTitleName = function(text) {
  document.title = text + " - CloudBook" ;
};


UI.prototype.addCBObject = function addCBObject(jquerycbo,cbobject) {
  $(Cloudbook.UI.targetcontent).append(jquerycbo);
  cbobject.triggerAddEditorView(jquerycbo,cbobject);
};

UI.prototype.removeCBObjectById = function removeCBObjectById(cbobjectid) {
  var targetcontent = $(Cloudbook.UI.targetcontent);
  var x = targetcontent.find('[data-cbobjectid="'+cbobjectid+'"]');
  $(x).remove();
};

UI.prototype.modifyObjectLevelLayer = function modifyObjectLevelLayer(cbobjectid,level) {
  var targetcontent = $(Cloudbook.UI.targetcontent);
  var x = targetcontent.find('[data-cbobjectid="'+cbobjectid+'"]');
  $(x).css('z-index',level);
};


UI.prototype.renderCBObject = function renderCBObject(cbobjectid) {
  var CBStorage = application.storagemanager.getInstance();
  var objectcbo = CBStorage.getCBObjectById(cbobjectid);
  var jquerycbo = objectcbo.editorView();
  this.addCBObject(jquerycbo,objectcbo);
};

UI.prototype.modifyObjectRotation = function modifyObjectRotation(cbobjectid,callback,e) {

  var that = this;
  var degree = 0 ;
  var objetctorotate = $('[data-cbobjectid='+cbobjectid+']');
  var offset = objetctorotate.offset();
  var objecttorotatewidth = objetctorotate.width();
  var objecttorotateheight = objetctorotate.height();
  var objecttorotateinitvalue = [offset.left + objecttorotatewidth / 2 , offset.top + objecttorotateheight /2 ];

  var rotate = function rotate(){
    var actualmouse = [event.pageX, event.pageY];
    degree = that.calcRotation(objecttorotateinitvalue,actualmouse);
    objetctorotate.css('transform','rotate('+degree+'deg)');
  }

  var fixrotate = function fixrotate(){
      $(document).unbind('mousemove',rotate);
      $(document).unbind('mouseup',fixrotate);
      var CBStorage = application.storagemanager.getInstance();
      var aux = CBStorage.getCBObjectById(cbobjectid);
      aux.degree = degree;
      CBStorage.setCBObjectById(aux,cbobjectid);
  }
  $(document).mousemove(rotate);

  $(document).mouseup(fixrotate);

  // that.stop=3;
  // var initval,endval= [];
  // var currentMousePosx,currentMousePosy;
  // var registerPosition = function registerPosition(event) {
  //       that.currentMousePosx = event.pageX;
  //       that.currentMousePosy = event.pageY;
  //   }
  // $(document).mousemove(registerPosition);

  // var loop; 
  // var f = function(e){ 
    
  //   that.stop--;
  //   if(that.stop<1){ 
  //     $(document).unbind('click',f);
  //     $(document).unbind('mousemove',registerPosition);
  //     clearInterval(loop);
  //     var CBStorage = application.storagemanager.getInstance();
  //     var aux = CBStorage.getCBObjectById(cbobjectid);
  //     aux.degree = that.calcRotation(that.initval,[that.currentMousePosx,that.currentMousePosy]);
  //     CBStorage.setCBObjectById(aux,cbobjectid);

  //   };
  //   if (that.stop == 1){
  //     var objetctorotate = $('[data-cbobjectid='+cbobjectid+']');
  //     var offset = objetctorotate.offset();
  //     var width = objetctorotate.width();
  //     var height = objetctorotate.height();
  //     that.initval=[offset.left + width / 2 , offset.top + height /2 ];
  //     loop=setInterval(function(){that.updateAngle(cbobjectid,that)},50) }
  //   };

  // $(document).on('click',f);
};
UI.prototype.calcRotation = function calcRotation(iniCoord,endCoord) {
    var dx,dy,ang;
    dx=endCoord[0]-iniCoord[0];
    dy=endCoord[1]-iniCoord[1];
    ang= - Math.atan2(dx,dy)*180/3.1415;
    if (ang < 5 && ang > -5){
      ang = 0;
    }
    if (ang < 95 && ang > 85){
      ang = 90;
    }
    if (ang > 175 || ang < -175){
      ang = -180;
    }
    if (ang < -85 && ang > -95){
      ang = -90;
    }
    return ang;
}
UI.prototype.updateAngle = function updateAngle(cbobjectid,ini) {
  //prueba de repeticion bucle
  var ang = this.calcRotation(ini.initval,[ini.currentMousePosx,ini.currentMousePosy]);
    $('[data-cbobjectid='+cbobjectid+']').css('transform','rotate('+ang+'deg)');
    //infinite loop waiting for definitive angle
    return ang;
}

/**
 * This namespace has singleton instance of UI class
 * @namespace ui
 * @memberOf application
 */
CBUtil.createNameSpace('application.ui.core');
application.ui.core = CBUtil.singleton(UI);
