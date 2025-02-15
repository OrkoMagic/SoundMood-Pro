// auth.js
const clientId = 'd049909714344a469f3017b68941e0a2'; // Προσοχή: Κράτα το ΜΥΣΤΙΚΟ!
const redirectUri = 'https://soundmood-pro.netlify.app/callback';
const scopes = [
    'streaming', // Απαραίτητο για Web Playback
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state'
];

// Σύνδεση Spotify
document.getElementById('spotifyLogin').addEventListener('click', () => {
    const authUrl = `https://accounts.spotify.com/authorize?
        client_id=${clientId}
        &redirect_uri=${encodeURIComponent(redirectUri)}
        &scope=${encodeURIComponent(scopes.join(' '))}
        &response_type=token
        &show_dialog=true`; // Εμφάνισε διαλόγου για debugging
    
    window.location.href = authUrl;
});

// Χειρισμός token μετά την επιστροφή
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get('access_token');

    if (token) {
        initializePlayer(token);
        window.history.replaceState({}, document.title, "/"); // Καθάρισε το URL
    }
});

// Web Playback SDK Initialization
function initializePlayer(token) {
    const player = new Spotify.Player({
        name: 'SoundMood Player',
        getOAuthToken: cb => cb(token),
        volume: 0.5
    });

    // Error Handling
    player.addListener('initialization_error', ({ message }) => console.error('Σφάλμα:', message));
    player.addListener('authentication_error', ({ message }) => console.error('Σφάλμα Auth:', message));
    player.addListener('account_error', ({ message }) => console.error('Σφάλμα Λογαριασμού:', message));

    // Σύνδεση
    player.connect().then(success => {
        if (success) {
            console.log('Συνδέθηκε στο Spotify Web Player!');
            alert('Συνδεθήκατε με επιτυχία! 🎧');
        }
    });
}