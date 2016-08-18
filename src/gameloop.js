var conf = require('./canvasconf'),
    drawStarfield = require('./background');

gameLoop();

function gameLoop() {
  requestAnimationFrame(gameLoop, conf.canvas);
  drawStarfield();
}
