let workspace = document.getElementById('workspace');
let output = document.getElementById('output');
let voltage = 0;
let resistors = [];

function addComponent(type) {
  const comp = document.createElement('div');
  comp.classList.add('component');
  comp.style.left = '100px';
  comp.style.top = '100px';

  if (type === 'battery') {
    comp.innerHTML = 'Battery<br>V: <input type="number" value="5" onchange="updateVoltage(this.value)">';
  } else if (type === 'resistor') {
    const resistorId = Date.now(); // unique ID
    comp.setAttribute("data-id", resistorId);
    comp.innerHTML = 'Resistor<br>Ω: <input type="number" value="10" onchange="updateResistance(this.value, ' + resistorId + ')">';
    resistors.push({ id: resistorId, resistance: 10 });
  }

  makeDraggable(comp);
  workspace.appendChild(comp);
  calculateCurrent();
}

function updateVoltage(val) {
  voltage = parseFloat(val);
  calculateCurrent();
}

function updateResistance(val, id) {
  const resistor = resistors.find(r => r.id === id);
  if (resistor) {
    resistor.resistance = parseFloat(val);
  }
  calculateCurrent();
}

function calculateCurrent() {
  let totalResistance = resistors.reduce((sum, r) => sum + r.resistance, 0);
  if (voltage > 0 && totalResistance > 0) {
    let current = voltage / totalResistance;
    output.innerText = `Total Resistance: ${totalResistance.toFixed(2)} Ω
Current: ${current.toFixed(2)} A`;
  } else {
    output.innerText = `Add a battery and one or more resistors to calculate current.`;
  }
}

function makeDraggable(el) {
  let offsetX, offsetY;
  el.onmousedown = function(e) {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.onmousemove = function(e) {
      el.style.left = (e.clientX - offsetX) + 'px';
      el.style.top = (e.clientY - offsetY) + 'px';
    };
    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
