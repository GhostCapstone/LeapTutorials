'use strict';

var context = $('#canvas')[0].getContext('2d');
    context.font = "30px Arial";
    context.textAlign = 'center';
    context.textBaseline = 'middle';

var controller = new Leap.Controller({frameEventName: "animationFrame"});  // not a jquery object


window.onload = function() {
/*
  // connect controller
  controller.on('connect', onControllerConnect);

  // connect device
  // ONLY happens when device is connected
  // not when page loads with device connected
  controller.on('deviceConnected', onDeviceConnect);

  // disconnect device
  // same as above
  controller.on('deviceDisconnected', onDeviceDisconnect);

  controller.on('ready', onReady);

  // $('#buttonUnicorn').click(onReady);
  $('buttonCount').click(count);

  controller.connect();
*/
  $('#buttonCount').on('click', function(){
    controller.connect();
  });

  //frame can be either 
  controller.on('frame', function(frame){
    var numberOfFingers = frame.fingers.length;

    //Tells Canvas to draw the input string at the center
    var width = canvas.width;
    var height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillText( numberOfFingers , width/2 , height/2 );
  });
}

// function onControllerConnect() {
//   console.log('controller successfully connected');
// }

// function onDeviceConnect() {
//   console.log('A Leap device has been connected.');
// }

// function onDeviceDisconnect() {
//   console.log('A Leap device has been disconnected.');
// }

// function onReady() {
//   console.log('Device ready');
//   var img = document.createElement('img');
//   img.src = "http://i.imgur.com/f68W5EC.png";
//   context.drawImage(img, 0, 0);
// }

function count(){

}