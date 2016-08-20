var conf = require('./canvasconf'),
    background = require('./background'),
    player = require('./player'),
    weapons = require('./weapons'),
    enemies = require('./enemies');

var gameTime = 0;

exports.update = function(dt) {
  gameTime += dt;
  console.log(gameTime);

  background.update();
  player.update();
  weapons.update();
  enemies.update();
}

exports.draw = function() {
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  background.draw();
  enemies.draw();
  weapons.draw();
  player.draw();
}