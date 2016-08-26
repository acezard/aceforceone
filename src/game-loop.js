var canvas = require('./canvas'),
    game = require('./systems/game'),
    resources = require('./utils/resources');

var src = 'assets/images/';
var lastTime;

// Loading game first
resources.load([
  src + 'bigstars.png',
  src + 'smallstars.png',
  src + 'nebula.png',
  src + 'player.png',
  src + 'bullet_blue8.png',
  src + 'enemy-xs-1.png',
  src + 'explosion.png',
  src + 'enemy-lg-1.png',
  src + 'hitred.png',
  src + 'bullet_red2.png'
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
