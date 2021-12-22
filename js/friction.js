const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let angle = utils.toRad(30),
  speed = utils.rp([20, 30]),
  fricition = 1;
const ball = new Ball({
  x: 100,
  y: 100,
  r: 10,
  fillStyle: utils.getRgb(),
}).render(ctx);

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  speed = speed > fricition ? speed - fricition : 0;
  let vx = Math.cos(angle) * speed;
  let vy = Math.sin(angle) * speed;
  console.log(vx);
  ball.x += vx;
  ball.y += vy;
  ball.render(ctx);
})();
