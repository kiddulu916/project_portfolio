import React from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist(props) {
    function handleNameChange({ target }) {
        props.onNameChange(target.value);
    }

    function handleGetPlaylists() {
        if (props.playlistTracks.length > 0) {
            if (window.confirm("Unsaved playlist will be lost. Do you want to continue?")) {
                props.onFetchPlaylists();
            }
        } else {
            props.onFetchPlaylists();
        }
    }


    return (
        <div className={styles.Playlist}>
            <input 
                defaultValue={props.playlistName} 
                onChange={handleNameChange} 
                placeholder="Enter Playlist Name"  
            />
            
            <Tracklist 
                userSearchResults={props.playlistTracks} 
                onRemove={props.onRemove}
                isRemoval={true} 
            />
            <button className={styles['Playlist-save']} onClick={props.onSave}>
                SAVE TO SPOTIFY
            </button>

            <button className={styles['Playlist-save']} onClick={handleGetPlaylists}>
                GET PLAYLISTS
            </button>

            {props.userPlaylists.length > 0 && (
                <div className={styles.UserPlaylists}>
                    <h3>Select a Playlist</h3>
                    <ul>
                        {props.userPlaylists.map(playlist => (
                            <li key={playlist.id} onClick={() => props.onSelectPlaylist(playlist.id)} className={styles.PlaylistItem}>
                                {playlist.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Playlist;