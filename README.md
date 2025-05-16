# NeuroFocus
NeuroFocus is an AI-powered virtual study room that detects your emotions and typing behavior in real-time to adapt lighting, music, and notifications. It creates a personalized environment to boost focus and productivity, enhancing study sessions while promoting mental well-being—all running locally in your browser.

# Smart Emotion-Adaptive Virtual Study Room

## Overview
A web app that detects your emotions via webcam, monitors typing, and adapts UI and music for better focus.

## Features
- Real-time emotion detection with face-api.js
- Typing speed and error tracking
- Adaptive background colors and music based on emotion
- Productivity dashboard with charts
- Optional backend API for stats saving (FastAPI)

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
