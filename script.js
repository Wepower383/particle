
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');
let components = [];

function addComponent(type) {
  components.push({ type, x: 100 + Math.random() * 800, y: 100 + Math.random() * 400 });
  drawComponents();
}

function drawComponents() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  components.forEach((comp, index) => {
    ctx.fillStyle = comp.type === 'Battery' ? 'red' : 'black';
    ctx.fillRect(comp.x, comp.y, 80, 30);
    ctx.fillStyle = 'white';
    ctx.fillText(`${comp.type}`, comp.x + 5, comp.y + 20);
  });
}

function clearWires() {
  console.log("Wires cleared (visual placeholder)");
}
