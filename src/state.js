var canvas = require('./canvas');

// Game state
var state = {
  bullets: [],
  ebullets: [],
  enemies: [],
  explosions: [],
  lastFire: Date.now(),
  gameTime: 0,
  isGameOver: false,
  score: 0,
  scoreEl: document.getElementById('score'),
  lives: 3,
  gameOver: function() {
    this.isGameOver = true;
    canvas.ui.setAttribute('class', 'hide');
    canvas.gameOver.setAttribute('class', 'show');
  }
};

module.exports = state;