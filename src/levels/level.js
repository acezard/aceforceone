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
    enemyType: 'scout',
    enemyNumbers: 3,
    type: 'squadron',
  },

  {
    spawnTime: 5,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 5,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 8,
    position: [canvas.width, canvas.height * 0.7],
    enemyType: 'scout',
    enemyNumbers: 5,
    type: 'line',
    angle: 220,
    delay: 500,
    rotation: 220 + 90
  },

  {
    spawnTime: 10,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 10,
    position: [0, 0],
    enemyType: 'redBomber',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 12,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 7,
    type: 'squadron'
  },

  {
    spawnTime: 14,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 9,
    type: 'squadron'
  },

  {
    spawnTime: 16,
    position: [0, canvas.height * 0.7],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 350,
    delay: 500,
    rotation: 350 + 90
  },

  {
    spawnTime: 16,
    position: [0, 0],
    enemyType: 'redBomber',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 18,
    position: [canvas.width, canvas.height * 0.5],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 180,
    delay: 500,
    rotation: 180 + 90
  },

  {
    spawnTime: 18,
    position: [0, canvas.height * 0.4],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 360,
    delay: 500,
    rotation: 360 + 90
  },

  {
    spawnTime: 20,
    position: [0, 0],
    enemyType: 'redBomber',
    leader: 'rogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 20,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 21,
    position: [0, canvas.height],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 315,
    delay: 500,
    rotation: 315 + 90
  },

  {
    spawnTime: 22,
    position: [canvas.width, 0],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 135,
    delay: 500,
    rotation: 135 + 90
  },

  {
    spawnTime: 23,
    position: [canvas.width, canvas.height],
    enemyType: 'scout',
    enemyNumbers: 10,
    type: 'line',
    angle: 225,
    delay: 500,
    rotation: 225 + 90
  },

  {
    spawnTime: 24,
    position: [0, 0],
    enemyType: 'redBomber',
    leader: 'rogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 24,
    position: [0, canvas.height * 0.5],
    enemyType: 'scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 360,
    delay: 250,
    rotation: 360 + 90
  },

  {
    spawnTime: 26,
    position: [0, canvas.height * 0.6],
    enemyType: 'scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 360,
    delay: 250,
    rotation: 360 + 90
  },

  {
    spawnTime: 28,
    position: [canvas.width, canvas.height * 0.4],
    enemyType: 'scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 180,
    delay: 250,
    rotation: 180 + 90
  },

  {
    spawnTime: 30,
    position: [canvas.width, canvas.height * 0.7],
    enemyType: 'scout',
    enemyNumbers: 3,
    type: 'line',
    angle: 180,
    delay: 250,
    rotation: 180 + 90
  },

  {
    spawnTime: 30,
    position: [0, 0],
    enemyType: 'redBomber',
    leader: 'rogueLeader',
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
    spawnTime: 39,
    position: [-50, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 360,
    delay: 500,
    rotation: 90,
    path: 'angular'
  },

  {
    spawnTime: 39,
    position: [canvas.width, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 180,
    delay: 500,
    rotation: 270,
    path: 'angular'
  },

  {
    spawnTime: 44,
    position: [-50, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 360,
    delay: 500,
    rotation: 90,
    path: 'angular'
  },

  {
    spawnTime: 44,
    position: [canvas.width, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 180,
    delay: 500,
    rotation: 270,
    path: 'angular'
  },

  {
    spawnTime: 49,
    position: [-50, 0],
    enemyType: 'drone',
    enemyNumbers: 15,
    type: 'pattern',
    angle: 360,
    delay: 500,
    rotation: 90,
    path: 'angular'
  },

  {
    spawnTime: 49,
    position: [canvas.width, 0],
    enemyType: 'drone',
    enemyNumbers: 15,
    type: 'pattern',
    angle: 180,
    delay: 500,
    rotation: 270,
    path: 'angular'
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
    spawnTime: 59,
    position: [100, - 50],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'line',
    angle: 90,
    delay: 1500,
    rotation: 180,
  },

  {
    spawnTime: 59,
    position: [canvas.width - 150, - 50],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'line',
    angle: 90,
    delay: 1500,
    rotation: 180,
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
  {
    spawnTime: 85,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 95,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 100,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 105,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 110,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 115,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 90,
    position: [canvas.width * 0.2, -50],
    enemyType: 'yellowBomber',
    enemyNumbers: 5,
    type: 'line',
    angle: 90,
    delay: 5000,
    rotation: 180
  },

  {
    spawnTime: 92.5,
    position: [canvas.width * 0.8, -50],
    enemyType: 'yellowBomber',
    enemyNumbers: 5,
    type: 'line',
    angle: 90,
    delay: 5000,
    rotation: 180
  },

  {
    spawnTime: 90,
    position: [- 100, 0],
    enemyType: 'aggressor',
    enemyNumbers: 2,
    type: 'line',
    angle: 45,
    delay: 20000,
    rotation: 45+90
  },

  {
    spawnTime: 100,
    position: [800, 0],
    enemyType: 'aggressor',
    enemyNumbers: 1,
    type: 'line',
    angle: 135,
    delay: 20000,
    rotation: 135+90
  },

  {
    spawnTime: 125,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 125.5,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 5,
    type: 'squadron'
  },

  {
    spawnTime: 126,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 7,
    type: 'squadron'
  },

  {
    spawnTime: 126.5,
    position: [0, 0],
    enemyType: 'scout',
    enemyNumbers: 9,
    type: 'squadron'
  },

  // 4: Rise of the platforms
  {
    spawnTime: 130,
    position: [150, - 200],
    enemyType: 'platformSpawner',
    enemyNumbers: 1,
    type: 'customSpawner'
  },

  {
    spawnTime: 135,
    position: [650, - 200],
    enemyType: 'platformSpawner',
    enemyNumbers: 1,
    type: 'customSpawner'
  },

  {
    spawnTime: 145,
    position: [300, - 200],
    enemyType: 'platformSpawner',
    enemyNumbers: 1,
    type: 'customSpawner'
  },

  {
    spawnTime: 155,
    position: [500, - 200],
    enemyType: 'platformSpawner',
    enemyNumbers: 1,
    type: 'customSpawner'
  },

  {
    spawnTime: 133,
    position: [canvas.width * 0.4, -50],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 90,
    rotation: 90 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 137,
    position: [canvas.width, canvas.height * 0.4],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 180,
    rotation: 180 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 141,
    position: [- 50, canvas.height * 0.7],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 360,
    rotation: 360 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 145,
    position: [canvas.width * 0.6, canvas.height],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 270,
    rotation: 270 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 149,
    position: [- 50, canvas.height * 0.1],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 45,
    rotation: 45 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 153,
    position: [- 50, canvas.height * 0.8],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 320,
    rotation: 320 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 157,
    position: [canvas.width * 1, canvas.height * 0.8],
    enemyType: 'drone',
    enemyNumbers: 3,
    angle: 250,
    rotation: 250 + 90,
    type: 'line',
    delay: 250
  },

  {
    spawnTime: 161,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'squadron',
  },

  {
    spawnTime: 163,
    position: [0, 0],
    enemyType: 'yellowBomber',
    enemyNumbers: 3,
    type: 'squadron',
  },

  {
    spawnTime: 169,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'squadron',
  },

  {
    spawnTime: 172,
    position: [0, 0],
    enemyType: 'yellowBomber',
    enemyNumbers: 3,
    type: 'squadron',
  },

  {
    spawnTime: 178,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'squadron',
  },

  {
    spawnTime: 181,
    position: [0, 0],
    enemyType: 'yellowBomber',
    enemyNumbers: 3,
    type: 'squadron',
  },

  // 5: Second base maze
  {
    spawnTime: 183,
    position: [0, 0],
    enemyType: 'bigBlock',
    enemyNumbers: 2,
    delay: 10000,
    type: 'statics',
    rotation: 0
  },

  {
    spawnTime: 188,
    position: [canvas.width - 300, 0],
    enemyType: 'bigBlock',
    enemyNumbers: 2,
    delay: 10000,
    type: 'statics',
    rotation: 180
  },

  {
    spawnTime: 183 + 4,
    position: [-50, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 360,
    delay: 500,
    rotation: 90,
    path: 'angular'
  },

  {
    spawnTime: 188 + 4,
    position: [canvas.width, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 180,
    delay: 500,
    rotation: 270,
    path: 'angular'
  },

  {
    spawnTime: 193 + 4,
    position: [-50, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 360,
    delay: 500,
    rotation: 90,
    path: 'angular'
  },

  {
    spawnTime: 198 + 4,
    position: [canvas.width, 0],
    enemyType: 'drone',
    enemyNumbers: 10,
    type: 'pattern',
    angle: 180,
    delay: 500,
    rotation: 270,
    path: 'angular'
  },

  {
    spawnTime: 183,
    position: [canvas.width - 64, 0],
    enemyType: 'smallPlatform',
    enemyNumbers: 2,
    type: 'statics',
    rotation: 0,
    delay: 10000
  },

  {
    spawnTime: 188,
    position: [0, 0],
    enemyType: 'smallPlatform',
    enemyNumbers: 2,
    type: 'statics',
    rotation: 0,
    delay: 10000
  },

  // 6: Second killzone, bigger than the first one
  {
    spawnTime: 215,
    position: [0, 0],
    enemyType: 'aggressor',
    enemyNumbers: 3,
    type: 'squadron',
    rotation: 0
  },

  {
    spawnTime: 215 + 3,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 3,
    type: 'squadron',
  },

  {
    spawnTime: 215 + 5,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 215 + 8,
    position: [canvas.width, canvas.height * 0.7],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'line',
    angle: 220,
    delay: 500,
    rotation: 220 + 90
  },

  {
    spawnTime: 215 + 10,
    position: [0, 0],
    enemyType: 'yellowBomber',
    leader: 'aggressor',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 225 + 3,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 3,
    type: 'squadron',
  },

  {
    spawnTime: 225 + 5,
    position: [0, 0],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'line',
    angle: 45,
    delay: 500,
    rotation: 45 + 90
  },

  {
    spawnTime: 225 + 8,
    position: [canvas.width, canvas.height * 0.7],
    enemyType: 'drone',
    enemyNumbers: 5,
    type: 'line',
    angle: 220,
    delay: 500,
    rotation: 220 + 90
  },

  {
    spawnTime: 225 + 13,
    position: [0, 0],
    enemyType: 'rogueLeader',
    enemyNumbers: 3,
    type: 'squadron'
  },

  {
    spawnTime: 215 + 17,
    position: [0, 0],
    enemyType: 'aggressor',
    enemyNumbers: 3,
    type: 'squadron',
    rotation: 0
  },

  // 7: Small interlude
  {
    spawnTime: 250,
    position: [- 20, canvas.height],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 315,
    rotation: 45,
    delay: 500
  },

  {
    spawnTime: 250,
    position: [- 20, canvas.height * 0.8],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 315,
    rotation: 45,
    delay: 500
  },

  {
    spawnTime: 250,
    position: [- 20, canvas.height * 0.6],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 315,
    rotation: 45,
    delay: 500
  },

  {
    spawnTime: 250,
    position: [- 20, canvas.height * 0.4],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 315,
    rotation: 45,
    delay: 500
  },


  {
    spawnTime: 250,
    position: [canvas.width, canvas.height],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 225,
    rotation: 225 + 90,
    delay: 500
  },

  {
    spawnTime: 250,
    position: [canvas.width, canvas.height * 0.8],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 225,
    rotation: 225 + 90,
    delay: 500
  },

  {
    spawnTime: 250,
    position: [canvas.width, canvas.height * 0.6],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 225,
    rotation: 225 + 90,
    delay: 500
  },

  {
    spawnTime: 250,
    position: [canvas.width, canvas.height * 0.4],
    enemyType: 'scout',
    enemyNumbers: 15,
    type: 'line',
    angle: 225,
    rotation: 225 + 90,
    delay: 500
  },


  // 8: Boss fight
  {
    spawnTime: 260,
    position: [100, - 500],
    enemyType: 'bigBoss',
    angle: 90,
    rotation: 180,
    type: 'line',
    enemyNumbers: 1
  }

];

// The level function which contains every spawn
module.exports = function (gameTime) {
  for (i = 94; i < level.length; i++) {
    var wave = level[i];

    if (gameTime > wave.spawnTime) {
      state.spawners.push(new spawners.Spawner(wave));

      level.splice(i, 1);
    }
  }
};
