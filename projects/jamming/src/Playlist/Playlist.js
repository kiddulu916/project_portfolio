import React, { useState } from 'react';
import styles from './Playlist.module.css';

function Playlist({ playlistName, onNameChange, tracks, onRemove, onSave }) {
    const [newName, setNewName] = useState(playlistName);

    const handleNameChange = (event) => {
        setNewName(event.target.value);
        onNameChange(event.target.value);
    };

    const handleSave = () => {
        onSave(newName, tracks);
    };

    return (
        <div className={styles.Playlist}>
            <h2>My Playlist</h2>
            {/* Playlist name input */}
            <input
                className={styles.PlaylistName}
                value={newName}
                onChange={handleNameChange}
                placeholder="Enter playlist name"
            />
            
            {/* List of tracks */}
            <div className={styles.PlaylistTracks}>
                {tracks.length > 0 ? (
                    tracks.map((track) => (
                        <div key={track.id} className={styles.PlaylistTrack}>
                            <div className={styles.PlaylistTrackInfo}>
                                <h3>{track.name}</h3>
                                <p>{track.artist} | {track.album}</p>
                            </div>
                            {/* Remove track button */}
                            <button
                                className={styles.PlaylistAction}
                                onClick={() => onRemove(track)}
                            >
                                -
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tracks added to the playlist yet.</p>
                )}
            </div>

            {/* Save playlist button */}
            <button className={styles.SaveButton} onClick={handleSave}>
                Save Playlist
            </button>
        </div>
    );
}

export default Playlist;
