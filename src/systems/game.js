var canvas = require('../canvas'),
    background = require('./background'),
    player = require('../entities/player'),
    weapons = require('../entities/weapons'),
    enemies = require('../entities/enemies'),
    state = require('../state'),
    collisions = require('./collisions');

var gameTime = 0;
var spawn = 0;

exports.update = function(dt) {
  gameTime += dt;
  
  background.update();

  if(!state.isGameOver && Date.now() - state.lastFire > 300) {
    player.shoot();
  }

  for (var i = 0; i < state.enemies.length; i++) {
    state.enemies[i].shoot();
  }

  if(Math.random() < dt) {
    state.enemies.push(new enemies.RedXS(dt));
  }

  updateList(state.bullets, dt);
  updateList(state.enemies, dt);
  updateList(state.ebullets, dt);
  updateList(state.explosions, dt);

  player.handleInput(dt);

  collisions(state.enemies, state.bullets, state.explosions);
}

exports.render = function() {
  canvas.clear();

  background.draw();

  if(!state.isGameOver) {
    renderList(state.bullets);
    renderList(state.enemies);
    renderList(state.ebullets);
    renderList(state.explosions);
    player.render();
  }
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
