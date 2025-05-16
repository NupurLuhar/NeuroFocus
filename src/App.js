import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import FocusMusic from "./components/FocusMusic";
import ProductivityDashboard from "./components/ProductivityDashboard";

function App() {
  const videoRef = useRef(null);
  const [emotion, setEmotion] = useState("neutral");
  const [typingStats, setTypingStats] = useState({ speed: 0, errors: 0 });
  const [focusPoints, setFocusPoints] = useState(0);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startVideo();
    };
    loadModels();
  }, []);

  // Start webcam stream
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(console.error);
  };

  // Detect emotion from video frames every second
  useEffect(() => {
    let interval;
    if (videoRef.current) {
      interval = setInterval(async () => {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        if (detections && detections.expressions) {
          const expressions = detections.expressions;
          const maxEmotion = Object.entries(expressions).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0];
          setEmotion(maxEmotion);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [videoRef]);

  // Typing behavior monitoring
  useEffect(() => {
    let keysPressed = 0;
    let errors = 0;
    let startTime = Date.now();

    const handleKeydown = (e) => {
      keysPressed++;
      // You can improve error detection by more complex logic
      if (e.key === "Backspace" || e.key === "Delete") errors++;
      const elapsed = (Date.now() - startTime) / 60000; // in minutes
      const speed = (keysPressed / 5) / elapsed; // WPM approx
      setTypingStats({ speed: Math.round(speed), errors });
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  // Adaptive UI effects
  useEffect(() => {
    if (emotion === "happy" || emotion === "surprised") {
      document.body.style.backgroundColor = "#E0FFE0"; // Light green
      setFocusPoints((points) => points + 1);
    } else if (emotion === "sad" || emotion === "angry" || emotion === "disgusted") {
      document.body.style.backgroundColor = "#FFE0E0"; // Light red
    } else {
      document.body.style.backgroundColor = "#FFFFFF"; // Neutral
    }
  }, [emotion]);

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-4 text-center">Smart Virtual Study Room</h1>
      <div className="flex justify-around">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="320"
          height="240"
          className="rounded-lg border"
        />
        <div className="ml-6 flex flex-col justify-center">
          <p className="text-xl">Detected Emotion: <b>{emotion}</b></p>
          <p className="text-xl">
            Typing Speed: <b>{typingStats.speed} WPM</b>
          </p>
          <p className="text-xl">
            Typing Errors: <b>{typingStats.errors}</b>
          </p>
          <p className="text-xl">
            Focus Points Earned: <b>{focusPoints}</b>
          </p>
        </div>
      </div>
      <FocusMusic emotion={emotion} />
      <ProductivityDashboard
        emotion={emotion}
        typingStats={typingStats}
        focusPoints={focusPoints}
      />
    </div>
  );
}

export default App;
