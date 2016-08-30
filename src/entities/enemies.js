var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');

var RedXS = function(angle) {
  this.pos = [utils.getRandom(0, canvas.width), - 200];
  this.speed = 100;
  this.hitpoints = 10;
  this.lastFire = Date.now();
  this.sprite = new Sprite('assets/images/enemy-xs-1.png', [0, 0], [75, 53]),
  this.active = true;
  this.radians = angle * Math.PI / 180;
  this.xVector = Math.cos(this.radians) * this.speed;
  this.yVector = Math.sin(this.radians) * this.speed;
  this.score = 50;
  this.shoot = function() {
    if (Date.now() - this.lastFire > 1000) {
      var x = this.pos[0] + this.sprite.size[0] / 2;
      var y = this.pos[1] + this.sprite.size[1] / 2;

      var steps = 8;
      var step = 360/steps;
      for (i=0; i < steps; i++) {
        state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: step * i}));
      }
/*
      state.ebullets.push(new weapons.RedLaser(x, y, 45));
      state.ebullets.push(new weapons.RedLaser(x, y, 90));
      state.ebullets.push(new weapons.RedLaser(x, y, 135));
      state.ebullets.push(new weapons.RedLaser(x, y, 180));
      state.ebullets.push(new weapons.RedLaser(x, y, 225));
      state.ebullets.push(new weapons.RedLaser(x, y, 270));
      state.ebullets.push(new weapons.RedLaser(x, y, 315));
      state.ebullets.push(new weapons.RedLaser(x, y, 360));*/

      this.lastFire = Date.now();
    }
  };
  this.update = function(dt) {
    this.pos[0] += this.xVector * dt;
    this.pos[1] += this.yVector * dt;
    this.sprite.update(dt);

    // Remove if offscreen
    if(this.pos[1] > canvas.height || this.pos[0] < 0 || this.pos[0] > canvas.width) {
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