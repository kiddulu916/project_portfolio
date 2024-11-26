import React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import '../styles/App.css';

function App() {
    return (
        <div className="App">
            <h1>Jammming</h1>
            <SearchBar />
            <div className="App-playlist">
                <SearchResults />
                <Playlist />
            </div>
        </div>
    );
}

export default App;
