
let simArea = document.getElementById("simArea");
let wireLayer = document.getElementById("wireLayer");
let components = [];
let current = null;

function addComponent(type) {
    let div = document.createElement("div");
    div.className = "component";
    div.innerText = type;
    div.style.left = Math.random() * 600 + "px";
    div.style.top = Math.random() * 400 + "px";
    div.dataset.type = type;
    simArea.appendChild(div);
    components.push(div);

    div.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!current) {
            current = div;
            div.style.background = "#b0e0e6";
        } else if (current === div) {
            current.style.background = "#e6e6e6";
            current = null;
        } else {
            drawWire(current, div);
            current.style.background = "#e6e6e6";
            current = null;
        }
    });
}

function drawWire(from, to) {
    const rect1 = from.getBoundingClientRect();
    const rect2 = to.getBoundingClientRect();
    const parentRect = simArea.getBoundingClientRect();

    let x1 = rect1.left + rect1.width/2 - parentRect.left;
    let y1 = rect1.top + rect1.height/2 - parentRect.top;
    let x2 = rect2.left + rect2.width/2 - parentRect.left;
    let y2 = rect2.top + rect2.height/2 - parentRect.top;

    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("class", "wire");
    wireLayer.appendChild(line);
}
