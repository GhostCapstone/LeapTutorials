(function() {
	'use strict';
	var canvas = document.getElementById('canvas');
	var button = document.getElementById('unicorn-generator');
	var c = canvas.getContext('2d');
	var controller = new Leap.Controller();

	// connect the controller on button press	
	button.addEventListener('click', function() {
		controller.connect();
	});

	controller.on('frame', function(frame) {
		var numberOfFingers = frame.fingers.length;

		// Define the font shape and size
		c.font = "30px Arial";

		c.fillText(numberOfFingers, 20, 20);

	});

	
})();
