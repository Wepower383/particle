let workspace = document.getElementById('workspace');

function addComponent(type) {
  const comp = document.createElement('div');
  comp.classList.add('component');
  comp.textContent = type;
  comp.style.left = '100px';
  comp.style.top = '100px';

  makeDraggable(comp);
  workspace.appendChild(comp);

  // Simulated current particle for visual feedback
  if (type === 'battery') {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = '180px';
    particle.style.top = '120px';
    workspace.appendChild(particle);
  }
}

function makeDraggable(el) {
  let offsetX, offsetY;
  el.onmousedown = function(e) {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.onmousemove = function(e) {
      el.style.left = (e.clientX - offsetX) + 'px';
      el.style.top = (e.clientY - offsetY) + 'px';
    };
    document.onmouseup = function() {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  };
}
