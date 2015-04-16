/**
 * @class ExportHTML
 * @classdesc This class is responsible to make export operations of Data project
 */
function ExportHTML(){
	this.counters = {};
	this.counters = {"CBSection": 0, "TextBox": 0, "ImageBox": 0, "VideoBox":0} ;
}

ExportHTML.prototype.getSections = function getSections2(){
	var storage = application.storagemanager.getInstance();
	var main_sect = storage.getRoot();
	var sections = [];
	for (var i=0; i<main_sect.sections.length; i++){
		var section = storage.getSectionById(main_sect.sections[i]);
		sections.push(section);
	}
	return sections;
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
	
	var content='<div class="ui-layout-center">';
	content=content+'<div class="ui-layout-content">';
	
	sections.forEach(function(obj,idx){ var JQobj=obj.htmlView('data'+idx); content += JQobj[0].outerHTML })

	content=content+'</div></div>';
	var footer='<footer class="ui-layout-south"><section><span class="left"><button> Prev </button></span>Footer section<span class="right"><button> Next </button></span></section></footer>';
	var script='<script type="text/javascript">\
		$(document).ready(\
			function () {\
				$("article").css("visibility","hidden");\
				$("article:first").css("visibility","initial");\
				$("body").layout({ applyDemoStyles: true , south: { minSize: 60}});\
			});\
			$("aside>ol>li>a").click(function(){\
				var clicked=$(this).attr("href");\
				$("article").css("visibility","hidden");\
				$("article[id="+clicked.substr(1)+"]").css("visibility","initial");\
			});\
			$(function() {\
    				$("aside>ol>li>a,button")\
      				.button()\
      				.click(function( event ) {\
        				event.preventDefault();\
      				});\
  			});\
	</script>';

	var total = this.formatXml('<!DOCTYPE html><html>'+myhead+'<body>'+aside+content+footer+script+'</body></html>');

	var fs = window.require('fs');
	fs.writeFile(path+"outfile.html", total , function(err) {
    	if(err) {
        	return console.log(err);
    	}
    	console.log("The file was saved!");
	});
	return total;
}

ExportHTML.prototype.formatXml = function formatXml(xml) {
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(xml.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }
 
        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }
 
        formatted += padding + node + '\r\n';
        pad += indent;
    });
 
    return formatted;
}

CBUtil.createNameSpace('applicsecation.exporthtml');
application.exporthtml = CBUtil.singleton(ExportHTML);

var test = application.exporthtml.getInstance();
var run = function(){
	test.do_html('/home/miguel/WorkSpace/cloudbook/tests/');	
}
