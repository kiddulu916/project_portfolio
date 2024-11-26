# Jammming

Jammming is a music playlist creation app that allows users to search for tracks, albums, and artists on Spotify, create new playlists, and manage the tracks in their personal playlists.

### Features:
- **Spotify Authentication**: Users can log in to their Spotify account via OAuth.
- **Search**: Search for tracks, albums, or artists using the Spotify API.
- **Create Playlists**: Users can create new playlists and add tracks to them.
- **Manage Playlists**: Add and remove tracks from any of the user's saved playlists.
- **Responsive UI**: The app features a clean and interactive UI, optimized for both desktop and mobile devices.

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/jammming.git
   cd jammming
   ```

2. **Install dependencies**: Ensure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Set up your Spotify Developer App**:
   - Visit the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/).
   - Create a new application to get your Client ID and Client Secret.
   - Add the redirect URI for the application (e.g., `http://localhost:3000/`).

4. **Set up environment variables**:
   - Create a `.env` file in the root directory of the project.
   - Add the following to your `.env` file:
     ```env
     REACT_APP_SPOTIFY_CLIENT_ID=<Your_Client_ID>
     REACT_APP_SPOTIFY_CLIENT_SECRET=<Your_Client_Secret>
     REACT_APP_REDIRECT_URI=http://localhost:3000/
     ```

## Usage

- **Start the app**: Run the app using:
  ```bash
  npm start
  ```
  This will start a development server and open the app in your default web browser.

- **Log in to Spotify**: Click the “Log in with Spotify” button to authenticate via OAuth. Once logged in, you'll be redirected back to the app.

- **Search for Tracks, Albums, or Artists**: Use the search bar to explore Spotify’s catalog. Results appear below the search bar.

- **Create a Playlist**:
  - Enter a name for your new playlist.
  - Add tracks by clicking the "+" button next to a track.
  - Remove tracks by clicking the "-" button.

- **Add Tracks to Existing Playlists**:
  - Select an existing playlist from the dropdown menu.
  - Add tracks similarly as you do for a new playlist.

- **Log Out**: Click the "Log Out" button to log out of your Spotify account.

## Technology Stack

- **React**: For building the UI components.
- **Spotify API**: To interact with Spotify’s catalog and manage user playlists.
- **OAuth 2.0**: For Spotify user authentication.
- **CSS Modules**: For scoped and modular styling of React components.
- **Axios**: To make HTTP requests to the Spotify API.
- **JavaScript (ES6+)**: The core language used for developing the app.

## Contributing

1. **Fork the repository** and clone it to your local machine.
2. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push your changes**:
   ```bash
   git push origin feature-name
   ```
5. **Open a pull request** to merge your changes into the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **Spotify Developer API** for providing the API to search and interact with Spotify.
- **React** for building the user interface.
- **Axios** for making HTTP requests.
