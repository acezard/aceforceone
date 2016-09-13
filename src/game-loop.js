var canvas = require('./canvas'),
    game = require('./systems/game'),
    resources = require('./utils/resources'),
    state = require('./state');

var src = 'assets/images/';

// Loading game first
resources.load([
  src + 'bigstars.png',
  src + 'smallstars.png',
  src + 'nebula.png',
  src + 'player2.png',
  src + 'bullet_blue8.png',
  src + 'enemy-xs-1.png',
  src + 'explosion.png',
  src + 'enemy-lg-1.png',
  src + 'hitred.png',
  src + 'bullet_red2.png',
  src + 'hitblue.png',
  src + 'bigbullet.png',
  src + 'hitpurple.png',
  src + 'base1.png',
  src + 'scout.png',
  src + 'platpart.png',
  src + 'ray_red.png',
  src + 'redpulse.png',
  src + 'rogueleader.png',
  src + 'base2.png',
  src + 'base3.png',
  src + 'drone.png',
  src + 'dockcannon.png',
  src + 'bigyellow.png',
  src + 'bigplatcannon.png',
  src + 'circlePlatCannon.png',
  src + 'yellowbomber.png',
  src + 'aggressor.png',
  src + 'green.png',
  src + 'greenx2.png',
  src + 'bigboss.png',
  src + 'angularsmall.png',
  src + 'csssmall.png',
  src + 'htmlsmall.png',
  src + 'nodesmall.png',
  src + 'sasssmall.png',
  src + 'bootstrapsmall.png',
  src + 'javascriptsmall.png',
  src + 'nodesmall.png',
]);

resources.onReady(init);

var playInterface = document.getElementById('start-game-wrapper');

// Launch game and initializing game timer
function init() {
  document.getElementById('play').addEventListener('click', function() {
    playInterface.style.display = 'none';
    lastTime = Date.now();
    gameLoop();
  });
};

// Main game loop
function gameLoop() {
  var now = Date.now();
  var dt = (now - lastTime) / 1e3;

  game.update(dt);
  game.render();

  lastTime = now;
  requestAnimationFrame(gameLoop);
};
