(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var conf = require('./canvasconf');

var starfield,
    starfield2,
    wave,
    starX = 0,
    starY = 0,
    starY2 = -900,
    star2Y = 0
    star2Y2 = -593,
    waveX = 0,
    waveY = 0;

starfield = new Image();
starfield.src = 'assets/images/background.png';
starfield2 = new Image();
starfield2.src = 'assets/images/bg2.png';
wave = new Image();
wave.src = 'assets/images/wave.png';

module.exports = function drawStarfield() {
  conf.ctx.drawImage(wave, waveX, waveY);
  waveY += 0.2;

  if (waveY > 1000) {
    waveY = -491;
  }

  conf.ctx.drawImage(starfield2, starX, star2Y);
  conf.ctx.drawImage(starfield2, starX, star2Y2);
  if (star2Y > 593) {
    star2Y = -592;
  }
  if (star2Y2 > 593) {
    star2Y2 = -592;
  }
  star2Y += 0.5;
  star2Y2 += 0.5;

  conf.ctx.drawImage(starfield, starX, starY);
  conf.ctx.drawImage(starfield, starX, starY2);
  if (starY > 900) {
    starY = -899;
  }
  if (starY2 > 900) {
    starY2 = -899;
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
  conf.ctx.clearRect(0, 0, conf.canvasWidth, conf.canvasHeight);
  drawStarfield();
}

},{"./background":1,"./canvasconf":2}]},{},[3]);
