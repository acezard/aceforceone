var canvas = require('../canvas');
var inputs = require('../utils/input');
var Sprite = require('../utils/sprite');
var resources = require('../utils/resources');
var state = require('../state');
var weapons = require('./weapons');

// Load player
var player = {
  pos: [0, 0],
  sprite: new Sprite('assets/images/player2.png', [0, 0], [0, 0], 16, [0, 1]),
  speed: 10,
  hitPoints: 100,
  powerPoints: 0,
  invulnerable: false,
  makeInvulnerable: function() {
    player.invulnerable = true;

    window.setTimeout(function() {
      player.resetInvulnerable();
    }, 2000);
  },
  resetInvulnerable: function() {
    this.invulnerable = false;
  },
  updatePowerPoints: function(score) {
    if (this.powerPoints <= 100) {
      canvas.powerPoints.style.height = this.powerPoints + '%';
    }
  },
  updateHitPoints: function() {
    canvas.hitPoints.style.height = this.hitPoints + '%';

    if (this.hitPoints <= 0 && state.lives == 0) {
      state.gameOver();
    }
  },
  shoot: function() {
    var x = player.pos[0] + player.sprite.size[0] / 2;
    var y = player.pos[1] + player.sprite.size[1] / 2;
    var dir = 'up';

    state.bullets.push(new weapons.Bullet(x, y, 270));
    state.bullets.push(new weapons.Bullet(x, y, 260));
    state.bullets.push(new weapons.Bullet(x, y, 280));

    state.lastFire = Date.now();
  },
  render: function() {
    var frequency = 100;
    if (!this.invulnerable || Math.floor(Date.now() / frequency) % 2) {
      canvas.ctx.save();
      canvas.ctx.translate(this.pos[0], this.pos[1]);
      this.sprite.render(canvas.ctx);
      canvas.ctx.restore();
    }
  },
  handleInput: function(dt) {
    var dX = 0;
    var dY = 0;
    var easingAmount = 1;

/*    if (inputs.up) player.pos[1] -= player.speed * dt;
    if (inputs.right) player.pos[0] += player.speed * dt;
    if (inputs.down) player.pos[1] += player.speed * dt;
    if (inputs.left) player.pos[0] -= player.speed * dt;*/

    if (player.pos[0] <= 0) player.pos[0] = 0;
    if (player.pos[1] <= 0) player.pos[1] = 0;
    if (player.pos[0] + player.sprite.size[0] >= canvas.width) player.pos[0] = canvas.width - player.sprite.size[0];
    if (player.pos[1] + player.sprite.size[1] >= canvas.height) player.pos[1] = canvas.height - player.sprite.size[1];

    dX = inputs.mouseX - player.pos[0] - player.sprite.size[0] / 2;
    dY = inputs.mouseY - player.pos[1] - player.sprite.size[1] / 2;
  
    var distance = Math.sqrt(dX * dX + dY * dY);

    if (distance > this.speed) {
       dX = dX * this.speed / distance;
       dY = dY * this.speed / distance;
       this.mouseRender();
    }
    if (distance > 1) {
        player.pos[0] += dX * easingAmount;
        player.pos[1] += dY * easingAmount;
    }

    player.hitboxXY = [player.pos[0] + player.hitbox[0] * 1.5, player.pos[1] + player.hitbox[1] * 1.5];
  },
  mouseRender: function() {
    canvas.ctx.beginPath();
    canvas.ctx.arc(inputs.mouseX, inputs.mouseY, 2.5, 0, 2 * Math.PI, false);
    canvas.ctx.fillStyle = 'rgba(231, 76, 60,0.8)';
    canvas.ctx.fill();
  },
  respawn: function() {

  }
};

resources.onReady(function() {
  player.sprite.size[0] = resources.get('assets/images/player2.png').naturalWidth;
  player.sprite.size[1] = resources.get('assets/images/player2.png').naturalHeight;
  player.pos = [canvas.width / 2 - player.sprite.size[0] / 2, canvas.height];
  player.hitbox = [player.sprite.size[0] / 4, player.sprite.size[1] / 4];
})

module.exports = player;
