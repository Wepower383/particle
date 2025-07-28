let workspace = document.getElementById('workspace');
let output = document.getElementById('output');
let voltage = 0;
let resistance = 0;

function addComponent(type) {
  const comp = document.createElement('div');
  comp.classList.add('component');
  comp.style.left = '100px';
  comp.style.top = '100px';

  if (type === 'battery') {
    comp.innerHTML = 'Battery<br>V: <input type="number" value="5" onchange="updateVoltage(this.value)">';
  } else if (type === 'resistor') {
    comp.innerHTML = 'Resistor<br>Ω: <input type="number" value="10" onchange="updateResistance(this.value)">';
  }

  makeDraggable(comp);
  workspace.appendChild(comp);
  calculateCurrent();
}

function updateVoltage(val) {
  voltage = parseFloat(val);
  calculateCurrent();
}

function updateResistance(val) {
  resistance = parseFloat(val);
  calculateCurrent();
}

function calculateCurrent() {
  if (voltage > 0 && resistance > 0) {
    let current = voltage / resistance;
    output.innerText = `Current: ${current.toFixed(2)} A`;
  } else {
    output.innerText = `Set both voltage and resistance to calculate current.`;
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
