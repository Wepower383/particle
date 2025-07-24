let components = [];

function addBattery() {
  const voltage = prompt("Enter battery voltage (V):", "5");
  if (!voltage) return;
  components.push({ type: 'battery', voltage: parseFloat(voltage) });
  renderCircuit();
}

function addResistor() {
  const ohms = prompt("Enter resistor resistance (Ω):", "10");
  if (!ohms) return;
  components.push({ type: 'resistor', resistance: parseFloat(ohms) });
  renderCircuit();
}

function addCoil() {
  const turns = prompt("Enter coil turns (acts like resistance Ω):", "5");
  if (!turns) return;
  components.push({ type: 'coil', resistance: parseFloat(turns) });
  renderCircuit();
}

function resetSimulator() {
  components = [];
  renderCircuit();
}

function renderCircuit() {
  const circuitDiv = document.getElementById("circuit");
  circuitDiv.innerHTML = '';

  let voltage = 0;
  let totalResistance = 0;

  components.forEach((comp, index) => {
    const box = document.createElement("div");
    box.className = "component";

    if (comp.type === 'battery') {
      voltage += comp.voltage;
      box.innerHTML = `🔋 Battery (${comp.voltage}V)`;
    } else if (comp.type === 'resistor') {
      totalResistance += comp.resistance;
      box.innerHTML = `🔵 Resistor (${comp.resistance}Ω)`;
    } else if (comp.type === 'coil') {
      totalResistance += comp.resistance;
      box.innerHTML = `🔴 Coil (${comp.resistance}Ω)`;
    }

    circuitDiv.appendChild(box);
  });

  const current = totalResistance > 0 ? (voltage / totalResistance).toFixed(2) : 0;

  document.getElementById("voltage").textContent = `Voltage: ${voltage} V`;
  document.getElementById("resistance").textContent = `Resistance: ${totalResistance} Ω`;
  document.getElementById("current").textContent = `Current: ${current} A`;
}
