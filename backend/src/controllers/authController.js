const User = require('../models');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};


const loginUser = async (req, res) => {
    // Logic for login will go here.
};

module.exports = { registerUser, loginUser };
