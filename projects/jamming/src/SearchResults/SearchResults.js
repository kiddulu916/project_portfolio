import React from 'react';
import Track from '../Track/Track';
import styles from './SearchResults.module.css';

function SearchResults({ results, onAddTrack }) {
    return (
        <div className={styles.SearchResults}>
            <h2>Search Results</h2>
            {results.length === 0 ? (
                <p>No results found. Please try again.</p>
            ) : (
                <div className={styles.TrackList}>
                    {results.map((track) => (
                        <Track
                            key={track.id}
                            track={track}
                            onAdd={onAddTrack}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;