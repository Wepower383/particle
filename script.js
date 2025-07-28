let components = [];

function addComponent(type) {
  const div = document.createElement('div');
  div.className = 'component';
  div.style.left = '100px';
  div.style.top = (100 + components.length * 60) + 'px';

  let label = '';
  if (type === 'battery') label = 'Battery V:';
  if (type === 'series-resistor') label = 'Series Resistor Ω:';
  if (type === 'parallel-resistor') label = 'Parallel Resistor Ω:';

  div.innerHTML = `
    ${label}<br>
    <input type="number" value="0" onchange="calculateCurrent()" />
  `;
  div.setAttribute('data-type', type);
  makeDraggable(div);
  document.getElementById('canvas').appendChild(div);
  components.push(div);
  calculateCurrent();
}

function makeDraggable(el) {
  el.onmousedown = function (e) {
    let shiftX = e.clientX - el.getBoundingClientRect().left;
    let shiftY = e.clientY - el.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
      el.style.left = pageX - shiftX + 'px';
      el.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);
    el.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      el.onmouseup = null;
    };
  };
}

function calculateCurrent() {
  let voltage = 0;
  let seriesResistance = 0;
  let parallelResistanceList = [];

  components.forEach(comp => {
    const val = parseFloat(comp.querySelector('input').value) || 0;
    const type = comp.getAttribute('data-type');
    if (type === 'battery') voltage += val;
    else if (type === 'series-resistor') seriesResistance += val;
    else if (type === 'parallel-resistor') parallelResistanceList.push(val);
  });

  let parallelResistance = 0;
  if (parallelResistanceList.length > 0) {
    parallelResistance = 1 / parallelResistanceList.reduce((acc, r) => acc + (1 / r), 0);
  }

  let totalResistance = seriesResistance + (parallelResistance || 0);
  let current = totalResistance > 0 ? voltage / totalResistance : 0;

  document.getElementById('results').innerText = 
    `Series R: ${seriesResistance.toFixed(2)} Ω
` +
    `Parallel R: ${parallelResistance.toFixed(2)} Ω
` +
    `Total R: ${totalResistance.toFixed(2)} Ω
` +
    `Current: ${current.toFixed(2)} A`;
}
