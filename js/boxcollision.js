const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let w = 50;
let h = 50;
let dx = 0;
let dy = 0;

let box1 = new Box({
  x: utils.rp([0, W - w]),
  y: utils.rp([0, H - h]),
  w: w,
  h: h,
  draged: false,
}).render(ctx);

let box2 = new Box({
  x: utils.rp([0, W - w]),
  y: utils.rp([0, H - h]),
  w: w,
  h: h,
  fillStyle: "red",
  draged: false,
}).render(ctx);

let pos = utils.getOffset(canvas);
canvas.addEventListener("mousedown", function () {
  if (box1.isPoint(pos)) {
    dx = pos.x - box1.x;
    dy = pos.y - box1.y;
    box1.draged = true;
  }
  if (box2.isPoint(pos)) {
    dx = pos.x - box2.x;
    dy = pos.y - box2.y;
    box2.draged = true;
  }
});
canvas.addEventListener("mousemove", function () {
  if (box1.draged) {
    box1.x = pos.x - dx;
    box1.y = pos.y - dy;
  }
  if (box2.draged) {
    box2.x = pos.x - dx;
    box2.y = pos.y - dy;
  }
});
canvas.addEventListener("mouseup", function () {
  box1.draged = false;
  box2.draged = false;
});

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  if (utils.rectDuang(box1, box2)) {
    console.log("已經碰撞");
  }
  box1.render(ctx);
  box2.render(ctx);
}

drawFrame();
