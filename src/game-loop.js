var canvas = require('./canvas'),
    game = require('./game'),
    resources = require('./resources');

var src = 'assets/images/';
var lastTime;

// Loading game first
resources.load([
  src + 'bigstars.png',
  src + 'smallstars.png',
  src + 'nebula.png',
  src + 'player.png'
]);

resources.onReady(play);

// Launch game and initializing game timer
function play() {
  lastTime = Date.now();
  gameLoop();
}

// Main game loop
function gameLoop() {
  var now = Date.now();
  var dt = (now - lastTime) / 1e3;

  game.update(dt);
  game.render();

  lastTime = now;
  requestAnimationFrame(gameLoop, canvas.canvas);
}

// Game state
var state = {
  bullets: [],
  enemies: [],
  explosions: [],
  lastFire: Date.now(),
  gameTime: 0,
  isGameOver: false,
  score: 0,
  scoreEl: document.getElementById('score')
}

module.exports = state;