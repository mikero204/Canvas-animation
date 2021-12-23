const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let ball1_drag = false;
let ball2_drag = false;
let springLength = 200;
let spring = 0.03;
let friction = 0.9;
const ball1 = new Ball({
  x: utils.rp([30, W - 30]),
  y: utils.rp([30, H - 30]),
  r: 30,
}).render(ctx);

const ball2 = new Ball({
  x: utils.rp([30, W - 30]),
  y: utils.rp([30, H - 30]),
  r: 30,
}).render(ctx);

let mouse = utils.getOffset(canvas);

canvas.addEventListener("mousedown", function () {
  if (ball1.isPoint(mouse)) {
    ball1_drag = true;
  }
  if (ball2.isPoint(mouse)) {
    ball2_drag = true;
  }
});
canvas.addEventListener("mousemove", function () {
  if (ball1_drag) {
    ball1.x = mouse.x;
    ball1.y = mouse.y;
  }
  if (ball2_drag) {
    ball2.x = mouse.x;
    ball2.y = mouse.y;
  }
});

canvas.addEventListener("mouseup", function () {
  ball1_drag = false;
  ball2_drag = false;
});

function sprintTo(b1, b2) {
  let dx = b2.x - b1.x;
  let dy = b2.y - b1.y;
  let angle = Math.atan2(dy, dx);
  let targetX = b2.x - springLength * Math.cos(angle);
  let targetY = b2.y - springLength * Math.sin(angle);
  b1.vx += (targetX - b1.x) * spring;
  b1.vy += (targetY - b1.y) * spring;
  b1.vx *= friction;
  b1.vy *= friction;
  b1.x += b1.vx;
  b1.y += b1.vy;
}

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  if (!ball1_drag) {
    sprintTo(ball1, ball2);
  }
  if (!ball2_drag) {
    sprintTo(ball2, ball1);
  }

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgb(235,61,202)";
  ctx.lineTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.stroke();
  ball1.render(ctx);
  ball2.render(ctx);
}

drawFrame();
