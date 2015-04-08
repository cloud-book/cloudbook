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
	this.uniqueid = typeof objectdata.uniqueid !== 'undefined' ? objectdata.uniqueid : CBUtil.uniqueId();
}

/**
 * Render object to jQuery object to be included on page
 * @return {jQuery}
 */
CBObject.prototype.editorView = function editorView() {
	var aux = $(window.document.createElement('div'));
	var that = this;
	aux.css('left', this.position[0])
	   .css('top', this.position[1])
	   .addClass('cbobject')
	   .addClass('cbobject-editable')
	   .attr('tabindex','-1')
	   .attr('data-cbobjectid',this.uniqueid)
	   .css('position','relative');
	var bar = $(window.document.createElement('div'));
	bar.css('background-color','#4c4c4c')
		.addClass('draggable')
		.addClass('cbobject-bar');
	var edit = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/edit.png');
	var del = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/delete.png');
	edit.click({that:this},that.editButton);
	del.click({that:this},that.deleteButton);
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
	jquerycbo.resizable();
};


CBObject.prototype.clickButton = function clickButton(controllerClass) {
	controllerClass.addCBObjectIntoSection(this.editorView(),this);
};

CBObject.prototype.editButton = function editButton(e) {
	var that = e.data.that;
	var dialog = $("<div></div>");
	dialog.callbacks = [];
	dialog.dialog({
		modal:true,
		close:function(){
			
			var savedialog = $("<div id='savedialog'><button id='save'>Save</button><button id='cancel'>Cancel</button></div>");
			savedialog.children('#save').click(function(){
				dialog.callbacks.forEach(function lanzador(e){e()});
				var viewobject = $("[data-cbobjectid='"+that.uniqueid+"']");
				viewobject.replaceWith(that.editorView());
				that.add_callback($("[data-cbobjectid='"+that.uniqueid+"']"),that);
				var CBStorage = application.storagemanager.getInstance();
    			CBStorage.setCBObjectById(that,that.uniqueid);
				dialog.remove() ;
				$('#savedialog').dialog('destroy'); });
			savedialog.children('#cancel').click(function(){dialog.remove() ; $('#savedialog').dialog('destroy');});
			savedialog.dialog({
				modal:true,
				close:function(){
					$(this).remove();
					dialog.dialog('open')}
			});
			
		}
	});
	return dialog;
};


CBObject.prototype.deleteButton = function deleteButton(e) {
	var that = e.data.that;
	var dialog = $('<div><button id="delete">Delete</button><button id="cancel">Cancel</button></div>');
	dialog.children('#delete').click(function(){
		var controller = application.controller.getInstance();
		controller.deleteCBObjectById(Cloudbook.UI.selected.attr('data-cbsectionid'),that.uniqueid);
		dialog.dialog('close');
	});
	dialog.children('#cancel').click(function(){dialog.dialog('close');});
	dialog.dialog({modal:true,close:function(){$(this).remove()}});
};



// function enableEditable(e){
// 	var x = $(e.currentTarget);
// 	if(x !== Cloudbook.UI.cbobjectselected){
// 		x.addClass("selected");
// 		if(Cloudbook.UI.cbobjectselected !== undefined){
// 			Cloudbook.UI.cbobjectselected.removeClass('selected');
// 		}
// 		Cloudbook.UI.cbobjectselected = x;
// 	}
// 	e.stopPropagation();
// }

module.exports = CBObject;
