var state = require('../state');
var enemies = require('./enemies');
var canvas = require('../canvas');

function Spawner(options) {
  this.pos = options.position;
  this.angle = options.angle || 90;
  this.delay = options.delay || 0;
  this.enemyType = options.enemyType;
  this.size = options.enemyNumbers;
  this.lastTime = Date.now();
  this.active = true;
  this.type = options.type;
  this.now;
  this.enemyRotation = options.rotation || null;
  this.leaderType = options.leader || null;
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
  var rotation = 180; // In squadrons, enemies always go toward bottom of the screen

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

    if (i == half && this.leaderType) {
      state.enemies.push(enemies[this.leaderType].add([this.pos[0] - 50, this.pos[1]], this.angle, rotation));
    } else {
      state.enemies.push(enemies[this.enemyType].add([this.pos[0], this.pos[1]], this.angle, rotation));
    }

    this.pos[0] += step;
  }

  this.size = 0;
};

Spawner.prototype.line = function() {
  if (this.now - this.lastTime > this.delay) {
    state.enemies.push(enemies[this.enemyType].add([this.pos[0], this.pos[1]], this.angle, this.enemyRotation));

    this.lastTime = this.now;
    this.size--;
  }
};

module.exports = {
  Spawner: Spawner
};
