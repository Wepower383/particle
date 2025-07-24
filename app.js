function enterSimulation() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("simulator").style.display = "block";
}

let componentId = 0;
let resistance = 0;
const voltage = 5;

function addComponent(type) {
  const area = document.getElementById("circuitArea");
  const div = document.createElement("div");
  div.classList.add("component");
  div.setAttribute("draggable", true);
  div.setAttribute("data-tooltip", `${capitalize(type)} (double-click to remove)`);
  div.innerText = type === 'battery' ? "🔋 Battery (+5V)" : 
                   type === 'resistor' ? "🌀 Resistor" : 
                   "🧲 Coil";

  div.style.left = `${50 + Math.random() * 300}px`;
  div.style.top = `${50 + Math.random() * 100}px`;

  div.ondblclick = () => {
    area.removeChild(div);
    if (type === 'resistor') resistance -= 10;
    updateReadings();
  };

  div.onmousedown = dragMouseDown;
  area.appendChild(div);

  if (type === 'resistor') resistance += 10;
  updateReadings();
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
  updateReadings();
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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
