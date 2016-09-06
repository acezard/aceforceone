var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');

// Config Object
var enemyConfig = {
  RedXS: {
    url: 'assets/images/enemy-xs-1.svg',
    pos: [0, 0],
    size: [75, 53],
    speed: 100,
    hitpoints: 10,
    score: 100,
    burst: {
      amount: 3,
      delay: 1000,
      counter: 3
    },
    ROF: 100
  },

  Scout: {
    url: 'assets/images/scout.png',
    pos: [0, 0],
    size: [50, 44],
    speed: 500,
    hitpoints: 2,
    score: 50
  },

  RotatingPlat: {
    speed: 30,
    hitpoints: 100,
    ROF: 200,
    score: 250,
    burst: {
      amount: 1000,
      delay: 1000,
      counter: 1000
    },
    url: 'assets/images/platpart.png',
    pos: [0, 0],
    size: [150, 44],
  },

  RogueLeader: {
    speed: 100,
    hitpoints: 60,
    score: 300,
    ROF: 500,
    url: 'assets/images/rogueleader.svg',
    pos: [0, 0],
    size: [200, 89],
  },

  drone: {
    url: 'assets/images/drone.svg',
    pos: [0, 0],
    size: [50, 62],
    speed: 300,
    hitpoints: 5,
    score: 75
  },
};

// Base enemy prototype
var EnemyEntity = function(settingsDefault, settingsActive) {
  // Default
  this.active = true;
  this.speed = settingsDefault.speed;
  this.hitpoints = settingsDefault.hitpoints;
  this.lastFire = Date.now();
  this.score = settingsDefault.score;
  this.ROF = settingsDefault.ROF || null;
  this.maxHitpoints = settingsDefault.hitpoints;
  this.rotating = settingsDefault.rotating || null;
  this.angle = settingsActive.angle;
  this.burst = settingsDefault.burst || null;
  this.sprite = new Sprite({
    url: settingsDefault.url,
    pos: settingsDefault.pos,
    size: settingsDefault.size,
    rotated: true
  });

  // Active
  this.pos = settingsActive.pos;
  this.radians = settingsActive.angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = settingsActive.rotation || 0;
  this.path = settingsActive.path || null;
  console.log(this.burst)
};

// Update method
EnemyEntity.prototype.shoot = function() {
};

EnemyEntity.prototype.update = function(dt) {
  var self = this;

  if (this.outOfBounds()) {
    this.active = false;
    return;
  }

  if (this.path == "angular") {
    paths.angular(this);
  }

  this.pos[0] += this.vector[0] * dt;
  this.pos[1] += this.vector[1] * dt;
};

EnemyEntity.prototype.outOfBounds = function() {
  return this.pos[1] > canvas.height || this.pos[0] < 0 || this.pos[0] > canvas.width;
};

// Draw method
EnemyEntity.prototype.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);

    if (this.rotation) {
      canvas.ctx.translate(this.sprite.size[0] / 2, this.sprite.size[1] / 2);
      canvas.ctx.rotate(Math.PI / 180 * this.rotation);
    }

    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
};

// Factory function
var EnemyFactory = function() {};

EnemyFactory.prototype.add = function(pos, angle, rotation) { 
  return new this.type(pos, angle, rotation);
}

// Scout
var Scout = function(settings) {
  EnemyEntity.call(this, enemyConfig.Scout, settings);
}

Scout.prototype = Object.create(EnemyEntity.prototype);

function ScoutFactory () {};
ScoutFactory.prototype = new EnemyFactory();
ScoutFactory.prototype.type = Scout;

var Scout = new ScoutFactory();

// Drone
var Drone = function(settings) {
  EnemyEntity.call(this, enemyConfig.drone, settings);
};

Drone.prototype = Object.create(EnemyEntity.prototype);

function DroneFactory () {};
DroneFactory.prototype = new EnemyFactory();
DroneFactory.prototype.type = Drone;

var drone = new DroneFactory();

// RedXS
var RedXS = function(settings) {
  EnemyEntity.call(this, enemyConfig.RedXS, settings);
};

RedXS.prototype = Object.create(EnemyEntity.prototype);

RedXS.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;

    state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: 90}));
    state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: 80}));
    state.ebullets.push(weapons.red.addMissile({x: x, y: y, angle: 100}));

    this.burst.counter--;
    this.lastFire = now;
    return;
  } else

  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
}

function RedXSFactory () {};
RedXSFactory.prototype = new EnemyFactory();
RedXSFactory.prototype.type = RedXS;

var RedXS = new RedXSFactory();

// Rogue Leader
var RogueLeader = function(settings) {
  EnemyEntity.call(this, enemyConfig.RogueLeader, settings);
};

RogueLeader.prototype = Object.create(EnemyEntity.prototype);

RogueLeader.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    state.ebullets.push(weapons.redRay.addMissile({x: x + this.sprite.size[0] * 0.3, y: y + this.sprite.size[1] * 0.6, angle: this.rotation - 90}));
    state.ebullets.push(weapons.redRay.addMissile({x: x + this.sprite.size[0] * 0.7, y: y + this.sprite.size[1] * 0.6, angle: this.rotation - 90}));

    this.lastFire = now;
  }
};

function RogueLeaderFactory () {};
RogueLeaderFactory.prototype = new EnemyFactory();
RogueLeaderFactory.prototype.type = RogueLeader;

var RogueLeader = new RogueLeaderFactory();

// Platform
var RotatingPlat = function(settings) {
  EnemyEntity.call(this, enemyConfig.RotatingPlat, settings);
};

RotatingPlat.prototype = Object.create(EnemyEntity.prototype);

RotatingPlat.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    if (this.rotation == 360 || this.rotation == 180) {
      state.ebullets.push(weapons.redPulse.addMissile({x: x + this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 90, rotation: this.ang + 180}));
      state.ebullets.push(weapons.redPulse.addMissile({x: x + this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 270, rotation: this.ang + 0}));
    }

    if (this.rotation == 90 || this.rotation == 270) {
      state.ebullets.push(weapons.redPulse.addMissile({x: x+ this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 0, rotation: this.ang + 90}));
      state.ebullets.push(weapons.redPulse.addMissile({x: x+ this.sprite.size[0] / 2, y: y + 10, angle: this.ang + 180, rotation: this.ang + 270}));
    }

    this.ang +=10;

    this.burst.counter--;
    this.lastFire = now;
    return;
  }  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
}

function RotatingPlatFactory () {};
RotatingPlatFactory.prototype = new EnemyFactory();
RotatingPlatFactory.prototype.type = RotatingPlat;

var RotatingPlat = new RotatingPlatFactory();

var Plat = function(pos) {
  var x = pos[0];
  var y = pos[1];

  state.enemies.push(RotatingPlat.add([x, y], 90, 360));
  state.enemies.push(RotatingPlat.add([x - 65 - 65, y], 90, 180));
  state.enemies.push(RotatingPlat.add([x - 65, y + 65], 90, 90));
  state.enemies.push(RotatingPlat.add([x - 65 , y - 65], 90, 270));
};

var paths = {
  angular: function(elem) {
    if (!elem.sideways) {
      goSideways();
    }
    
    if (elem.angle == 360 && elem.pos[0] > 300 && !elem.angular) {
      goBottom();
    }

    else if (elem.angle == 180 && elem.pos[0] < 500 - elem.sprite.size[0] && !elem.angular) {
      goBottom();
    }

    function goSideways() {
      elem.vector = [Math.cos(elem.radians) * elem.speed, Math.sin(90 * Math.PI / 180) * 50];
    };

    function goBottom() {
      elem.sideways = true;
      elem.angle = 90;
      elem.rotation = 180;
      elem.radians = elem.angle * Math.PI / 180;
      elem.vector = [Math.cos(elem.radians) * elem.speed, Math.sin(elem.radians) * elem.speed];
      elem.angular = true;
    };
  }
};

module.exports = {
  RedXS: RedXS,
  Scout: Scout,
  RotatingPlat: RotatingPlat,
  RogueLeader: RogueLeader,
  drone: drone
};
