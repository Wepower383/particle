
let canvas = document.getElementById("canvas");

function addComponent(type) {
  let comp = document.createElement("div");
  comp.className = "component";
  comp.innerHTML = `
    <strong>${type}</strong>
    <input type='text' placeholder='Value' />
    <input type='text' placeholder='Unit' />
  `;
  comp.style.left = "200px";
  comp.style.top = "200px";
  makeDraggable(comp);
  canvas.appendChild(comp);
}

function makeDraggable(el) {
  let isDragging = false;
  let offsetX, offsetY;

  el.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });

  window.addEventListener("mousemove", function(e) {
    if (isDragging) {
      el.style.left = e.pageX - offsetX + "px";
      el.style.top = e.pageY - offsetY + "px";
    }
  });

  window.addEventListener("mouseup", function() {
    isDragging = false;
  });
}
