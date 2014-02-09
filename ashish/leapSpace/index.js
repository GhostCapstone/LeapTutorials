(function() {
	'use strict';

	// Globals
	var canvas = document.getElementById('canvas');
	var width = canvas.width;
	var height = canvas.height;
	var c = canvas.getContext('2d');
	var controller = new Leap.Controller();


	// animation loop
	controller.on('frame', function(frame) {
		c.clearRect(0, 0, width, height); // reset canvas between frames



		// draw connector, finger, then hand
		for (var i = 0; i < frame.hands.length; i++) {

			// get the hand
			var hand = frame.hands[i];

			var handPos = leapToScene(frame, hand.palmPosition);

			for (var j = 0; j < hand.fingers.length; j++) {
				// get finger
				var finger = hand.fingers[j];
				var fingerPos = leapToScene(frame, finger.tipPosition);

				drawConnector(handPos, fingerPos);
				drawFinger(fingerPos);
			}
			drawHand(handPos);
		}

	});

	// draw a connection from hand-finger using the 
	// global canvas context
	function drawConnector(handPos, fingerPos) {
		c.strokeStyle = '#FFA040';
		c.lineWidth = 3;

		// Draw the connection
		c.beginPath();
		c.moveTo(handPos[0], handPos[1]);
		c.lineTo(fingerPos[0], fingerPos[1]);
		c.closePath();
		c.stroke();
	}

	// draw a finger using the global canvas context
	function drawFinger(fingerPos) {
		// set up stroke style
		c.strokeStyle = '#39AECF';
		c.lineWidth = 5;

		// Draw a circle
		c.beginPath();
		c.arc(fingerPos[0], fingerPos[1], 6, 0, Math.PI*2);
		c.closePath();
		c.stroke();
	}

	// draw a hand using the global canvas context
	function drawHand(handPos) {
		// pick color for fillStyle
		c.fillStyle = '#FF5A40'; // const hand color

		// Draw a circle from 0-2π
		c.beginPath();
		c.arc(handPos[0], handPos[1], 10, 0, Math.PI*2);
		c.closePath();
		c.fill();
	}
	
	// Convert leap coordinates to 2d canvas coords
	function leapToScene (frame, leapPos) {
      // Gets the interaction box of the current frame
      var iBox = frame.interactionBox;

      // Gets the left border and top border of the box
      // In order to convert the position to the proper
      // location for the canvas
      var left = iBox.center[0] - iBox.size[0]/2;
      var top = iBox.center[1] + iBox.size[1]/2;

      // Takes our leap coordinates, and changes them so
      // that the origin is in the top left corner 
      var x = leapPos[0] - left;
      var y = leapPos[1] - top;

      // Divides the position by the size of the box
      // so that x and y values will range from 0 to 1
      // as they lay within the interaction box
      x /= iBox.size[0];
      y /= iBox.size[1];

      // Uses the height and width of the canvas to scale
      // the x and y coordinates in a way that they 
      // take up the entire canvas
      x *= width;
      y *= height;

      // Returns the values, making sure to negate the sign 
      // of the y coordinate, because the y basis in canvas 
      // points down instead of up
      return [ x , -y ];
	}
	controller.connect();
})();