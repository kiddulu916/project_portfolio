import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState(''); // State for storing user input

    // Handle input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // Handle form submission (search)
    const handleSearchSubmit = (event) => {
        event.preventDefault(); // Prevent page reload
        if (query.trim()) {
            onSearch(query); // Pass the query to the parent component
        }
    };

    return (
        <div className={styles.SearchBar}>
            <form onSubmit={handleSearchSubmit} className={styles.Form}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for a song, artist, or album"
                    className={styles.SearchInput}
                />
                <button type="submit" className={styles.SearchButton}>Search</button>
            </form>
        </div>
    );
}

export default SearchBar;