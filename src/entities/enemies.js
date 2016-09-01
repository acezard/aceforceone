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
    score: 100,
    burst: {
      amount: 3,
      delay: 1000,
      counter: 3
    },
    ROF: 100
  },
  Scout: {
    speed: 500,
    hitpoints: 5,
    score: 50
  }
}

// Base enemy prototype
var EnemyEntity = function(config) {
  this.active = true;
  this.speed = config.speed;
  this.hitpoints = config.hitpoints;
  this.lastFire = Date.now();
  this.score = config.score;
  this.ROF = config.ROF || null;

  if (config.burst) {
    this.burst = {
      amount: config.burst.amount,
      delay: config.burst.delay,
      counter: config.burst.counter
    };
  }
};

// Update method
EnemyEntity.prototype.shoot = function() {
};

var ang = 0;
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

  if (this.rotation) {
    canvas.ctx.translate(this.sprite.size[0] / 2, this.sprite.size[1] / 2);
    canvas.ctx.rotate(Math.PI / 180 * this.rotation);
  }

  this.sprite.render(canvas.ctx);
  canvas.ctx.restore();
};

// Enemies specifics
var RedXS = function(pos, angle, rotation) {
  EnemyEntity.call(this, enemyConfig.RedXS);

  this.sprite = new Sprite('assets/images/enemy-xs-1.png', [0, 0], [75, 53]);
  this.pos = [pos[0], pos[1]];
  this.radians = angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = rotation || null;
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

var Scout = function(pos, angle, rotation) {
  EnemyEntity.call(this, enemyConfig.Scout);

  this.sprite = new Sprite('assets/images/scout.png', [0, 0], [50, 44]);
  this.pos = [pos[0], pos[1]];
  this.radians = angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = rotation || null;
}

Scout.prototype = Object.create(EnemyEntity.prototype);

// Factory function
var EnemyFactory = function() {};

EnemyFactory.prototype.add = function(pos, angle, rotation) { 
  return new this.type(pos, angle, rotation);
}

// Specifics factory
function RedXSFactory () {};
RedXSFactory.prototype = new EnemyFactory();
RedXSFactory.prototype.type = RedXS;

function ScoutFactory () {};
ScoutFactory.prototype = new EnemyFactory();
ScoutFactory.prototype.type = Scout;

var RedXS = new RedXSFactory();
var Scout = new ScoutFactory();

module.exports = {
  RedXS: RedXS,
  Scout: Scout
};