from crewai import Agent
from llm_config import model

meteorologist = Agent(
    role="Meteorologist",
    goal="Analyze weather data and identify rainfall-related threats.",
    backstory="You are an expert meteorologist analyzing local conditions.",
    verbose=True,
    allow_delegation=False,
    llm=model
)
