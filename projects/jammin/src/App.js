import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

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
    return result;
}

const STATE = generateRandomString(16);

function App() {
    const [searchInput, setSearchInput] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
      const loginParams = 'response_type=code&client_id=' + encodeURI(CLIENT_ID) + '&scope=' + encodeURI(SCOPE) + '&redirect_uri=' + encodeURI(REDIRECT_URI) + '&state=' + encodeURI(STATE) + '&show_dialog=true'
        }
        fetch('https://accounts.spotify.com/authorize?', loginParams)
            .then(response => response.json())
            .then(data => { console.log(data) })
    }, [])

    useEffect(() => {
        var authParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: '?grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token)) 
    }, [])

    async function search() {
        var searchParams = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        }
        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParams)
            .then(response => response.json())
            .then(data => { return data.artists.items[0].id })

        var returnedAlbums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&market=US&limit=50', searchParams)
            .then(response => response.json)
            .then(data => { setAlbums(data.items) });
    }

    return (
        <div className="App">
            <Container>
                <InputGroup className="mb-3 mt-2" size="lg">
                    <FormControl 
                        placeholder="Search By Artist, Album, or Song"
                        type="input"
                        onKeyDown={event => {
                            if (event.key === "Enter") {
                                search();
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row rows-cols-4">
                    {albums.map( (album, i) => {
                        
                        return (
                            <Card>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default App
