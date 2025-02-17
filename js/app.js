// app.js
function checkTokenExpiration() {
  const expiration = localStorage.getItem('spotifyTokenExpiration');
  if (Date.now() > expiration) {
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('spotifyTokenExpiration');
    window.location.href = '/'; // Ανακατεύθυνση αν το token έληξε
  }
}

function fetchUserData() {
  const token = localStorage.getItem('spotifyToken');
  checkTokenExpiration();

  if (!token) {
    console.error('No token found. Please login first.');
    return;
  }

  // Παράδειγμα: Αίτημα για προφίλ χρήστη
  fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  })
  .then(data => {
    console.log('User Profile:', data);
    // Εμφάνισε τα δεδομένα στο UI (π.χ., όνομα, εικόνα)
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Κλήση όταν φορτώνεται η σελίδα
window.addEventListener('load', fetchUserData);