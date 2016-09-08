var canvas = require('../canvas');
var inputs = require('../utils/input');
var Sprite = require('../utils/sprite');
var resources = require('../utils/resources');
var state = require('../state');
var weapons = require('./weapons');
var ang = 0;
// Load player
var player = {
  pos: [0, 0],
  sprite: new Sprite({url: 'assets/images/player2.png', pos: [0, 0], size: [0, 0]}),
  speed: 10,
  hitPoints: 100,
  powerPoints: 100,
  invulnerable: false,
  lastUlti: Date.now(),
  ultiCount: 0,
  dX: 0,
  dY: 0,
  crushed: false,
  lastPurpleFire: Date.now(),
  angryShoot: function() {
    // ugly
    if(inputs.clicked && this.powerPoints >= 100 || this.ultiCount >= 1 && Date.now() - this.lastUlti > 500) {
      var x = player.pos[0] + player.sprite.size[0] / 2;
      var y = player.pos[1] + player.sprite.size[1] / 2;
      var steps = 180;
      var step = 360 / steps;

      if (this.ultiCount == 0) {
        this.powerPoints = 0;
      }

      this.ultiCount ++;
      state.ebullets = [];

      for (i = 0; i < steps; i++) {
        state.bullets.push(weapons.blue.addMissile({pos: [x, y], angle: step * i}));
      }

      this.lastUlti = Date.now();

      if (this.ultiCount == 4) {
        this.ultiCount = 0;
        this.angry = false;
      }
    }
  },
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
    var now = Date.now();
    var playerX = player.pos[0] + player.sprite.size[0] / 2;
    var playerY = player.pos[1] + player.sprite.size[1] / 2;

    if(now - state.lastFire > 100) {
      state.bullets.push(weapons.blue.addMissile({pos: [playerX, playerY], angle: 270 - 25}));
      state.bullets.push(weapons.blue.addMissile({pos: [playerX, playerY], angle: 270 - 20}));
      state.bullets.push(weapons.blue.addMissile({pos: [playerX, playerY], angle: 270 + 20}));
      state.bullets.push(weapons.blue.addMissile({pos: [playerX, playerY], angle: 270 + 25}));

      state.lastFire = now;
    }

    if(now - this.lastPurpleFire > 500) {
      state.bullets.push(weapons.purple.addMissile({pos: [playerX - 30, playerY], angle: 270}));
      state.bullets.push(weapons.purple.addMissile({pos: [playerX + 10, playerY], angle: 270}));

      this.lastPurpleFire = now;
    }
  },
  render: function() {
    var frequency = 100;
    if (!this.invulnerable || Math.floor(Date.now() / frequency) % 2) {
      canvas.ctx.save();
      canvas.ctx.translate(this.pos[0], this.pos[1]);
/*      canvas.ctx.translate(this.sprite.size[0] / 2, this.sprite.size[1] / 2);
      canvas.ctx.rotate(Math.PI / 180 * (ang += 5));*/
      this.sprite.render(canvas.ctx);
      canvas.ctx.restore();
    }
  },
  handleInput: function(dt) {
    var easingAmount = 1;

/*    if (inputs.up) player.pos[1] -= player.speed * dt;
    if (inputs.right) player.pos[0] += player.speed * dt;
    if (inputs.down) player.pos[1] += player.speed * dt;
    if (inputs.left) player.pos[0] -= player.speed * dt;*/

    if (player.pos[0] <= 0) player.pos[0] = 0;
    if (player.pos[1] <= 0) player.pos[1] = 0;
    if (player.pos[0] + player.sprite.size[0] >= canvas.width) player.pos[0] = canvas.width - player.sprite.size[0];
    if (player.pos[1] + player.sprite.size[1] >= canvas.height && !player.crushed) player.pos[1] = canvas.height - player.sprite.size[1];

    this.dX = inputs.mouseX - player.pos[0] - player.sprite.size[0] / 2;
    this.dY = inputs.mouseY - player.pos[1] - player.sprite.size[1] / 2;
  
    var distance = Math.sqrt(this.dX * this.dX + this.dY * this.dY);

    if (distance > this.speed) {
       this.dX = this.dX * this.speed / distance;
       this.dY = this.dY * this.speed / distance;
       this.mouseRender();
    }
    if (distance > 1) {
        player.pos[0] += this.dX * easingAmount;
        player.pos[1] += this.dY * easingAmount;
    }

    player.hitboxXY = [player.pos[0] + player.hitbox[0] * 1.5, player.pos[1] + player.hitbox[1] * 1.5];
  },
  mouseRender: function() {
    canvas.ctx.beginPath();
    canvas.ctx.arc(inputs.mouseX, inputs.mouseY, 5, 0, 2 * Math.PI, false);
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
