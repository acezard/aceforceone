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
  {
    spawnTime: 3,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 5,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 5,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 8,
    position: [canvas.width, canvas.height * 0.7],
    enemyType: 'Scout',
    enemyNumbers: 5,
    type: 'line',
    angle: 220,
    delay: 500,
    rotation: 220 + 90
  },

  {
    spawnTime: 10,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 10,
    position: [0, 0],
    enemyType: 'RedXS',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 12,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 7,
    type: 'squadron'
  },

  {
    spawnTime: 14,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 9,
    type: 'squadron'
  },

  {
    spawnTime: 16,
    position: [0, canvas.height * 0.7],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 350,
    delay: 500,
    rotation: 350 + 90
  },

  {
    spawnTime: 16,
    position: [0, 0],
    enemyType: 'RedXS',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 18,
    position: [canvas.width, canvas.height * 0.5],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 180,
    delay: 500,
    rotation: 180 + 90
  },

  {
    spawnTime: 18,
    position: [0, canvas.height * 0.4],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 360,
    delay: 500,
    rotation: 360 + 90
  },

  {
    spawnTime: 20,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 20,
    position: [0, 0],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 21,
    position: [0, canvas.height],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 315,
    delay: 500,
    rotation: 315 + 90
  },

  {
    spawnTime: 22,
    position: [canvas.width, 0],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 135,
    delay: 500,
    rotation: 135 + 90
  },

  {
    spawnTime: 23,
    position: [canvas.width, canvas.height],
    enemyType: 'Scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 225,
    delay: 500,
    rotation: 225 + 90
  },

  {
    spawnTime: 24,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 24,
    position: [0, canvas.height * 0.5],
    enemyType: 'Scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 360,
    delay: 250,
    rotation: 360 + 90
  },

  {
    spawnTime: 26,
    position: [0, canvas.height * 0.6],
    enemyType: 'Scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 360,
    delay: 250,
    rotation: 360 + 90
  },

  {
    spawnTime: 28,
    position: [canvas.width, canvas.height * 0.4],
    enemyType: 'Scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 180,
    delay: 250,
    rotation: 180 + 90
  },

  {
    spawnTime: 30,
    position: [canvas.width, canvas.height * 0.7],
    enemyType: 'Scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 180,
    delay: 250,
    rotation: 180 + 90
  },

  {
    spawnTime: 30,
    position: [0, 0],
    enemyType: 'RedXS',
    leader: 'RogueLeader',
    enemyNumbers: 7,
    type: 'squadron'
  },

  // 2: Base maze
  {
    spawnTime: 30,
    position: [0, 0],
    enemyType: 'bigBlock',
    enemyNumbers: 3,
    delay: 5000,
    type: 'statics',
    rotation: 0
  },

  {
    spawnTime: 30,
    position: [canvas.width - 300, 0],
    enemyType: 'bigBlock',
    enemyNumbers: 3,
    delay: 5000,
    type: 'statics',
    rotation: 180
  },

  {
    spawnTime: 50,
    position: [canvas.width / 2 - 100, 0],
    enemyType: 'battlePlatform',
    enemyNumbers: 1,
    type: 'statics',
    rotation: 0
  },

  {
    spawnTime: 48,
    position: [0, 0],
    enemyType: 'smallPlatform',
    enemyNumbers: 2,
    type: 'statics',
    rotation: 0,
    delay: 5000
  },

  {
    spawnTime: 48,
    position: [canvas.width - 64, 0],
    enemyType: 'smallPlatform',
    enemyNumbers: 2,
    type: 'statics',
    rotation: 0,
    delay: 5000
  },

  {
    spawnTime: 67.5,
    position: [0, 0],
    enemyType: 'bigBlock',
    enemyNumbers: 1,
    type: 'statics',
    rotation: 0
  },

  {
    spawnTime: 67.5,
    position: [canvas.width - 300, 0],
    enemyType: 'bigBlock',
    enemyNumbers: 1,
    type: 'statics',
    rotation: 180
  },

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
  for (i = 22; i < level.length; i++) {
    var wave = level[i];

    if (gameTime > wave.spawnTime) {
      state.spawners.push(new spawners.Spawner(wave));

      level.splice(i, 1);
    }
  }
};
