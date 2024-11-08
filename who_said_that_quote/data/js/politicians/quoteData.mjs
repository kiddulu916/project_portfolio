import politicians from "./politicians.mjs";

// quoteData.js
const quoteData = {
    quotes: [],
    authors: [],
    options: [],
  
    initialize(politicians) {
        if (Array.isArray(politicians) && politicians.length > 0) {
            this.quotes = politicians.map(({ quote }) => quote);
            this.authors = politicians.map(({ author }) => author);
            this.options = politicians.map(({ options }) => options);
        } else {
            console.warn("No politicians provided");
        }
    },

    getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * this.quotes.length);
        return {
            quote: this.quotes[randomIndex],
            author: this.authors[randomIndex],
            options: this.options[randomIndex]
        }
    },

    removeQuote(index) {
        if (index >= 0 && index < this.quotes.length) {
            this.quotes.splice(index, 1);
            this.authors.splice(index, 1);
            this.options.splice(index, 1);
        } else {
            console.warn(`Invalid index for removing quote: ${index}`);
        }
    }
};
  
export default quoteData;
  