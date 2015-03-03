/************************
 *        Main          *
 ************************/

/*
 * Core is created in this moment by loadComponent function. This function is responsible load extra libs on components.
 * These libraries be load before 
 */

CBUtil = new Util();
CBI18n = new Translator(require('./i18n/es.js'));
var core = new Core();
CBStorage = new StorageManager();
core.loadComponents();

$(document).ready(function () {
  core.loadSectionsObjects();
  core.loadTheme();
  core.renderActionsButtons();
  core.initSections();

  /**
   * Create initial page and select this
   */
  $('#addsection').click();
  $('#addsection').prev().click();
});