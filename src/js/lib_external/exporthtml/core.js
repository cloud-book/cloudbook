var historial = [];		
var current = 0;		
var button_mode_navigation = 1;

$(document).ready(			
	function () {				
		$("article").css("visibility","hidden");				
		$("article:first").css("visibility","initial");
		$("aside>ol>li>a:first").addClass('ui-state-hover');				
		historial.push("#"+$("article:first").attr("id"));				
		current=0;				
		$("body").layout({ applyDemoStyles: true , resizable: true, south: { minSize: 60}});			
	
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
				$("aside a").removeClass('ui-state-hover');
				$("[href=#"+clicked+"]").addClass('ui-state-hover');
			}
		);		  	
		$(function() {	
			$("aside>ol>li>a")
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
					if (! button_mode_navigation){
						if (current > 0){ 
							current--; 
							$("article").css("visibility","hidden");
							$("article[id="+historial[current].substr(1)+"]").css("visibility","initial");
							$("aside a").removeClass('ui-state-hover');
							$("[href="+historial[current]+"]").addClass('ui-state-hover');	
						}
					}else{
						var articles = $('article');
						for (var i=0; i<articles.length; i++){
							var articleid=articles[i].id;
							var current_id=$("article[style*='visibility: initial']").attr('id');
							if (articleid == current_id){
								if (i>0){
									var prev_id=articles[i-1].id;
									//activate article i-1 & exit
									$("article").css("visibility","hidden");
									$("article[id="+prev_id+"]").css("visibility","initial");
									$("aside a").removeClass('ui-state-hover');
									$("[href=#"+prev_id+"]").addClass('ui-state-hover');
									break;
								}
							}
						}
					}
				});
			}
		);
		$(function() {	
			$("footer>section>span.right>button")
				.button()
				.click(function( event ) { 
					event.preventDefault(); 
					if (!button_mode_navigation){
						if (current < historial.length-1){ 
							current++;
				    		$("article").css("visibility","hidden");	
				    		$("article[id="+historial[current].substr(1)+"]").css("visibility","initial");
				    		$("aside a").removeClass('ui-state-hover');
							$("[href="+historial[current]+"]").addClass('ui-state-hover');
				    	}
				    }else{
				    	var articles = $('article');
						for (var i=0; i<articles.length; i++){
							var articleid=articles[i].id;
							var current_id=$("article[style*='visibility: initial']").attr('id');
							if (articleid == current_id){
								if (i+1<articles.length){
									var next_id=articles[i+1].id;
									//activate article i+1 & exit
									$("article").css("visibility","hidden");
									$("article[id="+next_id+"]").css("visibility","initial");
									$("aside a").removeClass('ui-state-hover');
									$("[href=#"+next_id+"]").addClass('ui-state-hover');
									break;
								}
							}
						}
				    }
			    });
			}
		);
	}
);