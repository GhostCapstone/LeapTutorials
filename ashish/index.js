(function() {
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	var controller = new Leap.Controller();

	controller.on( 'connect', function() {
		console.log( 'Successfully connected.');
	});
	
})();