(function() {
  'use strict';

  // constants
  var KEYTAP_LIFETIME = 3;
  var KEYTAP_START_SIZE = 15;
  var SCREENTAP_LIFETIME = 4;
  var SCREENTAP_START_SIZE = 15;

  // globals
  var c = $('#canvas')[0].getContext('2d');
  c.font = "30px Arial";
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  var width = canvas.width;
  var height = canvas.height;
  var frame;
  var keyTaps = [];
  var screenTaps = [];

  var controller = new Leap.Controller({
    frameEventName: "animationFrame",
    enableGestures: true
  }); // not a jquery object

  window.onload = function() {
    // controller.on('ready', function() {
    // });

    // controller.on('connect', function() {
    //   console.log('Controller connected');
    // });

    //frame can be either 
    controller.on('frame', function(data) {
      frame = data;
      c.clearRect(0, 0, width, height);
      readGestures();
      updateKeyTaps();
      drawKeyTaps();
      updateScreenTaps();
      drawScreenTaps();
      //drawHands();
    });

    controller.connect();
  }

  function readGestures() {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];
      switch (gesture.type) {
        case "circle":
          onCircle(gesture);
          break;
        case "swipe":
          onSwipe(gesture);
          break;
        case "screenTap":
          onScreenTap(gesture);
          break;
        case "keyTap":
          onKeyTap(gesture);
          break;
      }
    }
  }

  function onCircle(gesture) {
    console.log(gesture.type);
    var pos = leapTo2D(gesture.center);
    var r = gesture.radius;

    var clockwise = false;
    if (gesture.normal[2] <= 0) {
      clockwise = true;
    }

    c.fillStyle = "#00FF00";
    c.strokeStyle = "#00FF00";
    c.lineWidth = 5;

    //draw finger path
    c.beginPath();
    c.arc(pos[0], pos[1], r, 0, Math.PI * 2);
    c.closePath();

    if (clockwise) {
      c.stroke();
    } else {
      c.fill();
    }
  }

  function onSwipe(gesture) {
    console.log(gesture.type);
    var startPos = leapTo2D(gesture.startPosition);
    var pos = leapTo2D(gesture.position);

    c.strokeStyle = "#00FF00";
    c.lineWidth = 3;

    c.beginPath();
    c.moveTo(startPos[0], startPos[1]);
    c.lineTo(pos[0], pos[1]);
    c.closePath();
    c.stroke();
  }

  function onScreenTap(gesture) {
    console.log(gesture.type);
    var pos = leapTo2D(gesture.position);
    var time = frame.timestamp;
    screenTaps.push([pos[0], pos[1], time]);
  }

  function drawScreenTaps() {
    for (var i = 0; i < screenTaps.length; i++) {
      var tap = screenTaps[i];
      var timeleft = 1 - (((frame.timestamp - tap[2]) / 1000000) / SCREENTAP_LIFETIME);
      var size = SCREENTAP_START_SIZE * timeleft;
      var x = tap[0];
      var y = tap[1];

      c.strokeStyle = "#00FF00";
      c.lineWidth = 3;

      var offset = -SCREENTAP_START_SIZE / 2;
      var size = SCREENTAP_START_SIZE * 2;
      c.save();
      c.translate(x, y);
      c.strokeRect(offset, offset, size, size);
      c.restore();

      c.save();
      c.translate(x, y);
      c.fillStyle = "rgba(255, 0 ,0 , " + timeleft + ")";
      c.rotate(timeleft * Math.PI);
      c.fillRect(-offset * timeleft, -offset * timeleft, size * timeleft, size * timeleft);
      c.restore();
    }
  }

  function updateScreenTaps() {
    for (var i = 0; i < screenTaps.length; i++) {
      var tap = screenTaps[i];
      var age = (frame.timestamp - tap[2]) / 1000000;
      if (age >= SCREENTAP_LIFETIME) {
        screenTaps.splice(i, 1);
      }
    }
  }

  function onKeyTap(gesture) {
    console.log(gesture.type);
    var pos = leapTo2D(gesture.position);
    var time = frame.timestamp;
    keyTaps.push([pos[0], pos[1], time]);
  }

  function drawKeyTaps() {
    for (var i = 0; i < keyTaps.length; i++) {
      var keyTap = keyTaps[i];
      var age = (frame.timestamp - keyTap[2]) / 1000000;
      var timeleft = 1 - (age / KEYTAP_LIFETIME);
      var r = KEYTAP_START_SIZE * timeleft;
      if (r < 0) {
        r = 0;
      }
      var x = keyTap[0];
      var y = keyTap[1];

      c.strokeStyle = "#00FF00";
      c.fillStyle = "rgba(0, 256, 0, " + timeleft + ")";
      c.beginPath();
      c.arc(x, y, r, 0, Math.PI * 2);
      c.closePath();
      c.stroke();
      c.fill();
    }
  }

  function updateKeyTaps() {
    for (var i = 0; i < keyTaps.length; i++) {
      var keyTap = keyTaps[i];
      var age = (frame.timestamp - keyTap[2]) / 1000000;
      if (age >= KEYTAP_LIFETIME) {
        keyTaps.splice(i, 1);
      }
    }
  }

  function drawHands(frame) {
    for (var i = 0; i < frame.hands.length; i++) {
      var hand = frame.hands[i];
      var handPos = leapTo2D(frame, hand.palmPosition);
      for (var j = 0; j < hand.fingers.length; j++) {
        //var finger = hand.fingers[j];
        var fingerPos = leapTo2D(frame, hand.fingers[j].tipPosition);

        // draw finger tips
        c.lineWidth = 5;
        c.fillStyle = '#00FF00';
        c.strokeStyle = '#FFFF00';
        c.beginPath();
        c.arc(fingerPos[0], fingerPos[1], 6, 0, Math.PI * 2);
        c.closePath();
        c.stroke();

        // draw finger lines
        c.strokeStyle = '#0000FF';
        c.lineWidth = 3;
        c.beginPath();
        c.moveTo(handPos[0], handPos[1]);
        c.lineTo(fingerPos[0], fingerPos[1]);
        c.closePath();
        c.stroke();
      }

      // draw palm
      c.fillStyle = '#00FF00';
      c.strokeStyle = '#FFFF00';
      c.beginPath();
      c.arc(handPos[0], handPos[1], 10, 0, Math.PI * 2);
      c.closePath();
      c.fill();
    }
  }

  function leapTo2D(leapPos) {
    var iBox = frame.interactionBox;
    console.log(iBox.size);
    var left = iBox.center[0] - iBox.size[0] / 2;
    var top = iBox.center[1] + iBox.size[1] / 2;
    var x = (leapPos[0] - left) / iBox.size[0] * width;
    var y = (leapPos[1] - top) / iBox.size[1] * width;

    return [x, -y];
  }
})();