# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `streamlit run app.py` - Run the Streamlit application locally
- `streamlit run <filename>.py` - Run a specific Streamlit script
- `uv add <package>` - Add a new dependency (e.g., `uv add streamlit`)
- `uv install` - Install project dependencies from pyproject.toml
- `uv run streamlit run app.py` - Run Streamlit through uv

## Project Structure

This is a uv-managed Streamlit application project. Streamlit apps are typically structured with:
- Main application files (usually `app.py` or `main.py`)
- Python scripts that create web interfaces using Streamlit's declarative syntax
- Dependencies managed through `pyproject.toml` (use `uv add` to add dependencies)

## Streamlit Development Notes

- Streamlit automatically reruns scripts when files are modified
- Use `st.cache_data()` for expensive computations to improve performance
- Session state is managed through `st.session_state`
- Multi-page apps use the `pages/` directory structure