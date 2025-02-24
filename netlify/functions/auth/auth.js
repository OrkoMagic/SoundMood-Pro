const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed"
    };
  }

  const body = JSON.parse(event.body);
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (body.code) {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', body.code);
    params.append('redirect_uri', body.redirect_uri);
    params.append('client_id', client_id);
    params.append('code_verifier', body.code_verifier);

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const data = await response.json();
      if (response.ok) {
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        };
      } else {
        return {
          statusCode: response.status,
          body: JSON.stringify(data)
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.toString() })
      };
    }
  } else if (body.refresh_token) {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', body.refresh_token);
    params.append('client_id', client_id);
    params.append('client_secret', client_secret); // Προσθήκη client_secret

    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });
      const data = await response.json();
      if (response.ok) {
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        };
      } else {
        return {
          statusCode: response.status,
          body: JSON.stringify(data)
        };
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: err.toString() })
      };
    }
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }
};
