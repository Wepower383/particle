
const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");

let components = [];
let yPos = 50;

function addComponent(type) {
    components.push({ type: type, x: 50, y: yPos });
    yPos += 60;
    drawComponents();
    console.log(type + " added");
}

function drawComponents() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    components.forEach(component => {
        ctx.fillStyle = "black";
        ctx.fillText(component.type, component.x, component.y);
        ctx.strokeRect(component.x - 10, component.y - 20, 100, 30);
    });
}
