const clientId = 'd049909714344a469f3017b68941e0a2'; 
const redirectUri ='http://localhost:8888/callback.html'; // Προσοχή: ΠΡΕΠΕΙ να είναι ίδιο με το Spotify Dashboard

// 1. Σύνδεση μόνο αν δεν υπάρχει token
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginContainer');
  const token = localStorage.getItem('spotifyToken');

  if (!token) {
    loginButton.style.display = 'block'; // Εμφάνισε το κουμπί
  } else {
    loginButton.style.display = 'none'; // Απόκρυψη αν υπάρχει token
  }
});

// 2. Login με Spotify
document.getElementById('spotifyLogin').addEventListener('click', () => {
  const scopes = ['user-read-private', 'user-read-email', 'user-modify-playback-state', 'user-read-playback-state', 'streaming'];
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token&show_dialog=true`;
  window.location.href = authUrl;
});

// 3. Εξαγωγή token από URL
const parseToken = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');

  if (accessToken) {
    localStorage.setItem('spotifyToken', accessToken);
    localStorage.setItem('spotifyTokenExpiration', Date.now() + (expiresIn * 1000));
    window.history.replaceState({}, document.title, "/"); // Redirect ΣΤΗΝ ΑΡΧΙΚΗ μετά από login
  }
};

// 4. Έλεγχος ισχύος token (διόρθωση bug με parseInt)
const checkTokenValidity = () => {
  const token = localStorage.getItem('spotifyToken');
  const expiration = localStorage.getItem('spotifyTokenExpiration');
  
  if (!token || Date.now() > parseInt(expiration)) { // ΠΡΟΣΟΧΗ: parseInt()
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('spotifyTokenExpiration');
    return false;
  }
  return true;
};

// 5. Αρχικοποίηση κατά τη φόρτωση
window.addEventListener('load', () => {
  parseToken();
  
  if (checkTokenValidity()) {
    console.log("Token is valid!");
    if (window.location.pathname === "/callback") {
      window.location.href = "/"; // Αποφυγή ατέρμονου βρόχου
    }
  } else {
    console.error("No valid token. Redirecting...");
  }
});