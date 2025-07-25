
# Base class for all components

class Component:
    def __init__(self, name, node1, node2, value=None, position=(0,0)):
        self.name = name
        self.node1 = node1
        self.node2 = node2
        self.value = value
        self.position = position

    def simulate(self, t):
        return f"{self.name} between {self.node1} and {self.node2} at time {t}"
