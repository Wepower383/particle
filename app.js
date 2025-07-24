let components = [];

function addComponent(type) {
  const value = prompt(`Enter value for ${type.toUpperCase()}:`, "10");
  components.push({ type, value: parseFloat(value), x: 100 + components.length * 100, y: 250 });
  updateCanvas();
  updateStats();
}

function resetSimulator() {
  components = [];
  updateCanvas();
  updateStats();
}

function updateCanvas() {
  const canvas = document.getElementById("simulatorCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  components.forEach((comp, index) => {
    ctx.fillStyle = getColor(comp.type);
    ctx.fillRect(comp.x - 30, comp.y - 20, 60, 40);
    ctx.strokeStyle = "#fff";
    ctx.strokeRect(comp.x - 30, comp.y - 20, 60, 40);
    ctx.fillStyle = "#fff";
    ctx.fillText(`${capitalize(comp.type)} (${comp.value})`, comp.x - 28, comp.y + 5);

    // Draw wires (basic chaining logic)
    if (index > 0) {
      const prev = components[index - 1];
      ctx.beginPath();
      ctx.moveTo(prev.x + 30, prev.y);
      ctx.lineTo(comp.x - 30, comp.y);
      ctx.stroke();
    }
  });
}

function updateStats() {
  const voltage = components.filter(c => c.type === "battery")
    .reduce((sum, c) => sum + c.value, 0);
  const resistance = components.filter(c => c.type === "resistor")
    .reduce((sum, c) => sum + c.value, 0);
  const current = resistance > 0 ? (voltage / resistance).toFixed(2) : 0;

  document.getElementById("voltage").textContent = voltage;
  document.getElementById("resistance").textContent = resistance;
  document.getElementById("current").textContent = current;
}

function getColor(type) {
  switch (type) {
    case "battery": return "#2ecc71";
    case "resistor": return "#3498db";
    case "coil": return "#e74c3c";
    case "capacitor": return "#f39c12";
    case "diode": return "#9b59b6";
    default: return "#fff";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
