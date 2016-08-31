var state = require('../state');
var enemies = require('./enemies');
var canvas = require('../canvas');

function Spawner(pos, angle, delay, enemyType, size, type) {
  this.pos = pos;
  this.angle = angle;
  this.delay = delay;
  this.enemyType = enemyType;
  this.size = size;
  this.lastTime = Date.now();
  this.active = true;
  this.type = type;
  this.now;
};

Spawner.prototype.update = function() {
  this.now = Date.now();

  if (this.size == 0) {
    this.active = false;
    return;
  }

  this[this.type]();
};

Spawner.prototype.squadron = function() {
  var step = canvas.width / this.size;
  var size = this.size;
  var half = Math.floor(this.size / 2);

  // Centering the wave
  this.pos[0] = step / size;

  // Calculating vertical offset
  this.pos[1] = - 75 * this.size;

  for (i = 0; i < size; i ++) {
    if (i <= half) {
      this.pos[1] += 75;
    }

    if (i > half) {
      this.pos[1] -= 75;
    }

    state.enemies.push(new enemies.RedXS([this.pos[0], this.pos[1]], this.angle));
    this.pos[0] += step;
  }

  this.size = 0;
};

Spawner.prototype.line = function() {
  if (this.now - this.lastTime > this.delay) {
    state.enemies.push(new enemies.RedXS([this.pos[0], this.pos[1]], this.angle));

    this.lastTime = this.now;
    this.size--;
  }
};

module.exports = {
  Spawner: Spawner
};