// Dependencies
var canvas = require('../canvas');
var utils = require('../utils/utils');
var resources = require('../utils/resources');

// Global speed
var speed = new SpeedFactor(3);

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

resources.onReady(function() {
  foreground = resources.get('assets/images/bigstars.png');
  bigstars.h = foreground.naturalHeight;
  bigstars.y2 = - bigstars.h;
});

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
  limit: utils.getRandom(canvas.height, canvas.height * 5)
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
    nebula.limit = utils.getRandom(canvas.height, canvas.height * 5);
  } 
  nebula.y += nebula.speed;


  // Middleground
  if (smallstars.y > canvas.height) smallstars.y = (-smallstars.h) - smallstars.speed;
  if (smallstars.y2 > canvas.height) smallstars.y2 = (-smallstars.h) - smallstars.speed;
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
  canvas.ctx.drawImage(background, nebula.x, nebula.y);

  canvas.ctx.drawImage(middleground, smallstars.x, smallstars.y);
  canvas.ctx.drawImage(middleground, smallstars.x, smallstars.y2);

  canvas.ctx.drawImage(foreground, bigstars.x, bigstars.y);
  canvas.ctx.drawImage(foreground, bigstars.x, bigstars.y2);
};