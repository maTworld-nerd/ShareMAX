
// importing modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');


// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validate inputs
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if the user already exists
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user 
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

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
