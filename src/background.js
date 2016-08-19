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

module.exports = function drawStarfield() {
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