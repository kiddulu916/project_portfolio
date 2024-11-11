// timer.js
const timer = {
  timeLeft: 30,
  isRunning: false,
  timerElement: null,
  paused: false,
  intervalId: null,
  duration: 30,  // Default duration in seconds, can be customized

  initialize(element, duration = 30) {
    if (element instanceof HTMLElement) {
      this.timerElement = element;
      this.duration = duration;  // Set duration to the provided value or default
      this.timeLeft = duration;
      this.updateDisplay();
    } else {
      console.error("Invalid timer element passed to initialize().");
    }
  },

  start(callback) {
    if (this.isRunning) this.stop();  // Stop any existing timer before starting a new one

    this.timeLeft = this.duration;
    this.isRunning = true;
    this.paused = false;
    this.intervalId = setInterval(() => {
      if (!this.paused) {
        this.timeLeft -= 1;
        this.updateDisplay();

        if (this.timeLeft <= 0) {
          clearInterval(this.intervalId);
          this.isRunning = false;
          callback();  // Trigger the callback when time runs out
        }
      }
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
    this.isRunning = false;
    this.paused = false;
  },

  reset(newDuration = null) {
    this.stop();
    if (newDuration !== null) this.duration = newDuration;
    this.timeLeft = this.duration;
    this.updateDisplay();
  },

  updateDisplay() {
    if (this.timerElement) {
      this.timerElement.textContent = `Time Left: ${this.timeLeft}s`;
    } else {
      console.warn("Timer element not set. Unable to update display.");
    }
  }
};

export default timer;
