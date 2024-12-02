import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import styles from "./App.module.css";
import { Spotify } from "../../util/Spotify/Spotify";


function App() {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState("");
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        Spotify.getAccessToken();
    }, []);

    useEffect(() => {
        async function fetchRecommendations() {
            const topTracks = await Spotify.getTopTracks();
            setRecommendations(topTracks);
        }
        fetchRecommendations();
    }, []);

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
        setIsSaving(true);
        Spotify.savePlaylist(playlistName, trackURIs).then(() => {
            updatePlaylistName("New Playlist");
            setPlaylistTracks([]);
            setIsSaving(false);
        }).catch(() => {
            setIsSaving(false);
            alert("Failed to save playlist. Please try again.");
        });
    }


    function search(term) {
        Spotify.search(term).then(result => {
            const filteredResults = result.filter(
                track => !playlistTracks.some(playlistTrack => playlistTrack.id === track.id)
            );
            setSearchResults(filteredResults);
        });
    }

    function handleSearchChange(term) {
        setSearchTerm(term); // Your existing state for the search term
        setIsSearching(term.trim().length > 0); // Set `isSearching` to true if term exists
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

    useEffect(() => {
        if (isSaving) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        // Cleanup to reset body style
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isSaving]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const savedSearch = urlParams.get("search");
        if (savedSearch) {
            search(savedSearch);
            window.history.replaceState(null, "", "/");
        }
    }, []);

    useEffect(() => {
        const savedPlaylistName = window.localStorage.getItem('playlistName');
        const savedPlaylistTracks = JSON.parse(window.localStorage.getItem('playlistTracks') || '[]');
        if (savedPlaylistName) setPlaylistName(savedPlaylistName);
        if (savedPlaylistTracks.length > 0) setPlaylistTracks(savedPlaylistTracks);
    }, []);

    useEffect(() => {
        async function fetchRecommendations() {
            const topTracks = await Spotify.getTopTracks(); // Implement in Spotify.js
            setSearchResults(topTracks);
        }
        fetchRecommendations();
    }, []);

    useEffect(() => {
        window.localStorage.setItem('playlistName', playlistName);
    }, [playlistName]);

    useEffect(() => {
        window.localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
    }, [playlistTracks]);

    if (isSaving) {
        return (
            <div className={styles['loading-overlay']}>
                <div className={styles['loading-spinner']}></div>
            </div>
        );
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
                        recommendations={recommendations}
                        isSearching={isSearching}
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