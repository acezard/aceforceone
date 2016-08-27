// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var gameWrapper = document.getElementById('game-wrapper');
var scoreEl = document.getElementById('scoreEl');
var hp = document.getElementById('hp');
var sh = document.getElementById('sh');
var width = 800;
var height = 800;

hp.style.height = '100%';
sh.style.height = '100%';

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
};
