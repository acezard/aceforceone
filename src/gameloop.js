var conf = require('./canvasconf'),
    game = require('./game');

gameLoop();

function gameLoop() {
  game.update();
  game.draw();

  requestAnimationFrame(gameLoop, conf.canvas);
}
