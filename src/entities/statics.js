var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');

var STATIC_SPEED = 50;

var BigBlock = function(posX) {
  this.ratio = 3;
  this.sprite = new Sprite('assets/images/base1.svg', [0, 0], [260, 112]);
  this.sprite.ratio = this.ratio;
  this.pos = [posX, 0 - this.sprite.size[1]];
  this.invulnerable = true;
  this.hitpoints = 10;
  this.lastFire = Date.now();
  this.active = true;
  this.score = 50;
  this.update = function(dt) {
    this.pos[1] += STATIC_SPEED * dt;

    this.sprite.update(dt);

    // Remove if offscreen
    if(this.pos[1] > canvas.height) {
      this.active = false;
    }
  };
  this.shoot = function() {

  };
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);

    canvas.ctx.restore();
  };
};

module.exports = {
  BigBlock: BigBlock
};