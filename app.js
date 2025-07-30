let wireStart = null;
let wires = [];

document.querySelectorAll('.component').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
  });
});

const canvas = document.getElementById('canvas');
const messageBox = document.getElementById('messageBox');

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('text/plain');
  const comp = document.createElement('div');
  comp.classList.add('component-instance');
  comp.dataset.type = type;
  comp.textContent = type.toUpperCase();
  const x = e.clientX - canvas.getBoundingClientRect().left;
  const y = e.clientY - canvas.getBoundingClientRect().top;
  comp.style.left = `${x}px`;
  comp.style.top = `${y}px`;

  if (['battery', 'resistor', 'solar'].includes(type)) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = type === 'resistor' ? '100' : type === 'solar' ? '5' : '9';
    input.title = type === 'resistor' ? 'Ohms' : 'Volts';
    comp.appendChild(input);
  }

  comp.addEventListener('click', () => handleWireConnect(comp));
  enableDragging(comp);
  canvas.appendChild(comp);
});

function enableDragging(el) {
  let offsetX, offsetY;
  el.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    function moveAt(moveEvent) {
      el.style.left = `${moveEvent.clientX - canvas.getBoundingClientRect().left - offsetX}px`;
      el.style.top = `${moveEvent.clientY - canvas.getBoundingClientRect().top - offsetY}px`;
    }
    function stopMove() {
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mouseup', stopMove);
    }
    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', stopMove);
  });
}

function handleWireConnect(comp) {
  if (!wireStart) {
    wireStart = comp;
    comp.style.borderColor = 'blue';
  } else {
    if (wireStart === comp) {
      wireStart.style.borderColor = '#aaa';
      wireStart = null;
      return;
    }
    createWire(wireStart, comp);
    wireStart.style.borderColor = '#aaa';
    wireStart = null;
  }
}

function createWire(from, to) {
  const wire = document.createElement('div');
  wire.classList.add('wire');
  const fx = from.offsetLeft + from.offsetWidth / 2;
  const fy = from.offsetTop + from.offsetHeight / 2;
  const tx = to.offsetLeft + to.offsetWidth / 2;
  const ty = to.offsetTop + to.offsetHeight / 2;
  const length = Math.hypot(tx - fx, ty - fy);
  const angle = Math.atan2(ty - fy, tx - fx) * 180 / Math.PI;
  wire.style.width = `${length}px`;
  wire.style.left = `${fx}px`;
  wire.style.top = `${fy}px`;
  wire.style.transform = `rotate(${angle}deg)`;
  canvas.appendChild(wire);
  wires.push({ from, to, wire });
}
