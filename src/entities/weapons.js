// Weapons library
//
// Call a new weapon that way after importing the module: 
// `weapons.purple.addMissile({x: xValue, y: yValue, angle: angleValue})`

// Required dependencies
var canvas = require('../canvas');
var inputs = require('../utils/input');
var player = require('./player');
var game = require('../game-loop');
var resources = require('../utils/resources');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');

// Shared config to handle global rate of fire
var weaponsConfig = {
  purpleDeath: {
    damage: 5,
    hitColor: 'purple',
    speed: 1000,
    url: 'assets/images/bigbullet.png',
    pos: [0, 0],
    size: [20, 38]
  },
  blueLiberator: {
    damage: 1,
    hitColor: 'blue',
    speed: 600,
    url: 'assets/images/bullet_blue8.png',
    pos: [0, 0],
    size: [7, 16]
  },
  redFoe: {
    damage: 1,
    hitColor: 'red',
    speed: 200,
    url: 'assets/images/bullet_red2.png',
    pos: [0, 0],
    size: [12, 11]
  },
  redRay: {
    damage: 1,
    hitColor: 'red',
    speed: 500,
    url: 'assets/images/ray_red.png',
    pos: [0, 0],
    size: [5, 61]
  },
  redPulse: {
    damage: 1,
    hitColor: 'red',
    speed: 200,
    url: 'assets/images/redpulse.png',
    pos: [0, 0],
    size: [15, 10]
  },
  yellowBig: {
    damage: 5,
    hitColor: 'red',
    speed: 200,
    url: 'assets/images/bigyellow.png',
    pos: [0, 0],
    size: [23, 23]
  }
};

// Base weapon prototype
var WeaponEntity = function(settingsDefault, settingsActive) {
  // Default
  this.active = true;
  this.damage = settingsDefault.damage;
  this.hit = settingsDefault.hitColor;
  this.speed = settingsDefault.speed;
  this.sprite = new Sprite({
    url: settingsDefault.url,
    pos: settingsDefault.pos,
    size: settingsDefault.size,
    rotated: settingsDefault.rotated
  });

  // Active
  this.angle = settingsActive.angle;
  this.pos = settingsActive.pos;
  this.radians = this.angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = settingsActive.rotation || null;
};


// Update method
WeaponEntity.prototype.update = function(dt) {
    this.pos[0] += this.vector[0] * dt;
    this.pos[1] += this.vector[1] * dt;

    this.boundingCircle = {radius: this.sprite.size[0] / 2, x: this.pos[0] + this.sprite.size[0] / 2, y: this.pos[1] + this.sprite.size[1] / 2};

    // Remove the bullet if it goes offscreen
    if(this.outOfBounds()) {
      this.active = false;
    }
};

WeaponEntity.prototype.outOfBounds = function() {
  return this.pos[0] < 0 || this.pos[0] > canvas.width || this.pos[1] < 0 || this.pos[1] > canvas.height;
};

// Draw method
WeaponEntity.prototype.render = function() {
  canvas.ctx.save();
  canvas.ctx.translate(this.pos[0], this.pos[1]);
  if (this.rotation) {
    canvas.ctx.translate(this.sprite.size[0] / 2, this.sprite.size[1] / 2);
    canvas.ctx.rotate(Math.PI / 180 * this.rotation);
  }
  this.sprite.render(canvas.ctx);
  canvas.ctx.restore();
};

// Weapon specifics
// Blue Liberator
var BlueLiberator = function(settings) {
  WeaponEntity.call(this, weaponsConfig.blueLiberator, settings);
};
BlueLiberator.prototype = Object.create(WeaponEntity.prototype);
// Purple Death
var PurpleDeath = function(settings) {
  WeaponEntity.call(this, weaponsConfig.purpleDeath, settings);
}
PurpleDeath.prototype = Object.create(WeaponEntity.prototype);
// Red Foe
var RedFoe = function(settings) {
  WeaponEntity.call(this, weaponsConfig.redFoe, settings);
}
RedFoe.prototype = Object.create(WeaponEntity.prototype);
// Red Ray
var RedRay = function(settings) {
  WeaponEntity.call(this, weaponsConfig.redRay, settings);
}
RedRay.prototype = Object.create(WeaponEntity.prototype);
// Red Pulse
var RedPulse = function(settings) {
  WeaponEntity.call(this, weaponsConfig.redPulse, settings);
}
RedPulse.prototype = Object.create(WeaponEntity.prototype);
// Yellow Big
var YellowBig = function(settings) {
  WeaponEntity.call(this, weaponsConfig.yellowBig, settings);
}
YellowBig.prototype = Object.create(WeaponEntity.prototype);


// Factory function
var WeaponsFactory = function() {};
WeaponsFactory.prototype.addMissile = function(options) { 
  return new this.type(options);
};

// Specifics factory
function BlueLiberatorFactory () {};
BlueLiberatorFactory.prototype = new WeaponsFactory();
BlueLiberatorFactory.prototype.type = BlueLiberator;
function PurpleDeathFactory () {};
PurpleDeathFactory.prototype = new WeaponsFactory();
PurpleDeathFactory.prototype.type = PurpleDeath;
function RedFoeFactory () {};
RedFoeFactory.prototype = new WeaponsFactory();
RedFoeFactory.prototype.type = RedFoe;
function RedRayFactory () {};
RedRayFactory.prototype = new WeaponsFactory();
RedRayFactory.prototype.type = RedRay;
function RedPulseFactory () {};
RedPulseFactory.prototype = new WeaponsFactory();
RedPulseFactory.prototype.type = RedPulse;
function YellowBigFactory () {};
YellowBigFactory.prototype = new WeaponsFactory();
YellowBigFactory.prototype.type = YellowBig;


var blueFactory = new BlueLiberatorFactory();
var purpleFactory = new PurpleDeathFactory();
var redFactory = new RedFoeFactory();
var redRayFactory = new RedRayFactory();
var redPulseFactory = new RedPulseFactory();
var yellow = new YellowBigFactory();

module.exports = {
  conf: weaponsConfig,
  blue: blueFactory,
  purple: purpleFactory,
  red: redFactory,
  redRay: redRayFactory,
  redPulse: redPulseFactory,
  yellow: yellow
};
