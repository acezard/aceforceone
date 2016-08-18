var conf = require('./canvasconf');

var starfield,
    starX = 0,
    starY = 0,
    starY2 = -600;

starfield = new Image();
starfield.src = 'assets/images/background.png';

module.exports = function drawStarfield() {
  conf.ctx.drawImage(starfield,starX,starY);
  conf.ctx.drawImage(starfield,starX,starY2);
  if (starY > conf.canvasHeight) {
    starY = -799;
  }
  if (starY2 > 800) {
    starY2 = -799;
  }
  starY += 1;
  starY2 += 1;
};