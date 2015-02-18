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
              CBUtil.createNameSpace('Project.UI.Data.Info');
              Project.UI.Data.Info.projectname = $(this).val();
              core.saveProject($(this).val());
            });
        pathelement.trigger('click');
      }


    var save_project = {
      label: 'Save Project',
      click: function saveProject() {
        if ( Project.UI.Data.Info.hasOwnProperty('projectname')){
          core.saveProject(Project.UI.Data.Info.projectname);
        }
        else{
          saveAs();
        }
      }
    };

    var save_as_project = {
      label: 'Save Project as ...',
      click: saveAs
    };


    var load_project = {
      label: 'Load Project',
      click: function load_project() {
        var pathelement = $(document.createElement('input')).attr('type','file');
        pathelement.change(function(evt) {
              core.loadProject($(this).val());
            });
        pathelement.trigger('click');
      }
    };

    var quit = {
      label: 'Quit',
      click: function quit() {
        window.close();
    }};


    /**
     * Generate menubar
     */
    var file = new gui.Menu();
    file.append(new gui.MenuItem(load_project));
    file.append(new gui.MenuItem(save_as_project));
    file.append(new gui.MenuItem(save_project));
    file.append(new gui.MenuItem(quit));

    menubar.append(new gui.MenuItem({ label: 'File', submenu: file}));

    win.menu = menubar;
})();