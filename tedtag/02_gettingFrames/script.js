/* 
http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server/8427954#8427954
*/

// Setting up Canvas
var canvas = document.getElementById('frame');
var c = canvas.getContext('2d');

// Setting up the Leap Controller
var controller = new Leap.Controller();

// Setup variables
var width = canvas.width;
var height = canvas.height;

// Frame event
controller.on( 'frame' , function( frame ) {
	// Clears the window
	c.clearRect(0, 0, width, height);
	
	var numberOfFingers = frame.fingers.length;	// Counts number of fingers
	
	// Defines the font shape, size and position
    c.font = "30px Arial";
	c.textAlign = 'center';
    c.textBaseline = 'middle';

    // Tells Canvas to draw the input string at the position defined
    c.fillText( numberOfFingers , width/2 , height/2 );
	
});