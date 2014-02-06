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

	function leapToScene (frame, leapPos) {
		// convert
		var iBox = frame.interactionBox;
		var top = iBox.center[1] + iBox.size[1]/2;
		var left = iBox.center[0] - iBox.size[0]/2;

		// modify origin to match canvas
		// and scale to width and height of canvas
		var x = (leapPos[0] - left) /
				iBox.size[0] * width;
		var y = (leapPos[1] - top) /
				iBox.size[1] * height;


		// y needs to be neg to sync with canvas
		// inverted nature
		return [x, ,-y];
	}
	controller.connect();
})();