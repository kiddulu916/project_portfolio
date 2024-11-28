const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');
const app = express();

const clientId = '637204625e214cd6b4af3886a8a8dc24';
const clientSecret = '788297699d804a2caf859ead9ed10aa9';
const redirectUri = 'http://localhost:8888/callback';

app.use(cors())

app.get('/login', (req, res) => {
    const scope = 'user-library-read user-read-private user-read-email playlist-read-public playlist-read-private playlist-modify-public playlist-modify-private'
    const authParams = querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${authParams}`);
});

app.get('/callback', async (req, res) => {
    const code = req.query.code || null;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri,
                client_id: clientId,
                clinet_secret: clientSecret,
            }),
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        });
        
        const { accessToken, refreshToken } = response.data;
        res.redirect(`http://localhost:5173?access_token=${accessToken}&refresh_token=${refreshToken}`);
    } catch (error) {
        res.send(error);
    }
});

app.listen(8888, () => {
    console.log('server running on port 8888');
});

