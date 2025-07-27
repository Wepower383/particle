
document.getElementById("enterBtn").addEventListener("click", () => {
  document.body.innerHTML = `
    <h2>Particle Simulator</h2>
    <div id="simulator">
      <p>Select a component to add:</p>
      <button onclick="addComponent('Resistor')">Resistor</button>
      <button onclick="addComponent('Capacitor')">Capacitor</button>
      <button onclick="addComponent('Diode')">Diode</button>
      <button onclick="addComponent('Transistor')">Transistor</button>
      <button onclick="connectComponents()">🔌 Connect</button>
      <div id="circuitArea" style="margin-top:20px; border:1px dashed #ccc; padding:20px;">
        <p><em>No components added yet.</em></p>
      </div>
    </div>
  `;
});

function addComponent(type) {
  const area = document.getElementById("circuitArea");
  const component = document.createElement("div");
  component.innerText = `🌀 ${type} added`;
  component.style.margin = "5px 0";
  area.appendChild(component);
}

function connectComponents() {
  const area = document.getElementById("circuitArea");
  const connection = document.createElement("div");
  connection.innerHTML = "<strong>🔗 Components connected!</strong>";
  connection.style.color = "green";
  connection.style.marginTop = "10px";
  area.appendChild(connection);
}
