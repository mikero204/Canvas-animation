const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 10;
let balls = [];
let count = 300;
let bounce = -0.5;
for (let i = 0; i < count; i++) {
  let ball = new Ball({
    x: utils.rp([r, W - r]),
    y: utils.rp([r, H - r]),
    vx: utils.rp([-10, 10]),
    vy: utils.rp([-10, 10]),
    r: r,
    fillStyle: utils.getRgb(),
  });
  balls.push(ball);
}

function moveball(ball, i) {
  utils.checkBallBounce(ball, W, H, bounce);
  ball.x += ball.vx;
  ball.y += ball.vy;
}
function renderball(ball, i) {
  ball.render(ctx);
}
function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  balls.forEach(moveball);
  balls.forEach(renderball);
}
drawFrame();
