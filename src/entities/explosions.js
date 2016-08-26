var canvas = require('../canvas');
var Sprite = require('../utils/sprite');

var Explosion = function(x, y) {
  this.pos = [x, y];
  this.sprite = new Sprite('assets/images/explosion.png', [0, 0], [90, 90], 24, [0, 1, 2, 3, 4, 5, 6, 7, 8], null, true);
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

var HitRed = function(x, y) {
  this.pos = [x, y];
  this.sprite = new Sprite('assets/images/hitred.png', [0, 0], [90, 90], 24, [0, 1, 2, 3, 4, 5, 6, 7, 8], null, true);
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

module.exports = {
  Explosion: Explosion,
  HitRed: HitRed
};