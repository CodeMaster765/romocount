console.log('welcome');
// script.js

const timeDisplay = document.getElementById("time-display");
const startPauseBtn = document.getElementById("start-pause");
const resetBtn = document.getElementById("reset");
const focusModeBtn = document.getElementById("focus-mode");
const shortBreakBtn = document.getElementById("short-break-mode");
const longBreakBtn = document.getElementById("long-break-mode");
const progressCircle = document.getElementById("progress");

let duration = 25 * 60; // default: 25 minutes
let remainingTime = duration;
let timer;
let isRunning = false;

function updateTimeDisplay() {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  updateProgress();
}

function updateProgress() {
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (remainingTime / duration) * circumference;
  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = `${circumference - progress}`;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startPauseBtn.textContent = "Start";
  } else {
    isRunning = true;
    startPauseBtn.textContent = "Pause";
    timer = setInterval(() => {
      if (remainingTime > 0) {
        remainingTime--;
        updateTimeDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.textContent = "Start";
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingTime = duration;
  updateTimeDisplay();
  startPauseBtn.textContent = "Start";
}

function setMode(minutes, activeBtn) {
  document.querySelectorAll(".mode").forEach(btn => btn.classList.remove("active"));
  activeBtn.classList.add("active");
  duration = minutes * 60;
  remainingTime = duration;
  resetTimer();
}

// Event listeners
startPauseBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
focusModeBtn.addEventListener("click", () => setMode(25, focusModeBtn));
shortBreakBtn.addEventListener("click", () => setMode(5, shortBreakBtn));
longBreakBtn.addEventListener("click", () => setMode(15, longBreakBtn));

// Initial setup
updateTimeDisplay();
