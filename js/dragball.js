const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let dx = 0;
let dy = 0;
let vx = utils.rp([-10, 10]);
let vy = 10;
let g = 0.2;
let bounce = -0.7;
let friction = -0.1;
let isMove = false;
let startX = 0;
let startY = 0;
let ball = new Ball({
  x: W / 2,
  y: H / 2,
  r: 50,
}).render(ctx);

let mouse = utils.getOffset(canvas);

canvas.addEventListener("mousedown", function (e) {
  e.preventDefault();
  if (ball.isPoint(mouse)) {
    dx = mouse.x - ball.x;
    dy = mouse.y - ball.y;
    startX = ball.x;
    startY = ball.y;
    canvas.addEventListener("mousemove", movecallback);
    canvas.addEventListener("mouseup", upcallback);
  }
});

function movecallback(e) {
  isMove = true;
  ball.x = mouse.x - dx;
  ball.y = mouse.y - dy;
}
function upcallback(e) {
  isMove = false;
  canvas.removeEventListener("mousemove", movecallback);
  canvas.removeEventListener("mouseup", upcallback);
}

function bounceMove() {
  vy += g;
  ball.x += vx;
  ball.y += vy;

  if (ball.y + ball.r >= H) {
    ball.y = H - ball.r;
    vy *= bounce;

    vx *= 0.99;
  }
  if (ball.y - ball.r <= 0) {
    ball.y = ball.r;
    vy *= bounce;
  }
  if (ball.x + ball.r >= W) {
    ball.x = W - ball.r;
    vx *= bounce;
  }

  if (ball.x - ball.r <= 0) {
    ball.x = ball.r;
    vx *= bounce;
  }
  if (Math.abs(vx) < 0.3) {
    vx = 0;
  }
}
function setSpeed() {
  vx = ball.x - startX;
  vy = ball.y - startY;
  startX = ball.x;
  startY = ball.y;
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  if (!isMove) {
    bounceMove();
  } else {
    setSpeed();
  }
  ball.render(ctx);
})();
