const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let easing = 0.05;
const arrow = new Arrow({
  x: W / 2,
  y: H / 2,
  w: 60,
  h: 30,
}).render(ctx);
let mouse = utils.getOffset(canvas);
(function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  let dx = mouse.x - arrow.x;
  let dy = mouse.y - arrow.y;
  let angel = Math.atan2(dy, dx);
  arrow.rotation = angel;
  arrow.x += dx * easing;
  arrow.y += dy * easing;
  arrow.render(ctx);
})();
