function enterSimulation() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("simulator").style.display = "flex";
}

let resistance = 0;
const voltage = 5;
let componentCount = 0;

function addComponent(type) {
  const area = document.getElementById("circuitArea");
  const div = document.createElement("div");
  div.classList.add("component");
  div.setAttribute("draggable", true);
  div.setAttribute("data-tooltip", type.charAt(0).toUpperCase() + type.slice(1));
  div.innerText = 
    type === 'battery' ? "🔋 Battery (+5V)" : 
    type === 'resistor' ? "🌀 Resistor (10Ω)" : 
    "🧲 Coil (5Ω)";

  div.style.left = `${50 + Math.random() * 300}px`;
  div.style.top = `${50 + Math.random() * 100}px`;

  div.ondblclick = () => {
    area.removeChild(div);
    if (type === 'resistor') resistance -= 10;
    if (type === 'coil') resistance -= 5;
    componentCount--;
    updateReadings();
    updateTree();
    updateCompanion();
  };

  div.onmousedown = dragMouseDown;
  area.appendChild(div);

  if (type === 'resistor') resistance += 10;
  if (type === 'coil') resistance += 5;
  componentCount++;
  updateReadings();
  updateTree();
  updateCompanion();
}

function updateReadings() {
  const current = resistance > 0 ? (voltage / resistance).toFixed(2) : 0;
  document.getElementById("voltage").innerText = voltage;
  document.getElementById("resistance").innerText = resistance;
  document.getElementById("current").innerText = current;
}

function resetSimulator() {
  document.getElementById("circuitArea").innerHTML = "";
  resistance = 0;
  componentCount = 0;
  updateReadings();
  updateTree();
  updateCompanion();
}

function updateTree() {
  const visual = document.getElementById("treeVisual");
  const symbols = ["🌱", "🌿", "🌳", "🌲", "🌀"];
  visual.innerText = symbols[Math.min(componentCount, symbols.length - 1)];
}

function updateCompanion() {
  const message = document.getElementById("companionMessage");
  if (componentCount === 0) {
    message.innerText = "Build something and I’ll guide you.";
  } else if (componentCount < 3) {
    message.innerText = "Try combining resistors and coils to balance the circuit.";
  } else if (resistance > 30) {
    message.innerText = "You may want to reduce resistance to increase current.";
  } else {
    message.innerText = "Looking good. Keep experimenting!";
  }
}

function dragMouseDown(e) {
  e.preventDefault();
  const elmnt = e.target;
  let pos3 = e.clientX;
  let pos4 = e.clientY;

  function elementDrag(e) {
    e.preventDefault();
    const pos1 = pos3 - e.clientX;
    const pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  document.onmouseup = closeDragElement;
  document.onmousemove = elementDrag;
}
