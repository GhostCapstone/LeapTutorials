(function() {
	var canvas = document.getElementById('canvas');
	var c = canvas.getContext('2d');
	var controller = new Leap.Controller();

	controller.on( 'connect', onControllerConnect );
	controller.on('deviceConnected', onDeviceConnect);
	controller.on('deviceDisconnected', onDeviceDisconnect);
	
	function onControllerConnect() {
		console.log('Successfully connected.');
	}

	function onDeviceConnect() {
		console.log('A leap device has been connected');
	}

	function onDeviceDisconnect() {
		console.log('A leap device has been connected');
	}

})();