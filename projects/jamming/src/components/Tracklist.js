import React from 'react';
import Track from './Track';
import '../styles/Tracklist.css';

function Tracklist({ tracks, isRemovable }) {
    return (
        <div className="Tracklist">
            {tracks.map((track) => (
                <Track key={track.id} track={track} isRemovable={isRemovable} />
            ))}
        </div>
    );
}

export default Tracklist;
