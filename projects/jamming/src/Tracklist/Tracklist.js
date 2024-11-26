import React from 'react';
import Track from '../Track/Track'; // Assuming you have the Track component
import styles from './TrackList.module.css';

function TrackList({ tracks, onAddTrack, onRemoveTrack, isRemoval = false }) {
    // Render the track list or a message if no tracks are available
    const renderTrackList = () => {
        if (tracks.length === 0) {
            return <p>No tracks available. Try searching!</p>;
        }

        return tracks.map((track) => (
            <Track
                key={track.id}
                track={track}
                onAdd={onAddTrack}
                onRemove={onRemoveTrack}
                isRemoval={isRemoval}
            />
        ));
    };

    return (
        <div className={styles.TrackList}>
            <h2>Track List</h2>
            <div>{renderTrackList()}</div>
        </div>
    );
}

export default TrackList;
