import random
from crewai import Crew
from tasks import create_tasks
from agents import meteorologist, risk_analyst, alert_coordinator

def run_alert_for_one_road(road_name, info):
    current_rain = random.randint(1, 20)
    forecast_rain = random.randint(1, 20)

    context = {
        "road_name": road_name,
        "current_rainfall_mm": current_rain,
        "forecast_rainfall_next_6h_mm": forecast_rain,
        **info
    }

    crew = Crew(
        agents=[meteorologist, risk_analyst, alert_coordinator],
        tasks=create_tasks(context),
        verbose=False
    )

    crew.kickoff()
