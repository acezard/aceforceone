var Sprite = require('./sprite');

function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 ||
    b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(pos[0], pos[1],
    pos[0] + size[0], pos[1] + size[1],
    pos2[0], pos2[1],
    pos2[0] + size2[0], pos2[1] + size2[1]);
}

module.exports = function(enemies, bullets, explosions, hitmarkers) {
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

        // Add score
        /*score += 100;*/

        // Add an explosion
        explosions.push({
          pos: pos,
          sprite: new Sprite('assets/images/explosion.png', [0, 0], [90, 90],
            24, [0, 1, 2, 3, 4, 5, 6, 7, 8],
            null,
            true)
        });

        // Remove the bullet and stop this iteration
        bullets.splice(j, 1);
        break;
      } else if (boxCollides(pos, size, pos2, size2)) {
        enemies[i].hitpoints--;
        // Add a hit marker
        explosions.push({
          pos: [pos[0], pos[1]],
          sprite: new Sprite('assets/images/hitred.png', [0, 0], [90, 90],
            24, [0, 1, 2, 3, 4, 5, 6, 7, 8],
            null,
            true)
        });
        // Remove the bullet
        bullets.splice(j, 1);
      }
    }

/*    if (boxCollides(pos, size, player.pos, player.sprite.size)) {
      gameOver();
    }*/
  }
}