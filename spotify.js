const clientId = "6f24397905834a03b7c0e82039d61ca1"; 
const redirectUri = "http://localhost:8888/callback.html"; 
let accessToken = "";

function getAuthUrl() {
    const scopes = ["streaming", "user-read-email", "user-read-private"];
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scopes.join("%20")}`;
    window.location.href = authUrl;
}

function extractTokenFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    accessToken = params.get("access_token");
    if (accessToken) {
        window.history.pushState("", document.title, window.location.pathname);
        initializeSpotifyPlayer();
    }
}

function initializeSpotifyPlayer() {
    window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new Spotify.Player({
            name: "Web Playback SDK",
            getOAuthToken: cb => { cb(accessToken); },
            volume: 0.5
        });

        player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
        });

        player.connect();
    };
}

window.onload = extractTokenFromUrl;
