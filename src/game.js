var conf = require('./canvasconf'),
    starfield = require('./starfield');

exports.update = function() {
  starfield.update();
}

exports.draw = function() {
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  starfield.draw();
}