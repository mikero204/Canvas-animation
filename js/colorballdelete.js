const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let r = 10;
let count = 10;

let balllist = [];
for (var i = 0; i < count; i++) {
  balllist.push(
    new Ball({
      x: utils.getRandom(r * 2, W - r),
      y: utils.getRandom(r * 2, H - r),
      r: r,
      fillStyle: utils.getRgb(),
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      id: `ball:` + i,
    })
  );
}
console.log(balllist);
function moveBall(ball, index) {
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (
    ball.x - ball.r >= W ||
    ball.x + ball.r <= 0 ||
    ball.y - ball.r >= H ||
    ball.y + ball.r <= 0
  ) {
    balllist.splice(index, 1);
    if (balllist.length === 0) {
      console.log(`${ball.id}已經被刪除`);
      console.log("所有小球被刪除");
    } else {
      console.log(`${ball.id}已經被刪除`);
    }
  }
  ball.render(ctx);
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  for (var i = 0; i < balllist.length; i++) {
    moveBall(balllist[i], i);
  }
})();
