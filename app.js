
let simArea = document.getElementById('sim-area');
let currentComponent = null;
let components = [];

function addComponent(type) {
  let comp = document.createElement('div');
  comp.className = 'component';
  comp.innerText = type;
  comp.style.left = Math.random() * 700 + 'px';
  comp.style.top = Math.random() * 300 + 'px';
  simArea.appendChild(comp);
  makeDraggable(comp);
  components.push({ type, element: comp });
}

function makeDraggable(el) {
  let offsetX, offsetY;

  el.onmousedown = function (e) {
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.onmousemove = function (e) {
      el.style.left = (e.clientX - offsetX) + 'px';
      el.style.top = (e.clientY - offsetY) + 'px';
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    };
  };
}
