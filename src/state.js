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
  scoreEl: document.getElementById('score')
};

module.exports = state;