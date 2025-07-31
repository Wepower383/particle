
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let components = [];
let wires = [];
let isDrawing = false;
let startX, startY;

function addComponent(type) {
  const comp = document.createElement("div");
  comp.className = "component";
  comp.style.left = "300px";
  comp.style.top = "300px";
  comp.innerHTML = \`
    <strong>\${type}</strong>
    <input type='number' placeholder='Value' oninput='updateCalc()'/>
    <input type='text' placeholder='Unit'/>
  \`;
  comp.setAttribute("data-type", type);
  document.body.appendChild(comp);
  makeDraggable(comp);
  components.push(comp);
  updateCalc();
}

function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;

  el.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  window.addEventListener("mousemove", function(e) {
    if (isDragging) {
      el.style.left = e.pageX - offsetX + "px";
      el.style.top = e.pageY - offsetY + "px";
    }
  });

  window.addEventListener("mouseup", function() {
    isDragging = false;
  });
}

function drawMode() {
  canvas.addEventListener("mousedown", startLine);
  canvas.addEventListener("mouseup", endLine);
}

function startLine(e) {
  startX = e.offsetX;
  startY = e.offsetY;
  isDrawing = true;
}

function endLine(e) {
  if (isDrawing) {
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    wires.push({ x1: startX, y1: startY, x2: e.offsetX, y2: e.offsetY });
    isDrawing = false;
  }
}

function updateCalc() {
  let voltage = 0;
  let resistance = 0;
  components.forEach(comp => {
    const type = comp.getAttribute("data-type");
    const val = parseFloat(comp.querySelector("input").value);
    if (!isNaN(val)) {
      if (type === "resistor") resistance += val;
      if (type === "battery") voltage += val;
    }
  });
  const current = resistance ? voltage / resistance : 0;
  document.getElementById("voltage").textContent = voltage.toFixed(2);
  document.getElementById("current").textContent = current.toFixed(2);
  document.getElementById("resistance").textContent = resistance.toFixed(2);
}

function checkCircuit() {
  alert("Circuit check logic and LED lighting will be added in the next layer!");
}


// Add more components
function addComponent(type) {
  const comp = document.createElement("div");
  comp.className = "component";
  comp.style.left = "300px";
  comp.style.top = "300px";

  if (type === "switch") {
    comp.innerHTML = \`
      <strong>Switch</strong>
      <button onclick="this.innerText = this.innerText === 'OFF' ? 'ON' : 'OFF'; updateLED()">OFF</button>
    \`;
  } else if (type === "LED") {
    comp.innerHTML = \`
      <strong>LED</strong>
      <div id="led-indicator" style="width:20px; height:20px; background:#330000; margin-top:5px;"></div>
    \`;
  } else {
    comp.innerHTML = \`
      <strong>\${type}</strong>
      <input type='number' placeholder='Value' oninput='updateCalc()'/>
      <input type='text' placeholder='Unit'/>
    \`;
  }

  comp.setAttribute("data-type", type);
  document.body.appendChild(comp);
  makeDraggable(comp);
  components.push(comp);
  updateCalc();
}

function updateLED() {
  const switchComp = components.find(c => c.getAttribute("data-type") === "switch");
  const ledComp = components.find(c => c.getAttribute("data-type") === "LED");
  const battery = components.find(c => c.getAttribute("data-type") === "battery");
  const resistor = components.find(c => c.getAttribute("data-type") === "resistor");

  if (switchComp && ledComp && battery) {
    const switchState = switchComp.querySelector("button").innerText;
    const ledDiv = ledComp.querySelector("#led-indicator");
    const voltage = parseFloat(battery.querySelector("input")?.value || 0);
    const resistance = parseFloat(resistor?.querySelector("input")?.value || 100);
    const current = resistance ? voltage / resistance : 0;

    if (switchState === "ON" && current > 0.01) {
      ledDiv.style.background = "#00ff00";
    } else {
      ledDiv.style.background = "#330000";
    }
  }
}
