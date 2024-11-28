const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = '637204625e214cd6b4af3886a8a8dc24',
const redirectUri = "http://localhost:8888/callback";
const scope = ["user-library-read", "user-read-private", "user-read-email", "playlist-read-public", "playlist-modify-public", "playlist-modify-private"].join(" ");

export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=code&show_dialog=true`;