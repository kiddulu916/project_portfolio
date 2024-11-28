const express = require('express');
const request = require('request');
const crypto = require('crypto');
const cookieParser = require('cookie-parser')
const axios = require('axios');
const querystring = require('querystring');
const cors = require('cors');

const clientId = '637204625e214cd6b4af3886a8a8dc24';
const clientSecret = '788297699d804a2caf859ead9ed10aa9';
const redirectUri = 'http://localhost:8888/callback';

const generateRandomString = (length) => {
    return crypto
    .randomBytes(60)
    .toString('hex')
    .slice(0, length);
}

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
.use(cors())
.use(cookieParser());

app.get('/login', function(req, res) {
    
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    
    const scope = 'user-library-read user-read-private user-read-email playlist-read-public playlist-read-private playlist-modify-public playlist-modify-private'
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    }));
});

app.get('/callback', function(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer.from(`${clientId}: ${clientSecret}`).toString('base64'))
        },
        json: true
    };
    
    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            
            var accessToken = body.access_token,
            var refreshToken = body.refresh_token;
            
            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + accessToken },
                json: true
            };
            
            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
                console.log(body);
            });
            
            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
                querystring.stringify({
                    access_token: accessToken,
                    refresh_token: refreshToken
                }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
            
    },
    
    app.get('/refresh_token', function(req, res) {
        
        var refreshToken = req.query.refresh_token;
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (new Buffer.from(`${clientId}: ${clientSecret}`).toString('base64')) 
            },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: clientId
            },
            json: true
        };
        
        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var accessToken = body.access_token,
                var refreshToken = body.refresh_token || refresh_token;
                res.send({
                    'access_token': accessToken,
                    'refresh_token': refreshToken
                });
            }
        });
    });
    
    console.log('Listening on 8888');
    app.listen(8888);