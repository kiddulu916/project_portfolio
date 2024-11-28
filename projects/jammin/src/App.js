import { loginEndpoint } from './Spotify';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';

function App() {
    const [searchInput, setSearchInput] = useState("");

    return (
        <div className="App">
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl 
                        placeholder="Search For Artist"
                        type="input"
                        onKeyDown={event => {
                            if (event.key == "Enter") {
                                console.log("Pressed enter");
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={() => {console.log("Clicked Button")}}>Search</Button>
                </InputGroup>
            </Container>
        </div>
    );
}

export default App
