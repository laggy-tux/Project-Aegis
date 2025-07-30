import streamlit as st
import json
import subprocess

st.set_page_config(page_title="Project Aegis", layout="wide")
st.title("🌊 Project Aegis - Flood Risk Alert System")

if st.button("🚨 Run Agentic Flood Assessment"):
    with st.spinner("🧠 Processing roads and assessing flood risk..."):
        # Run the script that generates the file
        subprocess.run(["python3", "main.py"])

    st.subheader("📋 Final Alerts:")
    try:
        with open("alerts_output.txt", "r") as f:
            for line in f:
                st.write(line.strip())
    except FileNotFoundError:
        st.error("❌ No alerts found. Please run the assessment again.")
