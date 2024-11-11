import spiritual from "./spiritual.mjs";

// quoteData.js
const quoteData = {
    quotes: [],
    removedQuotes: [],
    authors: [],
    removedAuthors: [],
    quoteOptions: [],
    removedOptions: [],
    currentIndex: -1,

    initialize(spiritual) {
        if (Array.isArray(spiritual) && spiritual.length > 0) {
            this.quotes = spiritual.map(({ quote }) => quote);
            this.authors = spiritual.map(({ author }) => author);
            this.quoteOptions = spiritual.map(item => item.options);
            this.removedQuotes = [];
        } else {
            this.quotes = [];
            this.authors = [];
            this.quoteOptions = [];
            this.currentIndex = -1;
        }
    },

    getRandomQuote() {
        if (this.quotes.length === 0) {
            console.log("No quotes available.");
            return null;
        } 

        let randomIndex = Math.floor(Math.random() * this.quotes.length);
        let randomQuote = this.quotes[randomIndex];
        let index = this.quotes.indexOf(randomQuote);
        this.currentIndex = index;

        return randomQuote;
    },

    getQuoteAuthor() {
        if (this.authors.length === 0) {
            console.log("No authors available.");
            return null;
        }
        let index = this.currentIndex;
        let quoteAuthor = this.authors[index];

        return quoteAuthor;
    },

    getQuoteOptions() {
        if (this.quoteOptions.length === 0) {
            return null;
        }
        let index = this.currentIndex;
        let quoteOptions = this.quoteOptions[index];

        return quoteOptions;
    },

    removeQuote(index) {
        if (index >= 0 && index < this.quotes.length) {
            const removedQuote = this.quotes.splice(index, 1)[0];
            this.removedQuotes.push(removedQuote);
            const removedAuthor = this.authors.splice(index, 1)[0];
            this.removedAuthors.push(removedAuthor);
            const removedOptions = this.quoteOptions.splice(index, 1)[0];
            this.removedOptions.push(removedOptions);
        } else {
            console.warn(`Invalid index for removing quote: ${index}`);
        }
    },

    resetRemovedQuotes() {
        // Reset all removed quotes to the main list if needed for a new game or round
        this.quotes = [...this.removedQuotes];
        this.removedQuotes = [];
        this.authors = [...this.removedAuthors];
        this.removedAuthors = [];
        this.options = [...this.removedOptions];
        this.removedOptions = [];
        this.currentIndex = -1;
    }
};

  
export default quoteData;
  