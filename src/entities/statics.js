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
    url: 'assets/images/base1.png',
    pos: [0, 0],
    size: [300, 129],
    rotation: 0
  },
  battlePlatform: {
    url: 'assets/images/base2.png',
    pos: [0, 0],
    size: [200, 690],
    rotation: 0
  },
  smallPlatform: {
    url: 'assets/images/base3.png',
    pos: [0, 0],
    size: [64, 128],
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
  this.enemiesSpawned = false;
  this.rotation = settingsActive.rotation || settingsDefault.rotation;

  this.pos = [settingsActive.posX, 0 - settingsDefault.size[1]];
};

// Update method
StaticEntity.prototype.shoot = function() {
};

StaticEntity.prototype.spawnEnemies = function() {};

StaticEntity.prototype.update = function(dt) {
  if (!this.enemiesSpawned) {
    this.spawnEnemies();
    this.enemiesSpawned = true;
  }

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

// Factory function
var StaticFactory = function() {};

StaticFactory.prototype.add = function(settings) {
  return new this.type(settings);
}

// Big Block
var BigBlock = function(settings) {
  StaticEntity.call(this, staticSettings.bigBlock, settings);
};

BigBlock.prototype = Object.create(StaticEntity.prototype);

BigBlock.prototype.spawnEnemies = function() {
  if (this.rotation == 0) {
    state.enemies.push(enemies.dockCannon.add({
      pos: [this.pos[0] + 65, this.pos[1] + 45],
      angle: 90,
      rotation: 135
    }));
    state.enemies.push(enemies.dockCannon.add({
      pos: [this.pos[0] + 150, this.pos[1] + 45],
      angle: 90,
      rotation: 135
    }));
  }

  if (this.rotation == 180) {
    state.enemies.push(enemies.dockCannon.add({
      pos: [this.pos[0] + 120, this.pos[1] + 45],
      angle: 90,
      rotation: 225
    }));
    state.enemies.push(enemies.dockCannon.add({
      pos: [this.pos[0] + 205, this.pos[1] + 45],
      angle: 90,
      rotation: 225
    }));
  }
};

function BigBlockFactory () {};
BigBlockFactory.prototype = new StaticFactory();
BigBlockFactory.prototype.type = BigBlock;

var bigBlock = new BigBlockFactory();

// Battle Platform
var BattlePlatform = function(settings) {
  StaticEntity.call(this, staticSettings.battlePlatform, settings);
};

BattlePlatform.prototype = Object.create(StaticEntity.prototype);

BattlePlatform.prototype.spawnEnemies = function() {
  var x = this.pos[0] + this.sprite.size[0];
  var x2 = this.pos[0] - 26;
  var increment = 82;
  var increment2 = 82;

  for (i = 0; i < 6; i ++) {
    state.enemies.push(enemies.bigPlatCannon.add({
      pos: [x, this.pos[1] + increment],
      angle: 90,
      rotation: 0
    }));

    increment += 100;
  }

  for (i = 0; i < 6; i ++) {
    state.enemies.push(enemies.bigPlatCannon.add({
      pos: [x2, this.pos[1] + increment2],
      angle: 90,
      rotation: 180
    }));

    increment2 += 100;
  }
};

function BattlePlatformFactory () {};
BattlePlatformFactory.prototype = new StaticFactory();
BattlePlatformFactory.prototype.type = BattlePlatform;
var battlePlatform = new BattlePlatformFactory();

// Small Platform
var SmallPlatform = function(settings) {
  StaticEntity.call(this, staticSettings.smallPlatform, settings);
};

SmallPlatform.prototype = Object.create(StaticEntity.prototype);

SmallPlatform.prototype.spawnEnemies = function() {
  var x = this.pos[0] + this.sprite.size[0] / 2 - 27 / 2;
  var y = this.pos[1] + this.sprite.size[1] / 2 - 37 / 2;
  var unique = this.pos[0] > canvas.width / 2 ? 'right' : 'left';

  state.enemies.push(enemies.circlePlatCannon.add({
    pos: [x, y],
    angle: 90,
    rotation: 0,
    unique: unique
  }));
};

function SmallPlatformFactory () {};
SmallPlatformFactory.prototype = new StaticFactory();
SmallPlatformFactory.prototype.type = SmallPlatform;
var smallPlatform = new SmallPlatformFactory();

// Exports
module.exports = {
  bigBlock: bigBlock,
  battlePlatform: battlePlatform,
  smallPlatform: smallPlatform
};
