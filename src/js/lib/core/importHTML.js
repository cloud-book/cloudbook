var topValue = 0;
var blockText = "";
/**
 * @class ImportHTML
 * @classdesc This class is responsible to make import operations of HTML Files
 */
function ImportHTML(){}

/**
 * This method is responsible for processing Text elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML node
 */
function processText(node)
{
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var textTags = new textBox().importHTML();

	if($.inArray(node.tagName, textTags) != -1)
	{
		var text = "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + ">";
		var width = node.width;
		var height = node.height;
		var left = node.offsetLeft;
		//var top = node.offsetTop;
		text = new textBox({"text":text, "position" : [left, topValue], "size" : [800, 100]});
		var x = text.editorView();
		$(Cloudbook.UI.targetcontent).append(x);
		text.add_callback(x,text);
		topValue = topValue + parseInt(x.css('height').replace("px",""));
		return true;
	}
	else
	{
		text = new textBox({"text":node, "position" : [0,topValue], "size" : [800, 100]});
		var x = text.editorView();
		$(Cloudbook.UI.targetcontent).append(x);
		text.add_callback(x,text);

		topValue = topValue + parseInt(x.css('height').replace("px",""));
		return false;
	}
}

/**
 * This method is responsible for processing Image elements
 * It creates a section, includes inside all elements and copies images into project folder
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
function processImage(node, filePath){

	var imageBox = CBUtil.req("../src/components/core/images/core.js");
	var imageTags = new imageBox().importHTML();
	var Project = window.Project;
	var fs = require('fs.extra');
	var path = require('path');

	if($.inArray(node.tagName, imageTags) != -1)
	{
		if(node.tagName == "FIGURE")
			node = node.firstElementChild;
		try{
			
			var imgpath = node.attributes.getNamedItem("src") != null? node.attributes.getNamedItem("src").value:"";
			var sourcePath = path.join(Project.Info.projectpath, "/rsrc/", path.basename(imgpath));
			if(fs.existsSync(sourcePath))
				fs.renameSync(sourcePath, path.join(Project.Info.projectpath, "/rsrc/", path.basename(imgpath).replace(".", Date.now().toString() + ".")));

			fs.copy(path.join(path.dirname(filePath), imgpath), path.join(Project.Info.projectpath, "/rsrc/", path.basename(imgpath)), function (err){
				if(err){
						console.log("Error copying image");
				}
			});

			var text = node.attributes.getNamedItem("alt") != null? node.attributes.getNamedItem("alt").value:"";
			var width = node.width;
			var height = node.height;
			var left = node.offsetLeft;
//			var top = node.offsetTop;
			image = new imageBox({"text":text, "position" : [left, topValue], "imgpath":imgpath.substring(imgpath.lastIndexOf("/")+1, imgpath.length)});
			var x = image.editorView();
			$(Cloudbook.UI.targetcontent).append(x);
			image.add_callback(x,image);
			topValue = topValue + parseInt(x.css('height').replace("px",""));
		}
		catch (err) {
		    console.log('Errors in Image');
		}
		return true;
	}
	else
		return false;
}
/**
 * This method is responsible for processing video elements
 * It creates a section,  includes inside all elements and copies video into folder
 * @param  {String} content of the HTML node
 * @param  {String} path of the html element
 */
function processVideo(node, filePath){

	var videoBox = CBUtil.req("../src/components/core/video/core.js");
	var videoTags = new videoBox().importHTML();
	var fs = require('fs.extra');
	var path = require('path');

	if($.inArray(node.tagName, videoTags) != -1)
	{	
		var videopath = "";
		try{
			if (node.innerHTML.indexOf("src=")!=-1){
				var videopath = node.innerHTML.split('src="')[1].split(" ")[0].replace('"','');
				var sourcePath = path.join(Project.Info.projectpath, "/rsrc/", path.basename(videopath));

				if(fs.existsSync(sourcePath))
					fs.renameSync(path.join(Project.Info.projectpath, "/rsrc/", path.basename(videopath)), path.join(Project.Info.projectpath, "/rsrc/", 
						path.basename(videopath).replace(".", Date.now().toString() + ".")));

						fs.copy(path.join(path.dirname(filePath), videopath), path.join(Project.Info.projectpath, "/rsrc/", path.basename(videopath)), function (err){
							if(err){
									console.log("Error copying video");
							}
					});
			}
			var width = node.width;
			var height = node.height;
			var left = node.offsetLeft;
//			var top = node.offsetTop;

			video = new videoBox({"position" : [left, topValue], "videopath":videopath.substring(videopath.lastIndexOf("/")+1, videopath.length)});
			var x = video.editorView();
			$(Cloudbook.UI.targetcontent).append(x);
			video.add_callback(x,video);
			topValue = topValue + parseInt(x.css('height').replace("px",""));
		}
		catch (err) {
		    console.log(err + 'Errors in Video');
		}
		return true;
	}
	else
		return false;
}

/**
 * This method is responsible for reading block elements
 * It creates a section and includes inside all elements
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 * @param  {String} name of block element
 */
function processBlock(element, filePath, blockName)
{
	var textBox = CBUtil.req("../src/components/core/text/core.js");
	var textTags = new textBox().importHTML();
	var imageBox = CBUtil.req("../src/components/core/images/core.js");
	var imageTags = new imageBox().importHTML();
	var videoBox = CBUtil.req("../src/components/core/video/core.js");
	var videoTags = new videoBox().importHTML();

	for(var node = element.firstChild; node; node = node.nextSibling){
		if(node.tagName != undefined)
		{
			switch(node.tagName)
			{
				case "SECTION":case "ARTICLE":case "NAV":case "DIV": case "FOOTER":case "ASIDE":
					var text = processBlock(node, filePath, node.tagName);
					processText(text);
					blockText = "";
				break;
				default:
					if($.inArray(node.tagName, textTags) != -1)
					{
						if(blockName != null)
								blockText  += "<" + node.tagName + ">" + node.innerHTML + "</" + node.tagName + "><br>";
						else
								processText(node);
					}else
					{
						if($.inArray(node.tagName, imageTags) != -1){
							processImage(node, filePath)
						}
						else{
							if($.inArray(node.tagName, videoTags) != -1){
								processVideo(node,filePath);
							}
						}
					}
				break;
			}
		}
	}
	if(blockName != null)
		return blockText;
}
/**
 * This method is responsible for reading HTML main block contents
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 */
ImportHTML.prototype.processHTML = function processHTML(data, filePath)
{
	//var juice = require('juice');
	//var cheerio = require('cheerio');

	//var result = juice.juiceFile(filePath, "", function(err, html){
	//var cheerioData = cheerio.load(html);
		//console.log(cheerioData.html());
		//var includeHTML = $(cheerioData.html());
		var includeHTML = $(data);
		$.each(includeHTML, function(index, element){
			switch(element.tagName)
			{
				case "HEADER":case "DIV":case "SECTION":case "ARTICLE":case "FOOTER":case "ASIDE":
					processBlock(element, filePath, null);
				break;
				
			}
		});

	//});
}
CBUtil.createNameSpace('application.importhtml');
application.importhtml = CBUtil.singleton(ImportHTML);