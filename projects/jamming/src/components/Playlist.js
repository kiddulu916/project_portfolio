import React from 'react';
import Tracklist from './Tracklist';
import '../styles/Playlist.css';

function Playlist() {
    const mockPlaylist = [
        { id: 3, name: 'Playlist Track 1', artist: 'Artist 3', album: 'Album 3' },
    ];

    return (
        <div className="Playlist">
            <input defaultValue="New Playlist" />
            <Tracklist tracks={mockPlaylist} isRemovable={true} />
            <button className="SaveButton">Save to Spotify</button>
        </div>
    );
}

export default Playlist;
