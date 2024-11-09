// game.js
import quoteData from './quoteData.mjs';
import politicians from './politicians.mjs';

const game = {
  quoteBox: null,
  answerBtns: null,
  scoreElement: null,
  score: 0,
  paused: false,
  gameEnded: false,
  timer: null,

  initialize(quoteElement, answerButtons, scoreElement, timerModule) {
    if (!quoteElement || !answerButtons || !scoreElement || !timerModule) {
      throw new Error('Invalid initialization parameters: Ensure DOM elements and timer module are provided.');
    }
    
    this.score = 0;
    this.paused = false;
    this.gameEnded = false;
    this.quoteBox = quoteElement;
    this.answerBtns = Array.from(answerButtons);
    this.scoreElement = scoreElement;
    this.timer = timerModule;

    this.timer.initialize();
    quoteData.initialize(politicians); // Assuming politicians is globally available
  },

  start() {
    if (this.gameEnded) return;

    if (quoteData.quotes.length > 0) {
      this.displayNewQuote();
      this.timer.start(() => this.handleTimeUp());
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
      if (shuffledOptions[index]) {
        btn.textContent = shuffledOptions[index];
        btn.disabled = false;
      }
    });
  },

  setupEventListeners(correctAnswer, quoteIndex) {
    const handleClick = () => {
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
    this.timer.reset(); // Resets timer to 30 seconds for the next round
    quoteData.removeQuote(quoteIndex);
  },

  handleWrongAnswer() {
    this.endRound('Wrong!');
    this.timer.pause();
  },

  handleTimeUp() {
    this.endRound('Time\'s Up!');
    this.timer.pause();
  },

  endRound(message) {
    this.quoteBox.textContent = message;
    this.answerBtns.forEach(btn => btn.disabled = true);
    this.start();
  },

  gameOver() {
    this.gameEnded = true;
    this.timer.stop();
    this.quoteBox.textContent = `Game Over! Your score is ${this.score}.`;
  },

  shuffleArray(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    }
  };

export default game;
