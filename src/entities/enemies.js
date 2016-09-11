var canvas = require('../canvas');
var Sprite = require('../utils/sprite');
var utils = require('../utils/utils');
var state = require('../state');
var weapons = require('./weapons');
var paths = require('./paths');
var explosion = require('./explosions');

// Config Object
var enemyConfig = {
  redBomber: {
    url: 'assets/images/enemy-xs-1.svg',
    pos: [0, 0],
    size: [75, 53],
    speed: 100,
    hitpoints: 10,
    ROF: 100,
    score: 100,
    burst: {
      amount: 3,
      delay: 1000,
      counter: 3
    },
  },

  scout: {
    url: 'assets/images/scout.png',
    pos: [0, 0],
    size: [50, 44],
    speed: 500,
    hitpoints: 2,
    score: 50
  },

  rotatingPlat: {
    url: 'assets/images/platpart.png',
    pos: [0, 0],
    size: [150, 44],
    speed: 30,
    hitpoints: 35,
    ROF: 200,
    score: 250,
    burst: {
      amount: 1000,
      delay: 1000,
      counter: 1000
    },
  },

  rogueLeader: {
    url: 'assets/images/rogueleader.svg',
    pos: [0, 0],
    size: [200, 89],
    speed: 100,
    hitpoints: 60,
    score: 300,
    ROF: 500,
  },

  drone: {
    url: 'assets/images/drone.svg',
    pos: [0, 0],
    size: [50, 62],
    speed: 300,
    hitpoints: 5,
    score: 75
  },

  dockCannon: {
    url: 'assets/images/dockcannon.png',
    pos: [0, 0],
    size: [31, 75],
    speed: 50,
    hitpoints: 10,
    score: 100,
    ROF: 1000
  },

  bigPlatCannon: {
    url: 'assets/images/bigplatcannon.png',
    pos: [0, 0],
    size: [22, 26],
    speed: 50,
    hitpoints: 5,
    score: 75,
    ROF: 500
  },

  circlePlatCannon: {
    url: 'assets/images/circlePlatCannon.png',
    pos: [0, 0],
    size: [27, 32],
    speed: 50,
    hitpoints: 15,
    score: 150,
    ROF: 2000
  },

  yellowBomber: {
    url: 'assets/images/yellowbomber.png',
    pos: [0, 0],
    size: [75, 53],
    speed: 150,
    hitpoints: 15,
    ROF: 500,
    score: 200,
    burst: {
      amount: 10,
      delay: 750,
      counter: 10
    }
  },

  aggressor: {
    url: 'assets/images/aggressor.png',
    pos: [0, 0],
    size: [150, 142],
    speed: 100,
    hitpoints: 35,
    ROF: 1000,
    score: 300,
    exploding: 'GreenX2'
  },
  
  bigBoss: {
    url: 'assets/images/bigboss.png',
    pos: [0, 0],
    size: [600, 253],
    speed: 50,
    hitpoints: 3000,
    ROF1: 1000,
    ROF2: 500,
    ROF3: 100,
    score: 5000
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
  this.exploding = settingsDefault.exploding || null;
  if (settingsDefault.burst) {
    this.burst = {
      amount: settingsDefault.burst.amount,
      delay: settingsDefault.burst.delay,
      counter: settingsDefault.burst.counter
    };
  }
  this.sprite = new Sprite({
    url: settingsDefault.url,
    pos: settingsDefault.pos,
    size: settingsDefault.size,
    rotated: true
  });

  // Active
  this.angle = settingsActive.angle;
  this.pos = settingsActive.pos;
  this.radians = settingsActive.angle * Math.PI / 180;
  this.vector = [Math.cos(this.radians) * this.speed, Math.sin(this.radians) * this.speed];
  this.rotation = settingsActive.rotation || 0;
  this.path = settingsActive.path || null;
  this.unique = settingsActive.unique || null;
  this.rotateAngle = settingsActive.rotateAngle >= 0 ? 0 : null;
};

// Update method
EnemyEntity.prototype.shoot = function() {};

EnemyEntity.prototype.update = function(dt) {
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
  return this.pos[1] > canvas.height && this.vector[1] > 0 || this.pos[0] < 0 && this.vector[0] < 0 || this.pos[0] > canvas.width && this.vector[0] < 0 || this.pos[1] < 0 && this.vector[1] < 0;
};

// Draw method
EnemyEntity.prototype.render = function() {
    canvas.ctx.save();
    canvas.ctx.translate(this.pos[0], this.pos[1]);
    canvas.ctx.translate(this.sprite.size[0] / 2, this.sprite.size[1] / 2);
    canvas.ctx.rotate(Math.PI / 180 * this.rotation);
    this.sprite.render(canvas.ctx);
    canvas.ctx.restore();
};

// Factory constructor
var EnemyFactory = function() {};

EnemyFactory.prototype.add = function(settings) { 
  return new this.type(settings);
};

// Scout factory
var Scout = function(settings) {
  EnemyEntity.call(this, enemyConfig.scout, settings);
};

Scout.prototype = Object.create(EnemyEntity.prototype);

function ScoutFactory () {};
ScoutFactory.prototype = new EnemyFactory();
ScoutFactory.prototype.type = Scout;

var scout = new ScoutFactory();

// Drone factory
var Drone = function(settings) {
  EnemyEntity.call(this, enemyConfig.drone, settings);
};

Drone.prototype = Object.create(EnemyEntity.prototype);

function DroneFactory () {};
DroneFactory.prototype = new EnemyFactory();
DroneFactory.prototype.type = Drone;

var drone = new DroneFactory();

// RedBomber
var RedBomber = function(settings) {
  EnemyEntity.call(this, enemyConfig.redBomber, settings);
};

RedBomber.prototype = Object.create(EnemyEntity.prototype);

RedBomber.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;

    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 90}));
    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 80}));
    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 100}));

    this.burst.counter--;
    this.lastFire = now;
    return;
  } else

  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
};

function RedBomberFactory () {};
RedBomberFactory.prototype = new EnemyFactory();
RedBomberFactory.prototype.type = RedBomber;

var redBomber = new RedBomberFactory();

// Rogue Leader
var RogueLeader = function(settings) {
  EnemyEntity.call(this, enemyConfig.rogueLeader, settings);
};

RogueLeader.prototype = Object.create(EnemyEntity.prototype);

RogueLeader.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    state.ebullets.push(weapons.redRay.addMissile({pos: [x + this.sprite.size[0] * 0.3, y + this.sprite.size[1] * 0.6], angle: this.rotation - 90}));
    state.ebullets.push(weapons.redRay.addMissile({pos: [x + this.sprite.size[0] * 0.7, y + this.sprite.size[1] * 0.6], angle: this.rotation - 90}));

    this.lastFire = now;
  }
};

function RogueLeaderFactory () {};
RogueLeaderFactory.prototype = new EnemyFactory();
RogueLeaderFactory.prototype.type = RogueLeader;

var rogueLeader = new RogueLeaderFactory();

// Platform
var RotatingPlat = function(settings) {
  EnemyEntity.call(this, enemyConfig.rotatingPlat, settings);
};

RotatingPlat.prototype = Object.create(EnemyEntity.prototype);

RotatingPlat.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    if (this.rotation == 360 || this.rotation == 180) {
      state.ebullets.push(weapons.redPulse.addMissile({pos: [x + this.sprite.size[0] / 2, y + 10], angle: this.rotateAngle + 90, rotation: this.rotateAngle + 180}));
      state.ebullets.push(weapons.redPulse.addMissile({pos: [x + this.sprite.size[0] / 2, y + 10], angle: this.rotateAngle + 270, rotation: this.rotateAngle + 0}));
    }

    if (this.rotation == 90 || this.rotation == 270) {
      state.ebullets.push(weapons.redPulse.addMissile({pos: [x + this.sprite.size[0] / 2, y + 10], angle: this.rotateAngle + 0, rotation: this.rotateAngle + 90}));
      state.ebullets.push(weapons.redPulse.addMissile({pos: [x + this.sprite.size[0] / 2, y + 10], angle: this.rotateAngle + 180, rotation: this.rotateAngle + 270}));
    }

    this.rotateAngle += 10;

    this.burst.counter --;
    this.lastFire = now;
    return;
  }  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
};

function RotatingPlatFactory () {};
RotatingPlatFactory.prototype = new EnemyFactory();
RotatingPlatFactory.prototype.type = RotatingPlat;

var rotatingPlat = new RotatingPlatFactory();

var platformSpawner = function(settings) {
  var x = settings.pos[0];
  var y = settings.pos[1];

  state.enemies.push(rotatingPlat.add({pos: [x, y], angle: 90, rotation: 360, rotateAngle: 0}));
  state.enemies.push(rotatingPlat.add({pos: [x - 65 - 65, y], angle: 90, rotation: 180, rotateAngle: 0}));
  state.enemies.push(rotatingPlat.add({pos: [x - 65, y + 65], angle: 90, rotation: 90, rotateAngle: 0}));
  state.enemies.push(rotatingPlat.add({pos: [x - 65 , y - 65], angle: 90, rotation: 270, rotateAngle: 0}));
};

// Dock cannon factory
var DockCannon = function(settings) {
  EnemyEntity.call(this, enemyConfig.dockCannon, settings);
};

DockCannon.prototype = Object.create(EnemyEntity.prototype);

DockCannon.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    state.ebullets.push(weapons.yellow.addMissile({pos: [x + this.sprite.size[0] * 0.3, y + this.sprite.size[1] * 0.6], angle: this.rotation - 90}));

    this.lastFire = now;
  }
};

DockCannon.prototype.update = function(dt) {
  if (this.outOfBounds()) {
    this.active = false;
    return;
  }

  this.pos[0] += this.vector[0] * dt;
  this.pos[1] += this.vector[1] * dt;
};

function DockCannonFactory () {};
DockCannonFactory.prototype = new EnemyFactory();
DockCannonFactory.prototype.type = DockCannon;

var dockCannon = new DockCannonFactory();

// Big Plat Cannon
// Dock cannon factory
var BigPlatCannon = function(settings) {
  EnemyEntity.call(this, enemyConfig.bigPlatCannon, settings);
};

BigPlatCannon.prototype = Object.create(EnemyEntity.prototype);

BigPlatCannon.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0];
    var y = this.pos[1];

    if (this.rotation == 0) {
      state.ebullets.push(weapons.yellow.addMissile({pos: [x, y + this.sprite.size[1] * 0.1], angle: this.rotation + 15}));
    }
    
    if (this.rotation == 180) {
      state.ebullets.push(weapons.yellow.addMissile({pos: [x, y + this.sprite.size[1] * 0.1], angle: this.rotation - 15}));
    }

    this.lastFire = now;
  }
};

function BigPlatCannonFactory () {};
BigPlatCannonFactory.prototype = new EnemyFactory();
BigPlatCannonFactory.prototype.type = BigPlatCannon;

var bigPlatCannon = new BigPlatCannonFactory();

// Circle Plat Cannon
var CirclePlatCannon = function(settings) {
  EnemyEntity.call(this, enemyConfig.circlePlatCannon, settings);
};

CirclePlatCannon.prototype = Object.create(EnemyEntity.prototype);

CirclePlatCannon.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;

    if (this.unique == 'left') {
      var start = 50;

      for (i = 0; i < 12; i ++) {
        state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: start}));
        start -= 10;
      }
    }
    
    if (this.unique == 'right') {
      var start = 130;

      for (i = 0; i < 12; i ++) {
        state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: start}));
        start += 10;
      }
    }

    this.lastFire = now;
  }
};

function CirclePlatCannonFactory () {};
CirclePlatCannonFactory.prototype = new EnemyFactory();
CirclePlatCannonFactory.prototype.type = CirclePlatCannon;

var circlePlatCannon = new CirclePlatCannonFactory();

// Yellow Bomber
var YellowBomber = function(settings) {
  EnemyEntity.call(this, enemyConfig.yellowBomber, settings);
};

YellowBomber.prototype = Object.create(EnemyEntity.prototype);

YellowBomber.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && this.burst.counter && now - this.lastFire > this.ROF) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;

    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 110}));
    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 100}));
    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 90}));
    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 80}));
    state.ebullets.push(weapons.red.addMissile({pos: [x, y], angle: 70}));

    this.burst.counter--;
    this.lastFire = now;
    return;
  } else

  if (!this.burst.counter && now - this.lastFire > this.burst.delay) {
    this.burst.counter = this.burst.amount;
  }
};

function YellowBomberFactory () {};
YellowBomberFactory.prototype = new EnemyFactory();
YellowBomberFactory.prototype.type = YellowBomber;

var yellowBomber = new YellowBomberFactory();

// Aggressor
var Aggressor = function(settings) {
  EnemyEntity.call(this, enemyConfig.aggressor, settings);
};

Aggressor.prototype = Object.create(EnemyEntity.prototype);

Aggressor.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.pos[1] > 0 && now - this.lastFire > this.ROF) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;
    var steps = 30;
    var step = 360 / steps;

    for (i = 0; i < steps; i++) {
      state.ebullets.push(weapons.green.addMissile({pos: [x, y], angle: step * i}));
    }

    this.lastFire = now;
  }
};

function AggressorFactory () {};
AggressorFactory.prototype = new EnemyFactory();
AggressorFactory.prototype.type = Aggressor;

var aggressor = new AggressorFactory();

// BigBoss
var BigBoss = function(settings) {
  EnemyEntity.call(this, enemyConfig.bigBoss, settings);

  this.goingLeft = true;
  this.fighting = false;
  this.ROF1 = enemyConfig.bigBoss.ROF1;
  this.ROF2 = enemyConfig.bigBoss.ROF2;
  this.lastFire2 = Date.now();
  this.ROF3 = enemyConfig.bigBoss.ROF3;
  this.lastFire3 = Date.now();
  this.rotateAngle = 90;
  this.fireCounter = 0;
  this.dieCounter = Date.now();
  this.dieRof = 750;
  this.dieCount = 0;
  this.maxHp = enemyConfig.bigBoss.hitpoints;
};

BigBoss.prototype = Object.create(EnemyEntity.prototype);

BigBoss.prototype.die = function(dt) {
  var now = Date.now();

  if (now - this.dieCounter > this.dieRof && this.dieCount < 100) {
    for (i = 0; i < 2; i++) {
      var hitPos = [utils.getRandom(this.pos[0], this.sprite.size[0]), utils.getRandom(this.pos[1], this.sprite.size[1])];

      // Add a hit marker
      state.explosions.push(new explosion.Explosion(hitPos[0] - 45, hitPos[1] - 45));
    }

    this.dieCount ++;
    return;
  }

  // Update score
  var score = this.score;
  var pointPerHp = score / 2 / this.maxHitpoints;
  canvas.bosshpEl.style.display = 'none';
  this.active = false;
  state.score += (score * 0.5) + (this.hitpoints * pointPerHp);
  state.explosions.push(new explosion.Scored(this.pos[0] + this.sprite.size[0] / 3, this.pos[1], score, 'good'));
};

BigBoss.prototype.update = function(dt) {
  if (this.pos[1] < 40) {
    this.pos[0] += this.vector[0] * dt;
    this.pos[1] += this.vector[1] * dt;
    return;
  }

  if (!this.fighting) {
    canvas.bosshpEl.style.display = 'block';
    canvas.bosshp.style.width = '100%';
    canvas.bosshp.style.height = '100%';
    this.fighting = true;
  }

  if (this.pos[0] <= 10) {
    this.goingLeft = false;
  }

  if (this.pos[0] + this.sprite.size[0] >= canvas.width - 10) {
    this.goingLeft = true;
  }

  if (this.goingLeft) {
    this.pos[0] -= 50 * dt;
  }
  
  if (!this.goingLeft) {
    this.pos[0] += 50 * dt;
  }
};

BigBoss.prototype.shoot = function() {
  var now = Date.now();

  // If the enemy can shoot
  if (this.fighting) {
    var counter = (now - this.fireCounter) / 1000;

    if (!this.fireCounter) {
      this.fireCounter = Date.now();
    }

    this.protonBomber(now);

    if (counter > 5 && counter < 10) {
      this.focusedMassacre(now);
    }

    if (counter > 10 && counter < 15) {
      this.ultraKilling(now);
    }

    if (counter > 15 && counter < 20) {
      this.ultraKilling(now);
      this.focusedMassacre(now);
    }

    if (counter > 20) {
      this.fireCounter = Date.now();
    }
  }
};

BigBoss.prototype.ultraKilling = function(now) {
  if (now - this.lastFire > this.ROF1) {
    var x = this.pos[0] + this.sprite.size[0] / 2;
    var y = this.pos[1] + this.sprite.size[1] / 2;
    var steps = 30;
    var step = 360 / steps;

    for (i = 0; i < steps; i++) {
      state.ebullets.push(weapons.green.addMissile({pos: [x, y], angle: step * i}));
    }

    this.lastFire = now;
  }
};

BigBoss.prototype.protonBomber = function(now) {
  if (this.fighting && now - this.lastFire2 > this.ROF2) {
    var pos1 = [this.pos[0] + 40, this.pos[1] + 180]
    var pos2 = [this.pos[0] + 560, this.pos[1] + 180];

    state.ebullets.push(weapons.yellow.addMissile({pos: pos1, angle: 90}));
    state.ebullets.push(weapons.yellow.addMissile({pos: pos2, angle: 90}));

    this.lastFire2 = now;
  }
};

BigBoss.prototype.focusedMassacre = function(now) {
  if (this.fighting && now - this.lastFire3 > this.ROF3) {
    var pos1 = [this.pos[0] + 270, this.sprite.size[1]];
    var pos2 = [this.pos[0] + 335, this.sprite.size[1]];

    state.ebullets.push(weapons.red.addMissile({pos: pos1, angle: this.rotateAngle}));
    state.ebullets.push(weapons.red.addMissile({pos: pos2, angle: this.rotateAngle}));

    if (this.rotateAngle >= 135) {
      this.inverseAngle = true;
    } else if (this.rotateAngle <= 45) {
      this.inverseAngle = false;
    }

    if (!this.inverseAngle) {
      this.rotateAngle += 10;
    }

    if (this.inverseAngle) {
      this.rotateAngle -= 10;
    }

    this.lastFire3 = now;
  }
};

function BigBossFactory () {};
BigBossFactory.prototype = new EnemyFactory();
BigBossFactory.prototype.type = BigBoss;

var bigBoss = new BigBossFactory();

module.exports = {
  enemyConfig: enemyConfig,
  redBomber: redBomber,
  scout: scout,
  rogueLeader: rogueLeader,
  drone: drone,
  dockCannon: dockCannon,
  bigPlatCannon: bigPlatCannon,
  circlePlatCannon: circlePlatCannon,
  yellowBomber: yellowBomber,
  aggressor: aggressor,
  platformSpawner: platformSpawner,
  bigBoss: bigBoss
};
