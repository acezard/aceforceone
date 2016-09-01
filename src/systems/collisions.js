var Sprite = require('../utils/sprite');
var explosion = require('../entities/explosions');
var state = require('../state');
var player = require('../entities/player');
var canvas = require('../canvas');

function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
}

module.exports = function(enemies, bullets, explosions, ebullets) {
  for (var i = 0; i < ebullets.length; i++) {
    var bullet = ebullets[i];

    if (boxCollides(player.hitboxXY, player.hitbox, bullet.pos, bullet.sprite.size) && !player.invulnerable) {
      player.hitPoints-=10;
      

      if (player.hitPoints - 10 < 0 && state.lives == 1) {
        explosions.push(new explosion.Explosion(player.pos[0], player.pos[1]));
        state.gameOver();
        return;
      } else if (player.hitPoints - 10 < 0 && state.lives > 1) {
        state.lives--;
        player.hitPoints = 100;
        explosions.push(new explosion.Explosion(player.pos[0], player.pos[1]));
      }

      // Add a hit marker
      explosions.push(new explosion.Hit(player.pos[0], player.pos[1], 'red'));
      explosions.push(new explosion.Scored(player.pos[0] + player.sprite.size[0] / 3, player.pos[1] + player.sprite.size[1] * 1.5, '-50', 'bad'));
      state.score-=50;
      // Remove the bullet
      ebullets.splice(i, 1);

      // Make invulnerable
      player.makeInvulnerable();
    }
  }

  // Run collision detection for all enemies and bullets
  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];
    var pos = enemy.pos;
    var size = enemy.sprite.size;
    var hp = enemy.hitpoints;

    if (!enemy.invulnerable) {
      for (var j = 0; j < bullets.length; j++) {
        var bullet = bullets[j];
        var pos2 = bullet.pos;
        var size2 = bullet.sprite.size;
        var damage = bullet.damage;
        var score = enemy.score;

        // If the enemy dies
        if (boxCollides(pos, size, pos2, size2) && enemies[i].hitpoints - bullet.damage <= 0) {
          // Remove the enemy
          enemy.active = false;

          // Update score
          state.score += score;
          if (player.ultiCount == 0 && player.powerPoints < 100) {
              player.powerPoints += score * state.scoreMultiplier;
          }

          // Add an explosion
          explosions.push(new explosion.Explosion(pos[0], pos[1]));
          explosions.push(new explosion.Scored(pos[0] + size[0] / 3, pos[1], '50', 'good'));

          // Remove the bullet and stop this iteration
          bullet.active = false;
          break;
        }

        if (boxCollides(pos, size, pos2, size2)) {
          enemies[i].hitpoints-= bullet.damage;

          // Update score
          state.score += score * 0.2;

          // Add a hit marker
          explosions.push(new explosion.Hit(pos[0], pos[1], bullet.hit));

          // Remove the bullet
          bullet.active = false;;
        }
      }
    } else if(boxCollides(pos, size, player.pos, player.sprite.size)) {

      player.crushed = true;

      // UGLY MESS
      var left = player.pos[0] + player.sprite.size[0] - 10 < pos[0];
      var bottom = player.pos[1] > pos[1] + (size[1] - 10);

      if (player.pos[1] + player.sprite.size[1] - 10 < pos[1])
      {
        player.pos[1] = pos[1] - player.sprite.size[1] - 1;
        return;
      }
      if (player.pos[1] > (pos[1] + size[1] - 10) && !left)
      {
        player.pos[1] = pos[1] + size[1] + 1;
        return;
      }
      if (player.pos[0] < pos[0])
      {
        player.pos[0] = pos[0] - player.sprite.size[0];
        return;
      }
      if (player.pos[0] > pos[0] && !bottom)
      {
        player.pos[0] = pos[0] + size[0];
        return;
      }
    }
  }
}
