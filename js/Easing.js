const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let easing = 0.05;
let targetX = W / 2;
let targetY = H / 2;

const ball = new Ball({
  x: 80,
  y: 80,
  r: 40,
}).render(ctx);
(function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  let dx = targetX - ball.x;
  let dy = targetY - ball.y;

  let vx = dx * easing;
  let vy = dy * easing;
  ball.x += vx;
  ball.y += vy;
  ball.render(ctx);
})();
