const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let balls = [];
let count = 8;
let r = 20;
let springLength = 200;
let spring = 0.03;
let friction = 0.9;
let dragball = null;
for (var i = 0; i < count; i++) {
  balls.push(
    new Ball({
      x: utils.rp([r, W - r]),
      y: utils.rp([r, H - r]),
      r: r,
      fillStyle: utils.getRgb(),
    })
  );
}
let mouse = utils.getOffset(canvas);
canvas.addEventListener("mousedown", function () {
  balls.forEach((ball, i) => {
    if (ball.isPoint(mouse)) {
      ball.dragged = true;
      dragball = ball;
    }
  });
});

canvas.addEventListener("mousemove", mouse_move);
canvas.addEventListener("mouseup", mouse_up);
function mouse_move() {
  if (dragball != null) {
    dragball.x = mouse.x;
    dragball.y = mouse.y;
  }
}
function mouse_up() {
  if (dragball != null) {
    dragball.dragged = false;
    dragball = null;
  }
}

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

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);

  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgb(82,241,170)";
  balls.forEach((item, i) => {
    ctx.lineTo(item.x, item.y);
  });
  ctx.closePath();
  ctx.stroke();
  balls.forEach((item, i) => {
    if (!item.dragged) {
      let tmp_arr = balls.slice();
      tmp_arr.splice(i, 1);
      for (let ball of tmp_arr) {
        springTo(item, ball);
      }
    }

    item.render(ctx);
  });
}

drawFrame();
