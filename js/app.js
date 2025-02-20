// Spotify Config
const CLIENT_ID = '6f24397905834a03b7c0e82039d61ca1';
const REDIRECT_URI = window.location.hostname.includes('localhost') 
  ? 'http://localhost:3000/callback' 
  : 'https://soundmood-pro-v2.netlify.app/callback';

// 1. Έλεγχος για Token
if(window.location.hash.includes('access_token')) {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const token = hashParams.get('access_token');
  const expiresIn = hashParams.get('expires_in') || 3600;

  localStorage.setItem('spotifyToken', token);
  localStorage.setItem('spotifyExpiration', Date.now() + expiresIn * 1000);
  
  // Αφαίρεσε το hash από το URL
  window.location.href = window.location.origin;
}

// 2. Login Function
function loginWithSpotify() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=streaming`;
  window.location.href = authUrl;
}

// 3. Έλεγχος Λήξης Token
function checkToken() {
  const token = localStorage.getItem('spotifyToken');
  const expiration = localStorage.getItem('spotifyExpiration');

  if (!token || Date.now() > expiration) {
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('spotifyExpiration');
    return false;
  }
  return true;
}

// 4. Φόρτωσε τα δεδομένα όταν ανοίγει η σελίδα
window.onload = () => {
  if (!checkToken()) {
    document.getElementById('loginContainer').style.display = 'block';
  } else {
    // Κάνε ότι χρειάζεται όταν ο χρήστης είναι συνδεδεμένος
  }
};