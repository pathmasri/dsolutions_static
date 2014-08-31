var  screen_height;
var no_of_screens;
var scrollable = true;
// var  window_scrolltop = 0;
var  window_scrolling = false;

$(document).ready(function(){
	var win_height = $(window).height();
	screen_height = Math.max(win_height, 540);
	$(".dsolution_slider li, .content, .dsolution_slider, #head_content").height(screen_height);
	no_of_screens = $(".content").length;

	start_sliding($(".dsolution_slider"));
	  
	// $(window).scroll(function(){
		// var d = $(window).scrollTop() / ($(document).height() - $(window).height());
		// $(".dsolution_slider li").css("background-position", "center "+d*100+"%");
	// }); 
	
	// $(window).scroll(function(){
		// var t = $(window).scrollTop();
		// if(window_scrolltop > t){
			// console.log(1);
		// }else{
			// console.log(2);
		// }
		// window_scrolltop = t;
	// });
	
	add_scroll();
});


///////////////////////////////////////////////////////
function select_dot(i){
	$("#dot_container").children().removeClass("selected");
	$("#dot_container").children(":nth("+i+")").addClass("selected");
}
function add_scroll(){
	var t = $(window).scrollTop();
	var current_content = Math.floor(t/screen_height);
	select_dot(current_content);
	
	$('body,html').on('DOMMouseScroll mousewheel', function (e) {
		if(!scrollable){
			return false;
		}
		var next_content = -100;
		t = $(window).scrollTop();
		current_content = Math.floor(t/screen_height);
		
		if(e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) { //alternative options for wheelData: wheelDeltaX & wheelDeltaY
		//scroll down
			// console.log('Down');
			next_content = current_content + 1;
		} else {
		//scroll up
			// console.log('Up');
			next_content = current_content - 1;
		}
		
		if(next_content == undefined || next_content > no_of_screens -1 || next_content < 0){
			return;
		}
		
		// console.log(next_content);
		
		select_dot(next_content);
		
		// $(window).off("DOMMouseScroll mousewheel");
		scrollable = false;
		disable_scroll();
		$('html, body').animate({scrollTop: next_content*screen_height}, 600, function(){
			// add_scroll();
			scrollable = true;
			enable_scroll();
		});
		
		//prevent page fom scrolling
		return false;
	});
	
	// $(window).on('mousewheel', function(){
		// $(window).height(screen_height);
		
		// var t = $(window).scrollTop();
		
		// var next_content = -100;
		// var current_content = Math.floor(t/screen_height);
		
		// if(window_scrolltop > t){
			// next_content = current_content - 1;
			// console.log("-1");
		// }else if(window_scrolltop < t){
			// next_content = current_content + 1;
			// console.log("+1");
		// }
		// window_scrolltop = t;
		// if(next_content == undefined || next_content > no_of_screens -1 || next_content < 0){
			// return;
		// }
		// console.log(next_content);
		// $(window).off("mousewheel");
		// disable_scroll();
		// $('html, body').animate({scrollTop: next_content*screen_height}, 600, function(){
			// add_scroll();
			// enable_scroll();
		// });
	// });
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}
///////////////////////////////////////////////////////

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

