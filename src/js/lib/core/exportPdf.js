
/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */

function ExportPdf(){
	     
}


ExportPdf.prototype.htmltoPdf=function htmltoPdf(){
    
    /*funcion que se lanzará para generar el html temporal necesario para el obtener el pdf */

     var html='/home/netadmin/Documents/htmlTemp/fichero.html';
     
     return html

};


ExportPdf.prototype.borrarHtml=function borrarHtml(origen){
     
     var fs=require('fs');
     var fsextra=require('fs-extra');
     var path=require('path');

         
     var directorio=path.dirname(origen)

     fsextra.deleteSync(directorio,function (err) {
  	if (err) return console.error(err)
 
  	console.log('success!')
     });

 
};

ExportPdf.prototype.generatePdf=function generatePdf(parametrosPdf){

	var origen=this.htmltoPdf();
       
        this.renderPdf(parametrosPdf,origen);
	     
        
};    
        
  

ExportPdf.prototype.renderPdf=function renderPdf(parametrosPdf,origen){    
	
       var exec = require('child_process').exec;
 
      
   /*Ruta donde se guardará el fichero pdf */	
 	var pdfFileName = parametrosPdf.path;

         
    
   /* Se calculan los parametros para el pdf a generar */
  	
       var wkhtmloptions="";

       var orientacionP='-O'+ " " + parametrosPdf.orientacion;
       wkhtmloptions=wkhtmloptions+orientacionP;
      
       var size=' -s' + " " + parametrosPdf.page; 
       wkhtmloptions=wkhtmloptions+size;

  
       var encabezadoP="";
              
	
	if (parametrosPdf.posicionH !==""){
		var encabezado=parametrosPdf.posicionH;
		 switch (encabezado) {
  			case "headerRight":
				encabezadoP=' --header-right' + " '" + parametrosPdf.textoH + "' ";
                              	break;

			case "headerLeft":
				encabezadoP=' --header-left' + " '" + parametrosPdf.textoH + "' ";
				break;
		       	case "headerCenter":
				encabezadoP=' --header-center' + " '" + parametrosPdf.textoH + "' ";
				break;
		}
		wkhtmloptions=wkhtmloptions+encabezadoP;
        }			


        var pieP="";
        if (parametrosPdf.posicionN !==""){	
		var posicionP=parametrosPdf.posicionN;
               	switch (posicionP) {
  			case "footerRight":
				pieP=' --footer-right [page]';
				break;

			case "footerLeft":
				pieP=' --footer-left [page]';
				break;
		       	case "footerCenter":
				pieP=' --footer-center [page]';
				break;
		}
		wkhtmloptions=wkhtmloptions+pieP;
       } 			
       
                  
      /*Se ejecuta el proceso para generar el pdf*/
	
	$("#exportpdfwizard").find('.waiting').css("display","inline");
	var that = this;
        var child=exec("wkhtmltopdf" + " " + wkhtmloptions + " " + origen + " " + pdfFileName,function(err, stdout, stderr) {  	
	
		//process.stdout.write( stderr );
                if (err === null){
			console.log("Ha tenido exito");
		       	$("#exportpdfwizard").dialog("destroy");
                        that.borrarHtml(origen);
			
                }else{
			console.log(stderr);
			
               } 
	                     
	});
	
};


CBUtil.createNameSpace('application.core.exports.exportPdf.core');
application.core.exports.exportPdf.core = CBUtil.singleton(ExportPdf);
