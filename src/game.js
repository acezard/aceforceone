var canvas = require('./canvas'),
    background = require('./background'),
    player = require('./player'),
    Bullet = require('./weapons'),
    enemies = require('./enemies'),
    state = require('./state'),
    inputs = require('./input');

var gameTime = 0;

exports.update = function(dt) {
  gameTime += dt;
  
  background.update();
  fireWeapons();
  updateEntities(dt);
  handleInput(dt);
  enemies.update();
}

exports.render = function() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  renderEntities(state.bullets);
  enemies.draw();

  if(!state.isGameOver) {
      renderEntity(player);
  }
}

function renderEntities(list) {
    for(var i=0; i<list.length; i++) {
        renderEntity(list[i]);
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

function fireWeapons() {
  if(!state.isGameOver && Date.now() - state.lastFire > 300) {
    var x = player.pos[0] + player.sprite.size[0] / 2;
    var y = player.pos[1] + player.sprite.size[1] / 2;
    var dir = 'up';

    state.bullets.push(new Bullet(x, y, dir));

    state.lastFire = Date.now();
  }
}

function updateEntities(dt) {
  // Update all the bullets
  for(var i=0; i<state.bullets.length; i++) {
    var bullet = state.bullets[i];

    switch(bullet.dir) {
    case 'up': bullet.pos[1] -= bullet.speed * dt; break;
    case 'down': bullet.pos[1] += bullet.speed * dt; break;
    default:
        bullet.pos[0] += bullet.speed * dt;
    }

    // Remove the bullet if it goes offscreen
    if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
      bullet.pos[0] > canvas.width) {
      state.bullets.splice(i, 1);
      i--;
    }
  }
}
