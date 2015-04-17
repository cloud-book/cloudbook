
/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */

function ExportPdf(){
	/*this.options = {};*/
      alert('buenos dias');
}

/*function generatePdf(filePath,page,orientation,numeration, positionnumber,header, headerposition){
function generatePdf
        var wkhtmltopdf = require('wkhtmltopdf');

        var path=filePath;
        
        var number=numeration;

        if (number==='1'){
		var position=positionnumber;
                
         wkhtmltopdf(texto,)

}*/

function generatePdf (x) {
	alert(x);
}

CBUtil.createNameSpace('application.core.exports.exportPdf.core');
application.core.exports.exportPdf.core = CBUtil.singleton(ExportPdf);
