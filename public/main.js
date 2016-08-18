(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var conf = require('./canvasconf');

var starfield,
    starX = 0,
    starY = 0,
    starY2 = -600;

starfield = new Image();
starfield.src = 'assets/images/background.png';

module.exports = function drawStarfield() {
  conf.ctx.drawImage(starfield,starX,starY);
  conf.ctx.drawImage(starfield,starX,starY2);
  if (starY > conf.canvasHeight) {
    starY = -799;
  }
  if (starY2 > 800) {
    starY2 = -799;
  }
  starY += 1;
  starY2 += 1;
};
},{"./canvasconf":2}],2:[function(require,module,exports){
exports.canvas = document.getElementById("canvas");
exports.ctx = canvas.getContext("2d");
exports.canvasWidth = canvas.clientWidth;
exports.canvasHeight = canvas.clientHeight;

},{}],3:[function(require,module,exports){
var conf = require('./canvasconf'),
    drawStarfield = require('./background');

gameLoop();

function gameLoop() {
  requestAnimationFrame(gameLoop, conf.canvas);
  drawStarfield();
}

},{"./background":1,"./canvasconf":2}]},{},[3]);
