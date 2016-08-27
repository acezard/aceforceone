var canvas = require('../canvas');
var inputs = require('../utils/input');
var Sprite = require('../utils/sprite');
var resources = require('../utils/resources');
var state = require('../state');
var weapons = require('./weapons');

// Load player
var player = {
  pos: [0, 0],
  sprite: new Sprite('assets/images/player.png', [0, 0], [0, 0], 16, [0, 1]),
  speed: 400,
  hitPoints: 10,
  shieldPoints: 10,
  shoot: function() {
    var x = player.pos[0] + player.sprite.size[0] / 2;
    var y = player.pos[1] + player.sprite.size[1] / 2;
    var dir = 'up';

    state.bullets.push(new weapons.Bullet(x, y, dir));
    state.bullets.push(new weapons.Bullet(x, y, 'left'));
    state.bullets.push(new weapons.Bullet(x, y, 'right'));

    state.lastFire = Date.now();
  },
  render: function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    /*canvas.ctx.rotate(67 * (Math.PI / 180))*/
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  },
  handleInput: function(dt) {
    if (inputs.up) player.pos[1] -= player.speed * dt;
    if (inputs.right) player.pos[0] += player.speed * dt;
    if (inputs.down) player.pos[1] += player.speed * dt;
    if (inputs.left) player.pos[0] -= player.speed * dt;

    if (player.pos[0] <= 0) player.pos[0] = 0;
    if (player.pos[1] <= 0) player.pos[1] = 0;
    if (player.pos[0] + player.sprite.size[0] >= canvas.width) player.pos[0] = canvas.width - player.sprite.size[0];
    if (player.pos[1] + player.sprite.size[1] >= canvas.height) player.pos[1] = canvas.height - player.sprite.size[1];
  }
};

resources.onReady(function() {
  player.sprite.size[0] = resources.get('assets/images/player.png').naturalWidth;
  player.sprite.size[1] = resources.get('assets/images/player.png').naturalHeight;
  player.pos = [canvas.width / 2 - player.sprite.size[0] / 2, canvas.height];
})

module.exports = player;
