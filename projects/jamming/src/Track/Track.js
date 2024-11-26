import React from 'react';
import styles from './Track.module.css';

function Track({ track, onAdd, onRemove, isRemoval }) {
    const handleAdd = () => {
        if (onAdd) onAdd(track); // Call onAdd if it exists
    };

    const handleRemove = () => {
        if (onRemove) onRemove(track); // Call onRemove if it exists
    };

    return (
        <div className={styles.Track}>
            <div className={styles.TrackInformation}>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            <button
                className={`${styles.TrackAction} ${isRemoval ? styles.Remove : styles.Add}`}
                onClick={isRemoval ? handleRemove : handleAdd}
            >
                {isRemoval ? '-' : '+'}
            </button>
        </div>
    );
}

export default Track;