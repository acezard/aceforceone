// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var gameWrapper = document.getElementById('game-wrapper');
var scoreEl = document.getElementById('scoreVal');
var hp = document.getElementById('hp');
var powerPoints = document.getElementById('sh');
var uiWrap = document.getElementById('ui-wrapper');
var gameOverWrap = document.getElementById('game-over-wrapper');
var lifesEl = document.getElementById('lifeVal');
var width = 800;
var height = 800;

hp.style.height = '100%';
powerPoints.style.height = '0%';

canvas.width = 800;
canvas.height = 800;

gameWrapper.appendChild(canvas);

module.exports = {
  scoreEl: scoreEl,
  clear: function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  ctx: ctx,
  width: width,
  height: height,
  el: canvas,
  powerPoints: powerPoints,
  hitPoints: hp,
  ui: uiWrap,
  gameOver: gameOverWrap,
  lifesEl: lifesEl
};
