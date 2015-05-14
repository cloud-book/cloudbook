/**
 * @class ImportPackage
 * @classdesc This class is responsible to make import operations of SCORM and IMS Files
 */
function ImportPackage(){}

/**
 * This method is responsible for reading SCORM and IMS content (Metadata + Data)
 * It assure existence of key files (imslrm and imsmanifest) and extracts all zip file
 * @param  {String} content of the SCORM/IMS file
 * @param  {String} path of the SCORM/IMS element
 * @param  {String} type of package
 */
ImportPackage.prototype.processPackage = function processPackage(data, filePath, fileType)
{
	var exists = false;
	var exists2 = false;
	var zip = new JSZip(data);
	var fs = require('fs');
	var path = require("path");
	var tempPath = "/tmp/cloudbook/";

	if(!fs.existsSync(tempPath))
		fs.mkdirSync(tempPath);
	else
	{
		deleteFolderRecursive(tempPath);
	  	fs.mkdirSync(tempPath);
	}
	$.each(zip.files, function (index, zipEntry) {
		if(fileType == "IMS"){
		     if(zipEntry.name === "imsmanifest.xml"){
		     	exists = true;
		     	exists2 = true;
		     } 
		}
		if(fileType == "SCORM"){     
		     if(zipEntry.name === "imslrm.xml") exists = true;
		     if(zipEntry.name === "imsmanifest.xml") exists2 = true; 
		}
   
        if (zipEntry.name.indexOf("/") != -1) { 
	       		if(!fs.existsSync(tempPath + zipEntry.name.split("/")[0])) fs.mkdirSync(tempPath + zipEntry.name.split("/")[0]);     
	     }
         var content = zip.files[zipEntry.name].asNodeBuffer();
         var dest = path.join(tempPath, zipEntry.name);
	     fs.writeFileSync(dest, content);
	});

	if(exists)
	{
		if(fileType == "SCORM")
		{
			fs.readFile(tempPath+"imslrm.xml", function(err, data) {
			  	var importMetadata = application.importmetadata.getInstance();
				importMetadata.loadMetadata(data.toString());
			});
		}
		if(fileType == "IMS")
		{
			fs.readFile(tempPath+"imsmanifest.xml", function(err, data) {
			  	var importMetadata = application.importmetadata.getInstance();
				importMetadata.loadIMSMetadata(data.toString());
			});

		}
	}
	if(exists2)
		processPackageData(tempPath);
}

/**
 * This method deletes recursively a folder
 * @param  {String} path of directory
 */
function deleteFolderRecursive(path) {
	var fs = require('fs');
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { 
                deleteFolderRecursive(curPath);
            } else { 
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/**
 * This method is responsible for reading SCORM/IMS data
 * It reads files to be included and creates sections for each one
 * @param  {String} path of the unzipped elements
 */
function processPackageData(filePath)
{
	var fs = require('fs');
	var backend = application.backend.core.getInstance();
	var controller = application.controller.getInstance();
	var idsection = "";
	var ui = application.ui.core.getInstance();

	var importationHTML = application.importhtml.getInstance();
	fs.readFile(filePath+"imsmanifest.xml", function(err, data) {
	  	  	$(data.toString()).find("resource").each(function(){
		  		$.each(this.attributes, function(i, attrib){
		  			if(attrib.name == "href"){
						$.get(filePath + attrib.value, function(html) {
			  				if(attrib.value =="index.html")
			  				{
			  					controller.updateSectionName(attrib.value.split(".")[0],Cloudbook.UI.selected.attr('data-cbsectionid'));		
			  					idsection = Cloudbook.UI.selected.attr('data-cbsectionid');
			  				}
			  				else
			  				{
			  					idsection = controller.appendSection('root')
				  				controller.updateSectionName(attrib.value.split(".")[0],idsection);	
			  				}
							importationHTML.processHTML(html, filePath + attrib.value, idsection);
						}); 
					}
		  		});
			});
	});
	ui.loadContent(Cloudbook.UI.selected.attr('data-cbsectionid'));
}

CBUtil.createNameSpace('application.importpackage');
application.importpackage = CBUtil.singleton(ImportPackage);