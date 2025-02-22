const axios = require('axios');

exports.handler = async (event) => {
  const { code, code_verifier } = JSON.parse(event.body);
  
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', 
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://soundmood-pro-v2.netlify.app/callback.html',
        client_id: '6f24397905834a03b7c0e82039d61ca1',
        code_verifier: code_verifier
      }), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      })
    };
  } catch (error) {
    return { 
      statusCode: 400, 
      body: JSON.stringify({ error: "Κάτι πήγε στραβά" }) 
    };
  }
};