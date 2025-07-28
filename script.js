
let canvas = document.getElementById('circuitCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
let ctx = canvas.getContext('2d');

let components = [];
let wires = [];
let dragging = null;
let offsetX = 0, offsetY = 0;

function addComponent(type) {
  const component = {
    type,
    x: 100 + components.length * 60,
    y: 100,
    value: 0,
    id: Date.now() + Math.random()
  };
  components.push(component);
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  components.forEach(comp => {
    ctx.fillStyle = '#333';
    ctx.fillRect(comp.x, comp.y, 100, 30);
    ctx.fillStyle = 'white';
    ctx.fillText(`${comp.type} (${comp.value})`, comp.x + 5, comp.y + 20);
  });
  wires.forEach(w => {
    ctx.strokeStyle = w.color;
    ctx.beginPath();
    ctx.moveTo(w.x1, w.y1);
    ctx.lineTo(w.x2, w.y2);
    ctx.stroke();
  });
}

canvas.addEventListener('mousedown', (e) => {
  const mx = e.clientX, my = e.clientY;
  components.forEach(comp => {
    if (mx > comp.x && mx < comp.x + 100 && my > comp.y && my < comp.y + 30) {
      dragging = comp;
      offsetX = mx - comp.x;
      offsetY = my - comp.y;
    }
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (dragging) {
    dragging.x = e.clientX - offsetX;
    dragging.y = e.clientY - offsetY;
    draw();
  }
});

canvas.addEventListener('mouseup', () => {
  dragging = null;
});

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const mx = e.clientX, my = e.clientY;
  components = components.filter(comp => {
    if (mx > comp.x && mx < comp.x + 100 && my > comp.y && my < comp.y + 30) {
      return false;
    }
    return true;
  });
  draw();
});

function clearBoard() {
  components = [];
  wires = [];
  draw();
}

function saveJSON() {
  const data = JSON.stringify({ components, wires });
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'particle_circuit.json';
  a.click();
}

function loadJSON() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = JSON.parse(event.target.result);
      components = data.components || [];
      wires = data.wires || [];
      draw();
    };
    reader.readAsText(file);
  };
  input.click();
}
