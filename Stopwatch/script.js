// script.js
let startTime, elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById("timeDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const milliseconds = ms % 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 60000) % 60);
  const hours = Math.floor(ms / 3600000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function startPauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
    startPauseBtn.textContent = "Start";
  } else {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      timeDisplay.textContent = formatTime(elapsedTime + (Date.now() - startTime));
    }, 10);
    isRunning = true;
    startPauseBtn.textContent = "Pause";
  }
}

function resetStopwatch() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  timeDisplay.textContent = "00:00:00.000";
  startPauseBtn.textContent = "Start";
  laps.innerHTML = "";
}

function recordLap() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime + (Date.now() - startTime));
    const lapItem = document.createElement("li");
    lapItem.textContent = lapTime;
    laps.appendChild(lapItem);
  }
}

startPauseBtn.addEventListener("click", startPauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
