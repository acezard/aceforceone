var state = require('../state');
var enemies = require('./enemies');
var canvas = require('../canvas');
var statics = require('./statics')

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
  this.squadronOffset = options.squadronOffset || 35;
  this.path = options.path;
  this.firstSpawn = 0;

  this.speedS = 50;
  this.radiansS = 90 * (Math.PI / 180);
  this.vectorS = [Math.cos(this.radiansS) * this.speedS, Math.sin(this.radiansS) * this.speedS];
};

Spawner.prototype.update = function(dt) {
  this.now = Date.now();

  if (this.size == 0) {
    this.active = false;
    return;
  }

  this[this.type](dt);
};

Spawner.prototype.squadron = function() {
  var step;
  var offset;
  var size = this.size;
  var half = Math.floor(this.size / 2);
  var rotation = 180;
  var config = false;

  if (!config) {
    var width = enemies.enemyConfig[this.enemyType].size[0];

    step = width + (canvas.width - size * width) / size;
    offset = ((canvas.width - size * width) / size) / 2;
    config = true;
  }

  // Centering the wave
  this.pos[0] = offset;

  // Calculating vertical offset
  this.pos[1] = (- this.squadronOffset * this.size) - enemies.enemyConfig[this.enemyType].size[1];

  for (i = 0; i < size; i ++) {
    if (i <= half) {
      this.pos[1] += this.squadronOffset;
    }

    if (i > half) {
      this.pos[1] -= this.squadronOffset;
    }

    if (i == half && this.leaderType) {
      state.enemies.push(enemies[this.leaderType].add({
        pos: [this.pos[0] - 50, this.pos[1]],
        angle: this.angle,
        rotation: rotation
      }));
    } else {
      state.enemies.push(enemies[this.enemyType].add({
        pos: [this.pos[0], this.pos[1]],
        angle: this.angle,
        rotation: rotation
      }));
    }

    this.pos[0] += step;
  }

  this.size = 0;
};

Spawner.prototype.customSpawner = function() {
  enemies[this.enemyType]({
    pos: this.pos
  });

  this.size--;
};

Spawner.prototype.line = function() {
  if (this.now - this.lastTime > this.firstSpawn) {
    state.enemies.push(enemies[this.enemyType].add({
      pos: [this.pos[0], this.pos[1]],
      angle: this.angle,
      rotation: this.enemyRotation
    }));

    this.firstSpawn = this.delay;
    this.lastTime = this.now;
    this.size--;
  }
};

Spawner.prototype.statics = function() {
  if (this.now - this.lastTime > this.firstSpawn) {
    state.enemies.push(statics[this.enemyType].add({
      posX: this.pos[0],
      rotation: this.enemyRotation
    }));

    this.firstSpawn = this.delay;
    this.lastTime = this.now;
    this.size--;
  }
};

Spawner.prototype.pattern = function(dt) {

  this.pos[1] += Math.sin(this.radiansS) * this.speedS * dt;

  if (this.now - this.lastTime > this.firstSpawn) {
    state.enemies.push(enemies[this.enemyType].add({
      pos: [this.pos[0],
      this.pos[1]],
      angle: this.angle,
      rotation: this.enemyRotation,
      path: this.path
    }));

    this.firstSpawn = this.delay;
    this.lastTime = this.now;
    this.size--;
  }
};

module.exports = {
  Spawner: Spawner
};
