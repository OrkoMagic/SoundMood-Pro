// server.js
const express = require('express');
const app = express();
const path = require('path');
const port = 8888;

// Σερβίρετε στατικά αρχεία
app.use(express.static(__dirname));

// Route callback
app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'callback.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
