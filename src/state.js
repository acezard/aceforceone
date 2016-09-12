var canvas = require('./canvas');
var player = require('./entities/player');

// Game state
var state = {
  bullets: [],
  ebullets: [],
  enemies: [],
  explosions: [],
  spawners: [],
  powerups: [],
  lastFire: Date.now(),
  gameTime: 0,
  isGameOver: false,
  score: 0,
  scoreEl: document.getElementById('score'),
  lives: 3,
  scoreMultiplier: 0.020,
  gameOver: function() {
    this.isGameOver = true;
    canvas.ui.setAttribute('class', 'hide');
    canvas.gameOver.setAttribute('class', 'show');
  },
  victory: function() {
    this.isGameOver = true;
    canvas.victoryScreen.style.display = 'block';
    canvas.victoryScreen.setAttribute('class', 'show');
  }
};

function reset() {
  state.bullets = [];
  state.ebullets = [],
  state.enemies = [],
  state.explosions = [],
  state.spawners = [],
  state.powerups = [],
  state.lastFire = Date.now(),
  state.gameTime = 0,
  state.isGameOver = false,
  state.score = 0;
  state.scoreEl = document.getElementById('score'),
  state.lives = 3;
  state.scoreMultiplier = 0.020;

  player.pos = [canvas.width / 2 - 75 / 2, canvas.height];
};

module.exports = state;
