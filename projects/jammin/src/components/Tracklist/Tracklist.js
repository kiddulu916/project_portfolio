import React from "react";
import styles from "./Tracklist.module.css";
import Track from "../Track/Track";

function Tracklist(props) {
    return (
        <div>
            {props.userSearchResults.map(track => (
                <div key={track.id}>
                    <p>{track.name} by {track.artist}</p>
                    {track.preview_url && (
                        <audio controls>
                            <source src={track.preview_url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    )}
                    <button onClick={() => props.onAdd ? props.onAdd(track) : props.onRemove(track)}>
                        {props.isRemoval ? 'Remove' : 'Add'}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Tracklist;