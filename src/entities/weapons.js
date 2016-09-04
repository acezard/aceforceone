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
    lastFire: Date.now(),
    ROF: 350
  },
  blueLiberator: {
    lastFire: Date.now(),
    ROF: 500
  },
  redFoe: {
    lastFire: Date.now(),
    ROF: 1000
  },
  redRay: {
    lastFire: Date.now(),
    ROF: 500
  },
  redPulse: {
    lastFire: Date.now(),
    ROF: 500
  }
};

// Base weapon prototype
var WeaponEntity = function(damage, color, speed) {
  this.active = true;
  this.damage = damage;
  this.hit = color;
  this.speed = speed;
  this.ang = 0;
  this.rotating = 1;
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
  WeaponEntity.call(this, 1, 'blue', 600);

  this.sprite = new Sprite({url: 'assets/images/bullet_blue8.png', pos: [0, 0], size: [7, 16]});
  this.pos = [settings.x, settings.y];
  this.radians = settings.angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
}
BlueLiberator.prototype = Object.create(WeaponEntity.prototype);

// Purple Death
var PurpleDeath = function(settings) {
  WeaponEntity.call(this, 5, 'purple', 1000);

  this.sprite = new Sprite({url: 'assets/images/bigbullet.png', pos: [0, 0], size: [20, 38]});
  this.radians = settings.angle * Math.PI / 180;
  this.pos = [settings.x - this.sprite.size[0] * 0.5, settings.y - this.sprite.size[1] * 0.5];
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
}

PurpleDeath.prototype = Object.create(WeaponEntity.prototype);

// Red Foe
var RedFoe = function(settings) {
  WeaponEntity.call(this, 1, 'red', 200);

  this.sprite = new Sprite({url: 'assets/images/bullet_red2.png', pos: [0, 0], size: [12, 11]});
  this.radians = settings.angle * Math.PI / 180;
  this.pos = [settings.x, settings.y];
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
}

RedFoe.prototype = Object.create(WeaponEntity.prototype);

// Red Ray
var RedRay = function(settings) {
  WeaponEntity.call(this, 1, 'red', 500);

  this.sprite = new Sprite({url: 'assets/images/ray_red.png', pos: [0, 0], size: [5, 61]});
  this.radians = settings.angle * Math.PI / 180;
  this.pos = [settings.x, settings.y];
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = settings.rotation || null;
}

RedRay.prototype = Object.create(WeaponEntity.prototype);

// Red Pulse
var RedPulse = function(settings) {
  WeaponEntity.call(this, 1, 'red', 200);

  this.sprite = new Sprite({url: 'assets/images/redpulse.png', pos: [0, 0], size: [15, 10]});
  this.radians = settings.angle * Math.PI / 180;
  this.pos = [settings.x, settings.y];
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = settings.rotation || null;
}

RedPulse.prototype = Object.create(WeaponEntity.prototype);

// Factory function
var WeaponsFactory = function() {};

WeaponsFactory.prototype.addMissile = function(options) { 
  return new this.type(options);
}

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


var blueFactory = new BlueLiberatorFactory();
var purpleFactory = new PurpleDeathFactory();
var redFactory = new RedFoeFactory();
var redRayFactory = new RedRayFactory();
var redPulseFactory = new RedPulseFactory();

module.exports = {
  conf: weaponsConfig,
  blue: blueFactory,
  purple: purpleFactory,
  red: redFactory,
  redRay: redRayFactory,
  redPulse: redPulseFactory
};
