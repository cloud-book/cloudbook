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
	if(window.debugMode){
		aux.append("<div>"+this.uniqueid+"</div>");
	}
	aux.append([cbcontainer]);
	aux.click({that:this},that.enableEditable);
	//aux.on('changesection',function(e){e.preventDefault(); console.log(e)});
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

CBObject.prototype.epubView = function epubView() {
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
	jquerycbo.resizable({stop: function(event,ui){ objectcbo.size = [ui.size.width,ui.size.height]}});
	jquerycbo.rotatable({stop:function(event,ui){ objectcbo.degree = ui.angle.current},angle:objectcbo.degree});
	jquerycbo.bind('keydown','del',function(e){
		objectcbo.deleteDialog(objectcbo);
		$(Cloudbook.UI.targetcontent).trigger("click");
	});
	jquerycbo.bind('keydown','backspace',function(e){
		objectcbo.deleteDialog(objectcbo);
		$(Cloudbook.UI.targetcontent).trigger("click");
	});
};


CBObject.prototype.clickButton = function clickButton(controllerClass) {
	controllerClass.addCBObjectIntoSelectedSection(this.editorView(),this);
};

CBObject.prototype.editButton = function editButton(e) {
	var that = e.data.that;
	var dialog = $("<div><div class='content'></div><footer><div id='savedialog'><button id='save'>"+CBI18n.gettext("Save")+"</button><button id='cancel'>"+CBI18n.gettext("Cancel")+"</button></div></footer></div>");
	dialog.callbacks = [];
	dialog.dialog({
		dialogClass: "cbdialog",
		modal:true,
		close:function(){
			$(this).dialog('destroy');
		}
	});
	dialog.find('#save').click(function(){
		dialog.callbacks.forEach(function lanzador(e){e()});
		var viewobject = $("[data-cbobjectid='"+that.uniqueid+"']");
		viewobject.replaceWith(that.editorView());
		that.triggerAddEditorView($("[data-cbobjectid='"+that.uniqueid+"']"),that);
		var CBStorage = application.storagemanager.getInstance();
    	CBStorage.setCBObjectById(that,that.uniqueid);
		dialog.remove() ;
		$('#savedialog').dialog('destroy'); 
	});
	dialog.find('#cancel').click(function(){
		dialog.remove() ;
		$('#savedialog').dialog('destroy');
	});

	return dialog;
};


CBObject.prototype.forwardButton = function forwardButton(e) {
	var that = e.data.that;
	var controller = application.controller.getInstance();
	controller.modifyObjectLevelLayer(that.uniqueid,that.levellayer + 1);
	e.stopPropagation();
};

CBObject.prototype.clone = function clone(e) {
	var that = e.data.that;
	var controller = application.controller.getInstance();
	controller.cloneCBObject(that.uniqueid);
	e.stopPropagation();
};


CBObject.prototype.backwardButton = function backwardButton(e) {
	var that = e.data.that;
	var controller = application.controller.getInstance();
	controller.modifyObjectLevelLayer(that.uniqueid,that.levellayer - 1);
	e.stopPropagation();
};




CBObject.prototype.deleteButton = function deleteButton(e) {
	var that = e.data.that;
	that.deleteDialog(that);
};

CBObject.prototype.deleteDialog = function(that) {
	var dialog = $('<div><button id="delete">'+ CBI18n.gettext("Delete") +'</button><button id="cancel">'+ CBI18n.gettext("Cancel") +'</button></div>');
	dialog.children('#delete').click(function(){
		var controller = application.controller.getInstance();
		controller.deleteCBObjectById(Cloudbook.UI.selected.attr('data-cbsectionid'),that.uniqueid);
		dialog.dialog('close');
	});
	dialog.children('#cancel').click(function(){dialog.dialog('close');});
	dialog.dialog({dialogClass: "cbdialog",modal:true,close:function(){$(this).remove()}});
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


	var selectedevent = new CustomEvent('cbobjectselected',{
	    'bubbles':true,
	    'cancelable':true
	 });
	selectedevent.data = {'element':this};

	 [].forEach.call( document.querySelectorAll(Cloudbook.UI.targetcontent + " .cbobject") ,function(element){
	     element.dispatchEvent(selectedevent);
	 });



	e.stopPropagation();
	
	if(Cloudbook.UI.cbobjectselected !== newid ){
		if(Cloudbook.UI.cbobjectselected !== null)
			$("#cbobjecttoolbar").remove();
			$("[data-cbobjectid='"+Cloudbook.UI.cbobjectselected+"']").removeClass('selected');
		Cloudbook.UI.cbobjectselected = newid;
		var storagemanager = application.storagemanager.getInstance();
		var jquerycbo = $("[data-cbobjectid='"+Cloudbook.UI.cbobjectselected+"']");
		jquerycbo.addClass('selected');
		var node = jquerycbo.get()[0];
		var actualtop = (node.offsetTop - node.scrollTop + node.clientTop)
		var toolbarheight = 24;
		var toolbartop = actualtop - toolbarheight;
		var top = true;
		if(actualtop < toolbarheight){
			toolbartop = actualtop + jquerycbo.get()[0].clientHeight  ;
			top = false;
		}
		var toolbarleft = (node.offsetLeft - node.scrollLeft + node.clientLeft - 1 );

		var bar = $("<div id='cbobjecttoolbar'></div>");
		var edit = $(window.document.createElement('div')).addClass('cb-ui-icons cb-ui-edit cb-toolbar');
		var del = $(window.document.createElement('div')).addClass('cb-ui-icons cb-ui-delete cb-toolbar');
		var forward = $(window.document.createElement('div')).addClass('cb-ui-icons cb-ui-forward cb-toolbar');
		var backward = $(window.document.createElement('div')).addClass('cb-ui-icons cb-ui-backward cb-toolbar');
		var clone = $(window.document.createElement('div')).addClass('cb-ui-icons cb-ui-clone cb-toolbar');

		edit.click({that:that},that.editButton);
		del.click({that:that},that.deleteButton);
		forward.click({that:that},that.forwardButton);
		backward.click({that:that},that.backwardButton);
		clone.click({that:that},that.clone);
		bar.append([edit,del,forward,backward,clone]);
		$("#targetcontent").append(bar);
		bar.css('padding-right','20px');
		
		bar.draggable({
			drag:function(event,ui){
				if(top){
					ui.position.left = ui.position.left < 0 ? 0 : ui.position.left;
					ui.position.top = ui.position.top + toolbarheight < 0 ? -toolbarheight : ui.position.top;
					jquerycbo.css('left',ui.position.left +"px").css('top',ui.position.top + toolbarheight +"px");
				}
				else{
					ui.position.left = ui.position.left < 0 ? 0 : ui.position.left;
					ui.position.top = ui.position.top - jquerycbo.height() < 0 ? jquerycbo.height() : ui.position.top;
					jquerycbo.css('left',ui.position.left +"px").css('top',ui.position.top - jquerycbo.height() +"px");
				}
				
			},
			stop: function(event,ui){
				var objectcbo = storagemanager.getCBObjectById(Cloudbook.UI.cbobjectselected);
				objectcbo.position = [ui.position.left,ui.position.top + toolbarheight < 0 ? 0 : ui.position.top + toolbarheight ]; 
				storagemanager.setCBObjectById(objectcbo,Cloudbook.UI.cbobjectselected);
			}
		});
		bar.css('top', toolbartop +"px").css('left',toolbarleft+"px").css('position','absolute');
		

	}
}

CBObject.prototype.importHTML = function importHTML(node) {
	try{

	  var width = this.size[0];
	  if(node.hasOwnProperty("clientWidth")){
		  if ( node.clientWidth !== null && node.clientWidth !== undefined ){
		  	if(node.clientWidth==0){
		  		if(node.hasAttributes() && node.attributes['width'] != undefined)
		  			width = node.attributes['width'].nodeValue
		  	}else{
		  		width = (node.clientWidth!=0)?node.clientWidth:this.size[0];
		  	}
		  }
		  else{
		  	if(node.hasAttributes()){
	        	if(node.attributes['width'] != undefined) 
	          		width = node.attributes['width'].nodeValue;
	        }
		  }
	  }
	  var height = this.size[1];
	  if(node.hasOwnProperty("clientHeight")){
		  if ( node.clientHeight !== null && node.clientHeight !== undefined){
		  	if(node.clientHeight==0){
		  		if(node.hasAttributes() && node.attributes['height'] != undefined)
		  			height = node.attributes['height'].nodeValue
		  	}else{
		  		height = (node.clientHeight!=0)?node.clientHeight:this.size[1];
		  	}
		  }
		  else{
		  	if(node.hasAttributes()){
		  		if(node.attributes['height'] != undefined)
	          		height = node.attributes['height'].nodeValue;   
	        }
		  }
	  }
	  var left = 0;
	  if(node.hasOwnProperty("offsetLeft")){
	  	left = node.offsetLeft !== null && node.offsetLeft !== undefined ? node.offsetLeft : this.position[0];
	  }
	  else{
	  	left = this.position[0];
	  }

	  var top = 0;
	  if(node.hasOwnProperty("offsetTop")){
	  	top = node.offsetTop !== null && node.offsetTop !== undefined ? node.offsetTop : this.position[1];
	  }
	  else{
	  	top = this.position[1];
	  }
      this.position = [left,top];
      this.size = [width,height];
	}
	catch(e){
	}
};

CBObject.prototype.copyresource = function(origpath) {
	var path = require('path');
	var fs = require('fs-extra');
	
	var basename = path.basename(origpath);
	var destpath = path.join(Project.Info.projectpath, "rsrc", basename);
	while(true){
        if(!fs.existsSync(destpath)){
            break;
        }
        basename = 0 + basename;
        destpath = path.join(Project.Info.projectpath, "rsrc", basename);
    }
    fs.copySync(origpath,destpath);
    return destpath;
};

CBObject.prototype.cloneTrigger = function cloneTrigger() {
  this.uniqueid = CBUtil.uniqueId();
};

CBObject.prototype.getResourcesFiles = function getResourcesFiles() {
	return [];
};

module.exports = CBObject;
//@ sourceURL=/usr/share/cloudbook/src/js/lib/core/components/cbobject.js
