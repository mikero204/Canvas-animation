const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let W = (canvas.width = 800);
let H = (canvas.height = 600);
let R = 30;
let mouse = utils.getOffset(canvas);
let g = 0.1,
  bounce = -0.8;
let lines = [];
const line = new Line({
  x: 100,
  y: 200,
  x1: 0,
  y1: 0,
  x2: 300,
  y2: 0,
  lineWidth: 6,
  strokeStyle: "rgb(90,230,104)",
  rotation: utils.toRad(10),
});
const line1 = new Line({
  x: 500,
  y: 400,
  x1: 0,
  y1: 0,
  x2: 200,
  y2: 0,
  lineWidth: 6,
  strokeStyle: "rgb(90,230,104)",
  rotation: utils.toRad(-10),
});
lines.push(line);
lines.push(line1);
let ball = new Ball({
  x: 150,
  y: R,
  r: R,
  fillStyle: utils.getRgb(),
});
let ball1 = new Ball({
  x: 200,
  y: R,
  r: R,
  fillStyle: utils.getRgb(),
});
function checkBallMove(ball) {
  lines.forEach((line, i) => {
    let cos = Math.cos(line.rotation);
    let sin = Math.sin(line.rotation);
    let rx = ball.x - line.x;
    let ry = ball.y - line.y;
    let x1 = rx * cos + ry * sin;
    let y1 = ry * cos - rx * sin;
    let vx1 = ball.vx * cos + ball.vy * sin;
    let vy1 = ball.vy * cos - ball.vx * sin;
    if (x1 + ball.r > line.x1 && x1 - ball.r < line.x2) {
      if (y1 + ball.r > 0 && vy1 > y1) {
        y1 = -ball.r;
        vy1 *= bounce;
      }
      if (y1 + ball.r < 0 && vy1 < y1) {
        y1 = ball.r;
        vy1 *= bounce;
      }
    }

    rx = x1 * cos - y1 * sin;
    ry = y1 * cos + x1 * sin;
    ball.vx = vx1 * cos - vy1 * sin;
    ball.vy = vy1 * cos + vx1 * sin;
    ball.x = line.x + rx;
    ball.y = line.y + ry;
  });
}
// function checkBallMove(ball) {
//   let sin = Math.sin(line.rotation),
//     cos = Math.cos(line.rotation);
//   let rx = ball.x - line.x;
//   let ry = ball.y - line.y;
//   let x1 = rx * cos + ry * sin;
//   let y1 = ry * cos - rx * sin;

//   let vx1 = ball.vx * cos + ball.vy * sin;
//   let vy1 = ball.vy * cos - ball.vx * sin;

//   if (x1 + ball.r > line.x1 && x1 - ball.r < line.x2) {
//     if (y1 + ball.r > 0 && vy1 > y1) {
//       y1 = -ball.r;
//       vy1 *= bounce;
//     }
//     if (y1 - ball.r < 0 && vy1 < y1) {
//       y1 = ball.r;
//       vy1 *= bounce;
//     }
//   }

//   rx = x1 * cos - y1 * sin;
//   ry = y1 * cos + x1 * sin;

//   ball.vx = vx1 * cos - vy1 * sin;
//   ball.vy = vy1 * cos + vx1 * sin;

//   ball.x = line.x + rx;
//   ball.y = line.y + ry;
// }

function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);

  //增加重力
  ball.vy += g;
  ball.x += ball.vx;
  ball.y += ball.vy;
  ball1.vy += g;
  ball1.x += ball1.vx;
  ball1.y += ball1.vy;
  //處理斜面反彈
  checkBallMove(ball);
  checkBallMove(ball1);

  //處理畫面邊界
  utils.checkBallBounce(ball, W, H, bounce);
  utils.checkBallBounce(ball1, W, H, bounce);

  line.render(ctx);
  line1.render(ctx);
  ball.render(ctx);
  ball1.render(ctx);
}
drawFrame();
