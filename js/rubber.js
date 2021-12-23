const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let spring = 0.02;
let friction = 0.95;
let g = 2.5;
const ball = new Ball({
  x: 30,
  y: H / 2,
  r: 30,
}).render(ctx);

let mouse = utils.getOffset(canvas);

function drawFrame() {
  window.requestAnimationFrame(drawFrame);

  ctx.clearRect(0, 0, W, H);
  let ax = (mouse.x - ball.x) * spring;
  let ay = (mouse.y - ball.y) * spring;
  ball.vx += ax;
  ball.vy += ay;
  ball.vy += g;
  ball.vx *= friction;
  ball.vy *= friction;
  ball.x += ball.vx;
  ball.y += ball.vy;
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgb(238,58,166)";
  ctx.lineTo(mouse.x, mouse.y);
  ctx.lineTo(ball.x, ball.y);
  ctx.stroke();
  ball.render(ctx);
}

drawFrame();
