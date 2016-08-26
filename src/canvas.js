// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 800;

document.body.appendChild(canvas);

exports.ctx = canvas.getContext("2d");
exports.width = canvas.width;
exports.height = canvas.height;
exports.clear = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};
