var canvas = require('./canvas');
var inputs = require('./input');
var player = require('./player');
var game = require('./game-loop');
var resources = require('./resources');
var Sprite = require('./sprite');

var Bullet = function(x, y, dir) {
  this.pos = [x, y],
  this.dir = dir,
  this.speed = 1000,
  this.sprite = new Sprite('assets/images/bullet_blue8.png', [0, 0], [7, 16])
}

module.exports = Bullet;
