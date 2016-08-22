var canvas = require('./canvas'),
    background = require('./background'),
    player = require('./player'),
    weapons = require('./weapons'),
    enemies = require('./enemies'),
    state = require('./game-loop'),
    inputs = require('./input');

var gameTime = 0;

exports.update = function(dt) {
  gameTime += dt;

  background.update();
  handleInput(dt);
  weapons.update();
  enemies.update();
}

exports.render = function() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  enemies.draw();
  weapons.draw();

  if(!state.isGameOver) {
      renderEntity(player);
  }
}

function renderEntity(entity) {
    canvas.ctx.save();
    canvas.ctx.translate(entity.pos[0], entity.pos[1]);
    entity.sprite.render(canvas.ctx);
    canvas.ctx.restore();
}

function handleInput(dt) {
  if (inputs.up) player.pos[1] -= player.speed * dt;
  if (inputs.right) player.pos[0] += player.speed * dt;
  if (inputs.down) player.pos[1] += player.speed * dt;
  if (inputs.left) player.pos[0] -= player.speed * dt;

  if (player.pos[0] <= 0) player.pos[0] = 0;
  if (player.pos[1] <= 0) player.pos[1] = 0;
  if (player.pos[0] + player.sprite.size[0] >= canvas.width) player.pos[0] = canvas.width - player.sprite.size[0];
  if (player.pos[1] + player.sprite.size[1] >= canvas.height) player.pos[1] = canvas.height - player.sprite.size[1];

  exports.x = player.pos[0];
  exports.y = player.pos[1];
}