// Get a reference to the <path>
var path = document.querySelector('#face-path');

// Get length of path... ~577px in this case
var pathLength = path.getTotalLength();

// Make very long dashes (the length of the path itself)
path.style.strokeDasharray = pathLength + ' ' + pathLength;

// Offset the dashes so the it appears hidden entirely
path.style.strokeDashoffset = pathLength;

// Jake Archibald says so
// https://jakearchibald.com/2013/animated-line-drawing-svg/
path.getBoundingClientRect();

// When the page scrolls...
window.addEventListener("scroll", function(e) {
 
  // What % down is it? 
  // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
  // Had to try three or four differnet methods here. Kind of a cross-browser nightmare.
  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    
  // Length to offset the dashes
  var drawLength = pathLength * scrollPercentage;
  
  // Draw in reverse
  path.style.strokeDashoffset = pathLength - drawLength;
    
  // When complete, remove the dash array, otherwise shape isn't quite sharp
 // Accounts for fuzzy math

  if (scrollPercentage >= 0.99) {
    path.style.strokeDasharray = "none";
    
  } else {
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
  }
  
});

jQuery(document).ready(function($){


var windowXArray = [],
    windowYArray = [];

for (var i = 0; i < $(window).innerWidth(); i++) {
    windowXArray.push(i);
}
    
for (var i = 0; i < $(window).innerHeight(); i++) {
    windowYArray.push(i);
}

function randomPlacement(array) {
    var placement = array[Math.floor(Math.random()*array.length)];
    return placement;
}
    

var canvas = oCanvas.create({
   canvas: '#canvas',
   //background: '#2c3e50',
   fps: 60
});

setInterval(function(){

var rectangle = canvas.display.ellipse({
   x: randomPlacement(windowXArray),
   y: randomPlacement(windowYArray),
   origin: { x: 'center', y: 'center' },
   radius: 0,
   fill: '#00695C',
   opacity: 1
});

canvas.addChild(rectangle);

rectangle.animate({
  radius: 10,
  opacity: 0
}, {
  duration: '1000',
  easing: 'linear',
  callback: function () {
			this.remove();
		}
});

}, 100);

$(window).resize(function(){
canvas.width = $(window).innerWidth();
canvas.height = $(window).innerHeight();
});

$(window).resize();

});

function checkY(){
    if( $(window).scrollTop() > startY ){
        $('.fixedDiv').slideDown();
    }else{
        $('.fixedDiv').slideUp();
    }
}

$(window).scroll(function(){
	//Tell me where we are
	//console.log($(window).scrollTop());
	
	var y = $(window).scrollTop();
	
	if(y > 1200){
		//console.log("hey!");
		var opacity = ((y - 1200)/900)/2;
		$("#left-div").css("display", "inline-block");
		$("#left-div").css("opacity", opacity);
		$("#right-div").css("display", "inline-block");
		$("#right-div").css("opacity", opacity);
	}
	else if(y < 800){
		$("#left-div").css("display", "none");
		$("#right-div").css("display", "none");
	}
});