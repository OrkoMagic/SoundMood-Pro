// server.js
const express = require('express');
const app = express();
const path = require('path');
const port = 8888;

// Serve static files
app.use(express.static(__dirname));

// Handle callback route
app.get('/callback', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});