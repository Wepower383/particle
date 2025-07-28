
const canvas = document.getElementById("canvas");

function addComponent(type) {
  const component = document.createElement("div");
  component.className = "component";
  component.style.left = "100px";
  component.style.top = "100px";
  component.setAttribute("draggable", "true");

  let label = "";
  switch(type) {
    case "battery": label = "Battery V/Ω:"; break;
    case "series": label = "Series V/Ω:"; break;
    case "parallel": label = "Parallel V/Ω:"; break;
    case "capacitor": label = "Capacitance µF:"; break;
    case "coil": label = "Inductance mH:"; break;
    case "diode": label = "Diode Drop V:"; break;
    case "transistor": label = "Transistor β:"; break;
    case "switch": label = "Switch:"; break;
    case "ground": label = "Ground"; break;
    case "led": label = "LED V:"; break;
  }

  component.innerHTML = label + (type !== "ground" ? ' <input type="number" value="0"/>' : "");

  canvas.appendChild(component);

  // Drag behavior
  let isDragging = false;
  let offsetX, offsetY;

  component.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    component.style.left = `${e.pageX - offsetX}px`;
    component.style.top = `${e.pageY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => isDragging = false);
}
