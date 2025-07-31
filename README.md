
# 🌊 Project Aegis – AI-Powered Flood Alert System

**Project Aegis** is an intelligent, multi-agent system built to detect and alert flood risks at a **per-road level** using real-time and forecasted rainfall data. It combines a future-ready web UI with a CrewAI-based backend that simulates how disaster response teams operate—via specialized AI agents.

🔗 **Live Demo:** [project-aegis.netlify.app](https://project-aegis.netlify.app)

---

## 🚨 Problem Statement

1. Flood alerts today are **broad and generic**, often limited to entire cities or districts.
2. Emergency alerts lack **contextual, road-specific details** that citizens and responders need.
3. There is **no AI-assisted backend** that mimics how meteorologists, risk experts, and coordinators make real-time decisions collaboratively.

---

## ✅ Solution

Project Aegis solves this using a modular, scalable, AI-driven alerting pipeline:

1. **Rainfall data** is generated/simulated.
2. **AI agents (via CrewAI)** analyze data:
   - Meteorologist Agent
   - Risk Analyst Agent
   - Alert Coordinator Agent
3. **Alerts are auto-generated** and sent to a live dashboard (Netlify) + prototype Streamlit app.

---

## 🏗️ Architecture

```
graph TD;
    A[Rainfall Input] --> B(Meteorologist Agent);
    B --> C(Risk Analyst Agent);
    C --> D(Alert Coordinator Agent);
    D --> E[Alert Message];
    E --> F[Streamlit Prototype];
    E --> G[React Dashboard (Netlify)];
````

| Component         | Stack/Tools                                              |
| ----------------- | -------------------------------------------------------- |
| AI Orchestration  | [CrewAI](https://docs.crewai.com/), Gemini 2 via LiteLLM |
| Prototype Backend | Python, Streamlit                                        |
| Frontend Mockup   | React.js, Hosted on Netlify                              |
| Data Flow         | Simulated rainfall, linear agent pipeline                |
| Output Handling   | Alert message → `output.txt`                             |

---

## 🧠 AI Agent Descriptions

* **🌀 Meteorologist Agent** – Evaluates current and forecast rainfall.
* **⚠️ Risk Analyst Agent** – Assesses likelihood of road-specific flooding.
* **📢 Alert Coordinator Agent** – Composes and logs a human-readable flood warning.

Agents use **CrewAI** for task delegation and collaboration, communicating in a chain to produce a clear alert output.

---

## 🚀 How to Run Locally

```bash
git clone https://github.com/yourusername/project-aegis.git
cd project-aegis

# Set up Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the prototype demo
streamlit run core/dashboard.py
```

> 💡 Note: Make sure `output.txt` is writable and present in the project root or defined path.

---

## 📂 Repository Structure

```
project-aegis/
│
├── core/                     # CrewAI logic, agent tasks
├── src files/               # Supporting Python files
├── aegis-website-mockup/    # React dashboard (Netlify)
├── website/                 # Web assets if separate
├── Project Aegis - Flood Alert System.pdf  # Slides
├── README.md
```

---

## 🌐 Future Features

* Real-time rainfall API integration (IMD / OpenWeatherMap)
* WhatsApp or SMS alert integrations
* Cyclone & landslide alert extensions
* Admin dashboard with control toggles

---


