
const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.95;
canvas.height = window.innerHeight * 0.75;

let components = [];
let connections = [];
let draggingWire = null;

function addComponent(type) {
    const id = Date.now();
    const x = 100 + Math.random() * 400;
    const y = 100 + Math.random() * 300;
    const color = type === 'battery' ? 'red' : 'black';
    components.push({ id, type, x, y, width: 100, height: 40, color });
    draw();
}

function clearConnections() {
    connections = [];
    draw();
}

canvas.addEventListener("mousedown", (e) => {
    const pos = { x: e.offsetX, y: e.offsetY };
    const node = findNode(pos);
    if (node) {
        draggingWire = { from: node };
    }
});

canvas.addEventListener("mouseup", (e) => {
    if (draggingWire) {
        const pos = { x: e.offsetX, y: e.offsetY };
        const toNode = findNode(pos);
        if (toNode && draggingWire.from !== toNode) {
            connections.push({ from: draggingWire.from, to: toNode });
        }
        draggingWire = null;
        draw();
    }
});

function findNode(pos) {
    return components.find(c => (
        pos.x >= c.x && pos.x <= c.x + c.width &&
        pos.y >= c.y && pos.y <= c.y + c.height
    ));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    components.forEach(c => {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.width, c.height);
        ctx.fillStyle = "white";
        ctx.fillText(c.type, c.x + 10, c.y + 25);
    });
    ctx.strokeStyle = "blue";
    connections.forEach(conn => {
        ctx.beginPath();
        ctx.moveTo(conn.from.x + 50, conn.from.y + 20);
        ctx.lineTo(conn.to.x + 50, conn.to.y + 20);
        ctx.stroke();
    });
}
