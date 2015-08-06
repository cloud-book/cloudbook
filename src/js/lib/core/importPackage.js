/**
 * @class ImportPackage
 * @classdesc This class is responsible to make import operations of SCORM, EPUB, IMS y EXE Files
 */
function ImportPackage(){}

/**
 * This method is responsible for reading SCORM, EPUB, IMS and ELP content (Metadata + Data)
 * It assures existence of key files (imslrm and imsmanifest) and extracts all zip file
 * In addition, in case of IMS/SCORM, it detects if there is any metadata file
 * @param  {String} content of the SCORM/IMS/EPUB file
 * @param  {String} path of the SCORM/IMS/EPUB element
 * @param  {String} type of package
 */
ImportPackage.prototype.processPackage = function processPackage(data, filePath, fileType)
{
	var exists = false;
	var exists2 = false;
	var zip = new JSZip(data);
	var fs = require('fs');
	var fs2 = require('fs-extra');
	var path = require("path");
//	var tempPath = "/tmp/cloudbook/";
    var mktemp = require('mktemp');
    var tempPath = mktemp.createDirSync("/tmp/cloudbook_XXXX/");
	var metadataFile = "";
	var that = this;

	fs2.emptyDirSync(tempPath);
	if(fileType == "EPUB" && zip.file("META-INF/container.xml") != null){  
		exists = true;
		exists2 = true;
	}

	$.each(zip.files, function (index, zipEntry) {
		if((fileType == "IMS") && (zipEntry.name === "imsmanifest.xml"))
		    exists2 = true;
		if((fileType == "SCORM") && (zipEntry.name === "imsmanifest.xml"))
		    exists2 = true;
		if(fileType == "ELP"){     
		     if(zipEntry.name === "contentv3.xml" || zipEntry.name ==="contentv2.xml")
		     	exists2 = true;
		     if(zipEntry.name === "imslrm.xml"){
		     	exists = true;
		     	metadataFile = zipEntry.name; 
		     }
		}
		if (zipEntry.name.indexOf("/") != -1) 
			if(!fs2.existsSync(tempPath + zipEntry.name.substring(0,zipEntry.name.lastIndexOf("/")))) 
				fs2.mkdirpSync(tempPath + zipEntry.name.substring(0,zipEntry.name.lastIndexOf("/")));

        if(!zipEntry.dir)
	     {
	         var content = zip.files[zipEntry.name].asNodeBuffer();
	         var dest = path.join(tempPath, zipEntry.name);
		     fs.writeFileSync(dest, content);

		     if((fileType == "IMS" || fileType == "SCORM") && zipEntry.name === "imsmanifest.xml")
		     {
		     	$(content.toString()).find("metadata").children().each(function(){
		     		if(this.tagName == "ADLCP:LOCATION"){
		     			exists = true;	
		     			metadataFile = this.innerHTML;
		     		} 
		     	})
		     	if(exists == false){
		     		exists = true;
		     		metadataFile = null;
		     	}
		     }
	     }
	});

	if(exists)
		processPackageMetaData(fileType, tempPath, filePath, metadataFile);

	if(exists2){
		switch(fileType)
		{
			case "EPUB": application.importepub.getInstance().processPackageDataEPUB(tempPath); break;
			case "ELP": application.importelp.getInstance().processPackageDataELP(tempPath); break;
			default: that.processPackageData(tempPath, fileType, tempPath); break;
		}
	}
}

/**
 * This method is responsible for reading SCORM/IMS metadata
 * It reads metadata and loads it into array
 * @param  {String} type of package
 * @param  {String} temporary path
 * @param  {String} path of the SCORM/IMS/EPUB element
 * @param  {String} name of the metadata file
 */
function processPackageMetaData(fileType, tempPath, filePath, metadataFileName)
{

	var fs = require('fs');
	var epub2html = require('epub3tohtml');
	var htmlData;

	switch(fileType)
	{
		case "SCORM":
		case "IMS":
		//case "ELP":
			if (fs.existsSync(tempPath+metadataFileName)){
				fs.readFile(tempPath+metadataFileName, function(err, data) {
				  	application.importmetadata.getInstance().loadMetadata(data.toString());
				});
			}
			else{
				fs.readFile(tempPath+"imsmanifest.xml", function(err, data) {
				  	application.importmetadata.getInstance().loadIMSMetadata(data.toString());
				});
			}
		break;
		case "EPUB":
			epub2html.parse(filePath, function (err, epubData) {
				htmlData = epub2html.convertMetadata(epubData);
				application.importmetadata.getInstance().loadEPUBMetadata(htmlData.htmlMetas);
			});
		break;
	}
}

/**
 * This method is responsible for adapt paths of imgs 
 * @param  {String} code to be processed
*/
ImportPackage.prototype.changeImagePath = function changeImagePath(htmlCode, filePath)
{
	filePath = filePath == undefined?"":filePath;

	$(htmlCode).find("img").each(function(){
		if(($(this).attr("src").indexOf(Project.Info.projectpath) == -1) && ($(this).attr("src").indexOf("http") == -1))
			$(this).attr("src", Project.Info.projectpath + "/rsrc/" + filePath+ "/" + $(this).attr("src"));			
	});
}

/**
 * This method is responsible for load resources of each element
 * @param  {String} element to be processed
 * @param  {String} name of resource
*/
ImportPackage.prototype.loadElementResources = function loadElementResources(element, filter, tempPath)
{
	var fsextra = require('fs-extra');
	var path = require('path');
//	var tempPath = "/tmp/cloudbook/";
//    var mktemp = require('mktemp');
//    var tempPath = mktemp.createDirSync("/tmp/cloudbook_XXXX/");

	var childrenFiles = element.parents().find("resource[identifier='" + filter + "']").children("file");
	childrenFiles.each(function(){
		var auxPath = $(this).attr("href");
	        fsextra.copySync(path.join(tempPath, auxPath), path.join(Project.Info.projectpath, "/rsrc/", auxPath));
	});
}

/**
 * This method is responsible for processing content of a section
 * It builds the name and the content of a section
 * @param  {Object} node to be processed
 * @param  {String} id of resource
 * @param  {String} id of section processed
 * @param  {String} path of the elements
 */

 ImportPackage.prototype.processSection = function processSection(element, resourceID, idsection, filePath, tempPath, typefile) {
	var href = element.parents().find("resource[identifier='" + resourceID + "']").attr("href");
	/**
	Porque buscas el titulo en el segundo hijo solo en los IMS
	*/
	if(typefile != undefined && typefile == "IMS")
		application.controller.getInstance().updateSectionName(element.children()[1].innerText,idsection);	
	else
		application.controller.getInstance().updateSectionName(element.children("title")[0].innerText,idsection);	
	var html = $.parseHTML(fs.readFileSync(filePath + href).toString());
	/**
	Actualiza las rutas del html para que todas apunten a la carpeta raiz que en este caso es rsrc
	*/
	changeImagePath(html);
	loadElementResources(element, resourceID, tempPath);
	application.importhtml.getInstance().processHTML(html, filePath + href, idsection);
}

/**
 * This method is responsible for processing children sections
 * It reads section and if there isn't id process subsections
 * @param  {String} id of section processed
 * @param  {Object} node to be processed
 * @param  {String} path of the elements
 */
 ImportPackage.prototype.processChildrenData = function processChildrenData(idsection, element, filePath, fileType, tempPath, iscloudbook)
{
	var that = this;
	var idSectionParent = "", html = "", href = "", idSectionPreParent = "";
	var importationHTML = application.importhtml.getInstance();
	var controller = application.controller.getInstance();
	var iseXeChildren = false;

	idSectionPreParent = idsection;
	if(iscloudbook == undefined)
		idsection = controller.appendSection(idsection);
	idSectionParent = idsection;
	that.processSection(element, iscloudbook == undefined?$(element.children("item")[0]).attr("identifierref"):$(element).children("item")[0].attributes['identifierref'].value, idSectionParent, filePath, tempPath, fileType);
	iseXeChildren = element.parents().find("organizations").attr("default").substr(0,3) == "eXe";

	element.children("item:gt(0)").each(function(){
		if( this.attributes['identifierref'] != undefined){
			if(fileType == "SCORM" && iseXeChildren)
				idsection = controller.appendSection(idSectionParent);
			else
				idsection = controller.appendSection(idSectionPreParent);
			that.processSection($(this), this.attributes['identifierref'].value, idsection, filePath, tempPath);
			loadElementResources($(this), $(this).attr("identifierref"), tempPath);
			if(/*fileType == "IMS" &&*/ $(this).children("item").length > 0)
			{
				that.processChildrenData(idsection, $(this), filePath, fileType, tempPath);
			}
		}
		else
		{
			that.processChildrenData(idSectionParent, $(this), filePath, fileType, tempPath);
		}
	})
}

/**
 * This method is responsible for reading SCORM/IMS data
 * It reads files to be included and creates sections for each one
 * @param  {String} path of the unzipped elements
 */
function processPackageDataOld(filePath, fileType, tempPath)
{
	var fs = require('fs');
	var fsextra = require('fs-extra')
	var controller = application.controller.getInstance();
	var idsection = "", idSectionAux = "", idSectionRoot = "";
	var ui = application.ui.core.getInstance();
	var children = "";
//	var tempPath = "/tmp/cloudbook/";
//    var mktemp = require('mktemp');
//    var tempPath = mktemp.createDirSync("/tmp/cloudbook_XXXX/");
	var path = require("path");
	var items, iseXe = false, isCloudBook = false;
	var existsAnotherIndex = false, isFirst = true;

	var importationHTML = application.importhtml.getInstance();
	fs.readFile(filePath+"imsmanifest.xml", function(err, data) {
			if(fileType == "IMS"){
				idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
				processSection($($($(data.toString()).find("organization")).find("item")[0]), $(data.toString()).find("item:first").attr("identifierref"), idsection, filePath, tempPath);
				idSectionRoot = idsection;
				isFirst = false;
	  	  	}
	  	  	iseXe = $(data.toString()).find("organizations").attr("default").substr(0,3) == "eXe";
	  	  	isCloudBook = $(data.toString()).find("organizations").attr("default").substr(0,9) == "Cloudbook";
	  	  	if(iseXe)
				items = ($(data.toString()).find("item:first").children("item").length == 0)?$(data.toString()).find("item:first"):$(data.toString()).find("item:first").children("item");
			else
	  	  		items = $(data.toString()).find("organization").children("item");
			items.each(function(){
				if($(this).attr("identifierref") != undefined){
					loadElementResources($(this), $(this).attr("identifierref"), tempPath);
		  	  		var href = $(this).parents().find("resource[identifier='" + this.attributes['identifierref'].value + "']").attr("href");
		  	  		html = $.parseHTML(fs.readFileSync(filePath + href).toString());
		  	  		if(isFirst){
		  	  			if(!existsAnotherIndex)
	  						idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
	  					else
	  						idsection = controller.appendSection('root');
	  					idSectionRoot = idsection;
	  					existsAnotherIndex = true;
	  					isFirst = false;
	  				}else{
	  					if(iseXe)
	  						idsection = controller.appendSection(idSectionRoot);
	  					else
	  						idsection = controller.appendSection('root');
	  				}
	  				if($(this).children("title")[0].innerText == "<-")
	  					controller.updateSectionName($(this).prev()[0].innerText,idsection);
	  				else
  					controller.updateSectionName($(this).children("title")[0].innerText,idsection);
					changeImagePath(html, path.dirname(href));
					importationHTML.processHTML(html, filePath + href, idsection);
					if($(this).children("item").length > 0)
					{
						processChildrenData(idsection, $(this), filePath, fileType, tempPath);
					}
				}
				else
				{

					if(iseXe){
						idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
						idSectionAux = idsection;
						processChildrenData(idsection, $(this), filePath, fileType, tempPath);
						idsection = idSectionAux;
					}
					if(isCloudBook){
						idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
						idSectionAux = idsection;
						idsection = idSectionAux;
						processChildrenData(idsection, $(this), filePath, fileType, tempPath, isCloudBook);
						isFirst = false;
					}
				}
			});
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

/**
 * This method is responsible for reading SCORM/IMS data
 * It reads files to be included and creates sections for each one
 * @param  {String} path of the unzipped elements
 */
ImportPackage.prototype.processPackageData = function processPackageData(filePath, fileType, tempPath) {
	var fs = require("fs"),
		fsextra = require("fs-extra"),
		path = require("path"),
		controller = application.controller.getInstance(),
		ui = application.ui.core.getInstance(),
		importationHTML = application.importhtml.getInstance(),
		that = this;
	contentfile = fs.readFileSync(path.join(filePath,"imsmanifest.xml"));
	that.processImsmanifest(contentfile,filePath, fileType, tempPath);
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
};


ImportPackage.prototype.processImsmanifest = function processImsmanifest(contentfile,filePath, fileType, tempPath) {
	var that = this,
		//isFirst=true,
		idsection = Cloudbook.UI.selected.attr('data-cbsectionid'),
		idsectionroot = $(`[data-cbsectionid=${idsection}]`).parent().closest("[data-cbsectionid]").attr("data-cbsectionid"),
		//childrenrootsections,
		//contentfirstsection,
		//generatorimportfilesoftware,
		//idrsrcfirstsection,
		items;
        debugger;
 
	//generatorimportfilesoftware = that.detectImportSoftware(contentfile);

	/**if(generatorimportfilesoftware === "exe")
		if(fileType === "IMS"){
			childrenrootsections = $($(contentfile.toString()).find("organization")).find("item");
			contentfirstsection = $(childrenrootsections[0]);
			idrsrcfirstsection = $(contentfile.toString()).find("item:first").attr("identifierref");
			that.processSection(contentfirstsection, idrsrcfirstsection, idsection, filePath, tempPath);
			if (childrenrootsections.length <= 1){
				idsectionroot = idsection;
			}
			isFirst = false;
		}

		if(($(data.toString()).find("item:first").children("item").length == 0))
			items = $(data.toString()).find("item:first")
		else
			items = $(data.toString()).find("item:first").children("item");
	}
	else{*/
	
	//}

	items = $(contentfile.toString()).find("organization").children("item");
	items.each(function(){
		debugger;
		var item = $(this);
		if(item.attr("identifierref")){
			if(item.children("item").length > 0){
				that.processItemWithChildren(item,idsectionroot,filePath,tempPath,idsection);
				idsection = null;
			}
			else{
				that.processContent(item,idsectionroot,filePath,tempPath,idsection);
				idsection = null;
			}
		}
		else{
			that.processItemWithChildren(item,idsectionroot,filePath,tempPath,idsection);
			idsection = null;
		}
	});
};

ImportPackage.prototype.processItemWithChildren = function processItemWithChildren(item,idparentsection,filePath,tempPath,idsection) {
	var that = this, 
		result;
	result = that.processContent(item,idparentsection,filePath,tempPath,idsection);
	result.idparentsection = result.idsection;
	idsection = result.idsection;
	delete result.idsection;
	debugger;
	that.updateSectionName(item,idsection);
	that.processChilds(item,filePath,tempPath,result);
};


ImportPackage.prototype.updateSectionName = function updateSectionName(item,idsection) {
	debugger;
	var title = item.children("title").html(),
		controller = application.controller.getInstance();
	controller.updateSectionName(title,idsection);
};

ImportPackage.prototype.processContent = function processContent(item, idparentsection,filePath,tempPath, idsection) {
	var result,
	that = this,
	contentinchildren = false;
	controller = application.controller.getInstance(),
	importhtml = application.importhtml.getInstance();
	/**
		No tenemos seccion creada
	
		*/
    debugger;
	if(!idsection){
		idsection = controller.appendSection(idparentsection);
	}

	var href, html, resourceid;
	if(item.attr("identifierref")){
		resourceid = item.attr("identifierref");
	}
	else{
		resourceid = item.children("item:first").attr("identifierref");
		contentinchildren = true;
	}
	href = item.parents().find("resource[identifier='" + resourceid + "']").attr("href");
	html = $.parseHTML(fs.readFileSync(filePath + href).toString());



	//result = that.getHtmlFromItem(item,filePath);
	that.changeImagePath(html);
	that.loadElementResources(item, resourceid, tempPath);
	importhtml.processHTML(html, filePath + href, idsection);
	return {idsection:idsection,contentinchildren:contentinchildren};
};
/**
 * @param  {Object}  options
 * 		   {String}  options.idparentsection
 * 		   {String}	 options.contentinchildren
 */
ImportPackage.prototype.processChilds = function processChilds(item,filePath,tempPath,options) {
	var children,
		that = this;
	if (options.contentinchildren){
		children = item.children("item:gt(0)");
	}
	else{
		children = item.children("item");
	}
	debugger;
	children.each(function(){
		debugger;
		var item = $(this);
		if(item.attr("identifierref")){
			/**
				Tenemos el recurso completo
			*/
			if(item.children("item").length > 0){
				that.processItemWithChildren(item,options.idparentsection,filePath,tempPath);
				idsection = null;
			}
			else{
				that.processContent(item,options.idparentsection,filePath,tempPath);
				idsection = null;
			}
		}
		else{
			/**
			listado de items entre los cuales esta el titulo y el contenido, que el contenido es el primer item
			*/
			that.processItemWithChildren(item,options.idparentsection,filePath,tempPath);
		}
	})
};

ImportPackage.prototype.getHtmlFromItem = function getHtmlFromItem(item,filePath) {
	var href, html, resourceid;
	debugger;
	if(item.attr("identifierref")){
		resourceid = item.attr("identifierref");
	}
	else{
		resourceid = item.children("item:first").attr("identifierref");
	}
	href = item.parents().find("resource[identifier='" + resourceid + "']").attr("href");
	html = $.parseHTML(fs.readFileSync(filePath + href).toString());
	return {html:html,resourceid:resourceid};
};



ImportPackage.prototype.detectImportSoftware = function(contentfile) {

	if($(contentfile.toString()).find("organizations").attr("default").substr(0,3) == "eXe")
		return "exe";
  	if($(data.toString()).find("organizations").attr("default").substr(0,9) == "Cloudbook")
  		return "cloudbook";
  	return "unknown";
};



CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);