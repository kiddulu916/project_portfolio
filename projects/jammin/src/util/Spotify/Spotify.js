let accessToken = '';
const CLIENT_ID = "637204625e214cd6b4af3886a8a8dc24"
const REDIRECT_URI = "http://localhost:3000/callback"
const SCOPE = "app-remote-control playlist-modify-public playlist-modify-private user-library-read user-top-read user-read-recently-played user-read-private playlist-read-private user-read-email playlist-read-collaborative"; 

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
        const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

        if (tokenInURL && expiryTime) {
            accessToken = tokenInURL[1];
            const expiresIn = Number(expiryTime[1]);
            const expirationTime = new Date().getTime() + expiresIn * 1000;

            window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
            window.localStorage.setItem('SpotifyToken', JSON.stringify({ accessToken, expirationTime }));
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }

        const storedToken = JSON.parse(window.localStorage.getItem('SpotifyToken'));
        if (storedToken && storedToken.expirationTime > new Date().getTime()) {
            accessToken = storedToken.accessToken;
            return accessToken;
       
        }

        const redirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=${encodeURI(SCOPE)}&redirect_uri=${encodeURI(REDIRECT_URI)}`;
        window.location = redirect;
    },

    async fetchWithErrorHandling(url, options) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.error?.message || response.statusText;
                throw new Error(`Error ${response.status}: ${errorMessage}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Spotify API Error:", error.message);
            throw error; // Re-throw for further handling in calling methods
        }
    },

    async search(term) {
        const token = await this.getAccessToken();
        const url = `https://api.spotify.com/v1/search?type=track&q=${encodeURI(term)}&limit=50`;
        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        };
        try {
            const jsonResponse = await this.fetchWithErrorHandling(url, options);
            if (!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(t => ({
                id: t.id,
                name: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                uri: t.uri,
            }));
        } catch (error) {
            console.error("Error in search:", error.message);
            return [];
        }
    },

    async savePlaylist(name, trackUris) {
        if (!name || !trackUris.length) return;

        const token = this.getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const userResponse = await this.fetchWithErrorHandling('https://api.spotify.com/v1/me', { headers });
            const userId = userResponse.id;

            const playlistResponse = await this.fetchWithErrorHandling(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers,
                method: "POST",
                body: JSON.stringify({ name }),
            });
            const playlistId = playlistResponse.id;

            await this.fetchWithErrorHandling(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers,
                method: "POST",
                body: JSON.stringify({ uris: trackUris }),
            });
            return playlistId;
        } catch (error) {
            console.error("Error saving playlist:", error.message);
            throw error;
        }
    },

    async getUserPlaylists() {
        const token = this.getAccessToken();
        const url = `https://api.spotify.com/v1/me/playlists`;
        const options = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const jsonResponse = await this.fetchWithErrorHandling(url, options);
            return jsonResponse.items.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
            }));
        } catch (error) {
            console.error("Error fetching user playlists:", error.message);
            return [];
        }
    },

    async getPlaylistTracks(playlistId) {
        const token = this.getAccessToken();
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const options = { headers: { Authorization: `Bearer ${token}` } };

        try {
            const jsonResponse = await this.fetchWithErrorHandling(url, options);
            return jsonResponse.items.map(item => ({
                id: item.track.id,
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
                uri: item.track.uri,
                preview_url: item.track.preview_url
            }));
        } catch (error) {
            console.error("Error fetching playlist tracks:", error.message);
            return [];
        }
    },

    async getTopTracks() {
        const token = this.getAccessToken();
        const url = `https://api.spotify.com/v1/me/top/tracks?limit=20`;
        const options = { headers: { Authorization: `Bearer ${token}` } };
        
        try {
            const jsonResponse = await this.fetchWithErrorHandling(url, options);
            return jsonResponse.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }));
        } catch (error) {
            console.error("Error fetching top tracks:", error.message);
            return [];
        }
    }    
};

export { Spotify };
