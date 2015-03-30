(function(){
    var gui = require('nw.gui');

    // get the window object
    var win = gui.Window.get();
    var menubar = new gui.Menu({
        type: 'menubar'
      });

    /**
     * Actions for menu
     */

    function saveAs() {
        var pathelement = $(document.createElement('input')).attr('type','file').attr('nwsaveas','');
        pathelement.change(function(evt) {
              CBUtil.createNameSpace('Project.Info');
              Project.Info.projectname = $(this).val();
              core.saveProject($(this).val());
            });
        pathelement.trigger('click');
      }


    var save_project = {
      label: CBI18n.gettext('Save Project'),
      click: function saveProject() {
        if ( Project.Info.hasOwnProperty('projectname')){
          core.saveProject(Project.UI.Data.Info.projectname);
        }
        else{
          saveAs();
        }
      }
    };

    var save_as_project = {
      label: CBI18n.gettext('Save Project as ...'),
      click: saveAs
    };


    var load_project = {
      label: CBI18n.gettext('Load Project'),
      click: function load_project() {
        var pathelement = $(document.createElement('input')).attr('type','file');
        pathelement.change(function(evt) {
              core.loadProject($(this).val());
            });
        pathelement.trigger('click');
      }
    };

    var quit = {
      label: CBI18n.gettext('Quit'),
      click: function quit() {
        window.close();
    }};

    var load_metadata = {
      label: CBI18n.gettext('Metadata'),
      click: function load_metadata(){
        CBDialogMetadata = new DialogMetadata();
        CBDialogMetadata.showDialog();
      }
    };

    var import_html5 = {
      label: CBI18n.gettext('HTML5'),
      click: function import_html5(){
      var pathelement = $(document.createElement('input')).attr('type','file').attr('accept', 'text/html');
              pathelement.change(function(evt) {
                  var importation = application.importation.getInstance();
                  importation.loadFile($(this).val(), 'HTML');
              });
      pathelement.trigger('click');      
      }
    };

    var import_odt_doc_docx = {
      label: CBI18n.gettext('ODT/DOC/DOCX'),
      click: function import_odt_doc_docx(){
      var pathelement = $(document.createElement('input')).attr('type','file').attr('accept', '.doc,.docx,.odt');
              pathelement.change(function(evt) {
                  var importation = application.importation.getInstance();
                  importation.loadFile($(this).val(), 'ODT_DOC_DOCX');
              });
      pathelement.trigger('click');      
      }
    };

    var import_scorm = {
      label: CBI18n.gettext('SCORM'),
      click: function import_scorm(){
      var pathelement = $(document.createElement('input')).attr('type','file').attr('accept', '.zip');
              pathelement.change(function(evt) {
                   var importation = application.importation.getInstance();
                    importation.loadFile($(this).val(), 'SCORM');
              });
      pathelement.trigger('click');      
      }
    };

    var import_project = {
      label: CBI18n.gettext('Import')
    };

    /**
     * Generate menubar
     */
    var file = new gui.Menu();
    var project = new gui.Menu();
    var import_project_menu = new gui.Menu();
    import_project_menu.append(new gui.MenuItem(import_html5));
    import_project_menu.append(new gui.MenuItem(import_odt_doc_docx));
    import_project_menu.append(new gui.MenuItem(import_scorm));
    import_project.submenu = import_project_menu;
    file.append(new gui.MenuItem(load_project));
    file.append(new gui.MenuItem(save_as_project));
    file.append(new gui.MenuItem(save_project));
    file.append(new gui.MenuItem({type:'separator'}));
    file.append(new gui.MenuItem(import_project));
    file.append(new gui.MenuItem({type:'separator'}));
    file.append(new gui.MenuItem(quit));
    project.append(new gui.MenuItem(load_metadata));


    menubar.append(new gui.MenuItem({ label: CBI18n.gettext('File'), submenu: file}));
    menubar.append(new gui.MenuItem({ label: CBI18n.gettext('Project'), submenu: project}));




    win.menu = menubar;
})();