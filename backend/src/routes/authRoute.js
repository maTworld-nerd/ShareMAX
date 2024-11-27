// importing modules
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getAllUsers } = require('../controllers/authController');

// Register route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);


// Logout route
router.post('/logout', logoutUser);

// get all registered users
router.get('/users', getAllUsers);

module.exports = router;


