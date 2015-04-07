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
}

/**
 * Render object to jQuery object to be included on page
 * @return {jQuery}
 */
CBObject.prototype.editorView = function editorView() {
	var aux = $(window.document.createElement('div'));
	aux.css('left', this.position[0])
	   .css('top', this.position[1])
	   .addClass('cbobject')
	   .addClass('cbobject-editable')
	   .attr('tabindex','-1')
	   .css('position','relative');
	var bar = $(window.document.createElement('div'));
	bar.css('background-color','#4c4c4c')
		.addClass('draggable')
		.addClass('cbobject-bar');
	var edit = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/edit.png');
	var del = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/delete.png');
	edit.click(function(){console.log('hola')});
	bar.append([edit,del]);
	aux.append(bar);
	return aux;
};

/**
 * This string is return core to bind on button click event on editor view
 * @param {jQuery} jquerycbo jQuery representation object that is included on targetcontent
 * @param {CBOjbect} objectcbo CBObject that is stored on the project to later load project or export to other format.
 * @return {String} Function string.
 */
CBObject.prototype.add_callback = function add_callback(jquerycbo,objectcbo) {
	//var x = jquerycbo.get()[0];
	//x.addEventListener('click',enableEditable);
	jquerycbo.draggable( {stop: function(event,ui){ objectcbo.position = [ui.position.left,ui.position.top]; }, scroll:true,handle:".draggable"}).click(function(){this.focus()});
};


CBObject.prototype.clickButton = function clickButton(controllerClass) {
	controllerClass.addCBIbjectIntoSection(this.editorView(),this);
};


function enableEditable(e){
	var x = $(e.currentTarget);
	if(x !== Cloudbook.UI.cbobjectselected){
		x.addClass("selected");
		if(Cloudbook.UI.cbobjectselected !== undefined){
			Cloudbook.UI.cbobjectselected.removeClass('selected');
		}
		Cloudbook.UI.cbobjectselected = x;
	}
	e.stopPropagation();
}

module.exports = CBObject;