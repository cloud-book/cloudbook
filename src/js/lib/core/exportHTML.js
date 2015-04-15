/**
 * @class ExportHTML
 * @classdesc This class is responsible to make export operations of Data project
 */
function ExportHTML(){
	this.counters = {};
	this.counters = {"CBSection": 0, "TextBox": 0, "ImageBox": 0, "VideoBox":0} ;
}

ExportHTML.prototype.processSection = function processSection(section)
{
	var storage = application.storagemanager.getInstance();
	this.counters['CBSection']++;
	console.log('');
	console.log('NEW section');
	console.log('section name is: '+section.name);
	console.log('section contains: '+section.content.length+' items');
	for (var i=0; i<section.content.length; i++){
		var obj_into_section = storage.getCBObjectById(section.content[i]);
		this.processObjectInSection(obj_into_section);
	}
}
ExportHTML.prototype.processObjectInSection = function processObjectInSection(obj){
	
	var parsed_obj={'degree':obj.degree,'levellayer':obj.levellayer,'position':obj.position,'size':obj.size};

	console.log('NEW object type is: '+obj.__proto__.constructor.name);
	
	console.log('grados: '+obj.degree);
	console.log('levellayer: '+obj.levellayer);
	console.log('position: '+obj.position);
	console.log('size: '+obj.size);
	
	switch (obj.__proto__.constructor.name){
		case 'TextBox':
			this.counters['TextBox']++;
			console.log('texto: '+obj.text);
			parsed_obj['text']=obj.text;
			parsed_obj['type']='TextBox';
			break;
		case 'ImageBox':
			this.counters['ImageBox']++;
			console.log('imgpath: '+obj.imgpath);
			parsed_obj['imgpath']=obj.imgpath;
			parsed_obj['type']='ImageBox';
			break;
		case 'VideoBox':
			this.counters['VideoBox']++;
			console.log('videopath: '+obj.videopath);
			parsed_obj['videopath']=obj.videopath;
			parsed_obj['type']='VideoBox';
			break;

		default:
			console.log('processing object : unknown object type');
	}

	return parsed_obj; 
}
ExportHTML.prototype.processData2 = function processData2()
{
	var storage = application.storagemanager.getInstance();
	var main_sect = storage.getRoot();

	for (var i=0; i<main_sect.sections.length; i++){
		var section = storage.getSectionById(main_sect.sections[i]);
		this.processSection(section);
	}
	console.log('Contadores:');
	return this.counters;
}

ExportHTML.prototype.getSections = function getSections(){
	var storage = application.storagemanager.getInstance();
	var main_sect = storage.getRoot();
	var sections = [];
	for (var i=0; i<main_sect.sections.length; i++){
		var section = storage.getSectionById(main_sect.sections[i]);
		sections.push({'name':section.name,'id':main_sect.sections[i]});
	}
	return sections;
}

ExportHTML.prototype.getContentFromSection = function getContentFromSection(sec_id){
	var storage = application.storagemanager.getInstance();
	var section = storage.getSectionById(sec_id);
	var objects = [];
	for (var i=0; i<section.content.length; i++){
		var obj_into_section = storage.getCBObjectById(section.content[i]);
		var htmldata4object = this.processObjectInSection(obj_into_section);
		objects.push(htmldata4object);
	}
	return objects;
}

ExportHTML.prototype.do_html = function do_html(path){
	var myhead='<head>\
	<script type="text/javascript" src="'+path+'jquery.js"></script>\
	<script type="text/javascript" src="'+path+'jquery.layout.js"></script>\
	<script type="text/javascript" src="'+path+'jquery-ui.min.js"></script>\
	<link rel="stylesheet" type="text/css" href="'+path+'jquery-ui.min.css" />\
	<link rel="stylesheet" type="text/css" href="'+path+'estilo.css" />\
	</head>';
	var sections=this.getSections();
	var aside='<aside class="ui-layout-west"><ol>';

	for (var i = 0; i<sections.length; i++){
		aside=aside+'<li><a href="#data'+i+'">'+sections[i].name+'</a></li>';
	}
	aside=aside+'</ol></aside>';
	
	var content='<div class="ui-layout-center"><ol>';
	for (var i = 0; i<sections.length; i++){
		content=content+'<li><a href="#data'+i+'">'+sections[i].name+'</a></li>';
	}
	content=content+'</ol><div class="ui-layout-content">';
	
	// Main content
	for (var i = 0; i<sections.length; i++){
		content=content+'<article id="data'+i+'"><section id="title" class="centered">'+sections[i].name+'</section>';
		content=content+'<section>';
		var objects=this.getContentFromSection(sections[i].id);
		for (var j=0; j<objects.length; j++){
			switch (objects[j].type){
				case 'ImageBox':
					content = content+ '<img src="'+path+objects[j].imgpath+'" style="width:'+objects[j].size[0]+'px;height:'+objects[j].size[0]+'px;z-index:'+objects[j].levellayer+';transform:rotate('+objects[j].degree+'deg);position:absolute;top:'+objects[j].position[1]+'px;left:'+objects[j].position[0]+'px"></img>';
					break;
				case 'TextBox':
					content = content+ '<span style="width:'+objects[j].size[0]+'px;height:'+objects[j].size[0]+'px;z-index:'+objects[j].levellayer+';transform:rotate('+objects[j].degree+'deg);position:absolute;top:'+objects[j].position[1]+'px;left:'+objects[j].position[0]+'px">'+objects[j].text+'</span>';
					break;
				case 'VideoBox':
					break;
			}
		}
		content=content+'</section></article>';	
	}
	content=content+'</div></div>';
	var footer='<footer class="ui-layout-south"><section><span class="left"><button> Prev </button></span>Footer section<span class="right"><button> Next </button></span></section></footer>';
	var script='<script type="text/javascript">\
		$(document).ready(\
			/* Initialize layout */ \
			function () {\
				$(".ui-layout-center").tabs();\
				$("body").layout({ applyDemoStyles: true , south: { minSize: 60}});\
			});\
			/* Simulate tab click when click on the sidebar */ \
			$("aside>ol>li>a").click(function(){\
				var clicked=$(this).attr("href");\
				$(".ui-layout-center ol li a[href="+clicked+"]").click();\
			});\
			/* Initialize buttons */\
			  $(function() {\
    				$("aside>ol>li>a,button")\
      				.button()\
      				.click(function( event ) {\
        				event.preventDefault();\
      				});\
  			});\
	</script>';

	var total = '<!DOCTYPE html><html>'+myhead+'<body>'+aside+content+footer+script+'</body></html>';
	var fs = window.require('fs');
	fs.writeFile(path+"outfile.html", total , function(err) {
    	if(err) {
        	return console.log(err);
    	}
    	console.log("The file was saved!");
	});
	return total;
}

CBUtil.createNameSpace('applicsecation.exporthtml');
application.exporthtml = CBUtil.singleton(ExportHTML);

var test = application.exporthtml.getInstance();
var run = function(){
	test.do_html('/home/miguel/WorkSpace/cloudbook/tests/');	
}
/*****************************************************************************************************/
/* TEST CODE */
ExportHTML.prototype.process = function process(key,value) {
    console.log(key + " : "+value);
}

ExportHTML.prototype.traverse = function traverse(o,func,filter,level) {
    var skip;
    var classname;

    for (var i in o) {
    	classname=o[i].__proto__.constructor.name;
//    	console.log(level+': checking type ' + classname );

//        func.apply(this,[i,o[i]]);  
        
        if (o[i] !== null && typeof(o[i])=="object") {
        	skip = true;
        	for (var j=0;j<filter.length;j++){
        		if (classname == filter[j]){
        			skip = false;
        			this.counters[filter[j]]++;
        		}
        	}
        	if (!skip){
            	//going on step down in the object tree!!
            	console.log(level + ': Found '+classname);
            	this.traverse(o[i],func,filter,level+1); 	
            	console.log(level + ': Returning to '+classname);
            }else{
//           	console.log(level + ': Skipping '+classname );
            }
        }
    }
}

//traverse(o,process);

/**
 * This method is responsible for reading project data
 * @param  {String} content of the HTML file
 * @param  {String} path of the html element
 */
ExportHTML.prototype.processData = function processData(data, filePath)
{
	console.log('Parsing Sections');
	this.traverse(Project.Data._rawsections,this.process,["CBSection"],0);
	console.log('Parsing Objects');
	this.traverse(Project.Data._rawobjects,this.process,["TextBox","ImageBox","VideoBox"],0);
	return this.counters;
}

/* END TEST CODE */