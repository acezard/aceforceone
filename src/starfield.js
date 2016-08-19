var conf = require('./canvasconf');
var utils = require('./utils');

var speed = new SpeedFactor(1.5);

function SpeedFactor(number) {
  this.fast = number * 2;
  this.medium = number * 1.5;
  this.slow = number;
}

var bigstars = {
  x: 0,
  y: 0,
  y2: 0,
  src: 'assets/images/background.png',
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
  src: 'assets/images/bg2.png',
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
  src: 'assets/images/background.png',
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

exports.update = function() {
  // Background
  if (nebula.y > nebula.limit) {
    nebula.y = - nebula.h;
    nebula.limit = utils.getRandom(conf.canvasHeight, conf.canvasHeight * 5);
    console.log(nebula.limit);
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

exports.draw = function () {
  conf.ctx.drawImage(background, nebula.x, nebula.y);

  conf.ctx.drawImage(middleground, smallstars.x, smallstars.y);
  conf.ctx.drawImage(middleground, smallstars.x, smallstars.y2);

  conf.ctx.drawImage(foreground, bigstars.x, bigstars.y);
  conf.ctx.drawImage(foreground, bigstars.x, bigstars.y2);
};