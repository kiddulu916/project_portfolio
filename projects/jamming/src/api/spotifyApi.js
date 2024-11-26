const API_BASE_URL = 'https://api.spotify.com/v1';

export async function search(query, type, token) {
    if (!token) throw new Error('No Spotify access token provided');
    if (!['track', 'artist', 'album'].includes(type)) throw new Error('Invalid search type');

    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=${type}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error searching ${type}: ${response.status}`);
    }

    const data = await response.json();
    return data[type + 's'].items.map((item) => ({
        id: item.id,
        name: item.name,
        artist: item.artists ? item.artists[0].name : null,
        album: item.album ? item.album.name : null,
    }));
}

export async function createPlaylist(userId, playlistName, token) {
    if (!token) throw new Error('No Spotify access token provided');

    const response = await fetch(`${API_BASE_URL}/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: playlistName, public: false }),
    });

    if (!response.ok) {
        throw new Error(`Error creating playlist: ${response.status}`);
    }

    return response.json();
}

export async function addTracksToPlaylist(playlistId, trackUris, token) {
    if (!token) throw new Error('No Spotify access token provided');

    const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uris: trackUris }),
    });

    if (!response.ok) {
        throw new Error(`Error adding tracks to playlist: ${response.status}`);
    }

    return response.json();
}

export async function removeTrackFromPlaylist(playlistId, trackUris, token) {
    if (!token) throw new Error('No Spotify access token provided');

    const response = await fetch(`${API_BASE_URL}/playlists/${playlistId}/tracks`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tracks: trackUris.map((uri) => ({ uri })) }),
    });

    if (!response.ok) {
        throw new Error(`Error removing tracks from playlist: ${response.status}`);
    }

    return response.json();
}

export async function getUserPlaylists(token) {
    if (!token) throw new Error('No Spotify access token provided');

    const response = await fetch(`${API_BASE_URL}/me/playlists`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching user playlists: ${response.status}`);
    }

    return response.json();
}

export async function getCurrentUserProfile(token) {
    if (!token) throw new Error('No Spotify access token provided');

    const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching user profile: ${response.status}`);
    }

    return response.json();
}
