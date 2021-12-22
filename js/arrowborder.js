const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let vx = 0;
let vy = 0;
let vr = 0;
let w = 46;
let h = 20;
let a = 0;

const arrow = new Arrow({
  x: W / 2,
  y: H / 2,
  w,
  h,
}).render(ctx);

window.addEventListener("keydown", function (e) {
  switch (e.keyCode) {
    case 37:
      vr = -5;
      break;
    case 39:
      vr = 5;
      break;
    case 38:
      a = 0.1;
      break;
    case 40:
      a = -0.1;
      break;
  }
});
window.addEventListener("keyup", function (e) {
  vr = 0;
  a = 0;
});

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  arrow.rotation += utils.toRad(vr);
  let angle = arrow.rotation;
  let ax = Math.cos(angle) * a;
  let ay = Math.sin(angle) * a;
  console.log(ax, ay);
  vx += ax;
  vy += ay;
  arrow.x += vx;
  arrow.y += vy;

  if (arrow.x - arrow.w / 2 >= W) {
    arrow.x = 0 - arrow.w / 2;
  } else if (arrow.x + arrow.w / 2 <= 0) {
    arrow.x = W + arrow.w / 2;
  } else if (arrow.y - arrow.h / 2 >= H) {
    arrow.y = 0 - arrow.h / 2;
  } else if (arrow.y + arrow.h / 2 <= 0) {
    arrow.y = H + arrow.h / 2;
  }

  arrow.render(ctx);
})();
