from crewai import Agent
from llm_config import model

alert_coordinator = Agent(
    role="Alert Coorindator",
    goal="To deliver specific, actionable recommendations for each road/locality.",
    backstory="You are a public safety communicator tasked with issuing clear, " 
    "concise, and life-saving alerts during weather emergencies.",
    verbose=True,
    allow_delegation=True,
    llm=model
)
