const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);

let boxs = [];
let g = 0.02;
let activeBox = createBox();

function createBox() {
  const box = new Box({
    x: utils.rp([0, W - 100]),
    w: utils.rp([20, 55]),
    h: utils.rp([20, 55]),
    fillStyle: utils.getRgb(),
  });
  boxs.push(box);
  return box;
}

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 37:
      activeBox.x += -5;
      break;
    case 39:
      activeBox.x += 5;
      break;
    case 40:
      g = 0.2;
      break;
  }
});
document.addEventListener("keyup", function (e) {
  e.preventDefault();
  g = 0.02;
});

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  activeBox.vy += g;
  activeBox.y += activeBox.vy;

  if (activeBox.y + activeBox.h >= H) {
    activeBox.y = H - activeBox.h;
    activeBox = createBox();
  }
  boxs.forEach((item) => {
    if (activeBox !== item && utils.rectDuang(activeBox, item)) {
      activeBox.y = item.y - activeBox.h;
      activeBox = createBox();
    }
    item.render(ctx);
  });
}
drawFrame();
