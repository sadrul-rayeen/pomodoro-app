const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const progressBar = document.getElementById("progress");
const pomodoroCountDisplay = document.getElementById("pomodoro-count");
const chimeSound = document.getElementById("chime");

let pomodoroCount = 0;
let isTimerRunning = false;
let interval;
let timeLeft = 25 * 60;
let progressWidth = 0;
let cycle = 0; // to track 4 cycles

startBtn.addEventListener("click", () => {
  if (!isTimerRunning) {
    startPomodoro();
  }
});

function startPomodoro() {
  isTimerRunning = true;
  startBtn.disabled = true;
  progressWidth = 0;
  updateProgressBar();

  interval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    updateProgressBar();

    if (timeLeft === 0) {
      clearInterval(interval);
      chimeSound.play();
      pomodoroCount++;
      updatePomodoroCount();

      if (pomodoroCount % 4 === 0) {
        cycle++;
        startLongBreak();
      } else {
        startShortBreak();
      }
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function updateProgressBar() {
  progressWidth = ((25 * 60 - timeLeft) / (25 * 60)) * 100;
  progressBar.style.width = `${progressWidth}%`;
}

function startShortBreak() {
  timeLeft = 5 * 60;
  isTimerRunning = false;
  startBtn.disabled = false;
  timerDisplay.textContent = "05:00";
}

function startLongBreak() {
  timeLeft = 15 * 60;
  isTimerRunning = false;
  startBtn.disabled = false;
  timerDisplay.textContent = "15:00";
}

function updatePomodoroCount() {
  pomodoroCountDisplay.textContent = `Pomodoros Completed: ${pomodoroCount}`;
}
