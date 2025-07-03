'use client'
import { useState, useRef } from "react";
import "./timer.css";

// Pomodoro settings
let timeInMinutes = 3; // Брать с БД
const POMODORO_DURATION = timeInMinutes * 60;

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Format seconds as mm:ss
  function formatTime(secs) {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function startTimer() {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev < 1) {
          handleTimerRunout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  function stopTimer() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function resetTimer() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setSecondsLeft(POMODORO_DURATION);
  }

  function handleTimerRunout() {
    alert("Time's up!");
    clearInterval(intervalRef.current);
    resetTimer();
  }

  return (
    <div className="timer-container">
      <div className="timer-display">
        {formatTime(secondsLeft)}
      </div>
      <div className="timer-controls">
        <button onClick={startTimer} disabled={isRunning} className="timer-btn">
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning} className="timer-btn">
          Stop
        </button>
        <button onClick={resetTimer} className="timer-btn">
          Reset
        </button>
      </div>
    </div>
  );
}