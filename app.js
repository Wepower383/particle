
let components = [];
function initializeWiring() {
    const simArea = document.getElementById("simulator-area");
    simArea.innerHTML = "";
    addComponent("Battery", 50, 50);
    addComponent("Resistor", 200, 50);
    addComponent("Ground", 350, 50);
}
function addComponent(type, x, y) {
    const simArea = document.getElementById("simulator-area");
    const div = document.createElement("div");
    div.className = "component";
    div.innerText = type;
    div.style.left = x + "px";
    div.style.top = y + "px";
    div.draggable = true;
    div.ondragstart = (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({type, offsetX: e.offsetX, offsetY: e.offsetY}));
    };
    simArea.appendChild(div);
    components.push({type, x, y});
}
document.getElementById("simulator-area").ondragover = function(e) {
    e.preventDefault();
};
document.getElementById("simulator-area").ondrop = function(e) {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text"));
    const newX = e.clientX - e.target.getBoundingClientRect().left - data.offsetX;
    const newY = e.clientY - e.target.getBoundingClientRect().top - data.offsetY;
    addComponent(data.type, newX, newY);
};
