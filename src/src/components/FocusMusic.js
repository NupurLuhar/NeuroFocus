import React, { useEffect, useRef } from "react";

const calmingTracks = [
  "https://www.bensound.com/bensound-music/bensound-slowmotion.mp3",
  "https://www.bensound.com/bensound-music/bensound-tomorrow.mp3",
];

const upbeatTracks = [
  "https://www.bensound.com/bensound-music/bensound-energy.mp3",
  "https://www.bensound.com/bensound-music/bensound-buddy.mp3",
];

export default function FocusMusic({ emotion }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (["sad", "angry", "disgusted"].includes(emotion)) {
      // Play calming music
      audioRef.current.src = calmingTracks[Math.floor(Math.random() * calmingTracks.length)];
      audioRef.current.play();
    } else if (["happy", "surprised"].includes(emotion)) {
      // Play upbeat music
      audioRef.current.src = upbeatTracks[Math.floor(Math.random() * upbeatTracks.length)];
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  }, [emotion]);

  return <audio ref={audioRef} loop />;
}
