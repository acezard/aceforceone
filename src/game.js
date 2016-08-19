var conf = require('./canvasconf'),
    background = require('./background'),
    player = require('./player');

exports.update = function() {
  background.update();
  player.update();
}

exports.draw = function() {
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  background.draw();
  player.draw();
}