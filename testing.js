
const CLIENT_ID = "637204625e214cd6b4af3886a8a8dc24";
const CLIENT_SECRET = "788297699d804a2caf859ead9ed10aa9";
const REDIRECT_URI = "http://localhost:3000/";
const SCOPE = "user-library-read%20user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private";

function generateRandomString(length = 16) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result
  }

const STATE = generateRandomString(16);

const loginParams = 'response_type=code&client_id=' + encodeURIComponent(CLIENT_ID) + '&scope=' + encodeURIComponent(SCOPE) + '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) + '&state=' + encodeURIComponent(STATE) + '&show_dialog=true';

import React, { useEffect, useState } from 'react';

const TokenFetcher = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [tokenType, setTokenType] = useState(null);
  const [expiresIn, setExpiresIn] = useState(null);

  useEffect(() => {
    const extractTokens = () => {
      // Extract the hash from the current URL
      const urlFragment = window.location.hash.substring(1);
      const params = new URLSearchParams(urlFragment);

      // Store the desired parameters
      setAccessToken(params.get('access_token'));
      setTokenType(params.get('token_type'));
      setExpiresIn(params.get('expires_in'));
    };

    extractTokens();
  }, []);

  return (
    <div>
      <h1>Token Information</h1>
      <p><strong>Access Token:</strong> {accessToken}</p>
      <p><strong>Token Type:</strong> {tokenType}</p>
      <p><strong>Expires In:</strong> {expiresIn}</p>
    </div>
  );
};

export default TokenFetcher;
