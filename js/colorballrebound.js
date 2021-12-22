const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 10;
let count = 10;

let balllist = [];
for (var i = 0; i < count; i++) {
  balllist.push(
    new Ball({
      x: W / 2,
      y: H / 2,
      r: utils.rp([10, 40]),
      fillStyle: utils.getRgb(),
      vx: utils.rp([-5, 5]),
      vy: utils.rp([-5, 5]),
      id: `ball:` + i,
    })
  );
}
function ballMove(ball) {
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.x + ball.r >= W) {
    ball.x = W - ball.r;
    ball.vx *= -1;
  }
  if (ball.x - ball.r <= 0) {
    ball.x = ball.r;
    ball.vx *= -1;
  }
  if (ball.y + ball.r >= H) {
    ball.y = H - ball.r;
    ball.vy *= -1;
  }
  if (ball.y - ball.r <= 0) {
    ball.y = ball.r;
    ball.vy *= -1;
  }

  ball.render(ctx);
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  balllist.forEach(ballMove);
})();
