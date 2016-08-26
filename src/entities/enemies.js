var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');

var RedXS = function() {
  this.pos = [utils.getRandom(0, canvas.width), - 53];
  this.speed = 100;
  this.hitpoints = 2;
  this.lastFire = Date.now();
  this.sprite = new Sprite('assets/images/enemy-xs-1.png', [0, 0], [75, 53]),
  this.active = true;
  this.shoot = function() {
    if (Date.now() - this.lastFire > 1000) {
      var x = this.pos[0] + this.sprite.size[0] / 2;
      var y = this.pos[1] + this.sprite.size[1] / 2;

      state.ebullets.push(new weapons.RedLaser(x, y, 'down'));
      this.lastFire = Date.now();
    }
  };
  this.update = function(dt) {
    this.pos[1] += this.speed * dt;
    this.sprite.update(dt);

    // Remove if offscreen
    if(this.pos[1] + this.sprite.size[1] > canvas.height) {
      this.active = false;
    }
  };
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
};

module.exports = {
  RedXS: RedXS
};