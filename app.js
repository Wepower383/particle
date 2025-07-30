document.querySelectorAll('.component').forEach(item => {
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
  });
});

const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', (e) => {
  e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
  e.preventDefault();
  const type = e.dataTransfer.getData('text/plain');

  const newComponent = document.createElement('div');
  newComponent.classList.add('component-instance');
  newComponent.textContent = type.toUpperCase();
  newComponent.style.left = `${e.clientX - canvas.getBoundingClientRect().left}px`;
  newComponent.style.top = `${e.clientY - canvas.getBoundingClientRect().top}px`;

  enableDragging(newComponent);
  canvas.appendChild(newComponent);
});

function enableDragging(el) {
  let offsetX, offsetY;
  el.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    function moveAt(moveEvent) {
      el.style.left = `${moveEvent.clientX - canvas.getBoundingClientRect().left - offsetX}px`;
      el.style.top = `${moveEvent.clientY - canvas.getBoundingClientRect().top - offsetY}px`;
    }
    function stopMove() {
      document.removeEventListener('mousemove', moveAt);
      document.removeEventListener('mouseup', stopMove);
    }
    document.addEventListener('mousemove', moveAt);
    document.addEventListener('mouseup', stopMove);
  });
}
