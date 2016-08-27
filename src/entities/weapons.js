var canvas = require('../canvas');
var inputs = require('../utils/input');
var player = require('./player');
var game = require('../game-loop');
var resources = require('../utils/resources');
var Sprite = require('../utils/sprite');

var Bullet = function(x, y, dir) {
  this.pos = [x, y];
  this.dir = dir;
  this.speed = 600;
  this.sprite = new Sprite('assets/images/bullet_blue8.png', [0, 0], [7, 16]);
  this.active = true;
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    canvas.ctx.rotate(90 * Math.PI/2.0);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
  this.update = function(dt) {
    switch(this.dir) {
      case 'up': 
        this.pos[1] -= this.speed * dt;
        break;
      case 'left': 
        this.pos[0] += this.speed * dt; this.pos[1] += - this.speed * dt;
        break;
      case 'right': 
        this.pos[0] += - this.speed * dt; this.pos[1] += - this.speed * dt;
        break;
      case 'down': 
        this.pos[1] += this.speed * dt; break;
    }

    // Remove the bullet if it goes offscreen
    if(this.pos[1] < 0 || this.pos[1] > canvas.height || this.pos[0] > canvas.width || this.pos[0] < 0) {
      this.active = false;
    }
  }
};

var RedLaser = function(x, y, dir) {
  this.pos = [x, y];
  this.dir = dir;
  this.speed = 300;
  this.sprite = new Sprite('assets/images/bullet_red2.png', [0, 0], [12, 11]);
  this.active = true;
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
  this.update = function(dt) {
    switch(this.dir) {
      case 'up': 
        this.pos[1] -= this.speed * dt;
        break;
      case 'left': 
        this.pos[0] += this.speed * dt; this.pos[1] += - this.speed * dt;
        break;
      case 'right': 
        this.pos[0] += - this.speed * dt; this.pos[1] += - this.speed * dt;
        break;
      case 'down': 
        this.pos[1] += this.speed * dt; break;
    }

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
