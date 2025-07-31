
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
