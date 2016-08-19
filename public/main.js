(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.canvas = document.getElementById("canvas");
exports.ctx = canvas.getContext("2d");
exports.canvasWidth = canvas.clientWidth;
exports.canvasHeight = canvas.clientHeight;

},{}],2:[function(require,module,exports){
var conf = require('./canvasconf'),
    starfield = require('./starfield'),
    player = require('./player');

exports.update = function() {
  starfield.update();
  player.update();
}

exports.draw = function() {
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  starfield.draw();
  player.draw();
}
},{"./canvasconf":1,"./player":5,"./starfield":6}],3:[function(require,module,exports){
var conf = require('./canvasconf'),
    game = require('./game');

gameLoop();

function gameLoop() {
  game.update();
  game.draw();

  requestAnimationFrame(gameLoop, conf.canvas);
}

},{"./canvasconf":1,"./game":2}],4:[function(require,module,exports){
var conf = require('./canvasconf');

var inputs = {
  up: false,
  right: false,
  down: false,
  left: false
}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function keydown(e) {
  switch (event.key) {
    case 'ArrowUp':
      inputs.up = true;
      break;
    case 'ArrowRight':
      inputs.right = true;
      break;
    case 'ArrowDown':
      inputs.down = true;
      break;
    case 'ArrowLeft':
      inputs.left = true;
      break;
  }
}

function keyup(e) {
  switch (event.key) {
    case 'ArrowUp':
      inputs.up = false;
      break;
    case 'ArrowRight':
      inputs.right = false;
      break;
    case 'ArrowDown':
      inputs.down = false;
      break;
    case 'ArrowLeft':
      inputs.left = false;
      break;
  }
}

module.exports = inputs;
},{"./canvasconf":1}],5:[function(require,module,exports){
var conf = require('./canvasconf');
var inputs = require('./input');

var ship_w = 100;
var ship_h = 84;

var player = {
  x: conf.canvasWidth / 2 - ship_w / 2,
  y: conf.canvasHeight - ship_w
}

var model = new Image();
model.src = 'assets/images/player.png';

exports.update = function() {
  if (inputs.up) player.y -= 5;
  if (inputs.right) player.x += 5;
  if (inputs.down) player.y += 5;
  if (inputs.left) player.x -= 5;

  if (player.x <= 0) player.x = 0;
  if (player.y <= 0) player.y = 0;
  if (player.x + ship_w >= conf.canvasWidth) player.x = conf.canvasWidth - ship_w;
  if (player.y + ship_h >= conf.canvasHeight) player.y = conf.canvasHeight - ship_h;
}

exports.draw = function() {
  conf.ctx.drawImage(model, player.x, player.y);
};

},{"./canvasconf":1,"./input":4}],6:[function(require,module,exports){
var conf = require('./canvasconf');

var bigstars = {
  x: 0,
  y: 0,
  y2: 0,
  src: 'assets/images/background.png',
  h: 0,
  speed: 3
}

foreground = new Image();
foreground.src = bigstars.src;
foreground.onload = function() {
  bigstars.h = foreground.naturalHeight;
  bigstars.y2 = - bigstars.h;
}

var smallstars = {
  x: 0,
  y: 0,
  y2: 0,
  src: 'assets/images/bg2.png',
  h: 0,
  speed: 2
}

middleground = new Image();
middleground.src = smallstars.src;
middleground.onload = function() {
  smallstars.h = middleground.naturalHeight;
  smallstars.y2 = - smallstars.h;
}

var wave = {
  y: 0,
  x: 0,
  src: 'assets/images/wave.png',
  h: 0,
  speed: 1
}

background = new Image();
background.src = wave.src;
background.onload = function() {
  wave.h = background.naturalHeight;
}

exports.update = function() {
  // Background
  if (wave.y > 1000) wave.y = - wave.h; // 1000 is arbitrary
  wave.y += wave.speed;

  // Middleground
  if (smallstars.y > smallstars.h) smallstars.y = (-smallstars.h) - smallstars.speed;
  if (smallstars.y2 > smallstars.h) smallstars.y2 = (-smallstars.h) - smallstars.speed;
  smallstars.y += smallstars.speed;
  smallstars.y2 += smallstars.speed;

  // Foreground
  if (bigstars.y > bigstars.h) bigstars.y = (-bigstars.h) - bigstars.speed;
  if (bigstars.y2 > bigstars.h) bigstars.y2 = (-bigstars.h) - bigstars.speed;
  bigstars.y += bigstars.speed;
  bigstars.y2 += bigstars.speed;
};

exports.draw = function () {
  conf.ctx.drawImage(background, wave.x, wave.y);

  conf.ctx.drawImage(middleground, smallstars.x, smallstars.y);
  conf.ctx.drawImage(middleground, smallstars.x, smallstars.y2);

  conf.ctx.drawImage(foreground, bigstars.x, bigstars.y);
  conf.ctx.drawImage(foreground, bigstars.x, bigstars.y2);
};
},{"./canvasconf":1}]},{},[3]);
