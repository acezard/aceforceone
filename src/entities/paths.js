function angular(elem) {
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
};

module.exports = {
  angular: angular
};
