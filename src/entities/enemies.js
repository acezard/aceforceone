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
    hitpoints: 2,
    score: 50
  },

  RotatingPlat: {
    speed: 30,
    hitpoints: 100,
    ROF: 200,
    score: 250,
    burst: {
      amount: 1000,
      delay: 1000,
      counter: 1000
    },
  },

  RogueLeader: {
    speed: 100,
    hitpoints: 60,
    score: 300,
    ROF: 500
  },
};

// Base enemy prototype
var EnemyEntity = function(config) {
  this.active = true;
  this.speed = config.speed;
  this.hitpoints = config.hitpoints;
  this.lastFire = Date.now();
  this.score = config.score;
  this.ROF = config.ROF || null;
  this.maxHitpoints = config.hitpoints;
  this.rotating = config.rotating || null;
  this.ang = 0;

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
    this.boundingCircle = {radius: this.sprite.size[0] / 2, x: this.pos[0] + this.sprite.size[0] / 2, y: this.pos[1] + this.sprite.size[1] / 2};

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

  this.sprite = new Sprite({
    url: 'assets/images/enemy-xs-1.svg',
    pos: [0, 0],
    size: [75, 53],
    rotated: true
  });
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

  this.sprite = new Sprite({
    url: 'assets/images/scout.png',
    pos: [0, 0],
    size: [50, 44],
    rotated: true
  });
  this.pos = [pos[0], pos[1]];
  this.radians = angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = rotation || null;
}

Scout.prototype = Object.create(EnemyEntity.prototype);

var RotatingPlat = function(pos, angle, rotation) {
  EnemyEntity.call(this, enemyConfig.RotatingPlat);

  this.sprite = new Sprite({
    url: 'assets/images/platpart.png',
    pos: [0, 0],
    size: [150, 44],
    rotated: true
  });
  this.pos = [pos[0], pos[1]];
  this.radians = angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = rotation || null;
}

RotatingPlat.prototype = Object.create(EnemyEntity.prototype);

RotatingPlat.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    if (this.rotation == 360 || this.rotation == 180) {
      state.ebullets.push(weapons.redPulse.addMissile({x: x + this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 90, rotation: this.ang + 180}));
      state.ebullets.push(weapons.redPulse.addMissile({x: x + this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 270, rotation: this.ang + 0}));
    }

    if (this.rotation == 90 || this.rotation == 270) {
      state.ebullets.push(weapons.redPulse.addMissile({x: x+ this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 0, rotation: this.ang + 90}));
      state.ebullets.push(weapons.redPulse.addMissile({x: x+ this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 180, rotation: this.ang + 270}));
    }

    this.ang +=10;

    this.burst.counter--;
    this.lastFire = now;
    return;
  }  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
}

var RogueLeader = function(pos, angle, rotation) {
  EnemyEntity.call(this, enemyConfig.RogueLeader);

  this.sprite = new Sprite({
    url: 'assets/images/rogueleader.svg',
    pos: [0, 0],
    size: [200, 89],
    rotated: true
  });
  this.pos = [pos[0], pos[1]];
  this.radians = angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = rotation || null;
}

RogueLeader.prototype = Object.create(EnemyEntity.prototype);

RogueLeader.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    state.ebullets.push(weapons.redRay.addMissile({x: x + this.sprite.size[0] * 0.3, y: y + this.sprite.size[1] * 0.6, angle: this.rotation - 90}));
    state.ebullets.push(weapons.redRay.addMissile({x: x + this.sprite.size[0] * 0.7, y: y + this.sprite.size[1] * 0.6, angle: this.rotation - 90}));

    this.lastFire = now;
  }
};

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

function RotatingPlatFactory () {};
RotatingPlatFactory.prototype = new EnemyFactory();
RotatingPlatFactory.prototype.type = RotatingPlat;

function RogueLeaderFactory () {};
RogueLeaderFactory.prototype = new EnemyFactory();
RogueLeaderFactory.prototype.type = RogueLeader;

var RedXS = new RedXSFactory();
var Scout = new ScoutFactory();
var RogueLeader = new RogueLeaderFactory();
var RotatingPlat = new RotatingPlatFactory();

var Plat = function(pos) {
  var x = pos[0];
  var y = pos[1];

  // 50 = w/3
  state.enemies.push(RotatingPlat.add([x, y], 90, 360));
  state.enemies.push(RotatingPlat.add([x - 65 - 65, y], 90, 180));
  state.enemies.push(RotatingPlat.add([x - 65, y + 65], 90, 90));
  state.enemies.push(RotatingPlat.add([x - 65 , y - 65], 90, 270));
}

module.exports = {
  RedXS: RedXS,
  Scout: Scout,
  RotatingPlat: RotatingPlat,
  RogueLeader: RogueLeader
};
