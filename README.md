# NeuroFocus
NeuroFocus is an AI-powered virtual study room that detects your emotions and typing behavior in real-time to adapt lighting, music, and notifications. It creates a personalized environment to boost focus and productivity, enhancing study sessions while promoting mental well-being—all running locally in your browser.
NeuroSense is an intelligent virtual study room that adapts dynamically to your emotional and cognitive state by leveraging real-time emotion detection through your webcam and detailed typing behavior analysis. It creates a personalized, distraction-free study environment by adjusting lighting, playing mood-appropriate music, and sending timely notifications to boost focus and productivity. Combining cutting-edge AI techniques, affective computing, and seamless UX design, NeuroSense aims to enhance learning efficiency and promote mental well-being.

Technologies Used:

Frontend: React.js, Tailwind CSS

Emotion Detection: face-api.js (TensorFlow.js based models running fully in-browser)

Typing Behavior Monitoring: JavaScript event listeners

Data Visualization: Chart.js / react-chartjs-2

Backend (optional): FastAPI (Python) with Uvicorn

Database (optional): MongoDB / IndexedDB for local storage

Deployment: Docker (optional), Nginx

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
