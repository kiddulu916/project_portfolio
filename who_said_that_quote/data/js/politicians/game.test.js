import game  from './game.mjs';
import timer from './timer.mjs';
import quoteData from './quoteData.mjs';
import politicians from './politicians.mjs';

// Mocking the modules
jest.mock('./timer.mjs', () => ({
  initialize: jest.fn(),
  start: jest.fn(),
  stop: jest.fn(),
  reset: jest.fn()
}));

jest.mock('./quoteData.mjs', () => ({
  quotes: [
    { quote: 'Sample quote 1', author: 'Author 1', options: ['Author 1', 'Author 2'] },
    { quote: 'Sample quote 2', author: 'Author 2', options: ['Author 1', 'Author 2'] }
  ],
  initialize: jest.fn(),
  getRandomQuote: jest.fn(() => ({
    quote: 'Sample quote 1',
    author: 'Author 1',
    options: ['Author 1', 'Author 2'],
    index: 0
  })),
  removeQuote: jest.fn()
}));

describe('Game Module', () => {
  let quoteElement, answerButtons, scoreElement, timerElement;

  beforeEach(() => {
    // Set up DOM elements as Jest environment does not include them natively
    quoteElement = document.createElement('div');
    scoreElement = document.createElement('span');
    timerElement = document.createElement('div');
    answerButtons = [document.createElement('button'), document.createElement('button')];
    
    // Initialize the game with mocked elements
    game.initialize(quoteElement, answerButtons, scoreElement, timerElement);
    game.score = 0;
    game.start();
  });

  afterEach(() => {
    jest.resetModules();
  });

  test('initializes the game correctly', () => {
    expect(timer.initialize).toHaveBeenCalledWith(timerElement);
    expect(quoteData.initialize).toHaveBeenCalled();
  });

  test('starts the game and displays a new quote', () => {
    game.start();

    expect(quoteElement.textContent).toBe('Sample quote 1');
    expect(timer.start).toHaveBeenCalled();
    expect(answerButtons[0].textContent).toBeDefined();
    expect(answerButtons[1].textContent).toBeDefined();
  });

  test('updates score and resets timer on correct answer', () => {
    // Simulate correct answer
    game.checkAnswer('Author 1', 'Author 1', 0);
    
    // Verify that score is updated
    expect(game.score).toBe(10);
    expect(scoreElement.textContent).toBe('10');

    // Verify that timer is reset
    expect(timer.reset).toHaveBeenCalledWith(30);

    // Verify that quote is removed
    expect(quoteData.removeQuote).toHaveBeenCalledWith(0);
    jest.clearAllMocks();
  });

  test('does not reset timer on wrong answer and continues game', () => {
    // Simulate wrong answer
    game.checkAnswer('Author 2', 'Author 1', 0);

    // Verify that score and timer are not reset
    expect(game.score).toBe(0); // Score should not change on a wrong answer
    expect(timer.reset).not.toHaveBeenCalled();
    expect(timer.stop).not.toHaveBeenCalled(); // Timer should not stop

    // Verify 
  });

  test('handles game over when no quotes are left', () => {
    // Mock the quotes array as empty
    quoteData.quotes = [];
    game.start();

    expect(timer.stop).toHaveBeenCalled();
    expect(quoteElement.textContent).toContain('Game Over');
  });

  test('displays "Time\'s Up!" when timer expires', () => {
    game.start();
    timer.start.mock.calls[0][0](); // Simulate timer callback

    expect(quoteElement.textContent).toBe("Time's Up!");
    expect(timer.stop).toHaveBeenCalled();
  });
});
