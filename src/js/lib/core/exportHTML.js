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
	
	console.log('NEW object type is: '+obj.__proto__.constructor.name);
	
	console.log('grados: '+obj.degree);
	console.log('levellayer: '+obj.levellayer);
	console.log('position: '+obj.position);
	console.log('size: '+obj.size);
	
	switch (obj.__proto__.constructor.name){
		case 'TextBox':
			this.counters['TextBox']++;
			console.log('texto: '+obj.text);
			break;
		case 'ImageBox':
			this.counters['ImageBox']++;
			console.log('imgpath: '+obj.imgpath);
			break;
		case 'VideoBox':
			this.counters['VideoBox']++;
			console.log('videopath: '+obj.videopath);
			break;

		default:
			console.log('processing object : unknown object type');
	}
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

CBUtil.createNameSpace('application.exporthtml');
application.exporthtml = CBUtil.singleton(ExportHTML);

var test = application.exporthtml.getInstance();

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