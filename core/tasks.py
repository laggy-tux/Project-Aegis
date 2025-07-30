from crewai import Task
from agents import meteorologist, risk_analyst, alert_coordinator

def create_tasks(context):
    task1 = Task(
        description=(
            "Analyze the weather and infrastructure data for {road_name}. "
            "Current rainfall is {current_rainfall_mm}mm/hr and forecast for next 6h is {forecast_rainfall_next_6h_mm}mm. "
            "The area has {drainage_quality} drainage, is at {elevation} elevation, "
            "and had {past_flood_incidents} past flood events. "
            "Generate a concise summary of the flood threat."
        ).format(**context),
        agent=meteorologist,
        expected_output=(
            "A detailed analysis of current and forecast rainfall. "
            "Include mm values and explain whether conditions are favorable or alarming for flooding."
        )
    )

    task2 = Task(
        description=(
            "Using the meteorologist's analysis and the following context for {road_name}, "
            "determine the flood risk level (Low, Medium, High, Critical) based on elevation, "
            "drainage, and population density ({population_density} people/km²). "
            "Past incidents: {past_flood_incidents}."
        ).format(**context),
        agent=risk_analyst,
        expected_output=(
            "A qualitative and quantitative flood risk level assessment: LOW, MEDIUM, HIGH, or CRITICAL. "
            "Mention risk factors like elevation, drainage, and past flooding events."
        )
    )

    task3 = Task(
        description=(
            "Craft a flood alert for {road_name}. Based on the risk level and shelter availability "
            "({nearby_shelters}), write a single-line evacuation recommendation or reassurance. "
            "Use the road type ({road_type}) and population density ({population_density}) to tailor the message. "
            "Once the message is crafted, write it into a file named 'output.txt' on a new line. "
            "Only write the alert message and nothing else."
        ).format(**context),
        agent=alert_coordinator,
        expected_output="A one-line alert message for the road with name, risk level, and clear instruction."
    )

    return [task1, task2, task3]
