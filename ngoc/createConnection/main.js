'use strict';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var controller = new Leap.Controller();
var button = document.getElementById('unicornButton');

window.onload = function() {
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

  button.addEventListener('click', onReady);
}

function onControllerConnect() {
  console.log('controller successfully connected');
}

function onDeviceConnect() {
  console.log('A Leap device has been connected.');
}

function onDeviceDisconnect() {
  console.log('A Leap device has been disconnected.');
}

function onReady() {
  console.log('Device ready');
  var img = document.createElement('img');
  img.src = "http://i.imgur.com/f68W5EC.png";
  context.drawImage(img, 0, 0);
}