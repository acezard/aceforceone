var conf = require('./canvasconf'),
    drawStarfield = require('./background');

gameLoop();

function gameLoop() {
  requestAnimationFrame(gameLoop, conf.canvas);
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  drawStarfield();
}
