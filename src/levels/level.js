// Dependencies
var spawners = require('../entities/spawners');
var state = require('../state');

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

var level = {
  0: {
    position: [0, 0],
    enemy: 'RedXS',
    enemyNumbers: 3,
    type: 'squadron'
  },

  3: {
    position: [0, 0],
    enemy: 'RedXS',
    enemyNumbers: 5,
    type: 'squadron'
  },

  6: {
    position: [0, 0],
    enemy: 'RedXS',
    enemyNumbers: 7,
    type: 'squadron'
  },
}

// The level function which contains every spawn
module.exports = function (gameTime) {
  for (wave in level) {
    if (gameTime > wave) {
      state.spawners.push(new spawners.Spawner(level[wave]));
      delete level[wave];
    }
  }
};

