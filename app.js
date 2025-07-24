let components = [];
let voltage = 0;
let resistance = 0;
let current = 0;

function addComponent(type) {
  let value = 0;
  if (type === "battery") value = prompt("Enter voltage (V):", 10);
  if (type === "resistor") value = prompt("Enter resistance (Ω):", 10);
  if (type === "coil") value = prompt("Enter turns of coil:", 20);
  if (type === "capacitor") value = prompt("Enter capacitance (uF):", 100);
  if (type === "diode") value = 0.7; // fixed forward drop for now
  if (!value && value !== 0) return;

  components.push({ type, value: parseFloat(value) });
  updateSimulator();
}

function updateSimulator() {
  const ctx = document.getElementById("simulatorCanvas").getContext("2d");
  ctx.clearRect(0, 0, 800, 100);

  voltage = 0;
  resistance = 0;
  current = 0;

  components.forEach((comp, i) => {
    ctx.fillStyle = comp.type === "battery" ? "lime" :
                    comp.type === "resistor" ? "red" :
                    comp.type === "coil" ? "orange" :
                    comp.type === "capacitor" ? "cyan" :
                    comp.type === "diode" ? "purple" : "white";
    ctx.fillRect(i * 80 + 10, 30, 60, 40);

    if (comp.type === "battery") voltage += comp.value;
    if (comp.type === "resistor") resistance += comp.value;
    if (comp.type === "diode") voltage -= comp.value; // forward drop
  });

  current = resistance > 0 ? voltage / resistance : 0;
  document.getElementById("voltageDisplay").innerText = `Voltage: ${voltage} V`;
  document.getElementById("resistanceDisplay").innerText = `Resistance: ${resistance} Ω`;
  document.getElementById("currentDisplay").innerText = `Current: ${current.toFixed(2)} A`;

  drawOscilloscope(current);
}

function drawOscilloscope(current) {
  const ctx = document.getElementById("oscilloscopeCanvas").getContext("2d");
  ctx.clearRect(0, 0, 800, 100);

  ctx.beginPath();
  ctx.moveTo(0, 50);
  for (let x = 0; x < 800; x++) {
    let y = 50 + Math.sin((x + Date.now() / 10) / 20) * 20 * current;
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = "#0f0";
  ctx.stroke();
}

function resetSimulator() {
  components = [];
  updateSimulator();
}

setInterval(() => {
  drawOscilloscope(current);
}, 100);

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  const controlsDiv = document.getElementById("controls");
  controlsDiv.innerHTML = `
    <button onclick="addComponent('battery')">Add Battery</button>
    <button onclick="addComponent('resistor')">Add Resistor</button>
    <button onclick="addComponent('coil')">Add Coil</button>
    <button onclick="addComponent('capacitor')">Add Capacitor</button>
    <button onclick="addComponent('diode')">Add Diode</button>
    <button onclick="resetSimulator()">Reset</button>
  `;
  updateSimulator();
});
