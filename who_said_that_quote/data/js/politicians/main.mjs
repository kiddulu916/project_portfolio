// main.js
import game from './game.mjs';
import politicians from './politicians.mjs';
import quoteData from './quoteData.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const quoteElement = document.getElementById('quote');
  const answerButtons = document.querySelectorAll('.answer-btns');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');

  game.initialize(quoteElement, answerButtons, scoreElement, timerElement);
  game.start();

  // Add event listeners for game over buttons
  document.querySelector('.try-again').addEventListener('click', () => {
    // Reset game state and start again
    document.getElementById('game-over').style.display = 'none';
    game.score = 0;
    scoreElement.textContent = game.score;
    quoteData.initialize(politicians);
    game.start();
  });

  document.querySelector('.new-category').addEventListener('click', () => {
    // Load new category of quotes and start game
    window.location.href = './categories.html';
  });
});
