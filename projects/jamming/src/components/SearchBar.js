import React from 'react';
import '../styles/SearchBar.css';

function SearchBar() {
    return (
        <div className="SearchBar">
            <input placeholder="Enter a song, album, or artist" />
            <button className="SearchButton">Search</button>
        </div>
    );
}

export default SearchBar;