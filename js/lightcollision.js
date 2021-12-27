const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let R = 30;
let g = 0.3;
let f = 0.98;
let easing = 0.03;
let mouse = utils.getOffset(canvas);
let moving = false;
let lastX, lastY;

let ball = new Ball({
  x: 50,
  y: 500,
  r: R,
  fillStyle: utils.getRgb(),
});
let box = new Box({
  x: 620,
  y: 480,
  w: 120,
  h: 70,
  fillStyle: utils.getRgb(),
});

canvas.addEventListener("click", function () {
  moving = true;
  ball.vx = (mouse.x - ball.x) * easing;
  ball.vy = (mouse.y - ball.y) * easing;
  lastX = ball.x;
  lastY = ball.y;
});

function checkHit() {
  const a1 = (ball.y - lastY) / (ball.x - lastX);
  const b1 = lastY - a1 * lastX;
  const a2 = 0;
  const b2 = ball.y;
  const cx = (b2 - b1) / (-a2 + a1);
  if (
    cx - ball.r / 2 > box.x &&
    cx + ball.r / 2 > box.x + box.w &&
    ball.y - ball.r > box.y
  ) {
    console.log("進去了");
    return true;
  }
}

// function checkHit() {
//   const k1 = (ball.y - lastY) / (ball.x - lastX);
//   const b1 = lastY - k1 * lastX;
//   const k2 = 0;
//   const b2 = box.y;
//   //k1*x+b1 = k2*x+b2
//   const cx = (b2 - b1) / (k1 - k2);
//   //const cy = k1 * cx + b1;
//   if (
//     cx - ball.r / 2 > box.x &&
//     cx + ball.r / 2 < box.x + box.w &&
//     ball.y - ball.r > box.y
//   ) {
//     console.log("進去了");
//     return true;
//   }
// }

function drawLine() {
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(251,78,104)";
  ctx.lineTo(mouse.x, mouse.y);
  ctx.save();
  let angle = (315 * Math.PI) / 180;
  let tx = Math.cos(angle) * R;
  let ty = Math.sin(angle) * R;
  ctx.translate(ball.x, ball.y);
  ctx.lineTo(tx, ty);
  ctx.stroke();
  ctx.restore();
  ctx.closePath();
}

function ballMove() {
  ball.vx *= f;
  ball.vy *= f;
  ball.vy += g;
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (
    checkHit() ||
    ball.x - ball.r > W ||
    ball.x + ball.r < 0 ||
    ball.y - ball.r > H ||
    ball.y + ball.r < 0
  ) {
    moving = false;
    ball.x = 50;
    ball.y = 500;
  }

  lastX = ball.x;
  lastY = ball.y;
}

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  ball.render(ctx);
  box.render(ctx);
  if (moving) {
    ballMove();
  } else {
    drawLine();
  }
}
drawFrame();
