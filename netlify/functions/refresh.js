const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { refresh_token } = JSON.parse(event.body || '{}');
    if (!refresh_token) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing refresh_token' })
      };
    }
    const clientId = '6f24397905834a03b7c0e82039d61ca1';
    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
      client_id: clientId
    });
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      data.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: response.data.access_token
      })
    };
  } catch (error) {
    console.error('Refresh error:', error.response?.data || error.message);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Refresh failed',
        details: error.response?.data || error.message
      })
    };
  }
};
