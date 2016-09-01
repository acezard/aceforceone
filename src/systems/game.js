var canvas = require('../canvas'),
  background = require('./background'),
  player = require('../entities/player'),
  weapons = require('../entities/weapons'),
  enemies = require('../entities/enemies'),
  state = require('../state'),
  collisions = require('./collisions'),
  utils = require('../utils/utils'),
  explosions = require('../entities/explosions'),
  spawners = require('../entities/spawners'),
  statics = require('../entities/statics');

var gameTime = 0;
var spawn = 0;
var distance = 0;
var wave = 0;

var timer = 0;

exports.update = function (dt) {
  gameTime += dt;
  distance++;


  player.handleInput(dt);

  background.update();

  player.angryShoot();
  player.shoot();

  for (var i = 0; i < state.enemies.length; i++) {
    state.enemies[i].shoot();
  }

  if (gameTime == 0) {
    state.enemies.push(new statics.BigBlock(0));
  }

  /*  if (gameTime > timer) {
      console.log('FIRED')
      state.spawners.push(new spawners.Spawner([0, 0], 90, 400, 'RedXS', 3, 'squadron'));
      setTimeout(function() {
        state.spawners.push(new spawners.Spawner([0, 0], 90, 400, 'RedXS', 5, 'squadron'));
      }, 2000);
      setTimeout(function() {
        state.spawners.push(new spawners.Spawner([0, 0], 90, 400, 'RedXS', 7, 'squadron'));
      }, 4000);
      timer = gameTime + 10;
    }*/

  updateList(state.spawners);
  updateList(state.bullets, dt);
  updateList(state.enemies, dt);
  updateList(state.ebullets, dt);
  updateList(state.explosions, dt);



  if (!state.isGameOver) {
    collisions(state.enemies, state.bullets, state.explosions, state.ebullets);
  }

  player.updatePowerPoints(state.score);
  player.updateHitPoints();
  canvas.scoreEl.innerHTML = state.score;
  canvas.lifesEl.innerHTML = state.lives;
}

exports.render = function () {
  canvas.clear();

  // If any explosion is occuring, shake screen
  if (state.explosions.some(function (elem) {return elem instanceof explosions.Explosion})) preShake();

  background.draw();

  renderList(state.enemies);
  if (!state.isGameOver) {
    renderList(state.bullets);
    player.render();
    player.mouseRender();
  }
  renderList(state.ebullets);
  renderList(state.explosions);

  postShake();
}

function updateList(list, dt) {
  for (var i = 0; i < list.length; i++) {
    if (!list[i].active) {
      list.splice(i, 1);
      i--;
    } else {
      list[i].update(dt);
    }
  }
}

function renderList(list) {
  for (var i = 0; i < list.length; i++) {
    list[i].render();
  }
}

function preShake() {
  canvas.ctx.save();
  var dx = Math.random() * 5;
  var dy = Math.random() * 5;
  canvas.ctx.translate(dx, dy);
}

function postShake() {
  canvas.ctx.restore();
}
