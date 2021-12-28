const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);

let ball1 = new Ball({
  x: 30,
  y: H / 2,
  r: 30,
  m: 10,
  vx: 3,
  fillStyle: utils.getRgb(),
});
let ball2 = new Ball({
  x: W - 15,
  y: H / 2,
  r: 15,
  m: 2,
  vx: -3,
  fillStyle: utils.getRgb(),
});

function drawLine() {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";
  ctx.moveTo(0, H / 2);
  ctx.lineTo(W, H / 2);
  ctx.stroke();
  ctx.closePath();
}
function moveBall() {
  ball1.x += ball1.vx;
  ball2.x += ball2.vx;
}
function checkCollision(ball1, ball2) {
  let dist = Math.abs(ball1.x - ball2.x);
  if (dist < ball1.r + ball2.r) {
    let lep = ball1.r + ball2.r - dist;
    ball1.x = ball1.x - lep / 2;
    ball2.x = ball2.x + lep / 2;

    let v1Final =
      ((ball1.m - ball2.m) * ball1.vx + 2 * ball2.m * ball2.vx) /
      (ball1.m + ball2.m);
    let v2Final =
      ((ball2.m - ball1.m) * ball2.vx + 2 * ball1.m * ball1.vx) /
      (ball1.m + ball2.m);

    ball1.vx = v1Final;
    ball2.vx = v2Final;
  }
}
function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);

  moveBall();
  checkCollision(ball1, ball2);
  drawLine();
  ball1.render(ctx);
  ball2.render(ctx);
}
drawFrame();
