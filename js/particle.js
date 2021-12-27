const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 10;
let balls = [];
let count = 300;
let bounce = -0.5;
let spring = 0.03;
let firstBallR = 100;
for (let i = 0; i < count; i++) {
  let ball = new Ball({
    x: utils.rp([r, W - r]),
    y: utils.rp([r, H - r]),
    vx: utils.rp([-10, 10]),
    vy: utils.rp([-10, 10]),
    r: !i ? firstBallR : r,
    fillStyle: utils.getRgb(),
  });
  balls.push(ball);
}
let mouse = utils.getOffset(canvas);

canvas.addEventListener("mousemove", function () {
  balls[0].x = mouse.x;
  balls[0].y = mouse.y;
});
canvas.addEventListener("click", function () {
  firstBallR = firstBallR < H / 2 ? firstBallR + 50 : 100;
  balls[0].r = firstBallR;
});

function checkHit(ballA, i) {
  for (var j = i + 1; j < count; j++) {
    const ballB = balls[j];
    const dx = ballB.x - ballA.x;
    const dy = ballB.y - ballA.y;
    const dist = utils.getDist(ballB.x, ballB.y, ballA.x, ballA.y);
    const minDist = ballA.r + ballB.r;
    if (dist < minDist) {
      const tx = ballA.x + (dx / dist) * minDist;
      const ty = ballA.y + (dy / dist) * minDist;
      const ax = (tx - ballB.x) * spring;
      const ay = (ty - ballB.y) * spring;
      ballA.vx -= ax;
      ballA.vy -= ay;
      ballB.vx += ax;
      ballB.vy += ax;
    }
  }
}

function moveball(ball, i) {
  if (!i) {
    return;
  }
  utils.checkBallBounce(ball, W, H, bounce);
  ball.x += ball.vx;
  ball.y += ball.vy;
}
function renderball(ball, i) {
  if (!i) {
    return;
  }
  ball.render(ctx);
}
function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  balls.forEach(checkHit);
  balls.forEach(moveball);
  balls.forEach(renderball);
}
drawFrame();
