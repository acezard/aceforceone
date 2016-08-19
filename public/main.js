(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var conf = require('./canvasconf');

var starfield,
    starfield2,
    wave,
    starX = 0,
    starY = 0,
    starY2 = -900,
    star2Y = 0
    star2Y2 = -593,
    waveX = 0,
    waveY = 0;

starfield = new Image();
starfield.src = 'assets/images/background.png';
starfield2 = new Image();
starfield2.src = 'assets/images/bg2.png';
wave = new Image();
wave.src = 'assets/images/wave.png';

exports.draw = function () {
  conf.ctx.drawImage(wave, waveX, waveY);
  waveY += 0.2;

  if (waveY > 1000) {
    waveY = -491;
  }

  conf.ctx.drawImage(starfield2, starX, star2Y);
  conf.ctx.drawImage(starfield2, starX, star2Y2);
  if (star2Y > 593) {
    star2Y = -592;
  }
  if (star2Y2 > 593) {
    star2Y2 = -592;
  }
  star2Y += 0.5;
  star2Y2 += 0.5;

  conf.ctx.drawImage(starfield, starX, starY);
  conf.ctx.drawImage(starfield, starX, starY2);
  if (starY > 900) {
    starY = -899;
  }
  if (starY2 > 900) {
    starY2 = -899;
  }
  starY += 1;
  starY2 += 1;

};
},{"./canvasconf":2}],2:[function(require,module,exports){
exports.canvas = document.getElementById("canvas");
exports.ctx = canvas.getContext("2d");
exports.canvasWidth = canvas.clientWidth;
exports.canvasHeight = canvas.clientHeight;

},{}],3:[function(require,module,exports){
var conf = require('./canvasconf'),
    starfield = require('./background'),
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
},{"./background":1,"./canvasconf":2,"./player":6}],4:[function(require,module,exports){
var conf = require('./canvasconf'),
    game = require('./game');

gameLoop();

function gameLoop() {
  game.update();
  game.draw();

  requestAnimationFrame(gameLoop, conf.canvas);
}

},{"./canvasconf":2,"./game":3}],5:[function(require,module,exports){
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
},{"./canvasconf":2}],6:[function(require,module,exports){
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

},{"./canvasconf":2,"./input":5}]},{},[4]);
