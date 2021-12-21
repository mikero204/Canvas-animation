const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 10;
let count = 50;
let balllist = [];
let colorlist = ["red", "green", "blue", "pink"];

for (let i = 0; i < count; i++) {
  let ball_x = utils.getRandom(60, W - r);
  let ball_y = utils.getRandom(0, H - r);
  const ball = new Ball({
    x: ball_x,
    y: ball_y,
    r: r,
    fillStyle: colorlist[utils.getRandom(0, 4)],
    g: 0.2,
    vy: 0,
  });
  balllist.push(ball);
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i < balllist.length; i++) {
    balllist[i].y += balllist[i].vy;
    balllist[i].vy += balllist[i].g;
    if (balllist[i].y + balllist[i].r > H) {
      balllist[i].y = H - balllist[i].r;
      balllist[i].vy *= -0.8;
      if (Math.abs(balllist[i].vy) < 2) {
        balllist[i].vy = 0;
      }
    }
    balllist[i].render(ctx);
  }
})();
