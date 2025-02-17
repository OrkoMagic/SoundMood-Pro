// auth.js
const clientId = 'd049909714344a469f3017b68941e0a2'; // ΠΡΑΓΜΑΤΙΚΟ Client ID από το Spotify Dashboard
const redirectUri = 'https://soundmood-pro.netlify.app/callback'; // ΠΡΕΠΕΙ να ταιριάζει με αυτό στο Dashboard

// 1. Σύνδεση του κουμπιού "Connect Spotify"
document.getElementById('spotifyLogin').addEventListener('click', () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
    'user-modify-playback-state',
    'user-read-playback-state',
    'streaming'
  ];
  
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
  window.location.href = authUrl;
});

// 2. Εξαγωγή του token από το URL
const parseToken = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');

  if (accessToken) {
    localStorage.setItem('spotifyToken', accessToken);
    localStorage.setItem('spotifyTokenExpiration', Date.now() + (expiresIn * 1000));
    window.history.replaceState({}, document.title, window.location.pathname); // Καθαρισμός URL
    window.location.reload(); // Ανανέωση σελίδας
  } else {
    console.error('Error: Token not found');
  }
};

// 3. Έλεγχος token κατά τη φόρτωση της σελίδας
window.addEventListener('load', parseToken);