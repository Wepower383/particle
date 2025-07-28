
const canvas = document.getElementById('simCanvas');
const ctx = canvas.getContext('2d');

let components = [];
let wires = [];
let dragging = null;
let offsetX = 0, offsetY = 0;

function addComponent(type) {
    const component = {
        type: type,
        x: 100 + Math.random() * 800,
        y: 100 + Math.random() * 400,
        value: 0
    };
    components.push(component);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const comp of components) {
        ctx.fillStyle = comp.type === 'battery' ? 'red' : 'black';
        ctx.fillRect(comp.x, comp.y, 80, 30);
        ctx.fillStyle = 'white';
        ctx.fillText(`${comp.type} V/Ω: ${comp.value}`, comp.x + 5, comp.y + 20);
    }

    ctx.strokeStyle = 'blue';
    for (const wire of wires) {
        ctx.beginPath();
        ctx.moveTo(wire.x1, wire.y1);
        ctx.lineTo(wire.x2, wire.y2);
        ctx.stroke();
    }
}

canvas.addEventListener('mousedown', (e) => {
    const mx = e.offsetX;
    const my = e.offsetY;
    for (const comp of components) {
        if (mx >= comp.x && mx <= comp.x + 80 && my >= comp.y && my <= comp.y + 30) {
            dragging = comp;
            offsetX = mx - comp.x;
            offsetY = my - comp.y;
            break;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        dragging.x = e.offsetX - offsetX;
        dragging.y = e.offsetY - offsetY;
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    dragging = null;
});

function clearWires() {
    wires = [];
    draw();
}

draw();
