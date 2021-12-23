const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 1200);
let H = (canvas.height = 800);

let spring = 0.03;
let mouse = utils.getOffset(canvas);
let ball1_draging = false;
let ball2_draging = false;
let ball3_draging = false;
let springLength = 200;
let friction = 0.9;
let balls = [];
let draggedBall = null;

for (let i = 0; i < 8; i++) {
  balls.push(
    new Ball({
      x: utils.rp([50, W - 50]),
      y: utils.rp([50, H - 50]),
      r: 20,
    })
  );
}

canvas.addEventListener("mousedown", function (e) {
  for (let itemBall of balls) {
    if (itemBall.isPoint(mouse)) {
      itemBall.dragged = true;
      draggedBall = itemBall;
    }
  }
});

canvas.addEventListener("mousemove", function (e) {
  if (draggedBall) {
    draggedBall.x = mouse.x;
    draggedBall.y = mouse.y;
  }
});

canvas.addEventListener("mouseup", function (e) {
  draggedBall.dragged = false;
  draggedBall = null;
});

function springTo(b1, b2) {
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

(function drawFrame() {
  window.requestAnimationFrame(drawFrame);

  ctx.clearRect(0, 0, W, H);

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgb(82, 241, 170)";
  for (let itemBall of balls) {
    ctx.lineTo(itemBall.x, itemBall.y);
  }
  ctx.closePath();
  ctx.stroke();

  balls.forEach(function (item, i) {
    if (!item.dragged) {
      let arrTemp = balls.slice();
      arrTemp.splice(i, 1);
      for (let itemBall of arrTemp) {
        springTo(item, itemBall);
      }
    }
    item.render(ctx);
  });
})();
