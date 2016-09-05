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
  this.pos[1] = - this.squadronOffset * this.size;

  for (i = 0; i < size; i ++) {
    if (i <= half) {
      this.pos[1] += this.squadronOffset;
    }

    if (i > half) {
      this.pos[1] -= this.squadronOffset;
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
    console.log(this.pos);
    state.enemies.push(enemies[this.enemyType].add({pos: [this.pos[0], this.pos[1]], angle: this.angle, rotation: this.enemyRotation}));

    this.lastTime = this.now;
    this.size--;
  }
};

Spawner.prototype.statics = function() {
  if (this.now - this.lastTime > this.delay) {
    state.enemies.push(statics[this.enemyType].add({posX: this.pos[0], rotation: this.enemyRotation}));

    this.lastTime = this.now;
    this.size--;
  }
};

Spawner.prototype.pattern = function() {
  function newUpdate() {
    this.pos[0] += this.vector[0] * dt;
    this.pos[1] += this.vector[1] * dt;
    this.boundingCircle = {radius: this.sprite.size[0] / 2, x: this.pos[0] + this.sprite.size[0] / 2, y: this.pos[1] + this.sprite.size[1] / 2};

    // Remove the enemy if it goes offscreen
    if(this.outOfBounds()) {
      this.active = false;
    }
  };

  if (this.now - this.lastTime > this.delay) {
    console.log(this.pos);
    state.enemies.push(enemies[this.enemyType].add({pos: [this.pos[0], this.pos[1]], angle: this.angle, rotation: this.enemyRotation}));

    this.lastTime = this.now;
    this.size--;
  }
};

module.exports = {
  Spawner: Spawner
};
