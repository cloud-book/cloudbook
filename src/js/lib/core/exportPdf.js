
/**
 * @class Export
 * @classdesc This class is responsible to export project to pdf file
 */

function ExportPdf(){
	     
}


ExportPdf.prototype.htmltoPdf=function htmltoPdf(){
    
    /*funcion que se lanzará para generar el html temporal necesario para el obtener el pdf */

     var exporthtml = application.exporthtml.core.getInstance();
     
     return exporthtml.preExportHTMLToPDF();

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
 	var pdfFileName = " '" + parametrosPdf.path + "' ";
 	var ficheroOrigen = "";
 	if(origen instanceof Array){
 		origen.forEach(function(path){
 			ficheroOrigen += " '" + path +"' ";
 		});
 	}
 	else{
    	ficheroOrigen=" '" + origen + "' "; 
 	}
    
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
		wkhtmloptions = wkhtmloptions + pieP;
       } 			
       wkhtmloptions += " --load-error-handling ignore ";
                  
      /*Se ejecuta el proceso para generar el pdf*/
	
	$("#exportpdfwizard").find('.waiting').css("display","inline");
		var that = this;
		var cmd = "wkhtmltopdf" + " " + wkhtmloptions + " " + ficheroOrigen + " " + pdfFileName ;
		console.log(cmd);
        exec(cmd,function(err, stdout, stderr) { 
	
		//process.stdout.write( stderr );
                if (err === null){
					console.log("Ha tenido exito");
		       		$("#exportpdfwizard").dialog("destroy");
					that.borrarHtml(origen);
                }
                else{
					console.log(stderr);
               }
	});
	
};


CBUtil.createNameSpace('application.core.exports.exportPdf.core');
application.core.exports.exportPdf.core = CBUtil.singleton(ExportPdf);
