import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set the Gemini API key for LiteLLM
os.environ["GOOGLE_API_KEY"] = os.getenv("GEMINI_API_KEY")

# Set the model name (used in Agent definitions)
model = "gemini/gemini-2.0-flash-lite"
