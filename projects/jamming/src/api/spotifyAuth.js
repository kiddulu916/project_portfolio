const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID; // Replace with your actual client ID
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI; // Replace with your redirect URI
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SCOPES = [
    'user-read-private',
    'user-read-email',
    'playlist-modify-public',
    'playlist-modify-private',
];

export function generateCodeVerifier() {
    const array = new Uint32Array(128);
    window.crypto.getRandomValues(array);
    return Array.from(array, (num) => ('0' + num.toString(16)).slice(-2)).join('');
}

export async function generateCodeChallenge(verifier) {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export function getAuthUrl(codeChallenge) {
    const scope = SCOPES.join('%20'); // Join scopes with URL encoding
    const state = generateRandomString(16); // Optional state parameter for additional security
    return `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}&scope=${scope}&state=${state}`;
}

export async function exchangeCodeForToken(code) {
    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    if (!codeVerifier) throw new Error('Code verifier not found');

    const params = new URLSearchParams();
    params.append('client_id', CLIENT_ID);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', REDIRECT_URI);
    params.append('code_verifier', codeVerifier);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    if (!response.ok) {
        throw new Error(`Failed to exchange code for token: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export function saveTokenToLocalStorage(tokenData) {
    localStorage.setItem('spotify_access_token', tokenData.access_token);
    localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
    localStorage.setItem('spotify_token_expiry', Date.now() + tokenData.expires_in * 1000);
}

export function getTokenFromLocalStorage() {
    const accessToken = localStorage.getItem('spotify_access_token');
    const tokenExpiry = localStorage.getItem('spotify_token_expiry');
    if (accessToken && Date.now() < tokenExpiry) {
        return accessToken;
    }
    return null; // Token expired or not found
}

export function logout() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expiry');
    localStorage.removeItem('spotify_code_verifier');
    window.location.reload();
}

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}