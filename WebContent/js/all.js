$(document).ready(function(){
	  var win_height = $(window).height();
	  $(".dsolution_slider li, .content, .dsolution_slider").height(Math.max(win_height, 540));
	  
	  
	  // slider  = $('.bxslider').bxSlider({pause:3000, mode: 'fade', pager: false, controls: false});
	  // slider.startAuto();
	  
	  
	  start_sliding($(".dsolution_slider"));
	  
	$(window).scroll(function(){
		var d = $(window).scrollTop() / ($(document).height() - $(window).height());
		$(".dsolution_slider li").css("background-position", "center "+d*100+"%");
		// $(".dsolution_slider li").css("-webkit-filter","grayscale("+d/2+")");
		// $(".dsolution_slider li").css("filter","grayscale("+d*100/2+"%)");
	}); 
});



function start_sliding(parent){
	parent.children("li").css("opacity", 0);
	do_slide(parent, 1);	
}

function do_slide(parent, i){
	parent.children("li:nth-child("+i+")").animate({opacity: 1}, 600, function() {});
	j = i - 1;
	if(j < 1){
		j = parent.children().length;
	}
	parent.children("li:nth-child("+j+")").animate({opacity: 0}, 600, function() {});
	
	i++;
	if(parent.children().length < i){
		i = 1;
	}
	setTimeout(function(){do_slide(parent, i)}, 4000);
}



