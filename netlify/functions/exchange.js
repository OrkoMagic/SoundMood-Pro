// netlify/functions/exchange.js
const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { code, code_verifier } = JSON.parse(event.body || '{}');
    if (!code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing code parameter' })
      };
    }

    // Client ID από το Spotify Developer Dashboard
    const clientId = '6f24397905834a03b7c0e82039d61ca1';
    // Για τοπική δοκιμή, αλλάζεις το redirectUri αν χρειάζεται:
    const redirectUri = process.env.REDIRECT_URI || 'http://localhost:8888/callback.html';

    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier
    });

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      data.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      })
    };
  } catch (error) {
    console.error('Exchange error:', error.response?.data || error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Something went wrong',
        details: error.response?.data || error.message
      })
    };
  }
};
