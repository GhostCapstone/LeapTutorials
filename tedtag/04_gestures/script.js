/* 
http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server/8427954#8427954
*/

// Set global variables
var KEYTAP_LIFETIME = 3;
var KEYTAP_START_SIZE = 15;
var SCREENTAP_LIFETIME = 1;
var SCREENTAP_START_SIZE = 30;

// Setting up Canvas
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

// Making sure we have the proper aspect ratio for our canvas
 canvas.width = canvas.clientWidth;
 canvas.height = canvas.clientHeight;

// Setup variables
var width = canvas.width;
var height = canvas.height;
var frame;

// Gesture Variables
var keyTaps = [];
var screenTaps = [];

// LeapToScene
function leapToScene( leapPos ){
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

// Defining Gestures
function onCircle ( gesture ) {
	// Get the position and radius of gesture
	var pos = leapToScene(gesture.center);
	var r = gesture.radius;
	
	var clockwise = false;
		if( gesture.normal[2]  <= 0 ){
			clockwise = true;
		}

	// Draws circle
	c.fillStyle		= "#39AECF";
	c.strokeStyle	= "#39AECF";
	c.lineWidth		= 5;
	c.beginPath();
		c.arc(pos[0], pos[1], r, 0, Math.PI*2);
	c.closePath();

	// Decorates circle depending on direction
	if (clockwise)
		c.stroke();
	else
		c.fill();
}

function onSwipe( gesture ) {
	// Get the current and start position of the gesture
	var pos = leapToScene(gesture.position);
	var startPos = leapToScene( gesture.startPosition );

	// Draw stroke
	c.strokeStyle	= "#FFA040";
	c.lineWidth		= 3;
	c.beginPath();
		c.moveTo( startPos[0], startPos[1] );
		c.lineTo( pos[0], pos[1]);
	c.closePath();
	c.stroke();

}

function onKeyTap ( gesture ) {
	// Get the position of the gesture
	var pos = leapToScene(gesture.position);
	var time = frame.timestamp;

	keyTaps.push( [pos[0], pos[1], time ] );
}

function drawKeyTaps () {
	for ( var i = 0; i < keyTaps.length; i++ ) {
		// Defines this keytap
		var keyTap = keyTaps[i];

		// Stores keytap information
		var x = keyTap[0];
		var y = keyTap[1];
		var age = frame.timestamp - keyTap[2];
			age /= 1000000;		

		// Calculates how long the keytap will be displayed
		var completion = age / KEYTAP_LIFETIME;
		var timeLeft = 1 - completion;


		// Draws keytap animation
		c.strokeStyle	= "#FF2300";
		c.lineWidth		= 3;
		c.beginPath();
			c.arc( x, y, KEYTAP_START_SIZE, 0, Math.PI*2 );
		c.closePath();
		c.stroke();

		// Fills the circle based on the age of the tap
		var opacity = timeLeft;
		var radius = KEYTAP_START_SIZE * timeLeft;
		c.fillStyle = "rgba( 256, 33, 0, " + opacity + ")";
		c.beginPath();
			c.arc( x, y, radius, 0, Math.PI*2 );
		c.closePath();
		c.fill();
	}
}

function updateKeyTaps() {
	for ( var i = 0; i < keyTaps.length; i++ ) {
		var keyTap = keyTaps[i];
		var age = frame.timestamp - keyTap[2];
		age /= 1000000;

		if ( age >= KEYTAP_LIFETIME ) {
			keyTaps.splice( i, 1 );
		}
	}
}

function onScreenTap ( gesture ) {
	// Get the position of the gesture
	var pos = leapToScene(gesture.position);
	var time = frame.timestamp;

	screenTaps.push( [pos[0], pos[1], time ] );
}

function drawScreenTaps () {
	for ( var i = 0; i < screenTaps.length; i++ ) {
		// Defines this screentap
		var screenTap = screenTaps[i];

		// Stores screentap information
		var x = screenTap[0];
		var y = screenTap[1];
		var age = frame.timestamp - screenTap[2];
			age /= 1000000;

		// Calculates how long the screentap will be displayed
		var completion = age / SCREENTAP_LIFETIME;
		var timeLeft = 1 - completion;

		/* STATIC */

		// Draws screentaps
		c.strokeStyle 	= "#FFB300";
		c.lineWidth		= 3;

		// Saves the state
		c.save();

		// Moves the center of Canvas to the location of the screentap
		c.translate( x, y );

		// Points of reference for the rectangle
		var left = -SCREENTAP_START_SIZE / 2;
		var top = -SCREENTAP_START_SIZE / 2;
		var width = SCREENTAP_START_SIZE;
		var height = SCREENTAP_START_SIZE;

		// Draw the rectangle
		c.strokeRect( left, top, width, height );

		// Restores the previous state
		c.restore();
		
		/* NON-STATIC */

		// Assigning variables to prepare for rotation
		var size = SCREENTAP_START_SIZE * timeLeft;
		var opacity = timeLeft;
		var rotation = timeLeft * Math.PI;

		c.fillStyle = "rgba( 255, 179, 0, " + opacity + ")";

		// Saves the state
		c.save();

		// Moves the center of Canvas to the location of the screentap
		c.translate( x, y );
		c.rotate( rotation );

		var left = -size / 2;
		var top = -size / 2;
		var width = size;
		var height = size;

		c.fillRect( left ,top, width, height );

		c.restore();

	}
}

function updateScreenTaps() {
	for ( var i = 0; i < screenTaps.length; i++ ) {
		var screenTap = screenTaps[i];
		var age = frame.timestamp - screenTap[2];
		age /= 1000000;

		if ( age >= SCREENTAP_LIFETIME ) {
			screenTaps.splice( i, 1 );
		}
	}
}

// Setting up the Leap Controller
var controller = new Leap.Controller({ enableGestures: true });

// Frame event
controller.on( 'frame' , function( data ) {
	frame = data;

	// Clears the window
	c.clearRect(0, 0, width, height);

	// Loops through gestures
	for ( var i = 0; i < frame.gestures.length; i++ ) {
		var gesture = frame.gestures[i];	//this gesture
		var type = gesture.type;

		switch( type ) {
			case "circle":
				onCircle( gesture );
				break;
			case "swipe":
				onSwipe( gesture );
				break;
			case "screenTap":
				onScreenTap( gesture );
				break;
			case "keyTap":
				onKeyTap( gesture );
				break;
		}

	}
	
	// Keytaps
	updateKeyTaps();
	drawKeyTaps();

	// Screentaps
	updateScreenTaps();
	drawScreenTaps();
});

controller.connect();