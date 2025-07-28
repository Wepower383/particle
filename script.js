
let canvas = document.getElementById("board");
let ctx = canvas.getContext("2d");
let components = [];
let selected = null;
let offsetX, offsetY;

canvas.addEventListener("mousedown", function(e) {
  const mouseX = e.offsetX;
  const mouseY = e.offsetY;
  selected = null;
  for (let i = components.length - 1; i >= 0; i--) {
    let c = components[i];
    if (mouseX >= c.x && mouseX <= c.x + 80 && mouseY >= c.y && mouseY <= c.y + 30) {
      selected = c;
      offsetX = mouseX - c.x;
      offsetY = mouseY - c.y;
      break;
    }
  }
});

canvas.addEventListener("mousemove", function(e) {
  if (selected) {
    selected.x = e.offsetX - offsetX;
    selected.y = e.offsetY - offsetY;
    draw();
  }
});

canvas.addEventListener("mouseup", function() {
  selected = null;
});

function addComponent(type) {
  components.push({ type: type, x: 50, y: 50, label: type.toUpperCase() });
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  components.forEach(c => {
    ctx.fillStyle = "#222";
    ctx.fillRect(c.x, c.y, 80, 30);
    ctx.fillStyle = "#fff";
    ctx.fillText(c.label, c.x + 5, c.y + 20);
  });
}
