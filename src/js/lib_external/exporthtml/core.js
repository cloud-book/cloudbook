var historial = [];		
var current = 0;		

$(document).ready(			
	function () {				
		$("article").css("visibility","hidden");				
		$("article:first").css("visibility","initial");				
		historial.push("#"+$("article:first").attr("id"));				
		current=0;				
		$("body").layout({ applyDemoStyles: true , south: { minSize: 60}});			
	
		$("aside>ol>li>a").click(
			function(){				
				var clicked=$(this).attr("href");				
				if (clicked != historial[current]){					
					for (var i = current+1; i<historial.length-1; i++)						
						historial.pop();					
					historial.push(clicked);					
					current += 1;				
				}				
				while (historial.length > 10){					
					historial.shift();				
				}				
				$("article").css("visibility","hidden");	
				$("article[id="+clicked.substr(1)+"]").css("visibility","initial");
			}
		);		  	
		$(function() {	
			$("aside>ol>li>a,button")
				.button()
				.click(function( event ) { 
					event.preventDefault(); 
				});
			}); 
		$(function() {	
			$("footer>section>span.left>button")  	
				.button() 
				.click(function( event ) { 
					event.preventDefault();  
					if (current > 0){ 
						current--; 
						$("article").css("visibility","hidden");
						$("article[id="+historial[current].substr(1)+"]").css("visibility","initial");	
					}
				});
			}
		);
		$(function() {	
			$("footer>section>span.right>button")
				.button()
				.click(function( event ) { 
					event.preventDefault(); 
					if (current < historial.length-1){ 
						current++;
			    		$("article").css("visibility","hidden");	
			    		$("article[id="+historial[current].substr(1)+"]").css("visibility","initial");
			    	}
			    });
			}
		);
	}
);