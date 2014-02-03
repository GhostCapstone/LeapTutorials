(function() {
	'use strict';
	var canvas = document.getElementById('canvas');
	var button = document.getElementById('unicorn-generator');
	var c = canvas.getContext('2d');
	var controller = new Leap.Controller();
	var img = document.createElement('img');
    img.src = "http://i.imgur.com/f68W5EC.png";
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

	controller.on( 'ready', function() {
		// ready code
		c.drawImage(img, 0, 0);
	});

	button.addEventListener('click', function() {
		controller.connect();
	});

	
})();
