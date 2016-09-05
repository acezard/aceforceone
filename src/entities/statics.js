var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');
var enemies = require('./enemies');

var STATIC_SPEED = 50;

// Default settings
var staticSettings = {
  bigBlock: {
    url: 'assets/images/base1.svg',
    pos: [0, 0],
    size: [300, 130],
    rotation: 0
  }
};

// Base enemy prototype
var StaticEntity = function(settingsDefault, settingsActive) {
  this.sprite = new Sprite({
    url: settingsDefault.url,
    pos: settingsDefault.pos,
    size: settingsDefault.size,
    rotated: true
  });
  this.invulnerable = true;
  this.active = true;
  this.rotation = settingsActive.rotation || settingsDefault.rotation;

  this.pos = [settingsActive.posX, 0 - staticSettings.bigBlock.size[1]];
};

// Update method
StaticEntity.prototype.shoot = function() {
};

StaticEntity.prototype.update = function(dt) {
  this.pos[1] += STATIC_SPEED * dt;
  this.sprite.update(dt);

  // Remove if offscreen
  if(this.pos[1] > canvas.height) {
    this.active = false;
  }
};

StaticEntity.prototype.outOfBounds = function() {
  return this.pos[1] > canvas.height || this.pos[0] < 0 || this.pos[0] > canvas.width;
};

// Draw method
StaticEntity.prototype.render = function() {
  canvas.ctx.save();
  canvas.ctx.translate(this.pos[0], this.pos[1]);
  canvas.ctx.translate(this.sprite.size[0] / 2, this.sprite.size[1] / 2);
  canvas.ctx.rotate(Math.PI / 180 * this.rotation);
  this.sprite.render(canvas.ctx);
  canvas.ctx.restore();
};

// Enemies specifics
var BigBlock = function(settings) {
  StaticEntity.call(this, staticSettings.bigBlock, settings);
};

BigBlock.prototype = Object.create(StaticEntity.prototype);

// Factory function
var StaticFactory = function() {};

StaticFactory.prototype.add = function(settings) {
  return new this.type(settings);
}

// Specifics factory
function BigBlockFactory () {};
BigBlockFactory.prototype = new StaticFactory();
BigBlockFactory.prototype.type = BigBlock;

var bigBlock = new BigBlockFactory();

module.exports = {
  bigBlock: bigBlock
};