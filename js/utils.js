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
utils.rectDuang = function (rect1, rect2) {
  return (
    rect1.x + rect1.w >= rect2.x &&
    rect1.x <= rect2.x + rect2.w &&
    rect1.y + rect1.h >= rect2.y &&
    rect1.y <= rect2.y + rect2.h
  );
};

utils.getDist = function (x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

utils.checkBallBounce = function (ball, W, H, bounce) {
  if (ball.x - ball.r <= 0) {
    ball.x = ball.r;
    ball.vx *= bounce;
  } else if (ball.x + ball.r >= W) {
    ball.x = W - ball.r;
    ball.vx *= bounce;
  } else if (ball.y + ball.r >= H) {
    ball.y = H - ball.r;
    ball.vy *= bounce;
  } else if (ball.y - ball.r <= 0) {
    ball.y = ball.r;
    ball.vy *= bounce;
  }
};
