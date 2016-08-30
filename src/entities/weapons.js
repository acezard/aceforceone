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
  }
};

// Base weapon prototype
var WeaponEntity = function(damage, color, speed) {
  this.active = true;
  this.damage = damage;
  this.hit = color;
  this.speed = speed;
};

// Update method
WeaponEntity.prototype.update = function(dt) {
    this.pos[0] += this.xVector * dt;
    this.pos[1] += this.yVector * dt;

    // Remove the bullet if it goes offscreen
    if(this.pos[1] < 0 || this.pos[1] > canvas.height || this.pos[0] > canvas.width || this.pos[0] < 0) {
      this.active = false;
    }
};

// Draw method
WeaponEntity.prototype.render = function() {
  canvas.ctx.save();
  canvas.ctx.translate(this.pos[0], this.pos[1]);
  this.sprite.render(canvas.ctx);
  canvas.ctx.restore();
};

// Weapon specifics
// Blue Liberator
var BlueLiberator = function(settings) {
  this.sprite = new Sprite('assets/images/bullet_blue8.png', [0, 0], [7, 16]);
  this.pos = [settings.x, settings.y];
  this.radians = settings.angle * Math.PI / 180;
  this.xVector = Math.cos(this.radians) * this.speed;
  this.yVector = Math.sin(this.radians) * this.speed;
}
BlueLiberator.prototype = new WeaponEntity(1, 'blue', 600);

// Purple Death
var PurpleDeath = function(settings) {
  this.sprite = new Sprite('assets/images/bigbullet.png', [0, 0], [20, 38]);
  this.radians = settings.angle * Math.PI / 180;
  this.pos = [settings.x - this.sprite.size[0] * 0.5, settings.y - this.sprite.size[1] * 0.5];
  this.xVector = Math.cos(this.radians) * this.speed;
  this.yVector = Math.sin(this.radians) * this.speed;
}
PurpleDeath.prototype = new WeaponEntity(5, 'purple', 1000);

// Red Foe
var RedFoe = function(settings) {
  this.sprite = new Sprite('assets/images/bullet_red2.png', [0, 0], [12, 11]);
  this.radians = settings.angle * Math.PI / 180;
  this.pos = [settings.x, settings.y];
  this.xVector = Math.cos(this.radians) * this.speed;
  this.yVector = Math.sin(this.radians) * this.speed;
}
RedFoe.prototype = new WeaponEntity(1, 'red', 200);

// Factory function
var WeaponsFactory = function() {};
WeaponsFactory.prototype.addMissile = function(options) {
  switch(options.type){
    case "BlueLiberator":
      this.type = BlueLiberator;
      break;
    case "PurpleDeath":
      this.type = PurpleDeath;
      break;
    case "RedFoe":
      this.type = RedFoe;
      break;
  }
 
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

var blueFactory = new BlueLiberatorFactory();
var purpleFactory = new PurpleDeathFactory();
var redFoeFactory = new RedFoeFactory();

module.exports = {
  conf: weaponsConfig,
  blue: blueFactory,
  purple: purpleFactory,
  red: redFoeFactory
};
