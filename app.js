
let canvas = document.getElementById("canvas");
let components = [];
let wireStart = null;

function addComponent(type) {
    let div = document.createElement("div");
    div.className = "placed";
    div.innerText = type;
    div.style.left = Math.random() * 500 + "px";
    div.style.top = Math.random() * 300 + "px";
    div.onclick = () => handleClick(div);
    canvas.appendChild(div);
    components.push(div);
}

function handleClick(el) {
    if (!wireStart) {
        wireStart = el;
        el.style.border = "2px dashed blue";
    } else {
        drawWire(wireStart, el);
        wireStart.style.border = "1px solid black";
        wireStart = null;
    }
}

function drawWire(fromEl, toEl) {
    let x1 = fromEl.offsetLeft + fromEl.offsetWidth / 2;
    let y1 = fromEl.offsetTop + fromEl.offsetHeight / 2;
    let x2 = toEl.offsetLeft + toEl.offsetWidth / 2;
    let y2 = toEl.offsetTop + toEl.offsetHeight / 2;
    let length = Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    let wire = document.createElement("div");
    wire.className = "wire";
    wire.style.width = length + "px";
    wire.style.left = x1 + "px";
    wire.style.top = y1 + "px";
    wire.style.transform = "rotate(" + angle + "deg)";
    wire.style.transformOrigin = "0 0";
    canvas.appendChild(wire);
}
