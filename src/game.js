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