/* 
http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server/8427954#8427954
*/

// Setting up Canvas
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

// Making sure we have the proper aspect ratio for our canvas
 canvas.width = canvas.clientWidth;
 canvas.height = canvas.clientHeight;

// Setup variables
var width = canvas.width;
var height = canvas.height;

// LeapToScene
function leapToScene( frame, leapPos ){
	var iBox = frame.interactionBox;
	
	// Left coordinate = Center X - Interaction Box Size / 2
	// Top coordinate = Center Y + Interaction Box Size / 2
	var left = iBox.center[0] - iBox.size[0]/2;
	var top = iBox.center[1] + iBox.size[1]/2;
	
	// X Poisition = Current
	var x = leapPos[0] - left;
	var y = leapPos[1] - top;
	
	x /= iBox.size[0];
	y /= iBox.size[1];
	
	x *= width;
	y *= height;
	
	return [ x, -y ]; 	
}

// Setting up the Leap Controller
var controller = new Leap.Controller();

// Frame event
controller.on( 'frame' , function( frame ) {
	// Clears the window
		c.clearRect(0, 0, width, height);

	// Loops through each hand
	for ( var i = 0; i < frame.hands.length; i++ ) {
		
		// Setting up the hand
		var hand = frame.hands[i]; // The current hand
		var handPos = leapToScene( frame, hand.palmPosition );	// Palm position

		// Loops through each finger
		for ( var j = 0; j < hand.fingers.length; j++ ) {
			var finger = hand.fingers[j];	// Current finger
			var fingerPos = leapToScene( frame, finger.tipPosition ); // Finger position
			
			// 1. Connect finger to hand
			c.strokeStyle = "#FFA040";
			c.lineWidth = 3;
			c.beginPath();
				c.moveTo(handPos[0], handPos[1]);
				c.lineTo(fingerPos[0], fingerPos[1]);
			c.closePath();
			c.stroke();

			// 2. Drawing the finger
			c.strokeStyle = "#39AECF";
			c.lineWidth = 5;
			c.beginPath();
				c.arc(fingerPos[0], fingerPos[1], 6, 0, Math.PI*2);
			c.closePath();
			c.stroke();

		}

		// 3. Drawing the palm
		c.fillStyle = "#FF5A40";
		c.beginPath();
			c.arc(handPos[0], handPos[1], 10, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}

});

controller.connect();