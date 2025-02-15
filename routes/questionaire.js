const express = require('express');
const User = require('../models/User'); 
const Questionnaire = require('../models/Questionaire');
const authMiddleware = require('../middleware/auth'); 
require('dotenv').config();

const router = express.Router();

router.post('/submit',authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from JWT middleware
        console.log('Logged in User ID:', userId);
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        let questionnaire = await Questionnaire.findOne({ userId });
        if (questionnaire) {
            // Update existing questionnaire
            Object.assign(questionnaire, req.body);
            await questionnaire.save();
            return res.status(200).json({ message: 'Questionnaire updated successfully',status_code:1, questionnaire });
        } else {
            // Create new questionnaire
            questionnaire = new Questionnaire({ userId, ...req.body });
            await questionnaire.save();
            return res.status(201).json({ message: 'Questionnaire created successfully',status_code:2, questionnaire });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error questionnaire', error: error.message });
    }
});

// Get the logged-in user's questionnaire
router.get("/fetch", authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from JWT token
        const questionnaire = await Questionnaire.findOne({ userId });

        if (!questionnaire) {
            return res.status(404).json({ message: "No questionnaire found for this user." });
        }

        res.status(200).json(questionnaire);
    } catch (error) {
        res.status(500).json({ message: "Server error fetching questionnaire", error: error.message });
    }
});


module.exports = router;