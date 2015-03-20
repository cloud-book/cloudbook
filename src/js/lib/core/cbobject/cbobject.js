/**
 * Base object to components. This object include position, size, type and others common elemens
 * @param {Object} objectdata Object base definition
 * @param {Array} objectdata.position Object position on page
 * @param {Array} objectdata.size Object size 
 * @param {String} objectdata.type Object type . This is used to restore object when load project
 * @class CBObject
 */
function CBObject(objectdata){
	this.position = typeof objectdata.position !== 'undefined' ? objectdata.position : [200,200];
	this.size = typeof objectdata.size !== 'undefined' ? objectdata.size : [0,0];
	this.idtype = typeof objectdata.idtype !== 'undefined' ? objectdata.idtype : "CBObject";
	this.numbering = typeof objectdata.numbering !== 'undefined' ? objectdata.numbering : "1";
}

/**
 * Render object to jQuery object to be included on page
 * @return {jQuery}
 */
CBObject.prototype.editorView = function editorView() {
	var aux = $(window.document.createElement('div'));
	aux.css('left', this.position[0])
	   .css('top', this.position[1])
	   .addClass('draggable')
	   .addClass('cbobject')
	   .addClass('cbobject-editable')
	   .css('position','relative');
	return aux;
};

/**
 * This string is return core to bind on button click event on editor view
 * @return {String} Function string.
 */
CBObject.prototype.add_callback = function add_callback(jquerycbo,objectcbo) {
	jquerycbo.draggable( {stop: function(event,ui){ objectcbo.position = [ui.position.left,ui.position.top]; }, scroll:true});
};


module.exports = CBObject;