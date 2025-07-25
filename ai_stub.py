
# Basic AI Copilot Stub

def ai_respond(prompt):
    prompt = prompt.lower()
    if "voltage divider" in prompt:
        return "Use two resistors in series. Tap voltage between them."
    elif "ohm" in prompt:
        return "Ohm's Law: V = IR. Voltage equals current times resistance."
    else:
        return "I'm still learning. Try a different question."
