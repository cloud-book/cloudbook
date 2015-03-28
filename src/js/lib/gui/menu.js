(function(){
    var gui = require('nw.gui');

    // get the window object
    var win = gui.Window.get();
    var menubar = new gui.Menu({
        type: 'menubar'
      });
    var controller = application.controller.getInstance();
    /**
     * Actions for menu
     */

    function newProject(){
      var initialwizard = application.ui.initialwizard.core.getInstance();
      initialwizard.initializeWizardDiv();
      initialwizard.showTypeProject({data:{that:initialwizard}});
      $("#wzrdgoback").unbind('click');
      $("#wzrdgoback").click(function(){$("#wizard").dialog('close');$("#wizard").remove()});
    }

    function saveAs() {
        var pathelement = $(document.createElement('input')).attr('type','file').attr('nwdirectory','');
        pathelement.change(function(evt) {
              CBUtil.createNameSpace('Project.Info');
              Project.Info.projectname = $(this).val();
              controller.saveProject($(this).val());
            });
        pathelement.trigger('click');
      }

    var new_project = {
      label: CBI18n.gettext('New project'),
      click: newProject
    };

    var save_project = {
      label: CBI18n.gettext('Save Project'),
      click: function saveProject() {
        if ( Project.Info.hasOwnProperty('projectpath')){
          controller.saveProject(Project.Info.projectpath);
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
              controller.loadProject($(this).val());
            });
        pathelement.trigger('click');
      }
    };

    var quit = {
      label: CBI18n.gettext('Quit'),
      click: function quit() {
        window.close();
    }};


    /**
     * Generate menubar
     */
    var file = new gui.Menu();
    file.append(new gui.MenuItem(new_project));
    file.append(new gui.MenuItem(load_project));
    file.append(new gui.MenuItem(save_as_project));
    file.append(new gui.MenuItem(save_project));
    file.append(new gui.MenuItem(quit));

    menubar.append(new gui.MenuItem({ label: CBI18n.gettext('File'), submenu: file}));

    win.menu = menubar;
})();