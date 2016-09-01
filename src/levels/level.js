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
  {
    spawnTime: 0,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 3,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 0,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 5,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 7,
    type: 'squadron'
  },

  {
    spawnTime: 0,
    position: [canvas.width, canvas.height / 2],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 180,
    delay: 500,
    rotation: 180 + 90
  },

  {
    spawnTime: 0,
    position: [0, canvas.height],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 300,
    delay: 500,
    rotation: 300 + 90
  },
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
