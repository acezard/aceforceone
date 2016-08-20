var conf = require('./canvasconf'),
    game = require('./game');

var lastTime;

function gameLoop() {
  var now = Date.now();
  var dt = (now - lastTime) / 1e3;

  game.update(dt);
  game.draw();

  lastTime = now;
  requestAnimationFrame(gameLoop, conf.canvas);
}

function init() {
  lastTime = Date.now();
  gameLoop();
}

init();