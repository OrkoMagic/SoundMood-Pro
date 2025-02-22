// netlify/functions/getAuthParams.js
const {
  SPOTIFY_CLIENT_ID: CLIENT_ID,
  SPOTIFY_REDIRECT_URI: REDIRECT_URI
} = process.env;

exports.handler = async (event) => {
  try {
    const { code_challenge } = JSON.parse(event.body);
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.append('code_challenge_method', 'S256');
    authUrl.searchParams.append('code_challenge', code_challenge);
    authUrl.searchParams.append('scope', 'streaming user-read-email user-read-private');

    return {
      statusCode: 200,
      body: JSON.stringify({ url: authUrl.toString() })
    };
    
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Failed to generate auth URL' })
    };
  }
};