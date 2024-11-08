import { clear } from "console";

// timer.js
const timer = {
  timeLeft: 30,
  isRunning: false,
  timerElement: null,
  paused: false,
  intetvalId: null,

  initialize(element) {
    if (element && element instanceof HTMLElement) {
      this.timerElement = element;
    } else {
      console.error("Invalid timer element passed to initialize().");
    }
  },

  start(callback) {
    if (this.isRunning) {
      this.stop();
    }

    this.timeLeft = this.duration;
    this.intervalId = setInterval(() => {
      if (!this.paused) {
        this.timeLeft -= 1;
        this.updateDisplay();
        if (this.timeLeft <= 0) {
          clearInterval(this.intervalId);
          callback();
        }
      }
    }, 1000);
    this.isRunning = true;
  },

  pause() {
    this.paused = true;
    this.isRunning = false;
  },

  resume() {
    this.paused = false;
    this.isRunning = true;
  },

  stop() {
    clearInterval(this.intervalId);
    this.isRunning = false;
  },

  reset() {
    this.stop();
    this.timeLeft = 30;
    this.updateDisplay();
  },

  updateDisplay() {
    this.timerElement.textContent = `Time Left: ${this.timeLeft}`;
  }
};

export default timer;
