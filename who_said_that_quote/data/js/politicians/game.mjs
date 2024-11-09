// game.js
import quoteData from './quoteData.mjs';
import politicians from './politicians.mjs';
import timer from './timer.mjs';

const game = {
  quoteBox: null,
  answerBtns: null,
  scoreElement: null,
  score: 0,
  gameEnded: false,

  initialize(quoteElement, answerButtons, scoreElement, timerModule) {
    if (!quoteElement || !answerButtons || !scoreElement || !timerModule) {
      throw new Error('Invalid initialization parameters: Ensure DOM elements and timer module are provided.');
    }
    
    this.score = 0;
    this.gameEnded = false;
    this.quoteBox = quoteElement;
    this.answerBtns = Array.from(answerButtons);
    this.scoreElement = scoreElement;

    timer.initialize(timerModule);
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
    if (this.gameEnded) return;

    const quoteDataObj = quoteData.getRandomQuote();
    if (!quoteDataObj) {
      this.gameOver();
      return;
    }

    const { quote, author, options, index } = quoteDataObj;
    this.quoteBox.textContent = quote;
    this.displayOptions(options);
    this.setupEventListeners(author, index);
  },

  displayOptions(options) {
    const shuffledOptions = this.shuffleArray(options);
    this.answerBtns.forEach((btn, index) => {
      btn.textContent = shuffledOptions[index];
      btn.disabled = false;
    });
  },

  setupEventListeners(correctAnswer, quoteIndex) {
    const handleClick = (event) => {
      this.checkAnswer(event.target.textContent, correctAnswer, quoteIndex);
    };

    this.answerBtns.forEach(btn => {
      btn.onclick = handleClick;
    });
  },

  checkAnswer(selectedAnswer, correctAnswer, quoteIndex) {
    if (selectedAnswer === correctAnswer) {
      this.updateScore(10);
      this.handleCorrectAnswer(quoteIndex);
      this.start();
    } else {
      this.handleWrongAnswer();
      this.displayNewQuote();
    }
  },
  
  updateScore(points) {
    this.score += points;
    this.scoreElement.textContent = this.score;
  },
  
  handleCorrectAnswer(quoteIndex) {
    timer.stop();
    this.endRound('Correct!');
    timer.reset(30); // Resets timer to 30 seconds for the next round
    quoteData.removeQuote(quoteIndex);

  },

  handleWrongAnswer() {
    this.quoteBox.textContent = 'Wrong!';
    timer.pause();
    setTimeout(() => {
      timer.resume();
      quoteData.removeQuote(quoteIndex);
    }, 1500);
  },

  handleTimeUp() {
    timer.stop();
    this.endRound('Time\'s Up!');
    setTimeout(() => {
      this.start();
    }, 1500);
  },

  endRound(message) {
    this.quoteBox.textContent = message;
    this.answerBtns.forEach(btn => btn.disabled = true);
    setTimeout(() => this.start(), 2000);
  },

  gameOver() {
    this.gameEnded = true;
    timer.stop();
    this.quoteBox.textContent = `Game Over! Your score is ${this.score}.`;
    this.answerBtns.forEach(btn => btn.disabled = true);
    setTimeout(() => this.showGameOverBtns(), 1500);
  },

  // Show gameover buttons
  showGameOverBtns() {
    document.getElementById('game-over').style.display = 'flex';
  },

  shuffleArray(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
};

export default game;
