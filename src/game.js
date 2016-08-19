var conf = require('./canvasconf'),
    starfield = require('./background'),
    player = require('./player');

exports.update = function() {
  starfield.update();
  player.update();
}

exports.draw = function() {
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  starfield.draw();
  player.draw();
}