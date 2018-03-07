Math.rad = function(degrees) {
  return degrees * Math.pi / 180;
}

Math.deg = function(radians) {
  return radians / 180 * Math.pi;
}

Math.randCol = function() {
  return Math.floor(Math.random()*16777215).toString(16);
}
