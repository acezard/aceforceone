var canvas = require('../canvas');
var Sprite = require('../utils/sprite');

var Explosion = function(x, y) {
  this.pos = [x, y];
  this.sprite = new Sprite({
    url:'assets/images/explosion.png',
    pos: [0, 0],
    size: [90, 90],
    speed: 24,
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    once: true
  });
  this.active = true;
  this.update = function(dt) {
    this.sprite.update(dt);

    if(this.sprite.done) {
        this.active = false;
    }
  };
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
};

var GreenX2 = function(x, y) {
  this.pos = [x, y];
  this.sprite = new Sprite({
    url:'assets/images/greenx2.png',
    pos: [0, 0],
    size: [180, 180],
    speed: 24,
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    once: true
  });
  this.active = true;
  this.update = function(dt) {
    this.sprite.update(dt);

    if(this.sprite.done) {
        this.active = false;
    }
  };
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
};

var Hit = function(x, y, color) {
  this.pos = [x, y];
  this.sprite = new Sprite({
    url:'assets/images/hit' + color + '.png',
    pos: [0, 0],
    size: [90, 90],
    speed: 24,
    frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    once: true
  });
  this.active = true;
  this.update = function(dt) {
    this.sprite.update(dt);

    if(this.sprite.done) {
        this.active = false;
    }
  };
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
  };
};

var Scored = function(x, y, text, effect) {

  if (effect === 'good') {
    this.strokeStyle = '253, 88, 66';
    this.fillStyle = '253, 179, 30';
  } else {
    this.strokeStyle = '253, 88, 66';
    this.fillStyle = '253, 88, 66';
  }

  this.pos = [x, y];
  this.active = true;
  this.text = text;
  this.factor = 20;
  this.size = this.factor;
  this.opacity = 1;
  this.update = function(dt) {
    this.size++;
    this.opacity-= 1 / this.factor;

    if (this.size == this.factor * 2) {
      this.active = false;
    }
  };
  this.render = function() {
    canvas.ctx.save();
    canvas.ctx.font = this.size + "px quango"
    canvas.ctx.strokeStyle = 'rgba(' + this.strokeStyle + ',' + this.opacity +')';
    canvas.ctx.lineWidth = 4;
    canvas.ctx.strokeText(this.text, this.pos[0], this.pos[1]);
    canvas.ctx.fillStyle = 'rgba(' + this.fillStyle + ', ' + this.opacity + ')';
    canvas.ctx.fillText(this.text, this.pos[0], this.pos[1]);
    canvas.ctx.restore();
  };
};

module.exports = {
  Explosion: Explosion,
  Hit: Hit,
  Scored: Scored,
  GreenX2: GreenX2
};
