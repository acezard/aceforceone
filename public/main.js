(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Dependencies
var conf = require('./canvasconf');
var utils = require('./utils');

// Global speed
var speed = new SpeedFactor(0.5);

function SpeedFactor(number) {
  this.fast = number * 2;
  this.medium = number * 1.5;
  this.slow = number;
}

// Background objects 
var bigstars = {
  x: 0,
  y: 0,
  y2: 0,
  src: 'assets/images/bigstars.png',
  h: 0,
  speed: speed.fast
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
  src: 'assets/images/smallstars.png',
  h: 0,
  speed: speed.medium
}

middleground = new Image();
middleground.src = smallstars.src;
middleground.onload = function() {
  smallstars.h = middleground.naturalHeight;
  smallstars.y2 = - smallstars.h;
}

var nebula = {
  y: 0,
  x: 0,
  src: 'assets/images/nebula.png',
  h: 0,
  speed: speed.slow,
  limit: utils.getRandom(conf.canvasHeight, conf.canvasHeight * 5)
}

background = new Image();
background.src = nebula.src;
background.onload = function() {
  nebula.h = background.naturalHeight;
  nebula.y = - nebula.h;
}

// Update
exports.update = function() {
  // Background
  if (nebula.y > nebula.limit) {
    nebula.y = - nebula.h;
    nebula.limit = utils.getRandom(conf.canvasHeight, conf.canvasHeight * 5);
  } 
  nebula.y += nebula.speed;


  // Middleground
  if (smallstars.y > conf.canvasHeight) smallstars.y = (-smallstars.h) - smallstars.speed;
  if (smallstars.y2 > conf.canvasHeight) smallstars.y2 = (-smallstars.h) - smallstars.speed;
  smallstars.y += smallstars.speed;
  smallstars.y2 += smallstars.speed;

  // Foreground
  if (bigstars.y > bigstars.h) bigstars.y = (-bigstars.h) - bigstars.speed;
  if (bigstars.y2 > bigstars.h) bigstars.y2 = (-bigstars.h) - bigstars.speed;
  bigstars.y += bigstars.speed;
  bigstars.y2 += bigstars.speed;
};

// Draw
exports.draw = function () {
  conf.ctx.drawImage(background, nebula.x, nebula.y);

  conf.ctx.drawImage(middleground, smallstars.x, smallstars.y);
  conf.ctx.drawImage(middleground, smallstars.x, smallstars.y2);

  conf.ctx.drawImage(foreground, bigstars.x, bigstars.y);
  conf.ctx.drawImage(foreground, bigstars.x, bigstars.y2);
};
},{"./canvasconf":2,"./utils":8}],2:[function(require,module,exports){
exports.canvas = document.getElementById("canvas");
exports.ctx = canvas.getContext("2d");
exports.canvasWidth = canvas.clientWidth;
exports.canvasHeight = canvas.clientHeight;

},{}],3:[function(require,module,exports){
var conf = require('./canvasconf');

var xs1Total = 7;
var xs1Collection = [];
var xs1model = new Image();

xs1model.src = 'assets/images/enemy-xs-1.png';

xs1model.onload = function() {
  var enemyXS1Config = {
    speed: 3,
    height: xs1model.naturalHeight,
    width: xs1model.naturalWidth
  }

  var waveIncrementX = conf.canvasWidth / xs1Total;
  var offset = (conf.canvasWidth - ((xs1Total - 1) * waveIncrementX + enemyXS1Config.width)) / 2;

  function makeXS1(x) {
    var EnemyXS1 = function(x) {
      this.x = x;
      this.y =  - enemyXS1Config.height;
      this.speed = enemyXS1Config.speed;
      this.width = enemyXS1Config.width;
      this.height = enemyXS1Config.height;
    }

    return new EnemyXS1(x);
  }

  for (var i = 0; i < xs1Total; i++) {
    xs1Collection.push(makeXS1(waveIncrementX * i + offset));
  }
}

exports.update = function() {
  for (var i = 0; i < xs1Collection.length; i++) {
    if (xs1Collection[i].y < conf.canvasHeight) {
      xs1Collection[i].y += 3;
    } else if (xs1Collection[i].y > conf.canvasHeight - 1) {
      xs1Collection[i].y = -45;
    }
  }
}

exports.draw = function() {
  for (var i = 0; i < xs1Collection.length; i++) {
    conf.ctx.drawImage(xs1model, xs1Collection[i].x, xs1Collection[i].y);
  }
}

},{"./canvasconf":2}],4:[function(require,module,exports){
var conf = require('./canvasconf'),
    background = require('./background'),
    player = require('./player'),
    enemies = require('./enemies');

exports.update = function() {
  background.update();
  player.update();
  enemies.update();
}

exports.draw = function() {
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  background.draw();
  enemies.draw();
  player.draw();
}
},{"./background":1,"./canvasconf":2,"./enemies":3,"./player":7}],5:[function(require,module,exports){
var conf = require('./canvasconf'),
    game = require('./game');

gameLoop();

function gameLoop() {
  game.update();
  game.draw();

  requestAnimationFrame(gameLoop, conf.canvas);
}

},{"./canvasconf":2,"./game":4}],6:[function(require,module,exports){
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
},{"./canvasconf":2}],7:[function(require,module,exports){
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

},{"./canvasconf":2,"./input":6}],8:[function(require,module,exports){
exports.getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}
},{}]},{},[5]);
