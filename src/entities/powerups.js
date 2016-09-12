// Js
// Angular
// Node
// Greensock
// Sass
// Bootstrap
// MongoDB
// Jekyll

var player = require('./player');
var state = require('../state');
var Sprite = require('../utils/sprite');
var canvas = require('../canvas');
var utils = require('../utils/utils');
var explosions = require('./explosions');

var powerupConfig = {
  healthBoost: {
    url: 'assets/images/angularsmall.png',
    pos: [0, 0],
    size: [25, 26]
  },

  weaponBlueBoost: {
    url: 'assets/images/csssmall.png',
    pos: [0, 0],
    size: [25, 26]
  },

  ultiBoost: {
    url: 'assets/images/bootstrapsmall.png',
    pos: [0, 0],
    size: [25, 26],
    skill: 'angular'
  },

  weaponPurpleBoost: {
    url: 'assets/images/htmlsmall.png',
    pos: [0, 0],
    size: [25, 26]
  },

  scoreBoost: {
    url: 'assets/images/javascriptsmall.png',
    pos: [0, 0],
    size: [25, 26]
  },

  lifeBoost: {
    url: 'assets/images/nodesmall.png',
    pos: [0, 0],
    size: [25, 26]
  },
};

// Base enemy prototype
var PowerupEntity = function(settingsDefault, settingsActive) {
  // Default
  this.active = true;
  this.moveCounter = Date.now();
  this.moveDelay = 2000;
  this.goingLeft = true;
  this.speed = 50;
  this.sprite = new Sprite({
    url: settingsDefault.url,
    pos: settingsDefault.pos,
    size: settingsDefault.size
  });
  

  // Active
  this.pos = settingsActive.pos;
};

// Update method
PowerupEntity.prototype.update = function(dt) {
  var now = Date.now();

  if (this.outOfBounds()) {
    this.active = false;
    return;
  }

  if (now - this.moveCounter > this.moveDelay) {
    if (!this.goingLeft) {
      this.goingLeft = true;
    } else if (this.goingLeft) {
      this.goingLeft = false;
    }
    this.moveCounter = now;
  }

  if (this.goingLeft) {
    this.pos[0] -= this.speed * dt;
  }

  else if (!this.goingLeft) {
    this.pos[0] += this.speed * dt;
  }
};

PowerupEntity.prototype.outOfBounds = function() {
  return this.pos[1] > canvas.height;
};

// Draw method
PowerupEntity.prototype.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
};

PowerupEntity.prototype.consumed = function() {
  this.getPower();
  state.skills[this.skill] = true;
  this.active = false;
  state.score += 50;
};

var PowerupFactory = function() {};
PowerupFactory.prototype.create = function(settings) {
  return new this.type(settings);
};

// Health Boost
var HealthBoostConstructor = function(settings) {PowerupEntity.call(this, powerupConfig.healthBoost, settings);};
HealthBoostConstructor.prototype = Object.create(PowerupEntity.prototype);
HealthBoostConstructor.prototype.getPower = function() {
  if (player.hitPoints != 100) {
    player.hitPoints = 100;
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '+100 HP', 'good'));
  } else {
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '50', 'good'));
  }
};
function HealthBoostFactoryConstructor() {};
HealthBoostFactoryConstructor.prototype = new PowerupFactory();
HealthBoostFactoryConstructor.prototype.type = HealthBoostConstructor;
var healthBoostFactory = new HealthBoostFactoryConstructor();

// weaponBlueBoost
var WeaponBlueBoostConstructor = function(settings) {PowerupEntity.call(this, powerupConfig.weaponBlueBoost, settings);};
WeaponBlueBoostConstructor.prototype = Object.create(PowerupEntity.prototype);
WeaponBlueBoostConstructor.prototype.getPower = function() {
  if (player.weapon2level < 3) {
    player.weapon2level +=1;
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '+1 Weapon', 'good'));
  } else {
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '50', 'good'));
  }
  
};
function WeaponBlueBoostFactoryConstructor() {};
WeaponBlueBoostFactoryConstructor.prototype = new PowerupFactory();
WeaponBlueBoostFactoryConstructor.prototype.type = WeaponBlueBoostConstructor;
var weaponBlueBoostFactory = new WeaponBlueBoostFactoryConstructor();

// weapon purple boost
var WeaponPurpleBoostConstructor = function(settings) {PowerupEntity.call(this, powerupConfig.weaponPurpleBoost, settings);};
WeaponPurpleBoostConstructor.prototype = Object.create(PowerupEntity.prototype);
WeaponPurpleBoostConstructor.prototype.getPower = function() {
  if (player.weapon1level < 3) {
    player.weapon1level +=1;
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '+1 Weapon', 'good'));
  } else {
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '50', 'good'));
  }

};
function WeaponPurpleBoostFactoryConstructor() {};
WeaponPurpleBoostFactoryConstructor.prototype = new PowerupFactory();
WeaponPurpleBoostFactoryConstructor.prototype.type = WeaponPurpleBoostConstructor;
var weaponPurpleBoostFactory = new WeaponPurpleBoostFactoryConstructor();

// Score Boost
var ScoreBoostConstructor = function(settings) {PowerupEntity.call(this, powerupConfig.scoreBoost, settings);};
ScoreBoostConstructor.prototype = Object.create(PowerupEntity.prototype);
ScoreBoostConstructor.prototype.getPower = function() {
  state.score += 500;
  state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '500', 'good'));
};
function ScoreBoostFactoryConstructor() {};
ScoreBoostFactoryConstructor.prototype = new PowerupFactory();
ScoreBoostFactoryConstructor.prototype.type = ScoreBoostConstructor;
var scoreBoostFactory = new ScoreBoostFactoryConstructor();

// Life Boost
var LifeBoostConstructor = function(settings) {PowerupEntity.call(this, powerupConfig.lifeBoost, settings);};
LifeBoostConstructor.prototype = Object.create(PowerupEntity.prototype);
LifeBoostConstructor.prototype.getPower = function() {
  if (state.lives < 2) {
    state.lives += 1;
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '+1 Life', 'good'));
  } else {
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '50', 'good'));
  }

};
function LifeBoostFactoryConstructor() {};
LifeBoostFactoryConstructor.prototype = new PowerupFactory();
LifeBoostFactoryConstructor.prototype.type = LifeBoostConstructor;
var lifeBoostFactory = new LifeBoostFactoryConstructor();

// Ulti Boost
var UltiBoostConstructor = function(settings) {PowerupEntity.call(this, powerupConfig.ultiBoost, settings);};
UltiBoostConstructor.prototype = Object.create(PowerupEntity.prototype);
UltiBoostConstructor.prototype.getPower = function() {
  if (player.powerPoints != 100) {
    player.powerPoints = 100;
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '+100 Power', 'good'));
  } else {
    state.explosions.push(new explosions.Scored(this.pos[0], this.pos[1], '50', 'good'));
  }
};
function UltiBoostFactoryConstructor() {};
UltiBoostFactoryConstructor.prototype = new PowerupFactory();
UltiBoostFactoryConstructor.prototype.type = UltiBoostConstructor;
var ultiBoostFactory = new UltiBoostFactoryConstructor();

var rolllib = [healthBoostFactory, weaponBlueBoostFactory, weaponPurpleBoostFactory, ultiBoostFactory, lifeBoostFactory, scoreBoostFactory];

var roll = function(pos) {
  var roll1 = utils.getRandom(1, 100);

  if (roll1 > 90) {
    var roll2 = Math.round(utils.getRandom(0, 5));

    state.powerups.push(rolllib[roll2].create({pos: pos}));
  }
};

module.exports = {
  angular: healthBoostFactory,
  css: weaponBlueBoostFactory,
  html: weaponPurpleBoostFactory,
  bootstrap: ultiBoostFactory,
  node: lifeBoostFactory,
  javascript: scoreBoostFactory,
  roll: roll
};
