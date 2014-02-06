(function() {
	'use strict';
	var canvas = document.getElementById('canvas');
	var width = canvas.width;
	var height = canvas.height;
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

	});
	controller.connect();
})();
