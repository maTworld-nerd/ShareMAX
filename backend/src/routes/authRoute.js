
// importing modules
const express = require('express');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Authenticating user 
  if (username === 'user' && password === 'pass') {
    req.session.user = { username };
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid' });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.json({ message: 'Logout successful' });
  });
});

// Protected route
router.get('/profile', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ message: 'Access Denied!' });
  }
});

module.exports = router;
