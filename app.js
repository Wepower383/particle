function enterSimulation() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("simulator").style.display = "block";
}

let voltage = 0;
let resistance = 0;

function addComponent(type) {
  const workspace = document.getElementById("workspace");
  const component = document.createElement("div");
  component.className = "component";

  if (type === "battery") {
    voltage += 5;
    component.innerText = "🔋 Battery (+5V)";
  } else if (type === "resistor") {
    resistance += 10;
    component.innerText = "🔧 Resistor (10Ω)";
  } else if (type === "coil") {
    resistance += 5;
    component.innerText = "🌀 Coil (5Ω)";
  }

  workspace.appendChild(component);
  updateOutput();
}

function updateOutput() {
  const current = resistance > 0 ? (voltage / resistance).toFixed(2) : 0;
  document.getElementById("voltage").innerText = voltage;
  document.getElementById("resistance").innerText = resistance;
  document.getElementById("current").innerText = current;
}

function resetSimulator() {
  document.getElementById("workspace").innerHTML = "";
  voltage = 0;
  resistance = 0;
  updateOutput();
}
