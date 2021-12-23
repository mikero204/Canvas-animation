const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let dx = 0;
let dy = 0;
let targetX = W / 2;
let targetY = H / 2;
let easing = 0.05;
let ismousemove = false;
const ball = new Ball({
  x: W / 2,
  y: H / 2,
  r: 30,
}).render(ctx);

let mouse = utils.getOffset(canvas);

canvas.addEventListener("mousedown", function (e) {
  if (ball.isPoint(mouse)) {
    dx = mouse.x - ball.x;
    dy = mouse.y - ball.y;
    canvas.addEventListener("mousemove", mousemove);
    canvas.addEventListener("mouseup", mouseup);
  }
});

function mousemove() {
  ismousemove = true;
  ball.x = mouse.x - dx;
  ball.y = mouse.y - dy;
}

function mouseup() {
  ismousemove = false;
  canvas.removeEventListener("mousemove", mousemove);
  canvas.removeEventListener("mouseup", mouseup);
}

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  if (!ismousemove) {
    vx = (targetX - ball.x) * easing;
    vy = (targetY - ball.y) * easing;
    ball.x += vx;
    ball.y += vy;
  }
  ball.render(ctx);
}

drawFrame();
