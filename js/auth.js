// auth.js
const clientId = 'd049909714344a469f3017b68941e0a2'; 
const redirectUri = 'https://soundmood-pro.netlify.app/callback'; 

document.getElementById('spotifyLogin').addEventListener('click', () => {
  const scope = 'playlist-read-private user-read-private';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token&show_dialog=true`;
  window.location.href = authUrl;
});

// Token handling
const parseToken = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');

  if (accessToken) {
    localStorage.setItem('spotifyToken', accessToken);
    localStorage.setItem('spotifyTokenExpiration', Date.now() + (expiresIn * 1000));
    window.history.replaceState({}, document.title, window.location.pathname);
  } else {
    console.error('Error: No access token found in URL');
  }
};

window.addEventListener('load', parseToken);