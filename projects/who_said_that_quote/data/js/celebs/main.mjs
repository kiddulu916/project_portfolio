// main.js
import game from './game.mjs';
import famous from './famous.mjs';
import quoteData from './quoteData.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const quoteElement = document.getElementById('quoteBox');
  const answerButtons = document.querySelectorAll('.answer-btns');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  const gameOverElement = document.getElementById('game-over');
  const tryAgainButton = document.querySelector('.try-again');
  const newCategoryButton = document.querySelector('.new-category');

  // Ensure all essential DOM elements are available
  if (!quoteElement || !scoreElement || !timerElement || answerButtons.length === 0) {
    console.error('Missing essential DOM elements for game initialization.');
    return;
  }

  // Initialize and start the game
  game.initialize(quoteElement, answerButtons, scoreElement, timerElement);
  game.start();

  // Function to reset the game
  function resetGame() {
    gameOverElement.style.display = 'none';   // Hide game-over screen
    game.score = 0;
    scoreElement.textContent = game.score;    // Reset score display
    quoteData.initialize(famous);        // Reinitialize quotes
    game.start();
  }

  // Event listener for "Try Again" button
  tryAgainButton.addEventListener('click', resetGame);

  // Event listener for "New Category" button
  newCategoryButton.addEventListener('click', () => {
    window.location.href = './categories.html';  // Redirect to categories page
  });
});

