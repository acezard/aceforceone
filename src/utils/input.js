var canvas = require('../canvas');

var canvasPos = getPosition(canvas.el);

var inputs = {
  up: false,
  right: false,
  down: false,
  left: false,
  mouseX: 0,
  mouseY: 0,
  clicked: false
}

canvas.el.addEventListener('keydown', keydown);
canvas.el.addEventListener('keyup', keyup);
canvas.el.addEventListener('mousemove', setMousePosition, false);
canvas.el.addEventListener('click', function() {
  if(inputs.clicked) {
    return;
  }

  inputs.clicked = true;

  setTimeout(function() {
    inputs.clicked = false;
  }, 200);
}, false);

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

function setMousePosition(e) {
  var rect = canvas.el.getBoundingClientRect();
  inputs.mouseX = e.clientX - rect.left;
  inputs.mouseY = e.clientY - rect.top;

  console.log(inputs.mouseX + ' ' + inputs.mouseY)
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}   

module.exports = inputs;