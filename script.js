
let canvas = document.getElementById('circuitCanvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 50;
let ctx = canvas.getContext('2d');
let components = [];
let isDragging = null;
let offsetX, offsetY;

function addComponent(type) {
  const component = {
    type,
    x: 100 + components.length * 60,
    y: 100,
    value: 0
  };
  components.push(component);
  drawComponents();
}

function drawComponents() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  components.forEach((comp, index) => {
    ctx.fillStyle = comp.type === 'battery' ? 'red' : 'black';
    ctx.fillRect(comp.x, comp.y, 100, 30);
    ctx.fillStyle = 'white';
    ctx.fillText(`${comp.type} V/Ω:`, comp.x + 5, comp.y + 20);

    const input = document.createElement('input');
    input.type = 'number';
    input.value = comp.value;
    input.onchange = (e) => {
      comp.value = parseFloat(e.target.value);
    };
    input.style.position = 'absolute';
    input.style.left = comp.x + 70 + 'px';
    input.style.top = comp.y + 2 + 'px';
    input.style.width = '30px';
    document.body.appendChild(input);

    comp._input = input;
  });
}

canvas.addEventListener('mousedown', (e) => {
  let mx = e.clientX, my = e.clientY;
  components.forEach(comp => {
    if (mx > comp.x && mx < comp.x + 100 && my > comp.y && my < comp.y + 30) {
      isDragging = comp;
      offsetX = mx - comp.x;
      offsetY = my - comp.y;
    }
  });
});

canvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    isDragging.x = e.clientX - offsetX;
    isDragging.y = e.clientY - offsetY;
    if (isDragging._input) {
      isDragging._input.style.left = isDragging.x + 70 + 'px';
      isDragging._input.style.top = isDragging.y + 2 + 'px';
    }
    drawComponents();
  }
});

canvas.addEventListener('mouseup', () => {
  isDragging = null;
});

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  let mx = e.clientX, my = e.clientY;
  for (let i = 0; i < components.length; i++) {
    const comp = components[i];
    if (mx > comp.x && mx < comp.x + 100 && my > comp.y && my < comp.y + 30) {
      if (comp._input) document.body.removeChild(comp._input);
      components.splice(i, 1);
      break;
    }
  }
  drawComponents();
});

function clearWires() {
  // placeholder for clearing wires
  alert("Wires cleared.");
}
