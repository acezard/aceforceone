var canvas = require('../canvas'),
    background = require('./background'),
    player = require('../entities/player'),
    weapons = require('../entities/weapons'),
    enemies = require('../entities/enemies'),
    state = require('../state'),
    collisions = require('./collisions')
    utils = require('../utils/utils')
    explosions = require('../entities/explosions');

var gameTime = 0;
var spawn = 0;
var distance = 0;

exports.update = function(dt) {
  gameTime += dt;
  distance += 0.5;
  
  background.update();

    player.angryShoot();
    player.shoot();

  for (var i = 0; i < state.enemies.length; i++) {
    state.enemies[i].shoot();
  }

  if(Math.random() < dt * 3) {
    state.enemies.push(new enemies.RedXS(utils.getRandom(70, 110)));
  }

  updateList(state.bullets, dt);
  updateList(state.enemies, dt);
  updateList(state.ebullets, dt);
  updateList(state.explosions, dt);

  player.handleInput(dt);

  if(!state.isGameOver) {
    collisions(state.enemies, state.bullets, state.explosions, state.ebullets);
  }
  
  player.updatePowerPoints(state.score);
  player.updateHitPoints();
  canvas.scoreEl.innerHTML = state.score;
  canvas.lifesEl.innerHTML = state.lives;
}

exports.render = function() {
  canvas.clear();

  if (distance % 5 == 0) {
    console.log('ebullets ' + state.ebullets.length, '\nenemies ' + state.enemies.length + '\nexplosions ' + state.explosions.length + '\nbullets ' + state.bullets.length)
  }

  if(state.explosions.some(function(elem) {
    return elem instanceof explosions.Explosion
  })) {
    preShake();
  }

  background.draw();
  
  canvas.ctx.fillStyle = 'red';
  renderList(state.bullets);
  renderList(state.enemies);
  if(!state.isGameOver) {

    player.render();
    player.mouseRender();
  }
  renderList(state.ebullets);
  renderList(state.explosions);

/*  for (i= 0, len = state.ebullets.length; i < len; i ++) {
    var bullet = state.ebullets[i];
    canvas.ctx.fillRect(bullet.pos[0], bullet.pos[1], bullet.sprite.size[0], bullet.sprite.size[1])
  }
  canvas.ctx.fillRect(player.hitboxXY[0], player.hitboxXY[1], player.hitbox[0], player.hitbox[1])*/

  postShake();
}

function updateList(list, dt) {
  for(var i=0; i < list.length; i++) {
    if (!list[i].active) {
      list.splice(i, 1);
      i--;
    } else {
      list[i].update(dt);
    }
  }
}

function renderList(list) {
  for(var i=0; i < list.length; i++) {
    list[i].render();
  }
}

function preShake() {
  canvas.ctx.save();
  var dx = Math.random()*5;
  var dy = Math.random()*5;
  canvas.ctx.translate(dx, dy);  
}

function postShake() {
  canvas.ctx.restore();
}
