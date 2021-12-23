const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let spring = 0.02;
let targetX = W / 2;
let friction = 0.99;
const ball = new Ball({
  x: 30,
  y: H / 2,
  r: 30,
}).render(ctx);

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  let ax = (targetX - ball.x) * spring;
  ball.vx += ax;
  ball.vx *= friction;
  ball.x += ball.vx;
  ball.render(ctx);
}

drawFrame();
