var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');

// Config Object
var enemyConfig = {
  RedXS: {
    speed: 100,
    hitpoints: 10,
    score: 40,
    burst: {
      amount: 3,
      delay: 1000,
      counter: 3
    },
    ROF: 100
  }
}

// Base enemy prototype
var EnemyEntity = function(config) {
  this.active = true;
  this.speed = config.speed;
  this.hitpoints = config.hitpoints;
  this.lastFire = Date.now();
  this.score = config.score;
  this.burst = {
    amount: config.burst.amount,
    delay: config.burst.delay,
    counter: config.burst.counter
  } || null;
  this.ROF = config.ROF;
};

// Update method
EnemyEntity.prototype.update = function(dt) {
    this.pos[0] += this.vector[0] * dt;
    this.pos[1] += this.vector[1] * dt;

    // Remove the enemy if it goes offscreen
    if(this.outOfBounds()) {
      this.active = false;
    }
};

EnemyEntity.prototype.outOfBounds = function() {
  return this.pos[1] > canvas.height || this.pos[0] < 0 || this.pos[0] > canvas.width;
};

// Draw method
EnemyEntity.prototype.render = function() {
  canvas.ctx.save();
  canvas.ctx.translate(this.pos[0], this.pos[1]);
  this.sprite.render(canvas.ctx);
  canvas.ctx.restore();
};

// Enemies specifics
var RedXS = function(pos, angle) {
  EnemyEntity.call(this, enemyConfig.RedXS);

  this.sprite = new Sprite('assets/images/enemy-xs-1.png', [0, 0], [75, 53]);
  this.pos = [pos[0], pos[1]];
  this.radians = angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
}

RedXS.prototype = Object.create(EnemyEntity.prototype);

RedXS.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;

    state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: 90}));
    state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: 80}));
    state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: 100}));

    this.burst.counter--;
    this.lastFire = now;
    return;
  } else

  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
}

// Factory function
var EnemyFactory = function() {};

EnemyFactory.prototype.add = function(pos, angle) { 
  return new this.type(pos, angle);
}

// Specifics factory
function RedXSFactory () {};
RedXSFactory.prototype = new EnemyFactory();
RedXSFactory.prototype.type = RedXS;

var RedXS = new RedXSFactory();

var test = RedXS.add(10, 20, 52);

module.exports = {
  RedXS: RedXS
};