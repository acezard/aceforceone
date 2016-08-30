var state = require('../state');
var enemies = require('./enemies');

function Spawner(pos, angle, delay, enemyType, size) {
  this.pos = [pos[0], pos[1]];
  this.angle = angle;
  this.delay = delay;
  this.enemyType = enemyType;
  this.size = size;
  this.lastTime = Date.now();
  this.active = true;
};

Spawner.prototype.update = function() {
  if (this.size == 0) {
    this.active = false;
    return;
  }

  if (this.size && Date.now() - this.lastTime > this.delay) {
    state.enemies.push(new enemies.RedXS(this.pos, this.angle));
    this.lastTime = Date.now();
    this.size--;
  }
};

module.exports = {
  Spawner: Spawner
};