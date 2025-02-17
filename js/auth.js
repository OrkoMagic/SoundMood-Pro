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
  const result = hash.split('&').reduce((res, item) => {
    const [key, val] = item.split('=');
    res[key] = decodeURIComponent(val);
    return res;
  }, {});

  if (result.access_token) {
    localStorage.setItem('spotifyToken', result.access_token);
    localStorage.setItem('spotifyTokenExpiration', Date.now() + (result.expires_in * 1000));
    window.history.replaceState({}, document.title, "/");
  }
};

window.addEventListener('load', parseToken);