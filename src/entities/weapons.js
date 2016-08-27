var canvas = require('../canvas');
var inputs = require('../utils/input');
var player = require('./player');
var game = require('../game-loop');
var resources = require('../utils/resources');
var Sprite = require('../utils/sprite');

var Bullet = function(x, y, angle) {
  this.pos = [x, y];
  this.speed = 600;
  this.sprite = new Sprite('assets/images/bullet_blue8.png', [0, 0], [7, 16]);
  this.active = true;
  this.radians = angle * Math.PI / 180;
  this.xVector = Math.cos(this.radians) * this.speed;
  this.yVector = Math.sin(this.radians) * this.speed;
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    canvas.ctx.rotate(90 * Math.PI/2.0);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
  this.update = function(dt) {
    this.pos[0] += this.xVector * dt;
    this.pos[1] += this.yVector * dt;

    // Remove the bullet if it goes offscreen
    if(this.pos[1] < 0 || this.pos[1] > canvas.height || this.pos[0] > canvas.width || this.pos[0] < 0) {
      this.active = false;
    }
  }
};

var RedLaser = function(x, y, angle) {
  this.pos = [x, y];
  this.speed = 300;
  this.sprite = new Sprite('assets/images/bullet_red2.png', [0, 0], [12, 11]);
  this.active = true;
  this.radians = angle * Math.PI / 180;
  this.xVector = Math.cos(this.radians) * this.speed;
  this.yVector = Math.sin(this.radians) * this.speed;
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
  this.update = function(dt) {
    this.pos[0] += this.xVector * dt;
    this.pos[1] += this.yVector * dt;

    // Remove the bullet if it goes offscreen
    if(this.pos[1] < 0 || this.pos[1] > canvas.height || this.pos[0] > canvas.width || this.pos[0] < 0) {
      this.active = false;
    }
  }
};

module.exports = {
  Bullet: Bullet,
  RedLaser: RedLaser
};
