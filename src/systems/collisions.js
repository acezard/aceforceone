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

function circleCollides(circle1, circle2) {
  var dx = circle1.x - circle2.x;
  var dy = circle1.y - circle2.y;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < circle1.radius + circle2.radius) {
      return true;
  }
};

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
    var score = enemy.score;
    var pointPerHp = score / 2 / enemy.maxHitpoints;

    var boundingCircle = {radius: size[0] / 2, x: pos[0] + size[0] / 2, y: pos[1] + size[1] / 2};

    if (!enemy.invulnerable) {
      for (var j = 0; j < bullets.length; j++) {
        var bullet = bullets[j];
        var pos2 = bullet.pos;
        var size2 = bullet.sprite.size;
        var damage = bullet.damage;

        if (circleCollides(boundingCircle, bullet.boundingCircle)) {
          var cx = enemy.pos[0] + enemy.sprite.size[0] / 2;
          var cy = enemy.pos[1] + enemy.sprite.size[1] / 2;
          var rotation = enemy.rotation;

          var a =  [
            getRotatedCorner(enemy.pos[0] + enemy.sprite.size[0], enemy.pos[1], cx, cy, rotation),
            getRotatedCorner(enemy.pos[0], enemy.pos[1], cx, cy, rotation),
            getRotatedCorner(enemy.pos[0], enemy.pos[1] + enemy.sprite.size[1], cx, cy, rotation),
            getRotatedCorner(enemy.pos[0] + enemy.sprite.size[0], enemy.pos[1] + enemy.sprite.size[1], cx, cy, rotation),
          ];
          var b = [
            {
              x: bullet.pos[0] + bullet.sprite.size[0], y: bullet.pos[1]
            },
            {
              x: bullet.pos[0], y: bullet.pos[1]
            },
            {
              x: bullet.pos[0], y: bullet.pos[1] + bullet.sprite.size[1]
            }
            ,
            {
              x: bullet.pos[0] + bullet.sprite.size[1], y: bullet.pos[1] + bullet.sprite.size[1]
            }
          ];

          if (doPolygonsIntersect(a, b)) {
            if (enemy.hitpoints - bullet.damage <= 0) {
              var removed = enemy.hitpoints;

              // Remove the enemy
              enemy.active = false;

              console.log("killed")

              // Update score
              state.score += (score * 0.5) + (enemy.hitpoints * pointPerHp);

              if (player.ultiCount == 0 && player.powerPoints < 100) {
                  player.powerPoints += score * state.scoreMultiplier;
              }

              // Add an explosion
              explosions.push(new explosion.Explosion(pos[0], pos[1]));
              explosions.push(new explosion.Scored(pos[0] + size[0] / 3, pos[1], score, 'good'));

              // Remove the bullet and stop this iteration
              bullet.active = false;
              break;
            }

            else {
              var removed = bullet.damage;

              enemies[i].hitpoints -= bullet.damage;

              // Update score
              state.score += removed * pointPerHp;

              // Add a hit marker
              explosions.push(new explosion.Hit(pos[0] + (enemy.sprite.size[0] / 2) -45, pos[1] + (enemy.sprite.size[1] / 2)-45, bullet.hit));

              // Remove the bullet
              bullet.active = false;;
            }
          }
        }
      }
       // If the enemy dies
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


function isUndefined(a) {
    return a === undefined;
}

/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem
 *
 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @return true if there is any intersection between the 2 polygons, false otherwise
 */
function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;
   

    for (i = 0; i < polygons.length; i++) {
        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (isUndefined(minA) || projected < minA) {
                    minA = projected;
                }
                if (isUndefined(maxA) || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (isUndefined(minB) || projected < minB) {
                    minB = projected;
                }
                if (isUndefined(maxB) || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                /*console.log("polygons don't intersect!");*/
                return false;
            }
        }
    }
    return true;
};

function getRotatedCorner(x, y, cx, cy, rotation) {
  var tempX = x - cx;
  var tempY = y - cy;

  // now apply rotation
  var rotatedX = tempX*Math.cos(Math.PI / 180 * rotation) - tempY*Math.sin(Math.PI / 180 * rotation);
  var rotatedY = tempX*Math.sin(Math.PI / 180 * rotation) + tempY*Math.cos(Math.PI / 180 * rotation);

  // translate back
  x = rotatedX + cx;
  y = rotatedY + cy;

  return {x: x, y: y};
}
