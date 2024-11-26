import React from 'react';
import '../styles/Track.css';

function Track({ track, isRemovable }) {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                <p>
                    {track.artist} | {track.album}
                </p>
            </div>
            {isRemovable ? (
                <button className="Track-action">-</button>
            ) : (
                <button className="Track-action">+</button>
            )}
        </div>
    );
}

export default Track;
