/* 
http://stackoverflow.com/questions/6084360/node-js-as-a-simple-web-server/8427954#8427954
*/

// Setting up Canvas
var canvas = document.getElementById('frame');
var c = canvas.getContext('2d');

// Setting up the Leap Controller
var controller = new Leap.Controller();

// Controller events
controller.on( 'connect' , function(){
  alert( 'Successfully connected.' );
});

controller.on( 'deviceConnected' , function() {
  alert( 'A Leap device has been connected.' );
});

controller.on( 'deviceDisconnected' , function() {
  alert( 'A Leap device has been disconnected.' );
});

// Unicorn Setup
var img = document.createElement('img');
img.src = "http://i.imgur.com/f68W5EC.png";

// Unicorn creation
controller.on( 'ready' , function() {
	c.drawImage( img , 0 , 0 ); 
});


// Connects the device to socket	
// controller.connect();