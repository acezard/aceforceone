var Sprite = require('../utils/sprite');
var explosion = require('../entities/explosions');
var state = require('../state');
var player = require('../entities/player');

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
      

      if (player.hitPoints - 10 < 0) {
        explosions.push(new explosion.Explosion(player.pos[0], player.pos[1]));
        return;
      }

      // Add a hit marker
      explosions.push(new explosion.HitRed(player.pos[0], player.pos[1]));

      // Remove the bullet
      ebullets.splice(i, 1);

      // Make invulnerable
      player.makeInvulnerable();
    }
  }

  // Run collision detection for all enemies and bullets
  for (var i = 0; i < enemies.length; i++) {
    var pos = enemies[i].pos;
    var size = enemies[i].sprite.size;
    var hp = enemies[i].hitpoints;

    for (var j = 0; j < bullets.length; j++) {
      var pos2 = bullets[j].pos;
      var size2 = bullets[j].sprite.size;

      if (boxCollides(pos, size, pos2, size2) && enemies[i].hitpoints == 1) {
        // Remove the enemy
        enemies.splice(i, 1);
        i--;

        // Update score
        state.score += 50;
        player.powerPoints += 0.5;

        // Add an explosion
        explosions.push(new explosion.Explosion(pos[0], pos[1]));

        // Remove the bullet and stop this iteration
        bullets.splice(j, 1);
        break;
      }

      if (boxCollides(pos, size, pos2, size2)) {
        enemies[i].hitpoints--;

        // Update score
        state.score += 50;

        // Add a hit marker
        explosions.push(new explosion.HitRed(pos[0], pos[1]));

        // Remove the bullet
        bullets.splice(j, 1);
      }
    }
  }
}