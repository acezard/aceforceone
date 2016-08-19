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