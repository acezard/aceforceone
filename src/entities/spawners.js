var state = require('../state');
var enemies = require('./enemies');

var lastTime = Date.now();

function Spawner(pos, angle, delay, enemyType, size) {
  this.pos = pos;
  this.angle = angle;
  this.delay = delay;
  this.enemyType = enemyType;
  this.size = size;
  this.lastTime = Date.now();
  this.active = true;
};

Spawner.prototype.update = function() {
  var now = Date.now();

  if (this.size == 0) {
    this.active = false;
    return;
  }

  if (this.size && now - lastTime > this.delay) {
    state.enemies.push(new enemies.RedXS([this.pos[0], this.pos[1]], this.angle));

    lastTime = now;
    this.size--;
  }
};

module.exports = {
  Spawner: Spawner
};