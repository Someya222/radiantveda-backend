const express = require('express');
const User = require('../models/User'); // Path to your user model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../middleware/auth'); // Your auth middleware
require('dotenv').config();

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'This email is already registered. Try logging in instead.' });
        }

        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error signup' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Oops! Incorrect email or password. Please try again.' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Oops! Incorrect email or password. Please try again.' });
        }

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Protected route example
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;

