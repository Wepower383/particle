let canvas = document.getElementById("canvas");
let output = document.getElementById("output");

let components = [];

function addComponent(type) {
  const comp = document.createElement("div");
  comp.classList.add("component");
  comp.style.left = "100px";
  comp.style.top = "100px";
  comp.draggable = true;

  let input = document.createElement("input");
  input.type = "number";
  input.value = 10;

  comp.appendChild(document.createTextNode(type.replace("-", " ") + " V:"));
  comp.appendChild(input);

  let obj = { type, element: comp, input };
  components.push(obj);
  canvas.appendChild(comp);

  comp.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", components.indexOf(obj));
  });
}

canvas.addEventListener("dragover", (e) => {
  e.preventDefault();
});

canvas.addEventListener("drop", (e) => {
  e.preventDefault();
  let index = e.dataTransfer.getData("text/plain");
  let comp = components[index];
  comp.element.style.left = e.clientX + "px";
  comp.element.style.top = e.clientY + "px";
  calculateCurrent();
});

function calculateCurrent() {
  let V = 0;
  let Rseries = 0;
  let Rparallel = [];

  components.forEach(c => {
    let val = parseFloat(c.input.value);
    if (c.type === "battery") V += val;
    if (c.type === "series-resistor") Rseries += val;
    if (c.type === "parallel-resistor") Rparallel.push(val);
  });

  let RparallelTotal = 0;
  if (Rparallel.length > 0) {
    RparallelTotal = 1 / Rparallel.map(r => 1 / r).reduce((a, b) => a + b);
  }

  let Rtotal = Rseries + RparallelTotal;
  let I = Rtotal > 0 ? V / Rtotal : 0;

  output.innerText = `Series R: ${Rseries.toFixed(2)} Ω
Parallel R: ${RparallelTotal.toFixed(2)} Ω
Total R: ${Rtotal.toFixed(2)} Ω
Current: ${I.toFixed(2)} A`;
}