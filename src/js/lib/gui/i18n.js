var util = require('util');
/**
 * Wrapper to Jed library to translate gui.
 * This wrapper extend with dinamically load content
 */
function Translator(objectdata){
	Translator.super_.call(this,objectdata);
}
util.inherits(Translator,Jed);