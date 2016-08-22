var canvas = require('./canvas');
var inputs = require('./input');
var player = require('./player');

var bullets = [];

var bulletModel = new Image();
bulletModel.src = 'assets/images/bullet_blue8.png';

function Bullet(I) {
  I.active = true;

  I.xVelocity = 0;
  I.yVelocity = -I.speed;
  I.width = 3;
  I.height = 3;
  I.color = "#000";

  I.inBounds = function() {
    return I.x >= 0 && I.x <= canvas.width &&
      I.y >= 0 && I.y <= canvas.height;
  };

  I.draw = function() {
    canvas.ctx.drawImage(bulletModel, this.x, this.y);
  };

  I.update = function() {
    I.x += I.xVelocity;
    I.y += I.yVelocity;

    I.active = I.active && I.inBounds();
  };

  return I;
}

var shoot = function() {
  var bulletPosition = midpoint();

  bullets.push(Bullet({
    speed: 10,
    x: bulletPosition.x,
    y: bulletPosition.y
  }));
};

var midpoint = function() {
  return {
    x: player.x + player.width / 2,
    y: player.y + player.height / 2
  };
};

var count = 0;
exports.update = function() {
  if (count % 25 == 0) {
    shoot();
  }
  count ++;

  bullets.forEach(function(bullet) {
    bullet.update();
  });

  bullets = bullets.filter(function(bullet) {
    return bullet.active;
  });
}


exports.draw = function() {
  bullets.forEach(function(bullet) {
    bullet.draw();
  });
}
