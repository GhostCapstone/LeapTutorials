(function() {
	'use strict';
	var canvas = document.getElementById('canvas');
	var width = canvas.width;
	var height = canvas.height;
	var button = document.getElementById('unicorn-generator');
	var c = canvas.getContext('2d');
	var controller = new Leap.Controller();

	// connect the controller on button press	
	button.addEventListener('click', function() {
		controller.connect();
	});

	// animation loop
	controller.on('frame', function(frame) {
		// clear the old numbers
		c.clearRect(0, 0, width, height);

		var numberOfFingers = frame.fingers.length;

		// Define the font shape and size
		c.font = "30px Arial";
		c.textAlign = 'center';
		c.textBaseline = 'middle';
		c.fillText(numberOfFingers, width / 2, height / 2);

	});

})();