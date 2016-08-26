var canvas = require('./canvas'),
    background = require('./background'),
    player = require('./player'),
    weapons = require('./weapons'),
    enemies = require('./enemies'),
    state = require('./state'),
    inputs = require('./input'),
    Sprite = require('./sprite'),
    utils = require('./utils'),
    collisions = require('./collisions');

var gameTime = 0;
var spawn = 0;

exports.update = function(dt) {
  gameTime += dt;
  
  background.update();
  fireWeapons();
  updateEntities(dt);
  handleInput(dt);

  if(Math.random() < dt) {
      state.enemies.push({
          pos: [utils.getRandom(0, canvas.width),
                - 53],
          speed: 100, 
          hitpoints: 2,
          lastFire: Date.now(),
          sprite: new Sprite('assets/images/enemy-xs-1.png', [0, 0], [75, 53])
      });
      spawn++;
  }

  collisions(state.enemies, state.bullets, state.explosions);
}

exports.render = function() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  renderEntities(state.bullets);
  renderEntities(state.enemies);
  renderEntities(state.explosions);
  renderEntities(state.ebullets);

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
  //player
  if(!state.isGameOver && Date.now() - state.lastFire > 300) {
    var x = player.pos[0] + player.sprite.size[0] / 2;
    var y = player.pos[1] + player.sprite.size[1] / 2;
    var dir = 'up';

    state.bullets.push(new weapons.Bullet(x, y, dir));
    state.bullets.push(new weapons.Bullet(x, y, 'left'));
    state.bullets.push(new weapons.Bullet(x, y, 'right'));

    state.lastFire = Date.now();
  }

  // enemies
  for (var i = 0; i < state.enemies.length; i++) {
    var enemy = state.enemies[i];

    if (Date.now() - enemy.lastFire > 1000) {
      var x = enemy.pos[0] + enemy.sprite.size[0] / 2;
      var y = enemy.pos[1] + enemy.sprite.size[1] / 2;

      state.ebullets.push(new weapons.RedLaser(x, y, 'down'));
      enemy.lastFire = Date.now();
    }
  }
}

function updateEntities(dt) {
  // Update all the bullets
  for(var i=0; i<state.bullets.length; i++) {
    var bullet = state.bullets[i];

    switch(bullet.dir) {
    case 'up': bullet.pos[1] -= bullet.speed * dt; break;
    case 'left': bullet.pos[0] += bullet.speed * dt; bullet.pos[1] += - bullet.speed * dt; break;
    case 'right': bullet.pos[0] += - bullet.speed * dt; bullet.pos[1] += - bullet.speed * dt; break;
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

  for(var i=0; i<state.ebullets.length; i++) {
    var bullet = state.ebullets[i];

    switch(bullet.dir) {
    case 'down': bullet.pos[1] += bullet.speed * dt; break;
    default:
        bullet.pos[1] += bullet.speed * dt;
    }

    // Remove the bullet if it goes offscreen
    if(bullet.pos[1] < 0 || bullet.pos[1] > canvas.height ||
      bullet.pos[0] > canvas.width) {
      state.ebullets.splice(i, 1);
      i--;
    }
  }

  // foes
    for(var i=0; i < state.enemies.length; i++) {
        state.enemies[i].pos[1] += state.enemies[i].speed * dt;
        state.enemies[i].sprite.update(dt);

        // Remove if offscreen
        if(state.enemies[i].pos[1] + state.enemies[i].sprite.size[0] < 0) {
            state.enemies.splice(i, 1);
            i--;
        }
    }

    // Update all the explosions
    for(var i=0; i<state.explosions.length; i++) {
        state.explosions[i].sprite.update(dt);

        // Remove if animation is done
        if(state.explosions[i].sprite.done) {
            state.explosions.splice(i, 1);
            i--;
        }
    }
}
