const politicians = [
    {
      quote: "The only thing we have to fear is fear itself.",
      author: "Franklin D. Roosevelt",
      options: [
        "Franklin D. Roosevelt",
        "Abraham Lincoln",
        "Eleanor Roosevelt",
        "John F. Kennedy"
      ]
    },
    {
      quote: "Injustice anywhere is a threat to justice everywhere.",
      author: "Martin Luther King Jr.",
      options: [
        "Martin Luther King Jr.",
        "Patrick Henry",
        "Ronald Reagan",
        "Che Guevara"
      ]
    },
    {
      quote: "Ask not what your country can do for you; ask what you can do for your country.",
      author: "John F. Kennedy",
      options: [
        "John F. Kennedy",
        "George Washington",
        "Michelle Obama",
        "Dwight D. Eisenhower"
      ]
    },
    {
      quote: "The ballot is stronger than the bullet.",
      author: "Abraham Lincoln",
      options: [
        "Abraham Lincoln",
        "Frederick Douglass",
        "Barack Obama",
        "Franklin D. Roosevelt"
      ]
    },
    {
      quote: "Power concedes nothing without a demand.",
      author: "Frederick Douglass",
      options: [
        "Frederick Douglass",
        "Andrew Jackson",
        "Eleanor Roosevelt",
        "Mao Zedong"
      ]
    },{
      quote: "The personal is political.",
      author: "Carol Hanisch",
      options: [
        "Carol Hanisch",
        "George Washington",
        "Michelle Obama",
        "Che Guevara"
      ]
    },
    {
      quote: "Give me liberty, or give me death!",
      author: "Patrick Henry",
      options: [
        "Patrick Henry",
        "Ronald Reagan",
        "Frederick Douglass",
        "Martin Luther King Jr."
      ]
    },
    {
      quote: "Politics is war without bloodshed while war is politics with bloodshed.",
      author: "Mao Zedong",
      options: [
        "Mao Zedong",
        "Barack Obama",
        "Abraham Lincoln",
        "Dwight D. Eisenhower"
      ]
    },
    {
      quote: "The revolution is not an apple that falls when it is ripe. You have to make it fall.",
      author: "Che Guevara",
      options: [
        "Che Guevara",
        "Franklin D. Roosevelt",
        "John F. Kennedy",
        "Andrew Jackson"
      ]
    },
    {
      quote: "One man with courage makes a majority.",
      author: "Andrew Jackson",
      options: [
        "Andrew Jackson",
        "Eleanor Roosevelt",
        "Patrick Henry",
        "George Washington"
      ]
    },
    {
      quote: "A change is brought about because ordinary people do extraordinary things.",
      author: "Barack Obama",
      options: [
        "Barack Obama",
        "Martin Luther King Jr.",
        "Michelle Obama",
        "Frederick Douglass"
      ]
    },
    {
      quote: "When they go low, we go high.",
      author: "Michelle Obama",
      options: [
        "Michelle Obama",
        "Ronald Reagan",
        "Frederick Douglass",
        "Eleanor Roosevelt"
      ]
    },
    {
      quote: "Liberty, when it begins to take root, is a plant of rapid growth.",
      author: "George Washington",
      options: [
        "George Washington",
        "Che Guevara",
        "Patrick Henry",
        "John F. Kennedy"
      ]
    },
    {
      quote: "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
      options: [
        "Eleanor Roosevelt",
        "Martin Luther King Jr.",
        "Andrew Jackson",
        "Franklin D. Roosevelt"
      ]
    },
    {
      quote: "A people that values its privileges above its principles soon loses both.",
      author: "Dwight D. Eisenhower",
      options: [
        "Dwight D. Eisenhower",
        "Barack Obama",
        "Mao Zedong",
        "George Washington"
      ]
    },
    {
      quote: "The arc of the moral universe is long, but it bends towards justice.",
      author: "Martin Luther King Jr.",
      options: [
        "Martin Luther King Jr.",
        "Carol Hanisch",
        "Abraham Lincoln",
        "Michelle Obama"
      ]
    },
    {
      quote: "I am not interested in power for power's sake, but I'm interested in power that is moral, that is right and that is good.",
      author: "Martin Luther King Jr.",
      options: [
        "Martin Luther King Jr.",
        "Ronald Reagan",
        "Frederick Douglass",
        "Patrick Henry"
      ]
    },
    {
      quote: "To be prepared for war is one of the most effective means of preserving peace.",
      author: "George Washington",
      options: [
        "George Washington",
        "John F. Kennedy",
        "Andrew Jackson",
        "Franklin D. Roosevelt"
      ]
    },
    {
      quote: "Government's first duty is to protect the people, not run their lives.",
      author: "Ronald Reagan",
      options: [
        "Ronald Reagan",
        "Che Guevara",
        "Eleanor Roosevelt",
        "Barack Obama"
      ]
    },
    {
      quote: "Freedom makes a huge requirement of every human being. With freedom comes responsibility.",
      author: "Eleanor Roosevelt",
      options: [
        "Eleanor Roosevelt",
        "Mao Zedong",
        "Michelle Obama",
        "Dwight D. Eisenhower"
      ]
    }
]

// Function to make a new array of all the quotes
let quotes;
const getQuotes = (object) => {
    quotes = [];
    object.forEach((quote) => {
        quotes.push(quote.quote)
    });
}
getQuotes(politicians);

// Function to make a new array of all the authors
let authors;
const getAuthors = (object) => {
    authors = [];
    object.forEach((quote) => {
        authors.push(quote.author)
    });
}
getAuthors(politicians);

// Function to make a new array of all the options
let options;
const getOptions = (object) => {
    options = [];
    object.forEach((quote) => {
        options.push(quote.options)
    });
}
getOptions(politicians);

// Function to select a random quote
let selectedQuote;
let selectedQuotesIndex;
let selectedAuthor;
let selectedOptions;
const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    selectedQuote = quotes[randomIndex];
    selectedQuotesIndex = quotes.indexOf(selectedQuote);
    selectedAuthor = authors[selectedQuotesIndex];
    selectedOptions = options[selectedQuotesIndex];
}

// Function remove the selected quote from the array
const removeQuote = () => {
    quotes.splice(selectedQuotesIndex, 1);
    authors.splice(selectedQuotesIndex, 1);
    options.splice(selectedQuotesIndex, 1);
}

// Important DOM objects
const quoteBox = document.getElementById('quote');
const answerBtns = document.querySelectorAll('.answer-btns');
const timer = document.getElementById('timer');
const score = document.getElementById('score');

// Function to start the timer
let timeLeft = 30;
let timeInterval = null;
let isRunning = false;
const startTimer = () => {
    if (!isRunning) {
        timeInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = `Time Left: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                pauseTimer();
                quoteBox.textContent = 'Time\'s Up!';
            }
        }, 1000);
        isRunning = true;
    }
}

// Function to pause the timer
const pauseTimer = () => {
    clearInterval(timeInterval);
    isRunning = false;
}

// Function to resume the timer
const resumeTimer = () => {
    if (!isRunning) {
        timeInterval = setInterval(() => {
            timeLeft--;
            timer.textContent = `Time Left: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                pauseTimer();
                quoteBox.textContent = 'Time\'s Up!';
            }
        }, 1000);
        isRunning = true;
    }
}

// Function to reset the timer
const resetTimer = () => {
    timeLeft = 30;
    timer.textContent = `Time Left: ${timeLeft}`;
}

// Function to stop the timer
const stopTimer = () => {
    clearInterval(timeInterval);
    isRunning = false;
} 

// Function to display the quote
const displayQuote = () => {
    quoteBox.innerText = selectedQuote;
}

// Function to shuffle selected options
const shuffleOptions = () => {
    selectedOptions.sort(() => Math.random() - 0.5);
}

//Function to display the options
const displayOptions = () => {
    shuffleOptions();
    answerBtns.forEach((answerBtn, index) => {
        answerBtn.textContent = selectedOptions[index];
    });
}

// Function to handle the event listeners for buttons
let selectedAnswer;
const handleEventListeners = () => {
    answerBtns.forEach((answerBtn) => {
        answerBtn.addEventListener('click', () => {
            selectedAnswer = answerBtn.innerText
        })
    })
}

// Function to check if the answer is correct
const checkAnswer = () => {
    if (selectedAnswer === selectedAuthor) {
        score.textContent = parseInt(score.textContent) + 10;
        pauseTimer();
        quoteBox.textContent = 'Correct!';
        removeQuote();
        resetTimer();
        startGame();
    } else {
        pauseTimer();
        quoteBox.textContent = 'Wrong!';
        removeQuote();
        resumeTimer();
        startGame();
    }
} 

// Function to start the game
const startGame = () => {
    if (quotes.length > 0) {
        getRandomQuote();
        displayQuote();
        displayOptions();
        startTimer();
        handleEventListeners();
        checkAnswer();   
    } else { 
        gameOver();
    } 
}

//Function to display the gameover buttons
const showGameOverButtons = () => {
    const gameOverButtons = document.querySelectorAll('.game-over');
    gameOverButtons.forEach((button) => {
        button.classList.add('visible');
    });
}

//Function to handle Game Over
const gameOver = () => {
    stopTimer();
    answerBtns.forEach((answerBtn) => {
        answerBtn.removeEventListener('click', () => {
            selectedAnswer = answerBtn.innerText
        })
    })
    quoteBox.textContent = `Game Over! Your score is ${score.textContent}`;
    setInterval(() => {
        showGameOverButtons();
        score.textContent = 0;
        resetTimer();
    })
}

// Start the game
startGame();