(function() {
  'use strict';

  var context = $('#canvas')[0].getContext('2d');
  context.font = "30px Arial";
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  var width = canvas.width;
  var height = canvas.height;

  var controller = new Leap.Controller({
    frameEventName: "animationFrame"
  }); // not a jquery object

  window.onload = function() {
    // controller.on('ready', function() {
    // });

    // controller.on('connect', function() {
    //   console.log('Controller connected');
    // });

    //frame can be either 
    controller.on('frame', function(frame) {
      console.log('frame');
      drawHands(frame);
    });

    controller.connect();
  }

  function drawHands(frame) {
    context.clearRect(0, 0, width, height);
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
      var handPos = leapTo2D(frame, hand.palmPosition);
      for (var j = 0; j < hand.fingers.length; j++) {
        //var finger = hand.fingers[j];
        var fingerPos = leapTo2D(frame, hand.fingers[j].tipPosition);

        // draw finger tips
        context.lineWidth = 5;
        context.fillStyle = '#00FF00';
        context.strokeStyle = '#FFFF00';
        context.beginPath();
        context.arc(fingerPos[0], fingerPos[1], 6, 0, Math.PI * 2);
        context.closePath();
        context.stroke();

        // draw finger lines
        context.strokeStyle = '#0000FF';
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(handPos[0], handPos[1]);
        context.lineTo(fingerPos[0], fingerPos[1]);
        context.closePath();
        context.stroke();
      }

      // draw palm
      context.fillStyle = '#00FF00';
      context.strokeStyle = '#FFFF00';
      context.beginPath();
      context.arc(handPos[0], handPos[1], 10, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    }
  }

  function leapTo2D(frame, leapPos) {
    var iBox = frame.interactionBox;
    var left = iBox.center[0] - iBox.size[0] / 2;
    var top = iBox.center[1] + iBox.size[1] / 2;
    var x = (leapPos[0] - left) / iBox.size[0] * width;
    var y = (leapPos[1] - top) / iBox.size[1] * width;

    return [x, -y];
  }
})();