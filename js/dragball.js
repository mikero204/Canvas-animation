const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);
let dx = 0;
let dy = 0;
let ball = new Ball({
  x: W / 2,
  y: H / 2,
  r: 50,
}).render(ctx);

let mouse = utils.getOffset(canvas);

canvas.addEventListener("mousedown", function (e) {
  e.preventDefault();
  if (ball.isPoint(mouse)) {
    dx = mouse.x - ball.x;
    dy = mouse.y - ball.y;
    canvas.addEventListener("mousemove", movecallback);
    canvas.addEventListener("mouseup", upcallback);
  }
});

function movecallback(e) {
  ball.x = mouse.x - dx;
  ball.y = mouse.y - dy;
}
function upcallback(e) {
  canvas.removeEventListener("mousemove", movecallback);
  canvas.removeEventListener("mouseup", upcallback);
}

(function move() {
  window.requestAnimationFrame(move);
  ctx.clearRect(0, 0, W, H);
  ball.render(ctx);
})();
