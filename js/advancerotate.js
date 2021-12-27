const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let R = 25;
let mouse = utils.getOffset(canvas);
let count = 20;
let balls = [];
for (var i = 0; i < count; i++) {
  let ball = new Ball({
    x: utils.rp([50, W - 50]),
    y: utils.rp([50, H - 50]),
    r: R,
    fillStyle: utils.getRgb(),
  });
  balls.push(ball);
}

const cx = W / 2;
const cy = H / 2;
let vr = 0.05;

canvas.addEventListener("mousemove", function (e) {
  let dx = (W / 2 - mouse.x) / 200;

  vr = 0.05 * dx;
});

function moveball(ball, i) {
  let cos = Math.cos(vr);
  let sin = Math.sin(vr);
  const rx = ball.x - cx;
  const ry = ball.y - cy;
  const x = rx * cos - ry * sin;
  const y = ry * cos + rx * sin;
  ball.x = cx + x;
  ball.y = cy + y;
}

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);

  balls.forEach(moveball);

  balls.forEach((item, i) => {
    item.render(ctx);
  });
}
drawFrame();
