let utils = {};

utils.getOffset = function (element) {
  let mouse = { x: 0, y: 0 };
  element.addEventListener("mousemove", function (e) {
    let { x, y } = utils.eventWrapper(e);
    mouse.x = x;
    mouse.y = y;
  });
  return mouse;
};

utils.eventWrapper = function (ev) {
  let { pageX, pageY, target } = ev;
  let { left, top } = target.getBoundingClientRect();
  return { x: pageX - left, y: pageY - top };
};

utils.toRad = function (radius) {
  return (radius * Math.PI) / 180;
};

utils.toAngle = function (rad) {
  return (rad * 180) / Math.PI;
};
utils.getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};
utils.rp = function (arr, float) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const num = Math.random() * (max - min) + min;
  return float ? num : Math.round(num);
};

utils.getRgb = function () {
  return `rgb(${utils.rp([55, 255])},${utils.rp([55, 255])},${utils.rp([
    55, 255,
  ])})`;
};
