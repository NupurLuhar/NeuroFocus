import React from "react";
import { Line } from "react-chartjs-2";

export default function ProductivityDashboard({ emotion, typingStats, focusPoints }) {
  // Dummy data for charts, extend to real-time or saved data for advanced project
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Focus Points",
        data: [focusPoints, focusPoints - 1, focusPoints + 2, focusPoints + 1, focusPoints + 3],
        fill: false,
        backgroundColor: "rgb(34,197,94)",
        borderColor: "rgba(34,197,94,0.2)",
      },
    ],
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Productivity Dashboard (Demo)</h2>
      <div className="flex space-x-6">
        <div>
          <p>Current Emotion: <b>{emotion}</b></p>
          <p>Typing Speed: <b>{typingStats.speed} WPM</b></p>
          <p>Typing Errors: <b>{typingStats.errors}</b></p>
          <p>Focus Points: <b>{focusPoints}</b></p>
        </div>
        <div style={{ width: 400 }}>
          <Line data={data} />
        </div>
      </div>
    </div>
  );
}
