import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import styles from "./App.module.css";
import { Spotify } from "../../util/Spotify/Spotify";


function App () {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);

    function addTrack(track) {
        const existingTrack = playlistTracks.find((t) => t.id === track.id);
        const newTrack = playlistTracks.concat(track);
        if (existingTrack) {
            console.log("Track already exists in playlist.");
        } else {
            setPlaylistTracks(newTrack);
        }
    }

    function removeTrack(track) {
        const existingTrack = playlistTracks.filter((t) => t.id !== track.id);
        setPlaylistTracks(existingTrack);
    }

    function updatePlaylistName(name) {
        setPlaylistName(name);
    }

    function savePlaylist() {
        const trackURIs = playlistTracks.map((t) => t.uri);
        Spotify.savePlaylist(playlistName, trackURIs).then(() => {
            updatePlaylistName("New Playlist");
            setPlaylistTracks([]);
        });
    }

    function search(term) {
        Spotify.search(term).then((result) => setSearchResults(result));
    }

    async function fetchUserPlaylists() {
        try {
            const playlists = await Spotify.getUserPlaylists();
            setPlaylistTracks([]);
            setUserPlaylists(playlists);
        } catch (error) {
            console.error("Error fetching user playlists:", error);
        }
    }

    async function selectPlaylist(playlistId) {
        try {
            const tracks = await Spotify.getPlaylistTracks(playlistId);
            const selectedPlaylist = userPlaylists.find(p => p.id === playlistId);
            updatePlaylistName(selectedPlaylist.name);
            setPlaylistTracks(tracks);
            setUserPlaylists([]);
        } catch (error) {
            console.error("Error fetching playlist tracks:", error);
        }
    }


    return (
        <div>
            <h1>
                JA<span className={styles.highlight}>MMM</span>IN<span className={styles.poweredBy}>Powered By Spotify&copy;</span>
            </h1>
            <div className={styles.App}>
                
                <SearchBar 
                    onSearch={search}
                />

                <div className={styles["App-playlist"]}>
                    
                    <SearchResults 
                        userSearchResults={searchResults} 
                        onAdd={addTrack} 
                    />

                    <Playlist 
                        playlistName={playlistName} 
                        playlistTracks={playlistTracks} 
                        onRemove={removeTrack} 
                        onNameChange={updatePlaylistName} 
                        onSave={savePlaylist}
                        onFetchPlaylists={fetchUserPlaylists}
                        onSelectPlaylist={selectPlaylist}
                        userPlaylists={userPlaylists}
                    />
                </div>
            </div>
      </div>
    )
}

export default App;