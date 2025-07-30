let wireStart = null;
let wires = [];
let components = [];

document.querySelectorAll('.component').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
  });
});

const canvas = document.getElementById('canvas');
const meterBox = document.getElementById('meterBox');

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('text/plain');
  const comp = document.createElement('div');
  comp.classList.add('component-instance');
  comp.dataset.type = type;
  comp.textContent = itemVisual(type);
  const x = e.clientX - canvas.getBoundingClientRect().left;
  const y = e.clientY - canvas.getBoundingClientRect().top;
  comp.style.left = `${x}px`;
  comp.style.top = `${y}px`;
  comp.dataset.value = defaultValue(type);
  comp.dataset.state = type === 'switch' ? 'off' : 'on';
  if (type === 'led') comp.classList.add('led-off');

  comp.addEventListener('click', () => {
    if (type === 'switch') {
      comp.dataset.state = comp.dataset.state === 'on' ? 'off' : 'on';
      updateCircuit();
    } else {
      handleWireConnect(comp);
    }
  });

  enableDragging(comp);
  canvas.appendChild(comp);
  components.push(comp);
  updateCircuit();
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
  wire.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    wire.remove();
    wires = wires.filter(w => w.wire !== wire);
    updateCircuit();
  });
  canvas.appendChild(wire);
  wires.push({ from, to, wire });
  updateCircuit();
}

function updateCircuit() {
  let voltage = 0, resistance = 0, current = 0, power = 0;
  const battery = components.find(c => c.dataset.type === 'battery');
  const resistor = components.find(c => c.dataset.type === 'resistor');
  const led = components.find(c => c.dataset.type === 'led');
  const sw = components.find(c => c.dataset.type === 'switch');

  if (battery && resistor && led && sw && sw.dataset.state === 'on') {
    voltage = parseFloat(battery.dataset.value || 0);
    resistance = parseFloat(resistor.dataset.value || 1);
    current = voltage / resistance;
    power = voltage * current;
    led.classList.add('led-on');
  } else if (led) {
    led.classList.remove('led-on');
  }

  meterBox.textContent = `Voltage: ${voltage.toFixed(2)}V | Resistance: ${resistance.toFixed(2)}Ω | Current: ${current.toFixed(2)}A | Power: ${power.toFixed(2)}W`;
}

function defaultValue(type) {
  if (type === 'battery') return 9;
  if (type === 'resistor') return 100;
  return 0;
}

function itemVisual(type) {
  if (type === 'battery') return '+‖‖-';
  if (type === 'resistor') return '/\/\';
  if (type === 'led') return '→|';
  if (type === 'switch') return '⎯⎯⎯/⎯';
  return type.toUpperCase();
}
