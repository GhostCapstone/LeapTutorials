'use strict';

var context = $('#canvas')[0].getContext('2d');
    context.font = "30px Arial";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
var width = canvas.width;
var height = canvas.height;

var controller = new Leap.Controller({frameEventName: "animationFrame"});  // not a jquery object

window.onload = function() {
  controller.on('ready', function(){
    controller.connect();
  });

  //frame can be either 
  controller.on('frame', function(frame){

  });
}

function drawHands(){
  for( var i = 0; i < frame.hands.length; i++ ){
    var hand = frame.hands[i];
    for( var j = 0; j < hand.fingers.length; j++ ){
      var finger = hand.fingers[j];
    }
  }
}

function leapTo2D(frame, leapPos){
    var iBox = frame.interactionBox;
    var left = iBox.center[0] - iBox.size[0]/2;
    var top = iBox.center[1] + iBox.size[1]/2;
    var x = (leapPos[0] - left) / iBox.size[0] * width;
    var y = (leapPos[1] - top) / iBox.size[1] * width;

    return [ x , -y ];
}