import React, { useEffect, useState } from 'react';
import { 
    getAuthUrl, 
    exchangeCodeForToken, 
    logout 
} from '../api/spotifyAuth';
import {
    search,
    createPlaylist,
    addTracksToPlaylist,
    removeTracksFromPlaylist,
    getUserPlaylists,
    getCurrentUserProfile,
} from './spotifyApi';
import SearchBar from '../SearchBar/SearchBar';
import Tracklist from '../Tracklist/Tracklist';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
import styles from './App.module.css';

function App() {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState({
        name: '',
        tracks: [],
        selectedId: null,
    });
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [searchType, setSearchType] = useState('track');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Handle Spotify authentication token exchange
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            exchangeCodeForToken(code)
                .then(data => {
                    setToken(data.access_token);
                    window.history.replaceState({}, null, '/');
                })
                .catch(error => {
                    console.error('Error exchanging code for token:', error);
                    setError('Error during authentication.');
                }); 
        }
    }, []);

    // Fetch user profile and playlists once the token is available
    useEffect(() => {
        if (token) {
            getCurrentUserProfile(token)
                .then(profile => setUserId(profile.id))
                .catch(error => {
                    console.error('Error fetching user profile:', error);
                    setError('Error fetching user profile.');
                });

            getUserPlaylists(token)
                .then(playlists => setUserPlaylists(playlists.items))
                .catch(error => {
                    console.error('Error fetching user playlists:', error);
                    setError('Error fetching playlists.');
                })
                .finally(() => setLoading(false));
        }
    }, [token]);

    // Handle track search
    const handleSearch = async () => {
        if (query && token) {
            setLoading(true);
            try {
                const results = await search(query, searchType, token);
                setSearchResults(results);
            } catch (error) {
                console.error(`Error searching ${searchType}s:`, error);
                setError(`Error searching ${searchType}s.`);
            } finally {
                setLoading(false);
            }
        }
    };

    // Handle playlist creation
    const handleCreatePlaylist = async () => {
        const { name, tracks } = playlistInfo;
        if (name && tracks.length > 0 && userId && token) {
            setLoading(true);
            try {
                const playlist = await createPlaylist(userId, name, token);
                await addTracksToPlaylist(playlist.id, tracks.map(t => `spotify:track:${t.id}`), token);
                setPlaylistInfo({ name: '', tracks: [], selectedId: null });
                setError(null); // Clear any previous errors
                alert(`Playlist "${name}" created successfully!`);
            } catch (error) {
                console.error('Error creating playlist:', error);
                setError('Error creating playlist.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please provide a name and add tracks to the playlist.');
        }
    };

    // Add track to playlist
    const handleAddToPlaylist = (track) => {
        const { selectedId, tracks } = playlistInfo;
        if (!selectedId) {
            alert('Please select a playlist first.');
            return;
        }

        addTracksToPlaylist(selectedId, [`spotify:track:${track.id}`], token)
            .then(() => {
                alert(`Track "${track.name}" added to playlist!`);
                setPlaylistInfo(prev => ({
                    ...prev,
                    tracks: [...prev.tracks, track],
                }));
            })
            .catch(error => {
                console.error('Error adding track to playlist:', error);
                setError('Error adding track to playlist.');
            });
    };

    // Remove track from playlist
    const handleRemoveFromPlaylist = (track) => {
        const { selectedId, tracks } = playlistInfo;
        if (!selectedId) {
            alert('Please select a playlist first.');
            return;
        }

        removeTracksFromPlaylist(selectedId, [`spotify:track:${track.id}`], token)
            .then(() => {
                alert(`Track "${track.name}" removed from playlist!`);
                setPlaylistInfo(prev => ({
                    ...prev,
                    tracks: tracks.filter(t => t.id !== track.id),
                }));
            })
            .catch(error => {
                console.error('Error removing track from playlist:', error);
                setError('Error removing track from playlist.');
            });
    };

    // Update query when typing in search bar
    const handleQueryChange = (newQuery) => setQuery(newQuery);

    // Handle search button click
    const handleSearchButtonClick = () => handleSearch();

    return (
        <div className={styles.App}>
            {!token ? (
                <button onClick={() => window.location.href = getAuthUrl()}>Log in with Spotify</button>
            ) : (
                <>
                    <h1>Jammming</h1>
                    <SearchBar 
                        query={query}
                        onQueryChange={handleQueryChange}
                        onSearch={handleSearchButtonClick}
                    />

                    {/* Loading Indicator */}
                    {loading && <p>Loading...</p>}

                    {/* Error Message */}
                    {error && <p className={styles.error}>{error}</p>}
                    
                    {/* Playlist Selector */}
                    <div>
                        <h2>Your Playlists</h2>
                        <select
                            value={playlistInfo.selectedId || ''}
                            onChange={(e) => setPlaylistInfo(prev => ({ ...prev, selectedId: e.target.value }))}
                        >
                            <option value="" disabled>Select a playlist</option>
                            {userPlaylists.map((playlist) => (
                                <option key={playlist.id} value={playlist.id}>
                                    {playlist.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Search Results */}
                    <div>
                        <h2>Search Results</h2>
                        <SearchResults
                            tracks={searchResults}
                            onAdd={handleAddToPlaylist}
                        />
                    </div>

                    {/* Playlist Tracks */}
                    <div>
                        <h2>Playlist Tracks</h2>
                        <Tracklist
                            tracks={playlistInfo.tracks}
                            onRemove={handleRemoveFromPlaylist}
                        />
                    </div>

                    {/* Create Playlist Button */}
                    <button onClick={handleCreatePlaylist}>Create Playlist</button>

                    {/* Log out Button */}
                    <button onClick={logout}>Log Out</button>
                </>
            )}
        </div>
    );
}

export default App;
