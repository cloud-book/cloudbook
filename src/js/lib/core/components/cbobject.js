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
	this.size = typeof objectdata.size !== 'undefined' ? objectdata.size : [200,50];
	this.idtype = typeof objectdata.idtype !== 'undefined' ? objectdata.idtype : "CBObject";
	this.uniqueid = typeof objectdata.uniqueid !== 'undefined' ? objectdata.uniqueid : CBUtil.uniqueId();
	this.levellayer = typeof objectdata.levellayer !== 'undefined' ? objectdata.levellayer : 0;
	this.degree = typeof objectdata.degree !== 'undefined' ? objectdata.degree : 0;
	this.settimeoutlist = {};
}


/**
 * Render object to jQuery object to be included on page
 * @return {jQuery}
 */
CBObject.prototype.editorView = function editorView() {
	
	//aux.mousedown({that:this},that.delaymove);
	//aux.mouseup({that:this},that.cleardelay);
	return this.getObject();
};

CBObject.prototype.getObject = function getObject(){
	var aux = $(window.document.createElement('div'));
	var cbcontainer = $(window.document.createElement('div')).addClass('cbcontainer');
	var that = this;
	aux.css('left', this.position[0])
	   .css('top', this.position[1])
	   .addClass('cbobject')
	   .addClass('cbobject-editable')
	   .attr('tabindex','-1')
	   .attr('data-cbobjectid',this.uniqueid)
	   .css('position','absolute')
	   .css('z-index',this.levellayer)
	   .css('transform',"rotate("+this.degree+"rad)")
	   .css('-ms-transform',"rotate("+this.degree+"rad)")
	   .css('-webkit-transform',"rotate("+this.degree+"rad)")
	   .css('-moz-transform',"rotate("+this.degree+"rad)")
	   .css('-o-transform',"rotate("+this.degree+"rad)")
	   .css('width',this.size[0].toString() + "px")
	   .css('height',this.size[1].toString() + "px" );
	aux.append([cbcontainer]);
	aux.click({that:this},that.enableEditable);
	//aux.mousedown({that:this},that.delaymove);
	//aux.mouseup({that:this},that.cleardelay);
	return aux;
}


/**
 * Render object to jQuery object to be exported to html
 * @return {jQuery}
 */
CBObject.prototype.htmlView = function htmlView() {
	var aux = this.getObject();
	aux.removeClass('cbobject-editable');
	return aux;
}


CBObject.prototype.pdfView = function pdfView() {
	var aux = this.getObject();
	aux.removeClass('cbobject-editable');
	return aux;
}


/**
 * This string is return core to bind on button click event on editor view
 * @param {jQuery} jquerycbo jQuery representation object that is included on targetcontent
 * @param {CBOjbect} objectcbo CBObject that is stored on the project to later load project or export to other format.
 * @return {String} Function string.
 */
CBObject.prototype.triggerAddEditorView = function triggerAddEditorView(jquerycbo,objectcbo) {
	//var x = jquerycbo.get()[0];
	//x.addEventListener('click',enableEditable);
	jquerycbo.resizable({stop: function(event,ui){ objectcbo.size = [ui.size.width,ui.size.height]} });
	jquerycbo.rotatable({stop:function(event,ui){objectcbo.degree = ui.angle.current},angle:objectcbo.degree});
};


CBObject.prototype.clickButton = function clickButton(controllerClass) {
	controllerClass.addCBObjectIntoSelectedSection(this.editorView(),this);
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
				that.triggerAddEditorView($("[data-cbobjectid='"+that.uniqueid+"']"),that);
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


CBObject.prototype.forwardButton = function forwardButton(e) {
	var that = e.data.that;
	var controller = application.controller.getInstance();
	controller.modifyObjectLevelLayer(that.uniqueid,that.levellayer + 1);
};

CBObject.prototype.backwardButton = function backwardButton(e) {
	var that = e.data.that;
	var controller = application.controller.getInstance();
	controller.modifyObjectLevelLayer(that.uniqueid,that.levellayer - 1);
};

CBObject.prototype.rotateButton = function rotateButton(e) {
	e.stopImmediatePropagation();
	var that = e.data.that;
	var controller = application.controller.getInstance();
	controller.modifyObjectRotation(that.uniqueid,e);
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


CBObject.prototype.exportHTML = function exportHTML() {
	var aux = $("<div></div>");
	aux.css('top', this.position[1])
	   .attr('tabindex','-1')
	   .css('position','absolute')
	   .css('z-index',this.levellayer)
	   .css('transform',"rotate("+this.degree+"deg)")
	   .css('width',this.size[0].toString() + "px")
	   .css('height',this.size[1].toString() + "px" );
	   return aux;
};


CBObject.prototype.delaymove = function(e) {
	var that = e.data.that;
	that.settimeoutlist["delaymove"] = setTimeout(function(){
		$("[data-cbobjectid='"+that.uniqueid+"']").addClass("draggable");
	},2000);
};

CBObject.prototype.cleardelay = function(e) {
	var that = e.data.that;
	clearTimeout(that.settimeoutlist["delaymove"]);
};



CBObject.prototype.enableEditable = function enableEditable(e){
	var that = e.data.that;
	var newid = this.dataset.cbobjectid;
	e.stopPropagation();
	
	if(Cloudbook.UI.cbobjectselected !== newid ){
		if(Cloudbook.UI.cbobjectselected !== null)
			$("#cbobjecttoolbar").remove();
			$("[data-cbobjectid='"+Cloudbook.UI.cbobjectselected+"']").removeClass('selected');
		Cloudbook.UI.cbobjectselected = newid;
		var storagemanager = application.storagemanager.getInstance();
		var jquerycbo = $("[data-cbobjectid='"+Cloudbook.UI.cbobjectselected+"']");
		jquerycbo.addClass('selected');
		var actualtop = jquerycbo.position().top;
		var toolbartop = actualtop - 30;
		var top = true;
		if(actualtop < 30){
			toolbartop = actualtop + jquerycbo.get()[0].clientHeight  ;
			top = false;
		}

		var bar = $("<div id='cbobjecttoolbar'></div>");
		var edit = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/edit.png');
		var del = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/delete.png');
		var forward = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/forward.png');
		var backward = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/backward.png');
		var rotate = $(window.document.createElement('img')).attr('src',Cloudbook.UI.themeeditorpath + '/img/rotate.png');

		edit.click({that:that},that.editButton);
		del.click({that:that},that.deleteButton);
		forward.click({that:that},that.forwardButton);
		backward.click({that:that},that.backwardButton);
		rotate.on('mousedown',{that:that},that.rotateButton);
		rotate.on('dragstart', function(event) { event.preventDefault(); });
		//var jqcboffset = jquerycbo.offset();
		//rotate.css('position',"fixed").css('top',jqcboffset.top + jquerycbo.get()[0].clientHeight - 15 + "px" ).css('left',jqcboffset.left - 15 +"px");
		bar.append([edit,del,forward,backward]);	

		bar.draggable({
			drag:function(event,ui){
				ui.position.left = ui.position.left < 0 ? 0 : ui.position.left;
				ui.position.top = ui.position.top + 30 < 0 ? -30 : ui.position.top;
				jquerycbo.css('left',ui.position.left+"px").css('top',ui.position.top + 30 +"px");
			},
			stop: function(event,ui){
				var objectcbo = storagemanager.getCBObjectById(Cloudbook.UI.cbobjectselected);
				objectcbo.position = [ui.position.left,ui.position.top + 30 < 0 ? 0 : ui.position.top + 30 ]; 
				storagemanager.setCBObjectById(objectcbo,Cloudbook.UI.cbobjectselected);
			}
		});
		bar.css('top', toolbartop +"px").css('left',jquerycbo.position().left+"px").css('position','absolute');
		$("#targetcontent").append(bar);

	}
}

module.exports = CBObject;
//@ sourceURL=cbobject.js
