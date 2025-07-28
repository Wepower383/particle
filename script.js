
let board = document.getElementById('board');

function addComponent(type) {
    const comp = document.createElement('div');
    comp.className = 'component';
    comp.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    comp.style.left = '100px';
    comp.style.top = '100px';

    let input = document.createElement('input');
    input.type = 'number';
    input.value = 0;
    comp.appendChild(document.createTextNode(' V/Ω:'));
    comp.appendChild(input);

    comp.onmousedown = dragMouseDown;
    comp.ondblclick = () => comp.remove();

    board.appendChild(comp);
}

function dragMouseDown(e) {
    e.preventDefault();
    let elmnt = this;
    let pos3 = e.clientX;
    let pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;

    function elementDrag(e) {
        e.preventDefault();
        let pos1 = pos3 - e.clientX;
        let pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function clearBoard() {
    board.innerHTML = '';
}
