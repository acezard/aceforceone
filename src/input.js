var conf = require('./canvasconf');

var inputs = {
  up: false,
  right: false,
  down: false,
  left: false
}

document.addEventListener('keydown', keydown);
document.addEventListener('keyup', keyup);

function keydown(e) {
  switch (event.key) {
    case 'ArrowUp':
      inputs.up = true;
      break;
    case 'ArrowRight':
      inputs.right = true;
      break;
    case 'ArrowDown':
      inputs.down = true;
      break;
    case 'ArrowLeft':
      inputs.left = true;
      break;
  }
}

function keyup(e) {
  switch (event.key) {
    case 'ArrowUp':
      inputs.up = false;
      break;
    case 'ArrowRight':
      inputs.right = false;
      break;
    case 'ArrowDown':
      inputs.down = false;
      break;
    case 'ArrowLeft':
      inputs.left = false;
      break;
  }
}

module.exports = inputs;