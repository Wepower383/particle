
// Particle Simulator - Patch 6.1
document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  const addBattery = document.getElementById("add-battery");
  const addResistor = document.getElementById("add-resistor");
  const addGround = document.getElementById("add-ground");
  const wireButton = document.getElementById("wire-button");

  let components = [];
  let wireMode = false;
  let wireStart = null;

  function createComponent(type) {
    const el = document.createElement("div");
    el.className = `component ${type}`;
    el.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    el.style.left = "150px";
    el.style.top = "150px";
    el.draggable = true;

    el.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", null);
      e.dataTransfer.setDragImage(new Image(), 0, 0);
      el.dataset.dragging = true;
    });

    el.addEventListener("dragend", (e) => {
      el.style.left = `${e.pageX - board.offsetLeft}px`;
      el.style.top = `${e.pageY - board.offsetTop}px`;
      delete el.dataset.dragging;
    });

    el.addEventListener("click", () => {
      if (wireMode) {
        if (!wireStart) {
          wireStart = el;
          el.classList.add("selected");
        } else {
          drawWire(wireStart, el);
          wireStart.classList.remove("selected");
          wireStart = null;
        }
      }
    });

    board.appendChild(el);
    components.push(el);
  }

  function drawWire(startEl, endEl) {
    const wire = document.createElement("div");
    wire.className = "wire";

    const startX = startEl.offsetLeft + startEl.offsetWidth / 2;
    const startY = startEl.offsetTop + startEl.offsetHeight / 2;
    const endX = endEl.offsetLeft + endEl.offsetWidth / 2;
    const endY = endEl.offsetTop + endEl.offsetHeight / 2;

    wire.style.left = `${Math.min(startX, endX)}px`;
    wire.style.top = `${Math.min(startY, endY)}px`;
    wire.style.width = `${Math.abs(endX - startX)}px`;
    wire.style.height = `${Math.abs(endY - startY)}px`;
    wire.style.borderTop = startY === endY ? "2px solid #000" : "none";
    wire.style.borderLeft = startX === endX ? "2px solid #000" : "none";

    board.appendChild(wire);
  }

  addBattery.addEventListener("click", () => createComponent("battery"));
  addResistor.addEventListener("click", () => createComponent("resistor"));
  addGround.addEventListener("click", () => createComponent("ground"));

  wireButton.addEventListener("click", () => {
    wireMode = !wireMode;
    if (wireMode) {
      alert("Wire mode: Click two components to draw a wire.");
    }
  });
});
