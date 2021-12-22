const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let angle = utils.toRad(30),
  fricition = 0.8;
const ball = new Ball({
  x: 100,
  y: H / 2,
  r: 10,
  fillStyle: utils.getRgb(),
  vx: utils.rp([10, 20]),
}).render(ctx);

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);

  if (Math.abs(ball.vx) > 0.001) {
    ball.vx *= fricition;
    ball.x += ball.vx;
  }

  ball.render(ctx);
})();
