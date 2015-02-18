/************************
 *        Main          *
 ************************/

/*
 * Core is created in this moment by loadComponent function. This function is responsible load extra libs on components.
 * These libraries be load before 
 */

CBUtil = new Util();
var core = new Core();
core.loadComponents();

$(document).ready(function () {
  core.loadTheme();
  core.renderActionsButtons();
  core.initSections();

  /**
   * Create initial page and select this
   */
  $('#addsection').click();
  $('#addsection').prev().click();
});