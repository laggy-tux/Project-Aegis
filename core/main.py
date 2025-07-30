import json
import random
from crew import run_alert_for_one_road

# === Load static dataset ===
with open("dataset.json", "r") as f:
    road_data = json.load(f)

# === Main function: Process flood alerts for 3 random roads ===
def run_alerts_for_random_roads(n: int = 3):
    selected_roads = random.sample(list(road_data.items()), n)

    # Clear the output file before writing new results
    with open("alerts_output.txt", "w") as f:
        pass

    for road_name, info in selected_roads:
        print(f"\n=== 🌧️ Processing {road_name} ===")
        result = run_alert_for_one_road(road_name, info)
        print(f"📍 Final Alert for {road_name}:\n{result}\n")

        # Write result line by line
        with open("alerts_output.txt", "a") as f:
            f.write(f"{road_name}: {result}\n")


if __name__ == "__main__":
    run_alerts_for_random_roads()
