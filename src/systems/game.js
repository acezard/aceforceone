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
  statics = require('../entities/statics'),
  level = require('../levels/level'),
  Transform = require('../utils/transform');

var gameTime = 259;
var spawn = 0;
var distance = 0;
var wave = 0;

exports.update = function (dt) {
  gameTime += dt;
  distance++;

  background.update();

  player.handleInput(dt);
  player.angryShoot();
  player.shoot();
  for (var i = 0; i < state.enemies.length; i++) {
    state.enemies[i].shoot();
  }

  level(gameTime);

  updateList(state.spawners, dt);
  updateList(state.bullets, dt);
  updateList(state.enemies, dt);
  updateList(state.ebullets, dt);
  updateList(state.explosions, dt);

  if (!state.isGameOver) {
    collisions(state.enemies, state.bullets, state.explosions, state.ebullets);
  }

  player.updatePowerPoints(state.score);
  player.updateHitPoints();
  canvas.scoreEl.innerHTML = Math.round(state.score);
  canvas.lifesEl.innerHTML = state.lives;
}

exports.render = function () {
  canvas.clear();

  // If any explosion is occuring, shake screen
  if (state.explosions.some(function (elem) {return elem instanceof explosions.Explosion})) preShake();
  background.draw();

  renderList(state.enemies);

/*  for (i= 0; i < state.enemies.length; i++) {
    var enemy = state.enemies[i];

    canvas.ctx.fillRect(enemy.pos[0], enemy.pos[1], enemy.sprite.size[0], enemy.sprite.size[1])
  }
*/
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
