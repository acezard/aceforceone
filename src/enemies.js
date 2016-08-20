var conf = require('./canvasconf');

var xs1Total = 7;
var xs1Collection = [];
var xs1model = new Image();

xs1model.src = 'assets/images/enemy-xs-1.png';

xs1model.onload = function() {
  var enemyXS1Config = {
    speed: 3,
    height: xs1model.naturalHeight,
    width: xs1model.naturalWidth
  }

  var waveIncrementX = conf.canvasWidth / xs1Total;
  var offset = (conf.canvasWidth - ((xs1Total - 1) * waveIncrementX + enemyXS1Config.width)) / 2;

  function makeXS1(x) {
    var EnemyXS1 = function(x) {
      this.x = x;
      this.y =  - enemyXS1Config.height;
      this.speed = enemyXS1Config.speed;
      this.width = enemyXS1Config.width;
      this.height = enemyXS1Config.height;
    }

    return new EnemyXS1(x);
  }

  for (var i = 0; i < xs1Total; i++) {
    xs1Collection.push(makeXS1(waveIncrementX * i + offset));
  }
}

exports.update = function() {
  for (var i = 0; i < xs1Collection.length; i++) {
    if (xs1Collection[i].y < conf.canvasHeight) {
      xs1Collection[i].y += 3;
    } else if (xs1Collection[i].y > conf.canvasHeight - 1) {
      xs1Collection[i].y = -45;
    }
  }
}

exports.draw = function() {
  for (var i = 0; i < xs1Collection.length; i++) {
    conf.ctx.drawImage(xs1model, xs1Collection[i].x, xs1Collection[i].y);
  }
}
