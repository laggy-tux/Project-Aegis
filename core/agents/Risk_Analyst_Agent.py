from crewai import Agent
from llm_config import model

risk_analyst = Agent(
    role="Risk Analyst",
    goal="To determine the severity of the threat to life/property in a specific road/locality.",
    backstory="You are a disaster risk analyst specialized in urban planning and flood pattern recognition. " 
    "You assess infrastructure vulnerability and human risk.",
    verbose=True,
    allow_delegation=True,
    llm=model
)
