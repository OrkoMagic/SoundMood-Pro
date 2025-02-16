// Φορτώστε τις μεταβλητές περιβάλλοντος
require('dotenv').config();

document.getElementById('spotifyLogin').addEventListener('click', () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI; // Ensure this matches the registered URI in the Spotify Developer Dashboard
  const scopes = 'user-read-private user-read-email';

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&response_type=token&show_dialog=true`;

  window.location.href = authUrl;
});

window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  if (accessToken) {
      fetch('https://api.spotify.com/v1/me', {
          headers: {
              'Authorization': `Bearer ${accessToken}`
          }
      })
      .then(response => response.json())
      .then(data => {
          document.querySelector('#spotifyLogin span').textContent = `${data.display_name}`;
          document.querySelector('#spotifyLogin').disabled = true;
      })
      .catch(error => console.error('Error:', error));
  }