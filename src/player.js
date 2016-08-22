var canvas = require('./canvas');
var inputs = require('./input');
var Sprite = require('./sprite');
var resources = require('./resources');

// Load player
var player = {
    pos: [0, 0],
    sprite: new Sprite('assets/images/player.png', [0, 0], [0, 0], 16, [0, 1]),
    speed: 400
};

resources.onReady(function() {
  player.sprite.size[0] = resources.get('assets/images/player.png').naturalWidth;
  player.sprite.size[1] = resources.get('assets/images/player.png').naturalHeight;
  player.pos = [canvas.width / 2 - player.sprite.size[0] / 2, canvas.height];
})

module.exports = player;
