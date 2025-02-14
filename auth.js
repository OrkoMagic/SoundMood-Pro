// auth.js
const clientId = 'd049909714344a469f3017b68941e0a2'; // Αντικατάσταση με το Client ID από το Dashboard
const redirectUri = 'https://soundmood-pro.netlify.app/callback';
const scopes = ['playlist-modify-public', 'user-read-private'];

document.getElementById('spotifyLogin').addEventListener('click', () => {
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${scopes.join('%20')}&redirect_uri=${encodeURIComponent(redirectUri)}`;
  window.location.href = authUrl;
});