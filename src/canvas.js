// Create the canvas
var canvas = document.createElement("canvas");

canvas.width = 800;
canvas.height = 800;

document.body.appendChild(canvas);

exports.ctx = canvas.getContext("2d");
exports.width = canvas.width;
exports.height = canvas.height;
