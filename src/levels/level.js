// Dependencies
var spawners = require('../entities/spawners');
var state = require('../state');
var canvas = require('../canvas');

// Count how many waves were already spawned
var spawnCounter = 0;

// Spawning function checking that both timer and wave counter are correct
// Allows a callback for generating entities
function spawn(gameTime, time, counter, spawner) {
  if (gameTime > time && spawnCounter == counter) {
    spawner(); // Call the spawner callback
    spawnCounter++; // Increment wave counter
  }
};

var level = [
  // 1: Easy first zone
/*  {
    spawnTime: 0,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  }, 

  {
    spawnTime: 3,
    position: [0, 0],
    enemyType: 'RogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  }, 
*/

/*  {
    spawnTime: 3,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },*/

/*  {
    spawnTime: 0,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },*/

  // 2: Base maze

  // 3: Out in the open, killzone

  // 4: Rise of the platforms

  // 5: Second base maze

  // 6: MiniBoss

  // 7: Second killzone, bigger than the first one

  // 8: Small interlude

  // 9: Boss fight

];

// The level function which contains every spawn
module.exports = function (gameTime) {
  for (i = 0; i < level.length; i++) {
    var wave = level[i];

    if (gameTime > wave.spawnTime) {
      state.spawners.push(new spawners.Spawner(wave));

      level.splice(i, 1);
    }
  }
};
