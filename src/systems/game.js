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

exports.update = function(dt) {
  gameTime += dt;
  
  background.update();

  if(!state.isGameOver && Date.now() - state.lastFire > 100) {
    player.shoot();
  }

  for (var i = 0; i < state.enemies.length; i++) {
    state.enemies[i].shoot();
  }

  if(Math.random() < dt * 2) {
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
}

exports.render = function() {
  canvas.clear();

  if(state.explosions.some(function(elem) {
    return elem instanceof explosions.Explosion
  })) {
    preShake();
  }

  background.draw();
    renderList(state.bullets);
    renderList(state.enemies);
    if(!state.isGameOver) {
      player.render();
    }
    renderList(state.ebullets);
    renderList(state.explosions);

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
