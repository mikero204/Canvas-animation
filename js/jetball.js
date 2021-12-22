const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);

let balls = [];
let g = 0.05;
let count = 50;

for (var i = 0; i < count; i++) {
  balls.push(
    new Ball({
      x: W / 2,
      y: H,
      r: Math.random() > 0.9 ? utils.rp([25, 40]) : utils.rp([10, 20]),
      fillStyle: utils.getRgb(),
      vx: utils.rp([-5, 5]),
      vy: utils.rp([-5, -10]),
    })
  );
}

function drawBall(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball.xy += g;
  if (
    ball.x - ball.r >= W ||
    ball.x + ball.r <= 0 ||
    ball.y - ball.r >= H ||
    ball.y + ball.r <= 0
  ) {
    ball.x = W / 2;
    ball.y = H;
    ball.vx = utils.rp([-5, 5]);
    ball.vy = utils.rp([-5, -10]);
  }

  ball.render(ctx);
}
(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  balls.forEach((v, i) => {
    drawBall(v);
  });
})();
