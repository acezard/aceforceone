exports.getRandom = function(min, max) {
  return Math.random() * (max - min) + min;
}