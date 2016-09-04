var resources = require('./resources');

function Sprite(config) {
  this.pos = [config.pos[0], config.pos[1]];
  this.size = config.size;
  this.speed = typeof config.speed === 'number' ? config.speed : 0;
  this.frames = config.frames;
  this._index = 0;
  this.url = config.url;
  this.dir = config.dir || 'horizontal';
  this.ratio = 1;
  this.once = config.once
  this.rotated = config.rotated;
};

Sprite.prototype = {
  update: function(dt) {
    this._index += this.speed * dt;
  },

  render: function(ctx) {
    var frame;

    if (this.speed > 0) {
      var max = this.frames.length;
      var idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    } else {
      frame = 0;
    }

    var x = this.pos[0];
    var y = this.pos[1];

    var dx = 0;
    var dy = 0;

    if (this.dir == 'vertical') {
      y += frame * this.size[1];
    } else {
      x += frame * this.size[0];
    }

    if (this.rotated) {
      dx = - this.size[0] / 2;
      dy = - this.size[1] / 2;
    }

    if (this.once) {
      ctx.drawImage(resources.get(this.url),
      x, y,
      this.size[0] * this.ratio, this.size[1] * this.ratio,
      dx, dy,
      this.size[0], this.size[1]);
    } else {
      ctx.drawImage(resources.get(this.url),
      dx, dy,
      this.size[0], this.size[1]);
    }

  }
};

module.exports = Sprite;
