
const canvas = document.getElementById('simulator');
const ctx = canvas.getContext('2d');

let components = [];
let draggingComponent = null;
let offsetX = 0, offsetY = 0;

function addComponent(type) {
    const x = 100 + Math.random() * 400;
    const y = 100 + Math.random() * 400;
    components.push({ type, x, y, value: 0 });
    draw();
}

function clearComponents() {
    components = [];
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    components.forEach((comp, index) => {
        ctx.fillStyle = "black";
        ctx.fillRect(comp.x, comp.y, 100, 30);
        ctx.fillStyle = "white";
        ctx.font = "12px sans-serif";
        ctx.fillText(`${comp.type} V/I: ${comp.value}`, comp.x + 5, comp.y + 20);
    });
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let i = components.length - 1; i >= 0; i--) {
        const comp = components[i];
        if (mouseX >= comp.x && mouseX <= comp.x + 100 && mouseY >= comp.y && mouseY <= comp.y + 30) {
            draggingComponent = comp;
            offsetX = mouseX - comp.x;
            offsetY = mouseY - comp.y;
            return;
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (!draggingComponent) return;
    const rect = canvas.getBoundingClientRect();
    draggingComponent.x = e.clientX - rect.left - offsetX;
    draggingComponent.y = e.clientY - rect.top - offsetY;
    draw();
});

canvas.addEventListener('mouseup', () => {
    draggingComponent = null;
});

draw();
