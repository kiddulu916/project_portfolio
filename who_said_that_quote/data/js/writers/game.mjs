// game.js
import quoteData from './quoteData.mjs';
import writers from './writers.mjs';
import timer from '../timer.mjs';

const game = {
  quoteBox: null,
  answerBtns: null,
  scoreElement: null,
  score: 0,
  gameEnded: false,
  currentQuote: null,
  currentAuthor: null,
  currentOptions: null,
  currentQuoteIndex: null,

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
    quoteData.initialize(writers);
  },

  start() {
    if (quoteData.quotes.length === 0) {
      quoteData.resetRemovedQuotes();
      this.gameOver();
    } else {
    const quote = quoteData.getRandomQuote();
    const author = quoteData.getQuoteAuthor();
    const options = quoteData.getQuoteOptions();
    const index = quoteData.currentIndex;
    this.currentQuote = quote;
    this.currentAuthor = author;
    this.currentOptions = options;
    this.currentQuoteIndex = index;
    this.displayNewQuote(quote, author, options, index);
    timer.start(() => this.handleTimeUp());
    }
  },

  displayNewQuote(quote, author, options, index) {
    this.quoteBox.textContent = quote;
    this.displayOptions(options);
    this.setupEventListeners(author, index);
  },

  displayOptions(options) {
    if (!options || options.length === 0) {
        console.warn("No options provided to display.");
        this.answerBtns.forEach(btn => {
            btn.textContent = "";
            btn.disabled = true;
        });
        this.gameOver();
    } else {
      
      // Shuffle the options array
      const shuffledOptions = this.shuffleArray(options);
            
      this.answerBtns.forEach((btn, index) => {
        if (index < shuffledOptions.length) {
          btn.textContent = shuffledOptions[index];
          btn.disabled = false;
        } else {
          btn.textContent = "";
          btn.disabled = true;  
        }
      });
    }
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
    } else {
      this.handleWrongAnswer(quoteIndex);
    }
  },
  
  updateScore(points) {
    this.score += points;
    this.scoreElement.textContent = `Score: ${this.score}`;
  },
  
  handleCorrectAnswer(quoteIndex) {
    timer.stop();
    this.answerBtns.forEach(btn => {
      btn.textContent = "";
      btn.disabled = true;
    });
    timer.reset(30); // Resets timer to 30 seconds for the next round
    quoteData.removeQuote(quoteIndex);
    this.endRound('Correct!');
    
  },

  handleWrongAnswer(quoteIndex) {
    timer.stop();
    this.answerBtns.forEach(btn => {
      btn.textContent = "";
      btn.disabled = true;
    });
    quoteData.removeQuote(quoteIndex);
    timer.reset(30);
    this.endRound('Wrong!');
  },

  handleTimeUp() {
    timer.stop();
    this.answerBtns.forEach(btn => {
      btn.textContent = "";
      btn.disabled = true;
    });
    timer.reset(30);
    this.endRound('Time\'s Up!');
  },

  endRound(message) {
    this.quoteBox.textContent = message;
    setTimeout(() => {
      this.start(); 
    }, 1000);
  },

  gameOver() {
    timer.stop();
    this.quoteBox.textContent = `Game Over! Your score is ${this.score}.`;

    this.answerBtns.forEach(btn => {
      btn.textContent = "";
      btn.disabled = true;
    });

    setTimeout(() => this.showGameOverBtns(), 1000);
  },

  // Show game-over buttons with animation
  showGameOverBtns() {
    const gameOverBtnsContainer = document.getElementById('game-over-btns');
    const tryAgainButton = document.getElementById('try-again');
    const newCategoryButton = document.getElementById('new-category');

    if (gameOverBtnsContainer && tryAgainButton && newCategoryButton) {
      gameOverBtnsContainer.style.display = 'flex';

      setTimeout(() => {
        tryAgainButton.style.opacity = '1';
        newCategoryButton.style.opacity = '1';
      }, 100);
    } else {
        console.warn('game-over element not found.');
    }
  },

  // Function to reset the game
  resetGame() {
    this.score = 0;
    this.scoreElement.textContent = `Score: ${this.score}`;
    quoteData.resetRemovedQuotes();
    this.start();
  },

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};

export default game;
