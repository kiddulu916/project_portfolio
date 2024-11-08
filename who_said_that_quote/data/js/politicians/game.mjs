// game.js
import quoteData from './quoteData.mjs';
import timer from './timer.mjs';
import politicians from './politicians.mjs';

const game = {
  quoteBox: null,
  answerBtns: null,
  scoreElement: null,
  score: 0,
  paused: false,
  gameEnded: false,

  initialize(quoteElement, answerButtons, scoreElement, timerElement) {
    this.score = 0;
    this.paused = false;
    this.gameEnded = false;
    this.quoteBox = quoteElement;
    this.answerBtns = answerButtons;
    this.scoreElement = scoreElement;
    timer.initialize(timerElement);
    quoteData.initialize(politicians); // Assuming politicians is globally available
  },

  start() {
    if (this.gameEnded) return;
    if (quoteData.quotes.length > 0) {
      this.displayNewQuote();
      timer.start(() => this.handleTimeUp());
    } else {
      this.gameOver();
    }
  },

  displayNewQuote() {
    if (this.gameEnded) return;{
      const { quote, author, options, index } = quoteData.getRandomQuote();
      this.quoteBox.textContent = quote;
      this.displayOptions(options);
      this.setupEventListeners(author, index);
    }
  },

  displayOptions(options) {
    const shuffledOptions = this.shuffleArray(options);
    this.answerBtns.forEach((btn, index) => {
      btn.textContent = shuffledOptions[index];
    });
  },

  setupEventListeners(correctAnswer, quoteIndex) {
    this.answerBtns.forEach(btn => {
      btn.onclick = () => this.checkAnswer(btn.textContent, correctAnswer, quoteIndex);
    });
  },

  checkAnswer(selectedAnswer, correctAnswer, quoteIndex) {
    if (selectedAnswer === correctAnswer) {
      this.updateScore(10);
      this.handleCorrectAnswer(quoteIndex);
    } else {
      this.handleWrongAnswer();
    }
  },
  
  updateScore(points) {
    this.score += points;
    this.scoreElement.textContent = this.score;
  },
  
  handleCorrectAnswer(quoteIndex) {
    this.endRound('Correct!');
    timer.reset(30); // Resets timer to 30 seconds for the next round
    quoteData.removeQuote(quoteIndex);
    setTimeout(() => this.start(), 1500);
  },

  handleWrongAnswer() {
    this.quoteBox.textContent = 'Wrong!';
    this.pauseTimer();
    setTimeout(() => {
      this.resumeTimer();
      this.displayNewQuote();
    }, 1500);
  },

  handleTimeUp() {
    if (this.gameEnded) return;
    this.endRound('Time\'s Up!');
    setTimeout(() => this.start(), 1500);
  },

  endRound(message) {
    this.quoteBox.textContent = message;
    timer.stop();
  },

  gameOver() {
    this.gameEnded = true;
    timer.stop();
    this.quoteBox.textContent = `Game Over! Your score is ${this.score}.`;
    this.showGameOverButtons();
  },

  showGameOverButtons() {
    document.querySelectorAll('.game-over').forEach(btn => {
      btn.classList.add('visible');
    });
  },

  shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },

  pauseTimer() {
    timer.pause();
    this.paused = true;
  },

  resumeTimer() {
    timer.resume();
    this.paused = false;
  }
};

export default game;
