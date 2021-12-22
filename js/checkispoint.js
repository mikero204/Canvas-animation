const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let W = (canvas.width = 800);
let H = (canvas.height = 600);

let ball = new Ball({
  x: W / 2,
  y: H / 2,
  r: 50,
}).render(ctx);

let mouse = utils.getOffset(canvas);

canvas.addEventListener("click", function (e) {
  if (ball.isPoint(mouse)) {
    console.log("你點到了");
  }
});
