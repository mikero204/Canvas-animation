const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 30;
let balls = [];
let bounce = -1;

for (var i = 0; i < 2; i++) {
  let ball = new Ball({
    x: utils.rp([r, W - r]),
    y: utils.rp([r, H - r]),
    r: r,
    vx: utils.rp([-3, 3]),
    vy: utils.rp([-3, 3]),
    m: 3,
    fillStyle: utils.getRgb(),
  });
  balls.push(ball);
}

function checkcollision(b1, b2) {
  let dx = b2.x - b1.x;
  let dy = b2.y - b1.y;
  let dist = Math.sqrt(dx ** 2 + dy ** 2);
  if (dist < b1.r + b2.r) {
    let angle = Math.atan2(dy, dx);
    let sin = Math.sin(angle);
    let cos = Math.cos(angle);
    let x1 = 0;
    let y1 = 0;
    let x2 = dx * cos + dy * sin;
    let y2 = dy * cos - dx * sin;

    let vx1 = b1.vx * cos + b1.cy * sin;
    let vy1 = b1.vy * cos - b1.vx * sin;
    let vx2 = b2.vx * cos + b2.cy * sin;
    let vy2 = b2.vy * cos - b2.vx * sin;

    let vx1Final = ((b1.m - b2.m) * vx1 + 2 * b2.m * vx2) / (b1.m + b2.m);
    let vx2Final = ((b2.m - b1.m) * vx2 + 2 * b1.m * vx1) / (b1.m + b2.m);

    let lep = b1.r + b2.r - Math.abs(x2 - x1);

    x1 = x1 + (vx1Final < 0 ? -lep / 2 : lep / 2);
    x2 = x2 + (vx2Final < 0 ? -lep / 2 : lep / 2);

    b2.x = b1.x + (x2 * cos - y2 * sin);
    b2.y = b1.y + (y2 * cos + x2 * sin);
    b1.x = b1.x + (x1 * cos - y1 * sin);
    b1.y = b1.y + (y1 * cos + x1 * sin);

    b1.vx = vx1Final * cos - vy1 * sin;
    b1.vy = vy1 * cos + vx1Final * sin;
    b2.vx = vx2Final * cos - vy2 * sin;
    b2.vy = vy2 * cos + vx2Final * sin;
  }
}

function moveball() {
  balls.forEach((ball, i) => {
    ball.x += ball.vx;
    ball.y += ball.vy;
    utils.checkBallBounce(ball, W, H, bounce);
    let tmp_balls = balls.slice();
    tmp_balls.splice(i, 1);
    tmp_balls.forEach((tmpball, ti) => {
      checkcollision(ball, tmpball);
    });
  });
}

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  moveball();

  balls.forEach((item) => {
    item.render(ctx);
  });
}

drawFrame();
