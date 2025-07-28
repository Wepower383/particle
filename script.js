
let canvas = document.getElementById('canvas');
let dragging = null;
let offsetX = 0;
let offsetY = 0;

function addComponent(type) {
  let div = document.createElement('div');
  div.className = 'component';
  div.style.left = '100px';
  div.style.top = '100px';

  let label = document.createElement('div');
  label.textContent = type.charAt(0).toUpperCase() + type.slice(1) + ' V/Ω:';

  let input = document.createElement('input');
  input.type = 'number';
  input.value = 0;

  div.appendChild(label);
  div.appendChild(input);
  canvas.appendChild(div);

  div.addEventListener('mousedown', function (e) {
    dragging = div;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
}

canvas.addEventListener('mousemove', function (e) {
  if (dragging) {
    dragging.style.left = (e.pageX - offsetX) + 'px';
    dragging.style.top = (e.pageY - offsetY - 40) + 'px';
  }
});

canvas.addEventListener('mouseup', function () {
  dragging = null;
});
