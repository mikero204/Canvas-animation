const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 30;
let ball1 = new Ball({
  x: utils.rp([r, W - r]),
  y: utils.rp([r, H - r]),
  r: 30,
  fillStyle: utils.getRgb(),
}).render(ctx);

let ball2 = new Ball({
  x: utils.rp([r, W - r]),
  y: utils.rp([r, H - r]),
  r: 30,
  fillStyle: utils.getRgb(),
}).render(ctx);

let pos = utils.getOffset(canvas);

canvas.addEventListener("mousedown", function () {
  if (ball1.isPoint(pos)) {
    ball1.drag = true;
  }
  if (ball2.isPoint(pos)) {
    ball2.drag = true;
  }
});

canvas.addEventListener("mousemove", function () {
  if (ball1.drag) {
    ball1.x = pos.x;
    ball1.y = pos.y;
  }
  if (ball2.drag) {
    ball2.x = pos.x;
    ball2.y = pos.y;
  }
});

canvas.addEventListener("mouseup", function () {
  ball1.drag = false;
  ball2.drag = false;
});
function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  if (utils.getDist(ball1.x, ball1.y, ball2.x, ball2.y) <= ball1.r + ball2.r) {
    console.log("撞上了");
  }

  ball1.render(ctx);
  ball2.render(ctx);
}

drawFrame();
