var canvas = require('../canvas'),
    background = require('./background'),
    player = require('../entities/player'),
    weapons = require('../entities/weapons'),
    enemies = require('../entities/enemies'),
    state = require('../state'),
    collisions = require('./collisions')
    utils = require('../utils/utils')
    explosions = require('../entities/explosions'),
    spawners = require('../entities/spawners');

var gameTime = 0;
var spawn = 0;
var distance = 0;
var wave = 0;

var timer = 0;

exports.update = function(dt) {
  gameTime += dt;
  distance++;
  console.log('Game Time: ' + gameTime)
  console.log('Timer : ' + timer)
  
  background.update();

    player.angryShoot();
    player.shoot();

  for (var i = 0; i < state.enemies.length; i++) {
    state.enemies[i].shoot();
  }

  if (gameTime > timer) {
    console.log('FIRED')
    state.spawners.push(new spawners.Spawner([0, 0], 90, 400, 'RedXS', 3, 'squadron'));
    setTimeout(function() {
      state.spawners.push(new spawners.Spawner([0, 0], 90, 400, 'RedXS', 5, 'squadron'));
    }, 2000);
    setTimeout(function() {
      state.spawners.push(new spawners.Spawner([0, 0], 90, 400, 'RedXS', 7, 'squadron'));
    }, 4000);
    timer = gameTime + 10;
  }


/*  if (gameTime > 0 && wave == 0) {
    state.spawners.push(new spawners.Spawner([canvas.width, 600], 210, 400, 'RedXS', 15, 'line'));
    wave++;
  }
*/
/*
  if (gameTime > 10 && wave == 1) {
    state.spawners.push(new spawners.Spawner([canvas.width, 200], 190, 700, 'RedXS', 10));
    wave++;
  }

  if (gameTime > 15 && wave == 2) {
    state.spawners.push(new spawners.Spawner([0, 100], 30, 700, 'RedXS', 10));
    wave++;
  }
  
  if (gameTime > 20 && wave == 3) {
    state.spawners.push(new spawners.Spawner([canvas.width, 300], 190, 700, 'RedXS', 10));
    wave++;
  }*/

  updateList(state.spawners);
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

/*  if (distance % 5 == 0) {
    console.log('ebullets ' + state.ebullets.length, '\nenemies ' + state.enemies.length + '\nexplosions ' + state.explosions.length + '\nbullets ' + state.bullets.length)
  }*/

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
