var canvas = require('./canvas');

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
  skills: {
    angular: false,
    node: false,
    express: false,
    greensock: false,
    bootstrap: false,
    sass: false,
    mongodb: false,
    jekyll: false
  }
};

module.exports = state;