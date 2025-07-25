// Define global arrays
let components = [];

// Main canvas and context
const canvas = document.getElementById("simulatorCanvas");
const ctx = canvas.getContext("2d");

// Voltage, Resistance, Current tracking
let voltage = 0;
let resistance = 0;
let current = 0;

// Function to add a component
function addComponent(type) {
  const x = 100 + components.length * 80;
  const y = 250;

  const comp = {
    type,
    x,
    y,
    value: 1 + Math.floor(Math.random() * 9) // Random value 1–10
  };

  components.push(comp);
  updateValues();
  drawComponents();
}

// Draw components
function drawComponents() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  components.forEach((comp, index) => {
    ctx.beginPath();
    ctx.fillStyle = getColorForType(comp.type);
    ctx.fillRect(comp.x, comp.y, 60, 30);
    ctx.fillStyle = "white";
    ctx.font = "14px sans-serif";
    ctx.fillText(`${comp.type} (${comp.value})`, comp.x + 5, comp.y + 20);
    ctx.closePath();
  });
}

// Get color per component type
function getColorForType(type) {
  switch (type) {
    case "battery": return "#FF0000";
    case "resistor": return "#FFA500";
    case "coil": return "#00BFFF";
    case "capacitor": return "#008000";
    case "diode": return "#800080";
    default: return "#999999";
  }
}

// Update Voltage/Resistance/Current
function updateValues() {
  voltage = components.filter(c => c.type === "battery").reduce((sum, c) => sum + c.value, 0);
  resistance = components.filter(c => c.type === "resistor").reduce((sum, c) => sum + c.value, 0);

  // Ohm’s Law: I = V / R (prevent divide-by-zero)
  current = resistance > 0 ? (voltage / resistance).toFixed(2) : 0;

  document.getElementById("voltage").textContent = voltage;
  document.getElementById("resistance").textContent = resistance;
  document.getElementById("current").textContent = current;
}

// Reset simulator
function resetSimulator() {
  components = [];
  voltage = 0;
  resistance = 0;
  current = 0;
  updateValues();
  drawComponents();
}

// Initialize
resetSimulator();
