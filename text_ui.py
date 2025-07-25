
# Command-line interface for basic circuit input

from component_base import Component

components = []

def add_component():
    name = input("Enter component name (e.g., Resistor): ")
    node1 = input("Connect from node: ")
    node2 = input("Connect to node: ")
    value = input("Enter value (ohms, farads, etc): ")
    comp = Component(name, node1, node2, value)
    components.append(comp)
    print(f"{name} added between {node1} and {node2} with value {value}.")

def run_simulation():
    t = float(input("Enter time t for simulation: "))
    for comp in components:
        print(comp.simulate(t))

if __name__ == "__main__":
    while True:
        cmd = input("Type 'add', 'run', or 'exit': ").strip().lower()
        if cmd == "add":
            add_component()
        elif cmd == "run":
            run_simulation()
        elif cmd == "exit":
            break
        else:
            print("Unknown command.")
